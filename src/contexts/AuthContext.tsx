'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Simple user interface for our custom authentication
interface SimpleUser {
  uid: string;
  displayName: string;
  email: string;
  profilePhoto?: string;
  banner?: string;
  role: 'user' | 'mod' | 'admin';
  isBanned?: boolean;
  followers: string[];
  following: string[];
  createdAt: string;
}

interface AuthContextType {
  user: SimpleUser | null;
  loading: boolean;
  signInWithMicrosoft: () => Promise<void>;
  signInWithCustom: (username: string, password: string, profilePhoto?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data and auto-login
    const storedUser = localStorage.getItem('simpleUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('simpleUser');
      }
    }
    setLoading(false);
  }, []);

  const signInWithMicrosoft = async () => {
    // For now, just show a message that Microsoft auth is not implemented
    alert('Microsoft authentication is not yet implemented. Please use username sign-in.');
  };

  const signInWithCustom = async (username: string, password: string, profilePhoto?: string) => {
    if (!username.trim()) {
      throw new Error('Please enter a username');
    }

    if (!password.trim()) {
      throw new Error('Please enter a password');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const userKey = username.toLowerCase();

    if (existingUsers[userKey]) {
      // User exists, check password
      const userData = existingUsers[userKey];
      if (userData.password !== password) {
        throw new Error('Incorrect password');
      }
      // Sign them in
      setUser(userData);
      localStorage.setItem('simpleUser', JSON.stringify(userData));
      return;
    }

    // Create new user (first user becomes admin, others are regular users)
    const isFirstUser = Object.keys(existingUsers).length === 0;

    const newUser: SimpleUser & { password: string } = {
      uid: `user_${username}_${Date.now()}`,
      displayName: username,
      email: `${username}@fc`,
      password: password,
      profilePhoto: profilePhoto || undefined,
      role: isFirstUser ? 'admin' : 'user', // First user is admin
      isBanned: false,
      followers: [],
      following: [],
      createdAt: new Date().toISOString(),
    };

    // Store user in the "database" (localStorage)
    existingUsers[userKey] = newUser;
    localStorage.setItem('allUsers', JSON.stringify(existingUsers));

    // Sign in the user
    setUser(newUser);
    localStorage.setItem('simpleUser', JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('simpleUser');
  };

  const value = {
    user,
    loading,
    signInWithMicrosoft,
    signInWithCustom,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
