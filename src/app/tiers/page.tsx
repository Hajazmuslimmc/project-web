'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trophy, Users, Star, Crown, Shield, Sword, Target } from 'lucide-react'

export default function TiersPage() {
  const [selectedGameMode, setSelectedGameMode] = useState('all')

  const gameModes = [
    { id: 'all', name: 'All Modes', icon: <Trophy className="w-5 h-5" /> },
    { id: 'bedwars', name: 'Bedwars', icon: <Shield className="w-5 h-5" /> },
    { id: 'skywars', name: 'Skywars', icon: <Target className="w-5 h-5" /> },
    { id: 'duels', name: 'Duels', icon: <Sword className="w-5 h-5" /> },
    { id: 'bridge', name: 'Bridge', icon: <Shield className="w-5 h-5" /> },
    { id: 'sumo', name: 'Sumo', icon: <Users className="w-5 h-5" /> },
    { id: 'boxing', name: 'Boxing', icon: <Target className="w-5 h-5" /> },
  ]

  const tiers = [
    {
      level: 1,
      name: 'Tier 1',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20',
      borderColor: 'border-yellow-400/50',
      players: [
        { name: 'Marlow', gameMode: 'bedwars', verified: true },
        { name: 'Lurrn', gameMode: 'skywars', verified: true },
        { name: 'PlayerX', gameMode: 'duels', verified: true },
      ]
    },
    {
      level: 2,
      name: 'Tier 2',
      color: 'from-gray-300 to-gray-500',
      bgColor: 'bg-gradient-to-r from-gray-300/20 to-gray-500/20',
      borderColor: 'border-gray-400/50',
      players: [
        { name: 'ProGamer', gameMode: 'bedwars', verified: true },
        { name: 'ElitePlayer', gameMode: 'skywars', verified: true },
        { name: 'SkillMaster', gameMode: 'duels', verified: true },
      ]
    },
    {
      level: 3,
      name: 'Tier 3',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-400/20 to-blue-600/20',
      borderColor: 'border-blue-400/50',
      players: [
        { name: 'Competitor', gameMode: 'bedwars', verified: true },
        { name: 'Challenger', gameMode: 'skywars', verified: true },
        { name: 'Warrior', gameMode: 'duels', verified: true },
      ]
    },
    {
      level: 4,
      name: 'Tier 4',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-gradient-to-r from-green-400/20 to-green-600/20',
      borderColor: 'border-green-400/50',
      players: [
        { name: 'RisingStar', gameMode: 'bedwars', verified: true },
        { name: 'Ambitious', gameMode: 'skywars', verified: true },
        { name: 'Determined', gameMode: 'duels', verified: true },
      ]
    },
    {
      level: 5,
      name: 'Tier 5',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-gradient-to-r from-purple-400/20 to-purple-600/20',
      borderColor: 'border-purple-400/50',
      players: [
        { name: 'Newbie', gameMode: 'bedwars', verified: true },
        { name: 'Beginner', gameMode: 'skywars', verified: true },
        { name: 'Learner', gameMode: 'duels', verified: true },
      ]
    }
  ]

  const filteredPlayers = selectedGameMode === 'all'
    ? tiers.flatMap(tier => tier.players)
    : tiers.flatMap(tier => tier.players.filter(player => player.gameMode === selectedGameMode))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MCTiers</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                MCTiers
              </span>
              <br />
              <span className="text-white">Ranking System</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The official competitive Minecraft PvP ranking system. Founded by high-level players,
              MCTiers ranks players across 7 game modes based on skill level and testing results.
            </p>
          </div>

          {/* Game Mode Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {gameModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedGameMode(mode.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedGameMode === mode.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {mode.icon}
                <span>{mode.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tier List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.level}
                className={`${tier.bgColor} backdrop-blur-sm border ${tier.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-4">{tier.name}</h3>
                <div className="space-y-2">
                  {tier.players
                    .filter(player => selectedGameMode === 'all' || player.gameMode === selectedGameMode)
                    .map((player, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/20 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{player.name}</span>
                        {player.verified && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <span className="text-xs text-gray-400 capitalize">{player.gameMode}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">How MCTiers Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Testing Process</h3>
              <p className="text-gray-400">Players undergo rigorous testing to determine their skill level and appropriate tier placement.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">7 Game Modes</h3>
              <p className="text-gray-400">Bedwars, Skywars, Duels, Bridge, Sumo, Boxing, and more - each with 5 tier levels.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Admin Managed</h3>
              <p className="text-gray-400">Tier assignments are managed by authorized administrators to ensure accuracy and fairness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">MCTiers</span>
          </div>
          <p className="text-gray-400">
            © 2025 MCTiers. Official Minecraft PvP Ranking System.
          </p>
        </div>
      </footer>
    </div>
  )
}
