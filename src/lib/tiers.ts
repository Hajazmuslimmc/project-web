import { supabase, Player } from './supabase'

export type { Player }

// Get all players
export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const { data, error } = await supabase
      .from('tiers')
      .select('*')
      .order('tier', { ascending: true })
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting players:', error)
    return []
  }
}

// Get players by game mode
export const getPlayersByGameMode = async (gameMode: string): Promise<Player[]> => {
  try {
    const { data, error } = await supabase
      .from('tiers')
      .select('*')
      .eq('game_mode', gameMode)
      .order('tier', { ascending: true })
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error getting players by game mode:', error)
    return []
  }
}

// Add new player
export const addPlayer = async (playerData: Omit<Player, 'id' | 'created_at' | 'updated_at'>): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('tiers')
      .insert([playerData])
      .select()
      .single()

    if (error) throw error
    return data?.id || null
  } catch (error) {
    console.error('Error adding player:', error)
    return null
  }
}

// Update player
export const updatePlayer = async (id: string, updates: Partial<Omit<Player, 'id' | 'created_at'>>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tiers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating player:', error)
    return false
  }
}

// Delete player
export const deletePlayer = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tiers')
      .delete()
      .eq('id', id)

    if (error) throw error
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
        { name: 'Marlow', tier: 1, game_mode: 'bedwars', verified: true },
        { name: 'Lurrn', tier: 1, game_mode: 'skywars', verified: true },
        { name: 'PlayerX', tier: 1, game_mode: 'duels', verified: true },
        { name: 'ProGamer', tier: 2, game_mode: 'bedwars', verified: true },
        { name: 'ElitePlayer', tier: 2, game_mode: 'skywars', verified: true },
        { name: 'SkillMaster', tier: 2, game_mode: 'duels', verified: true },
        { name: 'Competitor', tier: 3, game_mode: 'bedwars', verified: true },
        { name: 'Challenger', tier: 3, game_mode: 'skywars', verified: true },
        { name: 'Warrior', tier: 3, game_mode: 'duels', verified: true },
        { name: 'RisingStar', tier: 4, game_mode: 'bedwars', verified: true },
        { name: 'Ambitious', tier: 4, game_mode: 'skywars', verified: true },
        { name: 'Determined', tier: 4, game_mode: 'duels', verified: true },
        { name: 'Newbie', tier: 5, game_mode: 'bedwars', verified: true },
        { name: 'Beginner', tier: 5, game_mode: 'skywars', verified: true },
        { name: 'Learner', tier: 5, game_mode: 'duels', verified: true },
      ]

      const { error } = await supabase
        .from('tiers')
        .insert(samplePlayers)

      if (error) throw error
      console.log('Sample data initialized successfully')
    }
  } catch (error) {
    console.error('Error initializing sample data:', error)
  }
}
