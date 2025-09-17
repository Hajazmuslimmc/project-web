'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Gamepad2, Brain, Puzzle, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import BrainTeaserGame from '@/components/BrainTeaserGame'

export default function BrainTeasersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">networkak</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Brain Teasers</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Challenge your memory and concentration with this classic memory matching game.
              Find all the matching pairs as quickly as possible!
            </p>
          </motion.div>

          {/* Game Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <BrainTeaserGame />
          </motion.div>

          {/* Game Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Memory Training</h3>
              <p className="text-gray-400">Improve your memory skills with this engaging card matching game</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pattern Recognition</h3>
              <p className="text-gray-400">Develop pattern recognition abilities while finding matching pairs</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scoring System</h3>
              <p className="text-gray-400">Earn points based on speed and efficiency for the ultimate challenge</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
