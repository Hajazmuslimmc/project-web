'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

// Only use Firebase if it's configured
const isFirebaseAvailable = !!db;
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, addDoc, arrayUnion } from 'firebase/firestore';
import { Bell, UserPlus, MessageCircle, X, Check, UserCheck } from 'lucide-react';

interface Notification {
  id: string;
  userId: string;
  type: 'friend_request' | 'message' | 'system';
  title: string;
  message: string;
  senderId?: string;
  senderName?: string;
  senderPhoto?: string;
  isRead: boolean;
  createdAt: any;
  data?: any;
}

interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: any;
}

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || !isFirebaseAvailable) return;

    // Listen for notifications
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid)
    );

    const unsubscribeNotifications = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsData: Notification[] = [];
      snapshot.forEach((doc) => {
        notificationsData.push({ id: doc.id, ...doc.data() } as Notification);
      });

      // Sort by creation date (newest first)
      notificationsData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setNotifications(notificationsData);

      // Count unread notifications
      const unread = notificationsData.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    });

    // Listen for friend requests
    const friendRequestsQuery = query(
      collection(db, 'friendRequests'),
      where('receiverId', '==', user.uid),
      where('status', '==', 'pending')
    );

    const unsubscribeFriendRequests = onSnapshot(friendRequestsQuery, (snapshot) => {
      const requestsData: FriendRequest[] = [];
      snapshot.forEach((doc) => {
        requestsData.push({ id: doc.id, ...doc.data() } as FriendRequest);
      });
      setFriendRequests(requestsData);
    });

    return () => {
      unsubscribeNotifications();
      unsubscribeFriendRequests();
    };
  }, [user]);

  const handleAcceptFriendRequest = async (request: FriendRequest) => {
    if (!user || !isFirebaseAvailable) return;

    try {
      // Update friend request status
      await updateDoc(doc(db, 'friendRequests', request.id), {
        status: 'accepted'
      });

      // Add to friends list for both users
      const userRef = doc(db, 'users', user.uid);
      const senderRef = doc(db, 'users', request.senderId);

      await updateDoc(userRef, {
        friends: arrayUnion(request.senderId)
      });

      await updateDoc(senderRef, {
        friends: arrayUnion(user.uid)
      });

      // Create notification for sender
      await addDoc(collection(db, 'notifications'), {
        userId: request.senderId,
        type: 'friend_request',
        title: 'Friend Request Accepted',
        message: `${user.displayName || 'Someone'} accepted your friend request!`,
        senderId: user.uid,
        senderName: user.displayName,
        senderPhoto: user.profilePhoto,
        isRead: false,
        createdAt: new Date(),
        data: { accepted: true }
      });

      // Mark notification as read if it exists
      const notification = notifications.find(n =>
        n.type === 'friend_request' &&
        n.senderId === request.senderId &&
        !n.isRead
      );
      if (notification) {
        await updateDoc(doc(db, 'notifications', notification.id), {
          isRead: true
        });
      }

    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDeclineFriendRequest = async (request: FriendRequest) => {
    if (!user || !isFirebaseAvailable) return;

    try {
      // Update friend request status
      await updateDoc(doc(db, 'friendRequests', request.id), {
        status: 'declined'
      });

      // Mark notification as read if it exists
      const notification = notifications.find(n =>
        n.type === 'friend_request' &&
        n.senderId === request.senderId &&
        !n.isRead
      );
      if (notification) {
        await updateDoc(doc(db, 'notifications', notification.id), {
          isRead: true
        });
      }

    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!isFirebaseAvailable) return;
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        isRead: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const totalNotifications = notifications.length + friendRequests.length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-primary-400 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalNotifications > 9 ? '9+' : totalNotifications}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-dark-800 border border-primary-500/20 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-dark-700">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {/* Friend Requests */}
            {friendRequests.map((request) => (
              <div key={request.id} className="p-4 border-b border-dark-700 hover:bg-dark-700/50">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    {request.senderPhoto ? (
                      <img
                        src={request.senderPhoto}
                        alt={request.senderName}
                        className="w-10 h-10 rounded-full border border-primary-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {request.senderName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-dark-800 rounded-full flex items-center justify-center">
                      <UserPlus className="w-2 h-2 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">
                      Friend Request
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium">{request.senderName}</span> sent you a friend request
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {request.createdAt?.toDate()?.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleAcceptFriendRequest(request)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 px-3 rounded flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleDeclineFriendRequest(request)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1.5 px-3 rounded flex items-center justify-center space-x-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Other Notifications */}
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-dark-700 hover:bg-dark-700/50 cursor-pointer ${
                  !notification.isRead ? 'bg-primary-500/10 border-l-4 border-l-primary-500' : ''
                }`}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification.type === 'friend_request' && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {notification.type === 'message' && (
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {notification.type === 'system' && (
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">
                      {notification.title}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {notification.createdAt?.toDate()?.toLocaleDateString()}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {totalNotifications === 0 && (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No notifications yet</p>
                <p className="text-gray-500 text-sm">You'll see friend requests and updates here</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
