'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'

interface TimerProps {
  initialTime?: number // in seconds
  onTimeUp?: () => void
  className?: string
}

export default function Timer({ initialTime = 60, onTimeUp, className = '' }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [customTime, setCustomTime] = useState(initialTime.toString())
  const [showSettings, setShowSettings] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            onTimeUp?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isPaused, timeLeft, onTimeUp])

  const startTimer = () => {
    setIsRunning(true)
    setIsPaused(false)
  }

  const pauseTimer = () => {
    setIsPaused(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(parseInt(customTime) || initialTime)
  }

  const setCustomTimer = () => {
    const newTime = parseInt(customTime)
    if (newTime > 0) {
      setTimeLeft(newTime)
      setIsRunning(false)
      setIsPaused(false)
      setShowSettings(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((initialTime - timeLeft) / initialTime) * 100

  return (
    <div className={`flex flex-col items-center space-y-4 p-6 bg-dark-800/50 rounded-xl border border-dark-700 ${className}`}>
      {/* Timer Display */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-dark-600 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-4 border-primary-500 transition-all duration-1000"
            style={{
              background: `conic-gradient(from 0deg, transparent ${progress}%, rgba(59, 130, 246, 0.2) ${progress}%)`
            }}
          />
          <div className="relative z-10 text-center">
            <div className="text-3xl font-bold text-white">{formatTime(timeLeft)}</div>
            <div className="text-sm text-gray-400">remaining</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        {!isRunning || isPaused ? (
          <button
            onClick={startTimer}
            className="btn-primary flex items-center space-x-2"
            disabled={timeLeft === 0}
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="btn-secondary flex items-center space-x-2"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        )}

        <button
          onClick={resetTimer}
          className="btn-secondary flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="btn-secondary flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Set Time</span>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="flex flex-col items-center space-y-3 p-4 bg-dark-900/50 rounded-lg border border-dark-600">
          <label className="text-sm text-gray-300">Set timer (seconds):</label>
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="w-24 px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white text-center"
            min="1"
            max="3600"
          />
          <button
            onClick={setCustomTimer}
            className="btn-primary text-sm"
          >
            Set Timer
          </button>
        </div>
      )}

      {/* Status */}
      <div className="text-sm text-gray-400">
        {timeLeft === 0 ? (
          <span className="text-red-400">Time&apos;s up!</span>
        ) : isRunning && !isPaused ? (
          <span className="text-green-400">Running</span>
        ) : isPaused ? (
          <span className="text-yellow-400">Paused</span>
        ) : (
          <span>Ready</span>
        )}
      </div>
    </div>
  )
}
