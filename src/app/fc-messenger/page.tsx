'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'system';
}

interface User {
  uid: string;
  displayName: string;
  profilePhoto?: string;
  isOnline: boolean;
  lastSeen: number;
}

export default function FCMessengerPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
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
      // Load existing messages
      loadMessages();
      // Load online users
      loadOnlineUsers();
      // Mark user as online
      markUserOnline();
      // Set up periodic updates
      const interval = setInterval(() => {
        loadMessages();
        loadOnlineUsers();
        markUserOnline();
      }, 2000); // Update every 2 seconds

      return () => clearInterval(interval);
    }
  }, [user, loading, router]);

  const loadMessages = () => {
    const storedMessages = localStorage.getItem('fcMessages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages.slice(-100)); // Keep last 100 messages
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
  };

  const loadOnlineUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const currentTime = Date.now();
    const users: User[] = [];

    Object.values(allUsers).forEach((userData: any) => {
      const isOnline = (currentTime - (userData.lastOnline || 0)) < 30000; // 30 seconds
      users.push({
        uid: userData.uid,
        displayName: userData.displayName,
        profilePhoto: userData.profilePhoto,
        isOnline,
        lastSeen: userData.lastOnline || 0,
      });
    });

    setOnlineUsers(users);
  };

  const markUserOnline = () => {
    if (!user) return;

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = user.displayName?.toLowerCase();

    if (userKey && allUsers[userKey]) {
      allUsers[userKey].lastOnline = Date.now();
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }
  };

  const sendMessage = () => {
    if (!user || !newMessage.trim()) return;

    const content = newMessage.trim();

    // Check for admin commands
    if (content.startsWith('/')) {
      handleAdminCommand(content);
      setNewMessage('');
      setIsTyping(false);
      return;
    }

    const message: Message = {
      id: `msg_${Date.now()}_${Math.random()}`,
      senderId: user.uid,
      senderName: user.displayName || 'Anonymous',
      senderPhoto: user.profilePhoto,
      content: content,
      timestamp: Date.now(),
      type: 'text',
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('fcMessages', JSON.stringify(updatedMessages));

    setNewMessage('');
    setIsTyping(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex">
      {/* Sidebar - Online Users */}
      <div className="w-64 bg-dark-800/50 border-r border-dark-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white mb-2">FC Messenger</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{onlineUsers.filter(u => u.isOnline).length} Online</span>
          </div>
        </div>

        {/* Online Users List */}
        <div className="flex-1 overflow-y-auto p-2">
          <h3 className="text-sm font-semibold text-gray-300 mb-2 px-2">Online Users</h3>
          {onlineUsers.filter(u => u.isOnline).map((onlineUser) => (
            <div key={onlineUser.uid} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-700/50 transition-colors">
              <div className="relative">
                {onlineUser.profilePhoto ? (
                  <img
                    src={onlineUser.profilePhoto}
                    alt={onlineUser.displayName}
                    className="w-8 h-8 rounded-full border border-green-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center border border-green-500">
                    <span className="text-xs text-white">{onlineUser.displayName.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-dark-800 rounded-full"></div>
              </div>
              <span className="text-white text-sm truncate">{onlineUser.displayName}</span>
            </div>
          ))}

          <h3 className="text-sm font-semibold text-gray-300 mb-2 px-2 mt-4">Offline Users</h3>
          {onlineUsers.filter(u => !u.isOnline).map((offlineUser) => (
            <div key={offlineUser.uid} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-700/50 transition-colors opacity-60">
              <div className="relative">
                {offlineUser.profilePhoto ? (
                  <img
                    src={offlineUser.profilePhoto}
                    alt={offlineUser.displayName}
                    className="w-8 h-8 rounded-full border border-blue-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center border border-blue-500">
                    <span className="text-xs text-white">{offlineUser.displayName.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-dark-800 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm truncate">{offlineUser.displayName}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-dark-700">
          <Link href="/" className="text-primary-400 hover:text-primary-300 underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-dark-800/50 border-b border-dark-700 p-4">
          <h1 className="text-2xl font-bold text-white"># General Chat</h1>
          <p className="text-gray-400 text-sm">Welcome to FC Messenger! Chat with other users.</p>
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
