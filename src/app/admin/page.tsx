'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, User, Crown, Shield, Sword, Target, Users, Save, Trash2, Loader2 } from 'lucide-react'
import { Player, getAllPlayers, addPlayer, updatePlayer, deletePlayer, initializeSampleData } from '@/lib/tiers'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [newPlayer, setNewPlayer] = useState({
    name: '',
    tier: 5,
    gameMode: 'bedwars'
  })

  const gameModes = [
    { id: 'bedwars', name: 'Bedwars', icon: <Shield className="w-4 h-4" /> },
    { id: 'skywars', name: 'Skywars', icon: <Target className="w-4 h-4" /> },
    { id: 'duels', name: 'Duels', icon: <Sword className="w-4 h-4" /> },
    { id: 'bridge', name: 'Bridge', icon: <Shield className="w-4 h-4" /> },
    { id: 'sumo', name: 'Sumo', icon: <Users className="w-4 h-4" /> },
    { id: 'boxing', name: 'Boxing', icon: <Target className="w-4 h-4" /> },
  ]

  const tiers = [
    { level: 1, name: 'Tier 1', color: 'text-yellow-400' },
    { level: 2, name: 'Tier 2', color: 'text-gray-400' },
    { level: 3, name: 'Tier 3', color: 'text-blue-400' },
    { level: 4, name: 'Tier 4', color: 'text-green-400' },
    { level: 5, name: 'Tier 5', color: 'text-purple-400' },
  ]

  // Check authentication and redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin')
    }
  }, [user, authLoading, router])

  // Load players from Firebase on component mount
  useEffect(() => {
    const loadPlayers = async () => {
      if (!user) return // Don't load if not authenticated

      try {
        const playersData = await getAllPlayers()
        setPlayers(playersData)
      } catch (error) {
        console.error('Error loading players:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadPlayers()
    }
  }, [user])

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    return null // Will redirect in useEffect
  }

  const handleAddPlayer = async () => {
    if (newPlayer.name.trim()) {
      setSaving(true)
      try {
        const playerData = {
          name: newPlayer.name.trim(),
          tier: newPlayer.tier,
          game_mode: newPlayer.gameMode,
          verified: true
        }

        const newPlayerId = await addPlayer(playerData)
        if (newPlayerId) {
          // Add to local state immediately for instant UI update
          const newPlayerObj = {
            id: newPlayerId,
            ...playerData,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          setPlayers(prevPlayers => [...prevPlayers, newPlayerObj])
          setNewPlayer({ name: '', tier: 5, gameMode: 'bedwars' })
        }
      } catch (error) {
        console.error('Error adding player:', error)
        alert('Failed to add player. Please try again.')
      } finally {
        setSaving(false)
      }
    }
  }

  const handleUpdatePlayerTier = async (id: string, newTier: number) => {
    setSaving(true)
    try {
      const success = await updatePlayer(id, { tier: newTier })
      if (success) {
        // Update local state
        setPlayers(players.map(player =>
          player.id === id ? { ...player, tier: newTier } : player
        ))
      }
    } catch (error) {
      console.error('Error updating player tier:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePlayerGameMode = async (id: string, newGameMode: string) => {
    setSaving(true)
    try {
      const success = await updatePlayer(id, { game_mode: newGameMode })
      if (success) {
        // Update local state
        setPlayers(players.map(player =>
          player.id === id ? { ...player, game_mode: newGameMode } : player
        ))
      }
    } catch (error) {
      console.error('Error updating player game mode:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleRemovePlayer = async (id: string) => {
    if (confirm('Are you sure you want to remove this player?')) {
      setSaving(true)
      try {
        const success = await deletePlayer(id)
        if (success) {
          setPlayers(players.filter(player => player.id !== id))
        }
      } catch (error) {
        console.error('Error removing player:', error)
      } finally {
        setSaving(false)
      }
    }
  }

  const handleInitializeSampleData = async () => {
    if (confirm('This will add sample data to your database. Continue?')) {
      setSaving(true)
      try {
        await initializeSampleData()
        const updatedPlayers = await getAllPlayers()
        setPlayers(updatedPlayers)
      } catch (error) {
        console.error('Error initializing sample data:', error)
      } finally {
        setSaving(false)
      }
    }
  }

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'from-yellow-400 to-yellow-600'
      case 2: return 'from-gray-300 to-gray-500'
      case 3: return 'from-blue-400 to-blue-600'
      case 4: return 'from-green-400 to-green-600'
      case 5: return 'from-purple-400 to-purple-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/tiers" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tiers</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Crown className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h1 className="text-4xl font-bold text-white mb-4">MCTiers Admin Panel</h1>
            <p className="text-xl text-gray-300">Manage player tiers and rankings</p>
          </div>

          {/* Add Player Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Plus className="w-6 h-6" />
              <span>Add New Player</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Player Name</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter player name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Game Mode</label>
                <select
                  value={newPlayer.gameMode}
                  onChange={(e) => setNewPlayer({ ...newPlayer, gameMode: e.target.value })}
                  className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {gameModes.map((mode) => (
                    <option key={mode.id} value={mode.id} className="bg-slate-800">
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tier Level</label>
                <select
                  value={newPlayer.tier}
                  onChange={(e) => setNewPlayer({ ...newPlayer, tier: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {tiers.map((tier) => (
                    <option key={tier.level} value={tier.level} className="bg-slate-800">
                      {tier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAddPlayer}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>{saving ? 'Adding...' : 'Add Player'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Players Management */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span>Manage Players ({players.length})</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Player</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Game Mode</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Tier</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-medium">{player.name}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={player.game_mode}
                          onChange={(e) => handleUpdatePlayerGameMode(player.id, e.target.value)}
                          disabled={saving}
                          className="px-3 py-1 bg-black/20 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                        >
                          {gameModes.map((mode) => (
                            <option key={mode.id} value={mode.id} className="bg-slate-800">
                              {mode.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={player.tier}
                          onChange={(e) => handleUpdatePlayerTier(player.id, parseInt(e.target.value))}
                          disabled={saving}
                          className="px-3 py-1 bg-black/20 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                        >
                          {tiers.map((tier) => (
                            <option key={tier.level} value={tier.level} className="bg-slate-800">
                              {tier.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleRemovePlayer(player.id)}
                          disabled={saving}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 rounded transition-colors"
                          title="Remove player"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-600/20 border border-green-400/30 rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">All changes save automatically</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">MCTiers Admin</span>
          </div>
          <p className="text-gray-400">
            © 2025 MCTiers Admin Panel. Manage rankings with care.
          </p>
        </div>
      </footer>
    </div>
  )
}
