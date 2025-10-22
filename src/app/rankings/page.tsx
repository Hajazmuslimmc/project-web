'use client';

import React from 'react';
import { Trophy, Medal, Award, Star, Crown, UserPlus, X, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PlayerEntry {
  id: string;
  name: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  reason: string;
  addedBy: string;
  addedAt: number;
}

export default function RankingsPage() {
  const { user } = useAuth();
  const [players, setPlayers] = React.useState<PlayerEntry[]>([]);
  const [selectedTier, setSelectedTier] = React.useState<PlayerEntry['tier'] | 'ALL'>('ALL');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingPlayer, setEditingPlayer] = React.useState<PlayerEntry | null>(null);
  const [newPlayerName, setNewPlayerName] = React.useState('');
  const [newPlayerReason, setNewPlayerReason] = React.useState('');
  const [newPlayerTier, setNewPlayerTier] = React.useState<PlayerEntry['tier']>('C');

  // Load players from API
  const loadPlayers = async () => {
    try {
      const response = await fetch(`/api/player-tiers?tier=${selectedTier}`);
      if (response.ok) {
        const data = await response.json();
        setPlayers(data.map((item: any) => ({
          ...item,
          id: item.id.toString(),
          addedAt: new Date(item.added_at).getTime()
        })));
      }
    } catch (error) {
      console.error('Error loading player tiers:', error);
    }
  };

  React.useEffect(() => {
    loadPlayers();
  }, [selectedTier]);

  const addPlayer = async () => {
    if (!user) return;
    if (!newPlayerName.trim() || !newPlayerReason.trim()) return;

    try {
      const response = await fetch('/api/player-tiers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id: `${Date.now()}_${newPlayerName.toLowerCase().replace(/\s+/g, '_')}`,
          name: newPlayerName.trim(),
          tier: newPlayerTier,
          reason: newPlayerReason.trim(),
          added_by: user.displayName,
        }),
      });

      if (response.ok) {
        await loadPlayers(); // Reload the list
        resetForm();
      } else {
        console.error('Failed to add player');
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const removePlayer = async (playerId: string) => {
    if (!user || user.role !== 'mod') return;

    try {
      const response = await fetch(`/api/player-tiers?id=${playerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadPlayers();
      } else {
        console.error('Failed to remove player');
      }
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  const updatePlayer = async () => {
    if (!editingPlayer || !user || user.role !== 'mod') return;
    if (!newPlayerName.trim() || !newPlayerReason.trim()) return;

    try {
      const response = await fetch('/api/player-tiers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingPlayer.id,
          name: newPlayerName.trim(),
          tier: newPlayerTier,
          reason: newPlayerReason.trim(),
        }),
      });

      if (response.ok) {
        await loadPlayers();
        resetForm();
      } else {
        console.error('Failed to update player');
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const startEditing = (player: PlayerEntry) => {
    setEditingPlayer(player);
    setNewPlayerName(player.name);
    setNewPlayerReason(player.reason);
    setNewPlayerTier(player.tier);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingPlayer(null);
    setNewPlayerName('');
    setNewPlayerReason('');
    setNewPlayerTier('C');
  };

  const getTierIcon = (tier: PlayerEntry['tier']) => {
    switch (tier) {
      case 'S': return <Crown className="w-6 h-6 text-yellow-400" />;
      case 'A': return <Award className="w-6 h-6 text-green-400" />;
      case 'B': return <Medal className="w-6 h-6 text-blue-400" />;
      case 'C': return <Star className="w-6 h-6 text-purple-400" />;
      case 'D': return <Trophy className="w-6 h-6 text-orange-400" />;
      case 'F': return <Trophy className="w-6 h-6 text-red-400" />;
    }
  };

  const getTierStyle = (tier: PlayerEntry['tier']) => {
    switch (tier) {
      case 'S': return 'border-yellow-400/30 bg-yellow-400/10';
      case 'A': return 'border-green-400/30 bg-green-400/10';
      case 'B': return 'border-blue-400/30 bg-blue-400/10';
      case 'C': return 'border-purple-400/30 bg-purple-400/10';
      case 'D': return 'border-orange-400/30 bg-orange-400/10';
      case 'F': return 'border-red-400/30 bg-red-400/10';
    }
  };

  const getTierRank = (tier: PlayerEntry['tier']) => {
    switch (tier) {
      case 'S': return 'God Tier';
      case 'A': return 'Elite';
      case 'B': return 'Pro';
      case 'C': return 'Good';
      case 'D': return 'Above Average';
      case 'F': return 'Beginner';
    }
  };

  const filteredPlayers = selectedTier === 'ALL' ? players : players.filter(p => p.tier === selectedTier);
  const sortedPlayers = filteredPlayers.sort((a, b) => {
    const tierOrder = { 'S': 0, 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'F': 5 };
    if (a.tier !== b.tier) {
      return tierOrder[a.tier] - tierOrder[b.tier];
    }
    return a.name.localeCompare(b.name);
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            Minecraft Player Tier List
          </h1>
          <p className="text-gray-400">
            Community-ranked Minecraft players - From absolute legends to rising stars
          </p>
          <div className="text-sm text-gray-500 mt-2">
            {user?.role === 'mod' ? 'Moderator Access: Edit player tiers and rankings' : 'View player rankings and skill assessments'}
          </div>
        </div>

        {/* Tier Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { value: 'ALL' as const, label: 'All Players', color: 'bg-gray-600' },
            { value: 'S' as const, label: 'S-Tier (Gods)', color: 'bg-yellow-600' },
            { value: 'A' as const, label: 'A-Tier (Elite)', color: 'bg-green-600' },
            { value: 'B' as const, label: 'B-Tier (Pro)', color: 'bg-blue-600' },
            { value: 'C' as const, label: 'C-Tier (Good)', color: 'bg-purple-600' },
            { value: 'D' as const, label: 'D-Tier (Average)', color: 'bg-orange-600' },
            { value: 'F' as const, label: 'F-Tier (Beginner)', color: 'bg-red-600' }
          ].map((tier) => (
            <button
              key={tier.value}
              onClick={() => setSelectedTier(tier.value)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedTier === tier.value
                  ? `${tier.color} text-white shadow-lg scale-105`
                  : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700/50 border border-primary-500/20 hover:text-white'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Add Player Button (Mod Only) */}
        {user?.role === 'mod' && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <UserPlus className="w-5 h-5" />
              {editingPlayer ? 'Edit Player' : 'Add Player'}
            </button>
          </div>
        )}

        {/* Add/Edit Player Form */}
        {showAddForm && user?.role === 'mod' && (
          <div className="bg-dark-800/50 rounded-xl border border-primary-500/20 p-6 mb-8">
            <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 p-4 rounded-lg mb-6">
              <h3 className="text-2xl font-bold text-white text-center">
                {editingPlayer ? 'Edit Player' : 'Add New Player'}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Player Name
                  </label>
                  <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="e.g., itzrealme"
                    className="w-full px-3 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tier Rank
                  </label>
                  <select
                    value={newPlayerTier}
                    onChange={(e) => setNewPlayerTier(e.target.value as PlayerEntry['tier'])}
                    className="w-full px-3 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="S">S-Tier (God Level)</option>
                    <option value="A">A-Tier (Elite)</option>
                    <option value="B">B-Tier (Pro)</option>
                    <option value="C">C-Tier (Good)</option>
                    <option value="D">D-Tier (Above Average)</option>
                    <option value="F">F-Tier (Beginner)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reasoning
                  </label>
                  <textarea
                    value={newPlayerReason}
                    onChange={(e) => setNewPlayerReason(e.target.value)}
                    placeholder="Explain why this player deserves this tier..."
                    rows={6}
                    className="w-full px-3 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (editingPlayer) {
                        updatePlayer();
                      } else {
                        addPlayer();
                      }
                    }}
                    disabled={!newPlayerName.trim() || !newPlayerReason.trim()}
                    className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingPlayer ? 'Update Player' : 'Add Player'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Players List */}
        <div className="bg-dark-800/50 rounded-xl border border-primary-500/20 p-8">
          <div className="grid gap-6">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] ${getTierStyle(player.tier)}`}
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-dark-900 border-4 border-primary-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">#{index + 1}</span>
                </div>

                {/* Crown for S-tier */}
                {player.tier === 'S' && (
                  <div className="absolute -top-1 -right-1">
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center border-2 border-primary-500">
                          <span className="text-white text-lg font-semibold">
                            {player.name.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {player.name}
                          </h3>
                          <div className="text-gray-400 text-sm">
                            Added by {player.addedBy} • {new Date(player.addedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getTierStyle(player.tier)}`}>
                          {getTierIcon(player.tier)}
                          {player.tier}-Tier ({getTierRank(player.tier)})
                        </span>

                        {user?.role === 'mod' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(player)}
                              className="p-2 text-blue-400 hover:text-blue-300"
                              title="Edit player"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removePlayer(player.id)}
                              className="p-2 text-red-400 hover:text-red-300"
                              title="Remove player"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="bg-dark-700/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Assessment:</div>
                      <div className="text-gray-300 leading-relaxed">
                        {player.reason}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {sortedPlayers.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  {selectedTier === 'ALL' ? 'No players added yet' : `No ${selectedTier}-Tier players found`}
                </h3>
                <p className="text-gray-500">
                  {user?.role === 'mod'
                    ? 'Add the first player to start building the community tier list!'
                    : 'Mods will add players to build the tier list.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tier Explanations */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-800/50 rounded-lg p-6 border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-8 h-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-yellow-400">S-Tier (God Level)</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Absolute legendary players. Masters of Minecraft with legendary skill, strategy, and clutch moments. The GOATs.
            </p>
          </div>

          <div className="bg-dark-800/50 rounded-lg p-6 border border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-green-400">A-Tier (Elite)</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Exceptionally skilled players. Outstanding in their specialization, with incredible reflexes and deep game knowledge.
            </p>
          </div>

          <div className="bg-dark-800/50 rounded-lg p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Medal className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">B-Tier (Professional)</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Highly skilled players who excel in competitive play. Professional level with consistent strong performance.
            </p>
          </div>
        </div>

        {/* Mod Footer */}
        <div className="mt-8 p-6 bg-primary-900/30 rounded-lg border border-primary-500/20">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-primary-400 mb-2">
              {user?.role === 'mod' ? 'Moderator Panel' : 'Community Feature'}
            </h4>
            <p className="text-gray-300 text-sm">
              {user?.role === 'mod'
                ? 'As a moderator, you can add, edit, and remove players from the tier list. Use your judgment wisely!'
                : 'This player tier list is managed by community moderators who carefully assess and rank players based on their skills.'
              }
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <a href="/dashboard" className="text-primary-400 hover:text-primary-300 underline text-lg">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
