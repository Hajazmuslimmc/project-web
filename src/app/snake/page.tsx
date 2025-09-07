'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import SnakeGame from '@/components/SnakeGame'

export default function SnakePage() {
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
              <span className="gradient-text">Snake Game</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Classic Snake game with modern graphics and smooth gameplay. 
              Eat the food to grow longer and achieve the highest score!
            </p>
          </motion.div>

          {/* Game Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <SnakeGame />
          </motion.div>

          {/* Game Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smooth Controls</h3>
              <p className="text-gray-400">Responsive keyboard controls with WASD and arrow keys</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Score Tracking</h3>
              <p className="text-gray-400">Track your current score and beat your high score</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Design</h3>
              <p className="text-gray-400">Beautiful dark theme with gradient accents and animations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


