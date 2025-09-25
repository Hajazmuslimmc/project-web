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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex">
      {/* Sidebar - Friends & Chats */}
      <div className="w-64 bg-dark-800/50 border-r border-dark-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white mb-2">FC Messenger</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{friends.filter(f => f.isOnline).length} Online Friends</span>
          </div>
        </div>

        {/* Global Chat */}
        <div className="p-2">
          <button
            onClick={() => setCurrentChat('global')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              currentChat === 'global'
                ? 'bg-primary-600 text-white'
                : 'hover:bg-dark-700/50 text-gray-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm">#</span>
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">General Chat</div>
              <div className="text-xs opacity-75">Public chat room</div>
            </div>
          </button>
        </div>

        {/* Private Chats */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-300 mb-2 px-4 pt-2">Private Chats</h3>
          <div className="px-2 space-y-1">
            {privateChats.map((chat) => {
              const otherParticipantId = chat.participants.find(id => id !== user?.uid);
              const friend = friends.find(f => f.uid === otherParticipantId);

              return (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChat(chat.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    currentChat === chat.id
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-dark-700/50 text-gray-300'
                  }`}
                >
                  <div className="relative">
                    {friend?.profilePhoto ? (
                      <img
                        src={friend.profilePhoto}
                        alt={friend.displayName}
                        className="w-8 h-8 rounded-full border border-primary-500"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {friend?.displayName.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                    {friend?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-dark-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-semibold truncate">{friend?.displayName || 'Unknown'}</div>
                    <div className="text-xs opacity-75 truncate">
                      {chat.lastMessage?.content || 'No messages yet'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Friends List */}
          <h3 className="text-sm font-semibold text-gray-300 mb-2 px-4 pt-4">Friends</h3>
          <div className="px-2 space-y-1">
            {friends.map((friend) => (
              <div key={friend.uid} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-700/50 transition-colors">
                <div className="relative">
                  {friend.profilePhoto ? (
                    <img
                      src={friend.profilePhoto}
                      alt={friend.displayName}
                      className="w-8 h-8 rounded-full border border-primary-500"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {friend.displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-dark-800 rounded-full ${
                    friend.isOnline ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{friend.displayName}</div>
                  <div className="text-gray-400 text-xs">
                    {friend.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
                <button
                  onClick={() => startPrivateChat(friend.uid)}
                  className="text-primary-400 hover:text-primary-300 p-1"
                  title="Start private chat"
                >
                  💬
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
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-dark-800/50 border-b border-dark-700 p-4">
          <h1 className="text-2xl font-bold text-white">{getChatDisplayName()}</h1>
          <p className="text-gray-400 text-sm">
            {currentChat === 'global'
              ? 'Welcome to FC Messenger! Chat with other users.'
              : 'Private conversation - messages are secure.'
            }
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Welcome to FC Messenger!</h3>
              <p>Start chatting with other users. Be respectful and have fun!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-3 ${message.senderId === user.uid ? 'justify-end' : ''}`}>
                {message.senderId !== user.uid && (
                  <div className="flex-shrink-0">
                    {message.senderPhoto ? (
                      <img
                        src={message.senderPhoto}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full border border-dark-600"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {message.senderName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === user.uid
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-gray-200'
                }`}>
                  {message.senderId !== user.uid && (
                    <div className="text-xs text-gray-400 mb-1 font-semibold">
                      {message.senderName}
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
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
                        className="w-8 h-8 rounded-full border border-dark-600"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
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
        <div className="border-t border-dark-700 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
