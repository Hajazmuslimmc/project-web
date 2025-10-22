import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if all required Firebase environment variables are configured
const isFirebaseConfigured = () => {
  const requiredVars = [
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  ];

  return requiredVars.every(v => v && v !== 'your_api_key_here' && v !== 'your_project_id');
};

let app;
let auth;
let db;

if (isFirebaseConfigured()) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // Firebase not configured - export dummies to prevent app crashes
  app = null;
  auth = null;
  db = null;
  console.warn('Firebase not configured. Please add your Firebase credentials to Vercel environment variables.');
}

export { app, auth, db };
