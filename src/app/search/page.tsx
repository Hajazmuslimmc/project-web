'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, User, Users, MessageCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  profilePhoto?: string;
  banner?: string;
  role: 'user' | 'mod' | 'admin';
  followers: string[];
  following: string[];
  friends: string[];
  createdAt: string;
}

export default function SearchPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
      return;
    }

    // Load recent searches from localStorage
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, [user, loading, router]);

  // Debounced search effect - faster response
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchUsers(searchQuery);
    }, 150); // Reduced to 150ms for faster response

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const searchUsers = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const usersRef = collection(db, 'users');

      // Optimized search: fetch fewer users initially for faster response
      // In a production app, you'd want to use Algolia or implement server-side search
      const q = query(usersRef, orderBy('displayName'), limit(50));
      const querySnapshot = await getDocs(q);

      const results: UserProfile[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserProfile;
        // Case-insensitive search that matches partial names
        if (userData.displayName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            userData.uid !== user?.uid) {
          results.push(userData);
        }
      });

      // Sort results by relevance (exact matches first, then prefix matches)
      results.sort((a, b) => {
        const aName = a.displayName.toLowerCase();
        const bName = b.displayName.toLowerCase();
        const term = searchTerm.toLowerCase();

        // Exact match gets highest priority
        if (aName === term) return -1;
        if (bName === term) return 1;

        // Prefix match gets second priority
        if (aName.startsWith(term) && !bName.startsWith(term)) return -1;
        if (bName.startsWith(term) && !aName.startsWith(term)) return 1;

        // Alphabetical order for the rest
        return aName.localeCompare(bName);
      });

      setSearchResults(results);

      // Save to recent searches
      const updatedRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers(searchQuery);
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    searchUsers(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Find Friends</h1>
          <p className="text-gray-400">Search for users to follow and connect with</p>
        </div>

        {/* Search Form */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg border border-primary-500/20 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by username (real-time)..."
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && searchResults.length === 0 && !isSearching && (
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg border border-primary-500/20 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Searches</h2>
              <button
                onClick={clearRecentSearches}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(search)}
                  className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full hover:bg-dark-600 transition-colors text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {isSearching ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Searching users...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Search Results ({searchResults.length})
            </h2>
            {searchResults.map((resultUser) => (
              <div key={resultUser.uid} className="bg-dark-800/50 backdrop-blur-sm rounded-lg border border-primary-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Profile Picture */}
                    <div className="relative">
                      {resultUser.profilePhoto ? (
                        <img
                          src={resultUser.profilePhoto}
                          alt={resultUser.displayName}
                          className="w-16 h-16 rounded-full border-2 border-primary-500 object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary-600 border-2 border-primary-500 flex items-center justify-center">
                          <span className="text-2xl text-white font-bold">
                            {resultUser.displayName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}

                      {/* Role Badge */}
                      {resultUser.role !== 'user' && (
                        <div className={`absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-bold ${
                          resultUser.role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {resultUser.role.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <Link href={`/profile/${resultUser.displayName}`}>
                        <h3 className="text-xl font-semibold text-white hover:text-primary-400 transition-colors">
                          {resultUser.displayName}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {resultUser.followers?.length || 0} followers
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {resultUser.following?.length || 0} following
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/profile/${resultUser.displayName}`}>
                      <button className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors">
                        View Profile
                      </button>
                    </Link>
                    <Link href={`/fc-messenger?chat=${resultUser.uid}`}>
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery && !isSearching ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No users found</h3>
            <p className="text-gray-500">
              Try searching with a different username or check your spelling.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Search for users</h3>
            <p className="text-gray-500">
              Enter a username above to find and connect with other users.
            </p>
          </div>
        )}

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
