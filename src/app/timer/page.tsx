'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Timer from '@/components/Timer'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TimerPage() {
  const [timeUpMessage, setTimeUpMessage] = useState('')

  const handleTimeUp = () => {
    setTimeUpMessage('⏰ Time\'s up! The timer has finished counting down.')
    setTimeout(() => setTimeUpMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <button className="btn-secondary flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </Link>
          <h1 className="text-3xl font-bold gradient-text">Timer Component</h1>
        </div>

        {/* Timer Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Interactive Timer Demo</h2>
            <p className="text-gray-300 max-w-2xl">
              This is a fully functional countdown timer component with start, pause, reset, and custom time setting features.
              Perfect for games, challenges, or any timed activities.
            </p>
          </div>

          <Timer
            initialTime={120}
            onTimeUp={handleTimeUp}
            className="max-w-sm"
          />

          {/* Time Up Message */}
          {timeUpMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center"
            >
              <p className="text-red-400 font-semibold">{timeUpMessage}</p>
            </motion.div>
          )}

          {/* Usage Examples */}
          <div className="w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-center">Usage Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h4 className="text-lg font-semibold mb-2">Basic Usage</h4>
                <pre className="text-sm text-gray-300 bg-dark-800 p-3 rounded">
{`<Timer initialTime={60} />`}
                </pre>
                <p className="text-sm text-gray-400 mt-2">Simple 60-second countdown timer</p>
              </div>

              <div className="card">
                <h4 className="text-lg font-semibold mb-2">With Callback</h4>
                <pre className="text-sm text-gray-300 bg-dark-800 p-3 rounded">
{`<Timer
  initialTime={300}
  onTimeUp={() => alert('Time up!')}
/>`}
                </pre>
                <p className="text-sm text-gray-400 mt-2">5-minute timer with callback when finished</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-center">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h4 className="font-semibold">Countdown Timer</h4>
                <p className="text-sm text-gray-400">Accurate countdown with visual progress</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h4 className="font-semibold">Customizable</h4>
                <p className="text-sm text-gray-400">Set any duration and customize appearance</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎮</span>
                </div>
                <h4 className="font-semibold">Game Ready</h4>
                <p className="text-sm text-gray-400">Perfect for game timers and challenges</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
