'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Gamepad2, Flame, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function FireclientPage() {
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
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
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
              <span className="gradient-text">Fireclient</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the power of fire with our advanced client interface.
              Fast, reliable, and packed with features for the ultimate experience.
            </p>
          </motion.div>

          {/* Client Interface Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <div className="w-full max-w-2xl h-96 bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Flame className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Fireclient Interface</h3>
                <p className="text-gray-400">Client interface coming soon...</p>
              </div>
            </div>
          </motion.div>

          {/* Client Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Optimized performance with blazing fast response times</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">Built with security in mind and enterprise-grade reliability</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fire-Powered</h3>
              <p className="text-gray-400">Harness the power of fire for an intense and dynamic experience</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
