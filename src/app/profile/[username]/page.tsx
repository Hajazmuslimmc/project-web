'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, MessageCircle, Users, Calendar, MapPin, Link as LinkIcon, Heart, Image, Video, FileText } from 'lucide-react';

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
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts');

  useEffect(() => {
    if (params.username) {
      loadUserProfile();
      loadUserPosts();
    }
  }, [params.username]);

  const loadUserProfile = () => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = params.username.toLowerCase();

    if (allUsers[userKey]) {
      const profile = allUsers[userKey];
      setProfileUser(profile);

      // Check if current user is following this user
      if (user && profile.followers && profile.followers.includes(user.uid)) {
        setIsFollowing(true);
      }
    } else {
      // User not found
      router.push('/dashboard');
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

  const handleFollow = () => {
    if (!user || !profileUser) return;

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const currentUserKey = user.displayName?.toLowerCase();
    const profileUserKey = profileUser.displayName.toLowerCase();

    if (isFollowing) {
      // Unfollow
      if (allUsers[profileUserKey]?.followers) {
        allUsers[profileUserKey].followers = allUsers[profileUserKey].followers.filter((id: string) => id !== user.uid);
      }
      if (allUsers[currentUserKey]?.following) {
        allUsers[currentUserKey].following = allUsers[currentUserKey].following.filter((name: string) => name !== profileUser.displayName);
      }
    } else {
      // Follow
      if (!allUsers[profileUserKey].followers) {
        allUsers[profileUserKey].followers = [];
      }
      if (!allUsers[currentUserKey].following) {
        allUsers[currentUserKey].following = [];
      }

      allUsers[profileUserKey].followers.push(user.uid);
      allUsers[currentUserKey].following.push(profileUser.displayName);
    }

    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    setIsFollowing(!isFollowing);

    // Update profile user data
    setProfileUser(allUsers[profileUserKey]);
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

                {/* Follow Button */}
                {user && !isOwnProfile && (
                  <button
                    onClick={handleFollow}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      isFollowing
                        ? 'bg-dark-700 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white'
                        : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
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
