'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithMicrosoft: () => Promise<void>;
  signInWithCustom: (username: string) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored credentials and auto-login
    const storedCredentials = localStorage.getItem('customCredentials');
    if (storedCredentials) {
      try {
        const { username, password } = JSON.parse(storedCredentials);
        signInWithEmailAndPassword(auth, `${username}@fc`, password)
          .then(() => {
            // Auto-login successful
          })
          .catch((error) => {
            console.error('Auto-login failed:', error);
            localStorage.removeItem('customCredentials');
          });
      } catch (error) {
        console.error('Error parsing stored credentials:', error);
        localStorage.removeItem('customCredentials');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithMicrosoft = async () => {
    const provider = new OAuthProvider('microsoft.com');
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Microsoft:', error);
    }
  };

  const signInWithCustom = async (username: string) => {
    const email = `${username}@fc`;
    // Generate a consistent password based on username
    const password = `fc_${username}_secure_pass_2024`;

    try {
      // Try to sign in first (if account already exists)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Store credentials for future auto-login
        localStorage.setItem('customCredentials', JSON.stringify({ username, password }));
        return;
      } catch (signInError) {
        // Account doesn't exist, create it
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update display name
        await updateProfile(userCredential.user, {
          displayName: username
        });
        // Store credentials for future auto-login
        localStorage.setItem('customCredentials', JSON.stringify({ username, password }));
      }
    } catch (error) {
      console.error('Error with custom authentication:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('customCredentials');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      // If Firebase sign out fails, still clear local storage
      localStorage.removeItem('customCredentials');
      setUser(null);
    }
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
