import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Auth providers
export const googleProvider = new GoogleAuthProvider()

// Types
export interface AppData {
  id: string
  name: string
  description: string
  longDescription: string
  category: string
  platforms: string[]
  developer: string
  developerEmail: string
  price: string
  downloadUrl: string
  websiteUrl?: string
  githubUrl?: string
  iconUrl: string
  screenshots: string[]
  version: string
  rating: number
  totalRatings: number
  downloadCount: number
  featured: boolean
  published: boolean
  approved: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  tags: string[]
}

export interface UserProfile {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: 'user' | 'developer' | 'admin'
  createdAt: Timestamp
}

export interface Review {
  id: string
  appId: string
  userId: string
  userName: string
  userPhotoURL?: string
  rating: number
  comment: string
  createdAt: Timestamp
}

// Collections references
export const appsRef = collection(db, 'apps')
export const usersRef = collection(db, 'users')
export const reviewsRef = collection(db, 'reviews')

// Helper functions
export const createApp = async (appData: Omit<AppData, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await addDoc(appsRef, {
    ...appData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
}

export const createUserProfile = async (user: User, additionalData?: { role: 'user' | 'developer' | 'admin' }) => {
  const userDoc = doc(usersRef, user.uid)
  const userProfile: UserProfile = {
    id: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'User',
    photoURL: user.photoURL || undefined,
    role: additionalData?.role || 'user',
    createdAt: Timestamp.now()
  }
  await setDoc(userDoc, userProfile)
  return userProfile
}

export const getUserProfile = async (userId: string) => {
  const userDoc = await getDoc(doc(usersRef, userId))
  return userDoc.exists() ? userDoc.data() as UserProfile : null
}

export const updateApp = async (appId: string, updates: Partial<AppData>) => {
  const appRef = doc(appsRef, appId)
  return await updateDoc(appRef, {
    ...updates,
    updatedAt: Timestamp.now()
  })
}

export const deleteApp = async (appId: string) => {
  return await deleteDoc(doc(appsRef, appId))
}

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}

export default app
