'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, MessageCircle, Users, Settings, Trophy, Star, TrendingUp, Zap, Play, User, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
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

  const quickActions = [
    {
      title: 'Play Games',
      description: 'Jump into your favorite games',
      icon: <Gamepad2 className="w-8 h-8" />,
      href: '/snake',
      color: 'from-blue-600 to-purple-600',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Leaderboards',
      description: 'Check your game rankings',
      icon: <Trophy className="w-8 h-8" />,
      href: '/leaderboards',
      color: 'from-yellow-600 to-orange-600',
      bgColor: 'bg-yellow-500/10 border-yellow-500/20'
    },
    {
      title: 'Minecraft Rankings',
      description: 'MCTiers combat rankings',
      icon: <Star className="w-8 h-8" />,
      href: '/rankings',
      color: 'from-red-600 to-purple-600',
      bgColor: 'bg-red-500/10 border-red-500/20'
    },
    {
      title: 'FC Messenger',
      description: 'Chat with the community',
      icon: <MessageCircle className="w-8 h-8" />,
      href: '/fc-messenger',
      color: 'from-green-600 to-teal-600',
      bgColor: 'bg-green-500/10 border-green-500/20'
    },
    {
      title: 'Social Feed',
      description: 'Share and discover content',
      icon: <Users className="w-8 h-8" />,
      href: '/social-feed',
      color: 'from-pink-600 to-purple-600',
      bgColor: 'bg-pink-500/10 border-pink-500/20'
    },
    {
      title: 'Settings',
      description: 'Customize your profile',
      icon: <Settings className="w-8 h-8" />,
      href: '/settings',
      color: 'from-orange-600 to-red-600',
      bgColor: 'bg-orange-500/10 border-orange-500/20'
    }
  ];

  const games = [
    { name: 'Snake Game', icon: '🐍', href: '/snake', color: 'text-green-400' },
    { name: 'Brain Teasers', icon: '🧠', href: '/brain-teasers', color: 'text-purple-400' },
    { name: 'Pixel Warriors', icon: '⚔️', href: '/pixel-warriors', color: 'text-red-400' },
    { name: 'Space Shooter 3D', icon: '🚀', href: '/space-shooter-3d', color: 'text-blue-400' },
    { name: 'Chemistry Quiz', icon: '🧪', href: '/chemmail-quesets', color: 'text-cyan-400' },
    { name: 'Timer', icon: '⏱️', href: '/timer', color: 'text-yellow-400' }
  ];

  const stats = [
    { label: 'Games Played', value: '12', icon: <Play className="w-5 h-5" />, color: 'text-blue-400' },
    { label: 'Messages Sent', value: '47', icon: <MessageCircle className="w-5 h-5" />, color: 'text-green-400' },
    { label: 'Posts Created', value: '8', icon: <Users className="w-5 h-5" />, color: 'text-purple-400' },
    { label: 'Achievements', value: '3', icon: <Trophy className="w-5 h-5" />, color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="bg-dark-800/50 border-b border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user.displayName}!</h1>
                <p className="text-gray-400">Here's what's happening in your networkak world</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/settings">
                <button className="btn-secondary flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="btn-secondary flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className={`card ${action.bgColor} hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-center text-sm">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-dark-700 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Games Library */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map((game, index) => (
              <Link key={index} href={game.href}>
                <div className="card hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {game.icon}
                    </div>
                    <h3 className="text-white font-semibold text-sm">{game.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="card">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white">Played Snake Game</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white">Sent a message in FC Messenger</p>
                  <p className="text-gray-400 text-sm">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white">Posted in Social Feed</p>
                  <p className="text-gray-400 text-sm">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Community Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">🎯 Top Games This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Snake Game</span>
                  <span className="text-primary-400">1,247 plays</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Brain Teasers</span>
                  <span className="text-primary-400">892 plays</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Pixel Warriors</span>
                  <span className="text-primary-400">654 plays</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">💬 Active Communities</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">FC Messenger</span>
                  <span className="text-green-400">23 online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Social Feed</span>
                  <span className="text-blue-400">156 posts today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Game Forums</span>
                  <span className="text-purple-400">89 discussions</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
