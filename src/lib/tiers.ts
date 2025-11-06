import { db } from './firebase'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore'

export interface Player {
  id: string
  name: string
  tier: number
  gameMode: string
  verified: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Collection reference
const tiersCollection = collection(db, 'tiers')

// Get all players
export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const q = query(tiersCollection, orderBy('tier', 'asc'), orderBy('name', 'asc'))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Player[]
  } catch (error) {
    console.error('Error getting players:', error)
    return []
  }
}

// Get players by game mode
export const getPlayersByGameMode = async (gameMode: string): Promise<Player[]> => {
  try {
    const q = query(
      tiersCollection,
      where('gameMode', '==', gameMode),
      orderBy('tier', 'asc'),
      orderBy('name', 'asc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Player[]
  } catch (error) {
    console.error('Error getting players by game mode:', error)
    return []
  }
}

// Add new player
export const addPlayer = async (playerData: Omit<Player, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const docData = {
      ...playerData,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const docRef = await addDoc(tiersCollection, docData)
    return docRef.id
  } catch (error) {
    console.error('Error adding player:', error)
    return null
  }
}

// Update player
export const updatePlayer = async (id: string, updates: Partial<Omit<Player, 'id' | 'createdAt'>>): Promise<boolean> => {
  try {
    const docRef = doc(tiersCollection, id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    })
    return true
  } catch (error) {
    console.error('Error updating player:', error)
    return false
  }
}

// Delete player
export const deletePlayer = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(tiersCollection, id))
    return true
  } catch (error) {
    console.error('Error deleting player:', error)
    return false
  }
}

// Initialize with sample data (only run once)
export const initializeSampleData = async () => {
  try {
    const existingPlayers = await getAllPlayers()

    if (existingPlayers.length === 0) {
      const samplePlayers = [
        { name: 'Marlow', tier: 1, gameMode: 'bedwars', verified: true },
        { name: 'Lurrn', tier: 1, gameMode: 'skywars', verified: true },
        { name: 'PlayerX', tier: 1, gameMode: 'duels', verified: true },
        { name: 'ProGamer', tier: 2, gameMode: 'bedwars', verified: true },
        { name: 'ElitePlayer', tier: 2, gameMode: 'skywars', verified: true },
        { name: 'SkillMaster', tier: 2, gameMode: 'duels', verified: true },
        { name: 'Competitor', tier: 3, gameMode: 'bedwars', verified: true },
        { name: 'Challenger', tier: 3, gameMode: 'skywars', verified: true },
        { name: 'Warrior', tier: 3, gameMode: 'duels', verified: true },
        { name: 'RisingStar', tier: 4, gameMode: 'bedwars', verified: true },
        { name: 'Ambitious', tier: 4, gameMode: 'skywars', verified: true },
        { name: 'Determined', tier: 4, gameMode: 'duels', verified: true },
        { name: 'Newbie', tier: 5, gameMode: 'bedwars', verified: true },
        { name: 'Beginner', tier: 5, gameMode: 'skywars', verified: true },
        { name: 'Learner', tier: 5, gameMode: 'duels', verified: true },
      ]

      for (const player of samplePlayers) {
        await addPlayer(player)
      }

      console.log('Sample data initialized successfully')
    }
  } catch (error) {
    console.error('Error initializing sample data:', error)
  }
}
