'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Users, Trophy, Zap, ArrowRight, Gamepad2, Star, TrendingUp, LogIn, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Notifications from '@/components/Notifications'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { user, signOut, signInWithMicrosoft } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleSignIn = async () => {
    try {
      await signInWithMicrosoft()
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Premium Games",
      description: "Access to the latest and greatest web games with stunning graphics and immersive gameplay."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multiplayer Experience",
      description: "Connect with players worldwide and compete in real-time multiplayer matches."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achievements & Leaderboards",
      description: "Track your progress, earn achievements, and climb the global leaderboards."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Play",
      description: "No downloads required. Jump into games instantly with just a click."
    }
  ]

  const upcomingGames = [
    { name: "Snake Game", genre: "Arcade", rating: 4.9, link: "/snake" },
    { name: "RGB Chemistry", genre: "Puzzle", rating: 4.8, link: "/chemmail-quesets" },
    { name: "Pixel Warriors", genre: "Action", rating: 4.6, link: "/pixel-warriors" },
    { name: "Brain Teasers", genre: "Puzzle", rating: 4.9, link: "/brain-teasers" },
    { name: "Space Shooter 3D", genre: "Action", rating: 4.7, link: "/space-shooter-3d" }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-dark-900/90 via-dark-800/90 to-dark-900/90 backdrop-blur-md border-b border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">networkak</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="hidden md:flex space-x-6">
                <div className="relative group">
                  <button className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-1">
                    <span>Games</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-dark-800/95 backdrop-blur-md rounded-lg border border-primary-500/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link href="/snake" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">🐍 Snake Game</Link>
                      <Link href="/brain-teasers" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">🧠 Brain Teasers</Link>
                      <Link href="/pixel-warriors" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">⚔️ Pixel Warriors</Link>
                      <Link href="/space-shooter-3d" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">🚀 Space Shooter 3D</Link>
                      <Link href="/chemmail-quesets" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">🧪 Chemistry Quiz</Link>
                      <Link href="/timer" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">⏱️ Timer</Link>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-1">
                    <span>Community</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-dark-800/95 backdrop-blur-md rounded-lg border border-primary-500/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link href="/fc-messenger" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">💬 FC Messenger</Link>
                      <Link href="/social-feed" className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-500/20 hover:text-white transition-colors">📱 Social Feed</Link>
                    </div>
                  </div>
                </div>

                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About</Link>
                <Link href="/download" className="text-primary-400 hover:text-primary-300 transition-colors font-semibold">📥 Download</Link>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-primary-400 transition-colors">Privacy</Link>
              </div>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <button className="btn-secondary flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                  </Link>
                  <Notifications />
                  <div className="flex items-center space-x-3 text-white">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-primary-500"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-sm">{user.displayName || user.email}</span>
                  </div>
                  <Link href="/settings">
                    <button className="btn-secondary flex items-center space-x-2">
                      <User className="w-4 h-4" />
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
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth/signin">
                    <button className="btn-secondary flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="btn-primary flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Sign Up</span>
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to{' '}
              <span className="gradient-text">networkak</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of web gaming with our premium collection of games. 
              From action-packed adventures to brain-teasing puzzles, we&apos;ve got it all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/snake">
                <button className="btn-primary flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Playing Now</span>
                </button>
              </Link>
              <Link href="/download">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
                  <span>📥 Download App</span>
                </button>
              </Link>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <span>Explore Games</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose networkak?</h2>
            <p className="text-xl text-gray-300">Discover what makes us the ultimate gaming destination</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="card text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Games Section */}
      <section id="games" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Upcoming Games</h2>
            <p className="text-xl text-gray-300">Get ready for these exciting new releases</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingGames.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="card group cursor-pointer"
              >
                {game.link ? (
                  <Link href={game.link}>
                    <div className="w-full h-48 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      {game.name === "Space Shooter 3D" ? (
                        <img src="/space-shooter.png" alt="Space Shooter 3D" className="w-full h-full object-cover" />
                      ) : (
                        <Gamepad2 className="w-16 h-16 text-white/80" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                    <p className="text-gray-400 mb-3">{game.genre}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{game.rating}</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className="w-full h-48 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      {game.name === "Space Shooter 3D" ? (
                        <img src="/space-shooter.png" alt="Space Shooter 3D" className="w-full h-full object-cover" />
                      ) : (
                        <Gamepad2 className="w-16 h-16 text-white/80" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                    <p className="text-gray-400 mb-3">{game.genre}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{game.rating}</span>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="card">
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-400">Premium Games</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="card">
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400">Server Uptime</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-pink-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-red-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">Ready to Start Gaming?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players and experience the best web games available
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/snake">
                <button className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-lg flex items-center space-x-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25">
                  <Play className="w-6 h-6" />
                  <span>Get Started Now</span>
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-gradient-to-r from-secondary-600 to-red-600 hover:from-secondary-700 hover:to-red-700 text-white text-lg px-8 py-4 rounded-lg flex items-center space-x-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-secondary-500/25">
                  <Users className="w-6 h-6" />
                  <span>Join Community</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              This website is made by Fc firecold if you have any questions join our discord server.
              THis website is A Big Network we have games Madiea and helpful tools that devlopers
              and you can use this website partners with Hajaz a large company and iclasser.


            </p>
            <a
              href="https://discord.gg/5KrnJFbK5y"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Discord</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-dark-700">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-purple-500 rounded flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">networkak</span>
          </div>
          <p className="text-gray-400">
            © 2025 networkak. All rights reserved. | Premium Web Experience
          </p>
        </div>
      </footer>
    </div>
  )
}
