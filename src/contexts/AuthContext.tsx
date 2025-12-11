'use client'
import { createContext } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}