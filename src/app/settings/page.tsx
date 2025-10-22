'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [banner, setBanner] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      setDisplayName(user.displayName || '');
      setUsername(user.displayName || ''); // Username is stored as displayName
      setProfilePhoto(user.profilePhoto || '');
      // For now, banner would be stored in user data, but we'll add it later
    }
  }, [user, loading, router]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Profile photo must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Banner must be less than 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setBanner(e.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!displayName.trim()) {
      setError('Display name cannot be empty');
      return;
    }

    if (displayName.length < 2) {
      setError('Display name must be at least 2 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      // Update user data in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
      const userKey = user?.displayName?.toLowerCase();

      if (userKey && existingUsers[userKey]) {
        // Check if new username is taken (if changed)
        const newUserKey = displayName.toLowerCase();
        if (newUserKey !== userKey && existingUsers[newUserKey]) {
          throw new Error('This username is already taken');
        }

        // Update user data
        existingUsers[userKey] = {
          ...existingUsers[userKey],
          displayName: displayName,
          profilePhoto: profilePhoto || undefined,
          banner: banner || undefined,
        };

        // If username changed, move to new key
        if (newUserKey !== userKey) {
          existingUsers[newUserKey] = existingUsers[userKey];
          delete existingUsers[userKey];
        }

        localStorage.setItem('allUsers', JSON.stringify(existingUsers));

        // Update current user session
        const updatedUser = existingUsers[newUserKey];
        localStorage.setItem('simpleUser', JSON.stringify(updatedUser));

        setSuccess('Settings updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Customize your profile and preferences</p>
        </div>

        {/* Banner Section */}
        <div className="bg-dark-800/50 rounded-lg p-6 mb-6 border border-dark-700">
          <h2 className="text-xl font-semibold text-white mb-4">Profile Banner</h2>
          <div className="space-y-4">
            {banner && (
              <div className="relative">
                <img
                  src={banner}
                  alt="Profile banner"
                  className="w-full h-32 object-cover rounded-lg border border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setBanner('')}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            )}
            <div>
              <input
                id="banner"
                name="banner"
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700"
              />
              <p className="text-xs text-gray-400 mt-1">
                Max file size: 10MB. Recommended size: 1200x300px
              </p>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-dark-800/50 rounded-lg p-6 mb-6 border border-dark-700">
          <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center space-x-4">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-2xl text-gray-300">👤</span>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-600 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Max file size: 5MB. Square images work best
                  </p>
                </div>
                {profilePhoto && (
                  <button
                    type="button"
                    onClick={() => setProfilePhoto('')}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Your display name"
              />
              <p className="text-xs text-gray-400 mt-1">
                This is how you'll appear to other users
              </p>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Your username"
              />
              <p className="text-xs text-gray-400 mt-1">
                Used for signing in. Must be unique
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-md p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 text-sm text-center bg-green-900/20 border border-green-800 rounded-md p-3">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Settings...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link href="/" className="text-primary-400 hover:text-primary-300 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
