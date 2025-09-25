'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  media?: string;
  mediaType?: 'image' | 'video' | 'link';
  timestamp: number;
  likes: string[]; // Array of user IDs who liked
}

export default function SocialFeedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'link'>('image');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    loadPosts();
    // Set up periodic updates
    const interval = setInterval(loadPosts, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadPosts = () => {
    const storedPosts = localStorage.getItem('socialPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        // Sort by timestamp (newest first)
        setPosts(parsedPosts.sort((a: Post, b: Post) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createPost = () => {
    if (!user || (!newPostContent.trim() && !newPostMedia)) return;

    setIsPosting(true);

    const post: Post = {
      id: `post_${Date.now()}_${Math.random()}`,
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous',
      authorPhoto: user.profilePhoto,
      content: newPostContent.trim(),
      media: newPostMedia || undefined,
      mediaType: newPostMedia ? mediaType : undefined,
      timestamp: Date.now(),
      likes: [],
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));

    // Reset form
    setNewPostContent('');
    setNewPostMedia('');
    setIsPosting(false);
  };

  const likePost = (postId: string) => {
    if (!user) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const likes = post.likes.includes(user.uid)
          ? post.likes.filter(id => id !== user.uid)
          : [...post.likes, user.uid];
        return { ...post, likes };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));
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

  const deletePost = (postId: string) => {
    if (!user || (user.role !== 'admin' && user.role !== 'mod')) return;

    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));
    alert('Post deleted successfully');
  };

  const banUser = (userId: string) => {
    if (!user || user.role !== 'admin') return;

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userToBan = Object.values(allUsers).find((u: any) => u.uid === userId) as any;

    if (userToBan) {
      userToBan.isBanned = true;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      alert(`${userToBan.displayName} has been banned`);
    }
  };

  const handleFollow = (userId: string, username: string) => {
    if (!user) return;

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const currentUserKey = user.displayName?.toLowerCase();
    const targetUserKey = username.toLowerCase();

    if (isUserFollowing(userId)) {
      // Unfollow
      if (allUsers[targetUserKey]?.followers) {
        allUsers[targetUserKey].followers = allUsers[targetUserKey].followers.filter((id: string) => id !== user.uid);
      }
      if (allUsers[currentUserKey]?.following) {
        allUsers[currentUserKey].following = allUsers[currentUserKey].following.filter((name: string) => name !== username);
      }
    } else {
      // Follow
      if (!allUsers[targetUserKey].followers) {
        allUsers[targetUserKey].followers = [];
      }
      if (!allUsers[currentUserKey].following) {
        allUsers[currentUserKey].following = [];
      }

      allUsers[targetUserKey].followers.push(user.uid);
      allUsers[currentUserKey].following.push(username);
    }

    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  };

  const isUserFollowing = (userId: string) => {
    if (!user) return false;
    return user.following?.some(name => {
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
      const userData = Object.values(allUsers).find((u: any) => u.uid === userId) as any;
      return userData?.displayName === name;
    }) || false;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">FC Social Feed</h1>
          <p className="text-gray-400">
            {user ? 'Share your thoughts, photos, and experiences with the community' : 'View the community feed'}
          </p>
        </div>

        {/* Create Post */}
        {user && (
          <div className="bg-dark-800/50 rounded-lg p-6 mb-8 border border-dark-700">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full border-2 border-primary-500"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center border-2 border-primary-500">
                    <span className="text-white font-semibold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  rows={3}
                />

                {/* Media Upload */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <span className="text-gray-400">📷</span>
                      <span className="text-sm text-gray-400 hover:text-white">Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <span className="text-gray-400">🎥</span>
                      <span className="text-sm text-gray-400 hover:text-white">Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          setMediaType('video');
                          handleMediaUpload(e as any);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex-1">
                    <input
                      type="url"
                      placeholder="Share a link..."
                      onChange={(e) => {
                        if (isValidUrl(e.target.value)) {
                          setNewPostMedia(e.target.value);
                          setMediaType('link');
                        }
                      }}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                </div>

                {/* Media Preview */}
                {newPostMedia && (
                  <div className="relative">
                    {mediaType === 'image' && (
                      <img
                        src={newPostMedia}
                        alt="Post preview"
                        className="max-w-full h-48 object-cover rounded-lg border border-primary-500"
                      />
                    )}
                    {mediaType === 'video' && (
                      <video
                        src={newPostMedia}
                        controls
                        className="max-w-full h-48 rounded-lg border border-primary-500"
                      />
                    )}
                    {mediaType === 'link' && (
                      <div className="p-3 bg-dark-700 rounded-lg border border-primary-500">
                        <div className="flex items-center space-x-2">
                          <span className="text-primary-400">🔗</span>
                          <span className="text-white text-sm truncate">{newPostMedia}</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setNewPostMedia('')}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={createPost}
                    disabled={isPosting || (!newPostContent.trim() && !newPostMedia)}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isPosting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">No posts yet!</h3>
              <p>Be the first to share something with the community.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-dark-800/50 rounded-lg p-6 border border-dark-700">
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-4">
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
                        className="flex items-center space-x-2 p-3 bg-dark-700 rounded-lg border border-primary-500 hover:bg-dark-600 transition-colors"
                      >
                        <span className="text-primary-400">🔗</span>
                        <span className="text-primary-300 truncate">{post.media}</span>
                      </a>
                    )}
                  </div>
                )}

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-dark-600">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => likePost(post.id)}
                            className={`flex items-center space-x-2 transition-colors ${
                              user && post.likes.includes(user.uid)
                                ? 'text-red-400 hover:text-red-300'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <span>{user && post.likes.includes(user.uid) ? '❤️' : '🤍'}</span>
                            <span className="text-sm">{post.likes.length}</span>
                          </button>

                          {/* Follow Button */}
                          {user && user.uid !== post.authorId && (
                            <button
                              onClick={() => handleFollow(post.authorId, post.authorName)}
                              className={`text-sm px-3 py-1 rounded transition-colors ${
                                isUserFollowing(post.authorId)
                                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                              }`}
                            >
                              {isUserFollowing(post.authorId) ? 'Following' : 'Follow'}
                            </button>
                          )}
                        </div>

                        {/* Admin/Mod Actions */}
                        {user && (user.role === 'admin' || user.role === 'mod') && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => deletePost(post.id)}
                              className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-900/20 transition-colors"
                              title="Delete post (Admin/Mod only)"
                            >
                              🗑️ Delete
                            </button>
                            {user.role === 'admin' && (
                              <button
                                onClick={() => banUser(post.authorId)}
                                className="text-orange-400 hover:text-orange-300 text-sm px-2 py-1 rounded hover:bg-orange-900/20 transition-colors"
                                title="Ban user (Admin only)"
                              >
                                🚫 Ban
                              </button>
                            )}
                          </div>
                        )}
                      </div>
              </div>
            ))
          )}
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary-400 hover:text-primary-300 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
