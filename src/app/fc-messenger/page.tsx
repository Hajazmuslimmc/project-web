'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit, onSnapshot, addDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  content: string;
  timestamp: any;
  type: 'text' | 'image' | 'system';
  chatType: 'global' | 'private';
  recipientId?: string;
  chatId?: string;
}

interface User {
  uid: string;
  displayName: string;
  profilePhoto?: string;
  isOnline: boolean;
  lastSeen: number;
  friends: string[];
}

interface PrivateChat {
  id: string;
  participants: string[];
  lastMessage: {
    content: string;
    timestamp: any;
    senderId: string;
  };
  createdAt: any;
}

export default function FCMessengerPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [privateChats, setPrivateChats] = useState<PrivateChat[]>([]);
  const [currentChat, setCurrentChat] = useState<'global' | string>('global'); // 'global' or chatId
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      // Load global messages
      loadGlobalMessages();
      // Load friends
      loadFriends();
      // Load private chats
      loadPrivateChats();
      // Mark user as online
      markUserOnline();
    }
  }, [user, loading, router]);

  // Load messages when current chat changes
  useEffect(() => {
    if (currentChat === 'global') {
      loadGlobalMessages();
    } else {
      loadPrivateMessages(currentChat);
    }
  }, [currentChat]);

  const loadGlobalMessages = () => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('chatType', '==', 'global'), orderBy('timestamp', 'desc'), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = [];
      querySnapshot.forEach((doc) => {
        messagesData.push(doc.data() as Message);
      });
      setMessages(messagesData.reverse()); // Reverse to show oldest first
    });

    return unsubscribe;
  };

  const loadPrivateMessages = (chatId: string) => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('chatId', '==', chatId), orderBy('timestamp', 'desc'), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = [];
      querySnapshot.forEach((doc) => {
        messagesData.push(doc.data() as Message);
      });
      setMessages(messagesData.reverse()); // Reverse to show oldest first
    });

    return unsubscribe;
  };

  const loadFriends = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const friendsIds = userData.friends || [];

        if (friendsIds.length > 0) {
          const friendsData: User[] = [];
          for (const friendId of friendsIds) {
            const friendDoc = await getDoc(doc(db, 'users', friendId));
            if (friendDoc.exists()) {
              const friendData = friendDoc.data();
              const currentTime = Date.now();
              const isOnline = (currentTime - (friendData.lastOnline?.toMillis() || 0)) < 30000;
              friendsData.push({
                uid: friendData.uid,
                displayName: friendData.displayName,
                profilePhoto: friendData.profilePhoto,
                isOnline,
                lastSeen: friendData.lastOnline?.toMillis() || 0,
                friends: friendData.friends || [],
              });
            }
          }
          setFriends(friendsData);
        }
      }
    } catch (error) {
      console.error('Error loading friends:', error);
    }
  };

  const loadPrivateChats = async () => {
    if (!user) return;

    try {
      const chatsRef = collection(db, 'privateChats');
      const q = query(chatsRef, where('participants', 'array-contains', user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatsData: PrivateChat[] = [];
        querySnapshot.forEach((doc) => {
          chatsData.push({ id: doc.id, ...doc.data() } as PrivateChat);
        });
        setPrivateChats(chatsData);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error loading private chats:', error);
    }
  };

  const markUserOnline = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        lastOnline: new Date()
      });
    } catch (error) {
      console.error('Error marking user online:', error);
    }
  };

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return;

    const content = newMessage.trim();

    // Check for admin commands
    if (content.startsWith('/')) {
      handleAdminCommand(content);
      setNewMessage('');
      setIsTyping(false);
      return;
    }

    try {
      const messageData = {
        id: `msg_${Date.now()}_${Math.random()}`,
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous',
        senderPhoto: user.profilePhoto,
        content: content,
        timestamp: new Date(),
        type: 'text' as const,
        chatType: currentChat === 'global' ? 'global' as const : 'private' as const,
        ...(currentChat !== 'global' && { chatId: currentChat }),
      };

      await addDoc(collection(db, 'messages'), messageData);

      // Update private chat last message if it's a private chat
      if (currentChat !== 'global') {
        await updateDoc(doc(db, 'privateChats', currentChat), {
          lastMessage: {
            content: content,
            timestamp: new Date(),
            senderId: user.uid,
          }
        });
      }

      setNewMessage('');
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAdminCommand = (command: string) => {
    if (!user || (user.role !== 'admin' && user.role !== 'mod')) {
      // Add system message for unauthorized command
      const systemMessage: Message = {
        id: `msg_${Date.now()}_${Math.random()}`,
        senderId: 'system',
        senderName: 'System',
        senderPhoto: undefined,
        content: 'You do not have permission to use admin commands.',
        timestamp: Date.now(),
        type: 'system',
        chatType: 'global',
      };
      const updatedMessages = [...messages, systemMessage];
      setMessages(updatedMessages);
      localStorage.setItem('fcMessages', JSON.stringify(updatedMessages));
      return;
    }

    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const targetUser = parts[1];

    switch (cmd) {
      case '/ban':
        if (!targetUser) {
          addSystemMessage('Usage: /ban <username>');
          return;
        }
        banUser(targetUser);
        break;

      case '/banip':
        if (!targetUser) {
          addSystemMessage('Usage: /banip <username> (simulated IP ban)');
          return;
        }
        banUser(targetUser, true);
        break;

      case '/unban':
        if (!targetUser) {
          addSystemMessage('Usage: /unban <username>');
          return;
        }
        unbanUser(targetUser);
        break;

      case '/delete':
        const messageId = parts[1];
        if (!messageId) {
          addSystemMessage('Usage: /delete <message_id> (hover over message to see ID)');
          return;
        }
        deleteMessage(messageId);
        break;

      case '/clear':
        clearChat();
        break;

      case '/promote':
        if (!targetUser) {
          addSystemMessage('Usage: /promote <username> (admin only)');
          return;
        }
        if (user.role === 'admin') {
          promoteUser(targetUser);
        } else {
          addSystemMessage('Only admins can promote users.');
        }
        break;

      case '/kick':
        if (!targetUser) {
          addSystemMessage('Usage: /kick <username>');
          return;
        }
        kickUser(targetUser);
        break;

      default:
        addSystemMessage(`Unknown command: ${cmd}. Available commands: /ban, /banip, /unban, /delete, /clear, /promote, /kick`);
    }
  };

  const addSystemMessage = (content: string) => {
    const systemMessage: Message = {
      id: `msg_${Date.now()}_${Math.random()}`,
      senderId: 'system',
      senderName: 'System',
      senderPhoto: undefined,
      content: content,
      timestamp: Date.now(),
      type: 'system',
      chatType: 'global',
    };
    const updatedMessages = [...messages, systemMessage];
    setMessages(updatedMessages);
    localStorage.setItem('fcMessages', JSON.stringify(updatedMessages));
  };

  const banUser = (username: string, ipBan = false) => {
    if (!user) return;
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = username.toLowerCase();

    if (allUsers[userKey]) {
      allUsers[userKey].isBanned = true;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      addSystemMessage(`${username} has been ${ipBan ? 'IP ' : ''}banned by ${user.displayName}.`);
    } else {
      addSystemMessage(`User ${username} not found.`);
    }
  };

  const unbanUser = (username: string) => {
    if (!user) return;
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = username.toLowerCase();

    if (allUsers[userKey]) {
      allUsers[userKey].isBanned = false;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      addSystemMessage(`${username} has been unbanned by ${user.displayName}.`);
    } else {
      addSystemMessage(`User ${username} not found.`);
    }
  };

  const deleteMessage = (messageId: string) => {
    if (!user) return;
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('fcMessages', JSON.stringify(updatedMessages));
    addSystemMessage(`Message deleted by ${user.displayName}.`);
  };

  const clearChat = () => {
    if (!user) return;
    setMessages([]);
    localStorage.setItem('fcMessages', JSON.stringify([]));
    addSystemMessage(`Chat cleared by ${user.displayName}.`);
  };

  const promoteUser = (username: string) => {
    if (!user) return;
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = username.toLowerCase();

    if (allUsers[userKey]) {
      allUsers[userKey].role = 'mod';
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      addSystemMessage(`${username} has been promoted to moderator by ${user.displayName}.`);
    } else {
      addSystemMessage(`User ${username} not found.`);
    }
  };

  const kickUser = (username: string) => {
    if (!user) return;
    // For now, just mark as temporarily banned (they can sign back in)
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = username.toLowerCase();

    if (allUsers[userKey]) {
      // Reset their online status
      allUsers[userKey].lastOnline = 0;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      addSystemMessage(`${username} has been kicked by ${user.displayName}.`);
    } else {
      addSystemMessage(`User ${username} not found.`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const startPrivateChat = async (friendId: string) => {
    if (!user) return;

    try {
      // Check if private chat already exists
      const existingChat = privateChats.find(chat =>
        chat.participants.includes(user.uid) && chat.participants.includes(friendId)
      );

      if (existingChat) {
        setCurrentChat(existingChat.id);
        return;
      }

      // Create new private chat
      const chatData = {
        participants: [user.uid, friendId],
        lastMessage: {
          content: '',
          timestamp: new Date(),
          senderId: user.uid,
        },
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'privateChats'), chatData);
      setCurrentChat(docRef.id);
    } catch (error) {
      console.error('Error starting private chat:', error);
    }
  };

  const getChatDisplayName = () => {
    if (currentChat === 'global') {
      return '# General Chat';
    }

    const chat = privateChats.find(c => c.id === currentChat);
    if (chat) {
      const otherParticipantId = chat.participants.find(id => id !== user?.uid);
      const friend = friends.find(f => f.uid === otherParticipantId);
      return friend ? `Chat with ${friend.displayName}` : 'Private Chat';
    }

    return 'Private Chat';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar - Friends & Chats */}
      <div className="w-72 bg-gradient-to-b from-dark-800/80 to-dark-900/80 backdrop-blur-lg border-r border-primary-500/20 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-primary-500/20 bg-gradient-to-r from-primary-600/10 to-purple-600/10">
          <h2 className="text-2xl font-bold gradient-text mb-3">FC Messenger</h2>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="font-medium">{friends.filter(f => f.isOnline).length} Online Friends</span>
          </div>
        </div>

        {/* Global Chat */}
        <div className="p-4">
          <button
            onClick={() => setCurrentChat('global')}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              currentChat === 'global'
                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/50'
                : 'hover:bg-gradient-to-r hover:from-dark-700/60 hover:to-dark-600/60 text-gray-300 hover:shadow-lg hover:shadow-primary-500/20'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-lg">#</span>
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-base">General Chat</div>
              <div className="text-xs opacity-75">🌐 Open to all users</div>
            </div>
          </button>
        </div>

        {/* Private Chats */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold gradient-text mb-3 px-4 pt-2">Private Chats</h3>
          <div className="px-4 space-y-2">
            {privateChats.map((chat) => {
              const otherParticipantId = chat.participants.find(id => id !== user?.uid);
              const friend = friends.find(f => f.uid === otherParticipantId);

              return (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChat(chat.id)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    currentChat === chat.id
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/50'
                      : 'hover:bg-gradient-to-r hover:from-dark-700/60 hover:to-dark-600/60 text-gray-300 hover:shadow-lg hover:shadow-primary-500/20'
                  }`}
                >
                  <div className="relative">
                    {friend?.profilePhoto ? (
                      <img
                        src={friend.profilePhoto}
                        alt={friend.displayName}
                        className="w-10 h-10 rounded-full border-2 border-primary-400 shadow-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {friend?.displayName.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                    {friend?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-dark-800 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold truncate text-base">{friend?.displayName || 'Unknown'}</div>
                    <div className="text-xs opacity-75 truncate">
                      {chat.lastMessage?.content || 'No messages yet'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Friends List */}
          <h3 className="text-sm font-semibold gradient-text mb-3 px-4 pt-6">Friends</h3>
          <div className="px-4 space-y-2">
            {friends.map((friend) => (
              <div key={friend.uid} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-dark-700/60 hover:to-dark-600/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20">
                <div className="relative">
                  {friend.profilePhoto ? (
                    <img
                      src={friend.profilePhoto}
                      alt={friend.displayName}
                      className="w-10 h-10 rounded-full border-2 border-primary-400 shadow-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {friend.displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-dark-800 rounded-full shadow-lg ${
                    friend.isOnline ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-green-500/50' : 'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{friend.displayName}</div>
                  <div className="text-gray-400 text-xs">
                    {friend.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
                <button
                  onClick={() => startPrivateChat(friend.uid)}
                  className="text-primary-400 hover:text-primary-300 p-2 rounded-lg hover:bg-primary-500/20 transition-colors duration-200"
                  title="Start private chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-dark-700">
          <Link href="/search" className="text-primary-400 hover:text-primary-300 underline text-sm block mb-2">
            🔍 Find Friends
          </Link>
          <Link href="/dashboard" className="text-primary-400 hover:text-primary-300 underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-dark-900/50 to-dark-800/50">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-dark-800/80 to-dark-900/80 backdrop-blur-lg border-b border-primary-500/20 p-6 shadow-lg">
          <h1 className="text-3xl font-bold gradient-text mb-2">{getChatDisplayName()}</h1>
          <p className="text-gray-300 text-sm flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            <span>
              {currentChat === 'global'
                ? '🌐 Open to all users - Chat with anyone on FC Messenger!'
                : '🔒 Private conversation - messages are secure.'
              }
            </span>
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-dark-900/20">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <div className="text-8xl mb-6 animate-bounce">💬</div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">Welcome to FC Messenger!</h3>
              <p className="text-lg">Start chatting with other users. Be respectful and have fun!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={message.id} className={`flex items-end space-x-3 ${message.senderId === user.uid ? 'justify-end' : ''} animate-fade-in`}>
                {message.senderId !== user.uid && (
                  <div className="flex-shrink-0">
                    {message.senderPhoto ? (
                      <img
                        src={message.senderPhoto}
                        alt={message.senderName}
                        className="w-10 h-10 rounded-full border-2 border-primary-400 shadow-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {message.senderName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className={`max-w-xs lg:max-w-md xl:max-w-lg relative ${
                  message.senderId === user.uid
                    ? 'message-bubble-sent'
                    : 'message-bubble-received'
                }`}>
                  {message.senderId !== user.uid && (
                    <div className="text-xs text-primary-300 mb-2 font-semibold">
                      {message.senderName}
                    </div>
                  )}
                  <div className="text-base leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.senderId === user.uid ? 'text-primary-200' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.senderId === user.uid && (
                  <div className="flex-shrink-0">
                    {message.senderPhoto ? (
                      <img
                        src={message.senderPhoto}
                        alt={message.senderName}
                        className="w-10 h-10 rounded-full border-2 border-primary-400 shadow-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {message.senderName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-gradient-to-r from-dark-800/80 to-dark-900/80 backdrop-blur-lg border-t border-primary-500/20 p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-dark-700/80 to-dark-600/80 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-4 py-3 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all duration-300">
                <button className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
                />
                <button className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m-3 7.5A9.5 9.5 0 1121.5 12 9.5 9.5 0 0112 2.5z" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                newMessage.trim()
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-primary-500/50 hover:shadow-primary-500/70'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              title="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
