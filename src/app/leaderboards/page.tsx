'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Award, Star, Gamepad2 } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  score: number;
  game: string;
  timestamp: number;
  profilePhoto?: string;
}

export default function LeaderboardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leaderboards, setLeaderboards] = useState<Record<string, LeaderboardEntry[]>>({});
  const [selectedGame, setSelectedGame] = useState('overall');

  const games = [
    { id: 'overall', name: 'Overall Rankings', icon: '🏆' },
    { id: 'snake', name: 'Snake Game', icon: '🐍' },
    { id: 'brain-teasers', name: 'Brain Teasers', icon: '🧠' },
    { id: 'pixel-warriors', name: 'Pixel Warriors', icon: '⚔️' },
    { id: 'space-shooter', name: 'Space Shooter 3D', icon: '🚀' },
    { id: 'chemistry', name: 'Chemistry Quiz', icon: '🧪' },
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      loadLeaderboards();
    }
  }, [user, loading, router]);

  const loadLeaderboards = () => {
    const storedLeaderboards = localStorage.getItem('gameLeaderboards');
    if (storedLeaderboards) {
      try {
        const parsed = JSON.parse(storedLeaderboards);
        setLeaderboards(parsed);
      } catch (error) {
        console.error('Error loading leaderboards:', error);
      }
    }
  };

  const getTopScores = (gameId: string) => {
    if (gameId === 'overall') {
      // Calculate overall rankings by taking the highest score from each user across all games
      const userBestScores: Record<string, LeaderboardEntry> = {};

      // Go through all games and track the best score for each user
      Object.entries(leaderboards).forEach(([game, scores]) => {
        if (game !== 'overall') { // Don't include overall in the calculation
          scores.forEach(score => {
            const existing = userBestScores[score.username];
            if (!existing || score.score > existing.score) {
              userBestScores[score.username] = {
                ...score,
                game: game // Keep track of which game they got this score from
              };
            }
          });
        }
      });

      // Convert to array and sort by score
      return Object.values(userBestScores)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }

    const gameScores = leaderboards[gameId] || [];
    return gameScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-primary-500 to-purple-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const topScores = getTopScores(selectedGame);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            Game Leaderboards
          </h1>
          <p className="text-gray-400">Compete with players worldwide and climb the rankings!</p>
        </div>

        {/* Game Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedGame === game.id
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                  : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700/50 border border-primary-500/20'
              }`}
            >
              <span className="text-xl">{game.icon}</span>
              {game.name}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-dark-800/50 rounded-lg border border-primary-500/20 overflow-hidden">
          {/* Leaderboard Header */}
          <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 p-6 border-b border-primary-500/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {games.find(g => g.id === selectedGame)?.icon}
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {games.find(g => g.id === selectedGame)?.name} Leaderboard
                </h2>
                <p className="text-gray-400">Top 10 highest scores</p>
              </div>
            </div>
          </div>

          {/* Leaderboard Content */}
          <div className="p-6">
            {topScores.length === 0 ? (
              <div className="text-center py-12">
                <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No scores yet!</h3>
                <p className="text-gray-500 mb-4">Be the first to set a high score in this game.</p>
                <Link href={selectedGame === 'overall' ? '/dashboard' : `/${selectedGame === 'chemistry' ? 'chemmail-quesets' : selectedGame}`}>
                  <button className="btn-primary">
                    {selectedGame === 'overall' ? 'Explore Games' : `Play ${games.find(g => g.id === selectedGame)?.name}`}
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {topScores.map((entry, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={`${entry.username}-${entry.timestamp}`}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                        rank <= 3
                          ? `${getRankColor(rank)} border-transparent`
                          : 'bg-dark-700/50 border-dark-600 hover:border-primary-500/50'
                      }`}
                    >
                      {/* Rank and Avatar */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12">
                          {getRankIcon(rank)}
                        </div>

                        <div className="flex items-center gap-3">
                          {entry.profilePhoto ? (
                            <img
                              src={entry.profilePhoto}
                              alt={entry.username}
                              className="w-10 h-10 rounded-full border-2 border-primary-500"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center border-2 border-primary-500">
                              <span className="text-white text-sm font-semibold">
                                {entry.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}

                          <div>
                            <Link
                              href={`/profile/${entry.username}`}
                              className="text-white font-semibold hover:text-primary-400 transition-colors"
                            >
                              {entry.username}
                            </Link>
                            <p className="text-gray-400 text-sm">
                              {new Date(entry.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {entry.score.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">points</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Your Rank */}
        {user && (
          <div className="mt-8 bg-dark-800/50 rounded-lg p-6 border border-primary-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Your Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => {
                const gameScores = leaderboards[game.id] || [];
                const userScore = gameScores.find(score => score.username === user.displayName);
                const userRank = userScore
                  ? gameScores
                      .sort((a, b) => b.score - a.score)
                      .findIndex(score => score.username === user.displayName) + 1
                  : null;

                return (
                  <div key={game.id} className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{game.icon}</span>
                      <span className="text-white font-semibold text-sm">{game.name}</span>
                    </div>

                    {userScore ? (
                      <div>
                        <div className="text-lg font-bold text-primary-400">
                          #{userRank} • {userScore.score.toLocaleString()} pts
                        </div>
                        <div className="text-gray-400 text-xs">
                          {new Date(userScore.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No score yet
                        <br />
                        <Link href={`/${game.id === 'chemistry' ? 'chemmail-quesets' : game.id}`}>
                          <span className="text-primary-400 hover:text-primary-300 text-xs underline">
                            Play now →
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link href="/dashboard" className="text-primary-400 hover:text-primary-300 underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
