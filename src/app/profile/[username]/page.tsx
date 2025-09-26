'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, MessageCircle, Users, Calendar, MapPin, Link as LinkIcon, Heart, Image, Video, FileText, UserPlus, UserCheck, UserMinus } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  media?: string;
  mediaType?: 'image' | 'video' | 'link';
  timestamp: number;
  likes: string[];
}

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  profilePhoto?: string;
  banner?: string;
  role: 'user' | 'mod' | 'admin';
  createdAt: string;
  followers: string[];
  following: string[];
  friends: string[];
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [friendshipStatus, setFriendshipStatus] = useState<'none' | 'friends' | 'pending_sent' | 'pending_received'>('none');
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts');

  useEffect(() => {
    if (params.username) {
      loadUserProfile();
      loadUserPosts();
    }
  }, [params.username]);

  const loadUserProfile = async () => {
    try {
      // First try to find user by displayName
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('displayName', '==', params.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const profile = userDoc.data() as UserProfile;
        setProfileUser(profile);

        // Check friendship status
        if (user) {
          await checkFriendshipStatus(user.uid, profile.uid);
        }
      } else {
        // User not found
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      router.push('/dashboard');
    }
  };

  const checkFriendshipStatus = async (currentUserId: string, profileUserId: string) => {
    try {
      // Check if they are already friends
      if (profileUser?.friends?.includes(currentUserId)) {
        setFriendshipStatus('friends');
        return;
      }

      // Check for pending friend requests
      const sentRequestsQuery = query(
        collection(db, 'friendRequests'),
        where('senderId', '==', currentUserId),
        where('receiverId', '==', profileUserId),
        where('status', '==', 'pending')
      );

      const receivedRequestsQuery = query(
        collection(db, 'friendRequests'),
        where('senderId', '==', profileUserId),
        where('receiverId', '==', currentUserId),
        where('status', '==', 'pending')
      );

      const [sentSnapshot, receivedSnapshot] = await Promise.all([
        getDocs(sentRequestsQuery),
        getDocs(receivedRequestsQuery)
      ]);

      if (!sentSnapshot.empty) {
        setFriendshipStatus('pending_sent');
      } else if (!receivedSnapshot.empty) {
        setFriendshipStatus('pending_received');
      } else {
        setFriendshipStatus('none');
      }
    } catch (error) {
      console.error('Error checking friendship status:', error);
      setFriendshipStatus('none');
    }
  };

  const loadUserPosts = () => {
    const storedPosts = localStorage.getItem('socialPosts');
    if (storedPosts) {
      try {
        const allPosts = JSON.parse(storedPosts);
        const userPosts = allPosts.filter((post: Post) => post.authorName.toLowerCase() === params.username.toLowerCase());
        setUserPosts(userPosts.sort((a: Post, b: Post) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error('Error loading user posts:', error);
      }
    }
  };

  const handleSendFriendRequest = async () => {
    if (!user || !profileUser) return;

    try {
      // Create friend request
      await addDoc(collection(db, 'friendRequests'), {
        senderId: user.uid,
        senderName: user.displayName,
        senderPhoto: user.profilePhoto,
        receiverId: profileUser.uid,
        receiverName: profileUser.displayName,
        status: 'pending',
        createdAt: new Date(),
      });

      // Create notification for receiver
      await addDoc(collection(db, 'notifications'), {
        userId: profileUser.uid,
        type: 'friend_request',
        title: 'New Friend Request',
        message: `${user.displayName} sent you a friend request`,
        senderId: user.uid,
        senderName: user.displayName,
        senderPhoto: user.profilePhoto,
        isRead: false,
        createdAt: new Date(),
      });

      setFriendshipStatus('pending_sent');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleCancelFriendRequest = async () => {
    if (!user || !profileUser) return;

    try {
      // Find and delete the friend request
      const requestsQuery = query(
        collection(db, 'friendRequests'),
        where('senderId', '==', user.uid),
        where('receiverId', '==', profileUser.uid),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(requestsQuery);
      snapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { status: 'cancelled' });
      });

      setFriendshipStatus('none');
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    }
  };

  const handleRemoveFriend = async () => {
    if (!user || !profileUser) return;

    try {
      // Remove from friends list for both users
      const userRef = doc(db, 'users', user.uid);
      const profileUserRef = doc(db, 'users', profileUser.uid);

      await updateDoc(userRef, {
        friends: arrayRemove(profileUser.uid)
      });

      await updateDoc(profileUserRef, {
        friends: arrayRemove(user.uid)
      });

      setFriendshipStatus('none');
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getMediaPosts = () => {
    return userPosts.filter(post => post.media);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!profileUser) {
    return null; // Will redirect
  }

  const isOwnProfile = user ? user.displayName === profileUser.displayName : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Profile Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary-600 to-purple-600">
        {profileUser.banner && (
          <img
            src={profileUser.banner}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Profile Info */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg border border-primary-500/20 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Profile Picture */}
            <div className="relative">
              {profileUser.profilePhoto ? (
                <img
                  src={profileUser.profilePhoto}
                  alt={profileUser.displayName}
                  className="w-32 h-32 rounded-full border-4 border-primary-500 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary-600 border-4 border-primary-500 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">
                    {profileUser.displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Role Badge */}
              {profileUser.role !== 'user' && (
                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${
                  profileUser.role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {profileUser.role.toUpperCase()}
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">{profileUser.displayName}</h1>
                  <p className="text-gray-400">@{profileUser.displayName.toLowerCase()}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(profileUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Friend Request Buttons */}
                {user && !isOwnProfile && (
                  <div className="flex gap-2">
                    {friendshipStatus === 'none' && (
                      <button
                        onClick={handleSendFriendRequest}
                        className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 font-semibold"
                      >
                        <UserPlus className="w-4 h-4" />
                        Add Friend
                      </button>
                    )}

                    {friendshipStatus === 'pending_sent' && (
                      <button
                        onClick={handleCancelFriendRequest}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300 flex items-center gap-2 font-semibold"
                      >
                        <UserMinus className="w-4 h-4" />
                        Cancel Request
                      </button>
                    )}

                    {friendshipStatus === 'pending_received' && (
                      <div className="text-sm text-gray-400 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Friend request pending
                      </div>
                    )}

                    {friendshipStatus === 'friends' && (
                      <div className="flex gap-2">
                        <Link href={`/fc-messenger?chat=${profileUser.uid}`}>
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Message
                          </button>
                        </Link>
                        <button
                          onClick={handleRemoveFriend}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <UserMinus className="w-4 h-4" />
                          Unfriend
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {isOwnProfile && (
                  <Link href="/settings">
                    <button className="btn-secondary flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </Link>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{userPosts.length}</div>
                  <div className="text-gray-400 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{profileUser.followers?.length || 0}</div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{profileUser.following?.length || 0}</div>
                  <div className="text-gray-400 text-sm">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-dark-800/50 rounded-lg border border-primary-500/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-dark-700">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'posts'
                  ? 'text-white border-b-2 border-primary-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Posts ({userPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'media'
                  ? 'text-white border-b-2 border-primary-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Image className="w-5 h-5 inline mr-2" />
              Media ({getMediaPosts().length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' ? (
              <div className="space-y-6">
                {userPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts yet</h3>
                    <p className="text-gray-500">
                      {isOwnProfile ? 'Share your first post!' : `${profileUser.displayName} hasn't posted anything yet.`}
                    </p>
                  </div>
                ) : (
                  userPosts.map((post) => (
                    <div key={post.id} className="bg-dark-700/50 rounded-lg p-6 border border-dark-600">
                      {/* Post Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0">
                          {post.authorPhoto ? (
                            <img
                              src={post.authorPhoto}
                              alt={post.authorName}
                              className="w-10 h-10 rounded-full border border-primary-500"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center border border-primary-500">
                              <span className="text-white text-sm font-semibold">
                                {post.authorName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{post.authorName}</h3>
                          <p className="text-gray-400 text-sm">{formatTime(post.timestamp)}</p>
                        </div>
                      </div>

                      {/* Post Content */}
                      {post.content && (
                        <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>
                      )}

                      {/* Post Media */}
                      {post.media && (
                        <div className="mb-4">
                          {post.mediaType === 'image' && (
                            <img
                              src={post.media}
                              alt="Post content"
                              className="max-w-full rounded-lg border border-dark-600"
                            />
                          )}
                          {post.mediaType === 'video' && (
                            <video
                              src={post.media}
                              controls
                              className="max-w-full rounded-lg border border-dark-600"
                            />
                          )}
                          {post.mediaType === 'link' && (
                            <a
                              href={post.media}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 p-3 bg-dark-600 rounded-lg border border-primary-500 hover:bg-dark-500 transition-colors"
                            >
                              <LinkIcon className="w-4 h-4 text-primary-400" />
                              <span className="text-primary-300 truncate">{post.media}</span>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-6 pt-4 border-t border-dark-600">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{post.likes.length}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getMediaPosts().length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No media yet</h3>
                    <p className="text-gray-500">
                      {isOwnProfile ? 'Share your first photo or video!' : `${profileUser.displayName} hasn't shared any media yet.`}
                    </p>
                  </div>
                ) : (
                  getMediaPosts().map((post) => (
                    <div key={post.id} className="bg-dark-700/50 rounded-lg overflow-hidden border border-dark-600">
                      {post.media && (
                        <div className="aspect-square">
                          {post.mediaType === 'image' && (
                            <img
                              src={post.media}
                              alt="Post media"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {post.mediaType === 'video' && (
                            <video
                              src={post.media}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}

                      <div className="p-3">
                        <p className="text-gray-200 text-sm line-clamp-2">{post.content}</p>
                        <p className="text-gray-400 text-xs mt-1">{formatTime(post.timestamp)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link href="/dashboard" className="text-primary-400 hover:text-primary-300 underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
