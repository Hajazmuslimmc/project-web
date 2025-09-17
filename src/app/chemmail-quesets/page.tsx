'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
 import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Star, Zap, Palette, Eye } from 'lucide-react'
import Link from 'next/link'

interface RGBCompound {
  id: number
  name: string
  formula: string
  targetRgb: [number, number, number]
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const compounds: RGBCompound[] = [
  {
    id: 1,
    name: "Water",
    formula: "H₂O",
    targetRgb: [0, 100, 255], // Blue
    description: "The most essential compound for life. Mix blue (Oxygen) with a hint of green (Hydrogen).",
    difficulty: 'easy'
  },
  {
    id: 2,
    name: "Fire",
    formula: "O₂ + Fuel",
    targetRgb: [255, 100, 0], // Orange-Red
    description: "A combustion reaction. Mix red (Heat) with yellow (Oxygen) to create fire.",
    difficulty: 'easy'
  },
  {
    id: 3,
    name: "Chlorophyll",
    formula: "C₅₅H₇₂O₅N₄Mg",
    targetRgb: [0, 150, 0], // Green
    description: "The green pigment in plants. Mix green (Carbon) with blue (Nitrogen) and a touch of red (Magnesium).",
    difficulty: 'medium'
  },
  {
    id: 4,
    name: "Gold",
    formula: "Au",
    targetRgb: [255, 215, 0], // Gold
    description: "The precious metal. Mix yellow (Metal) with orange (Luster) and a hint of red (Value).",
    difficulty: 'medium'
  },
  {
    id: 5,
    name: "Blood",
    formula: "Fe + O₂",
    targetRgb: [150, 0, 0], // Dark Red
    description: "Iron-rich blood. Mix red (Iron) with dark red (Oxygen binding) and a touch of blue (Plasma).",
    difficulty: 'hard'
  }
]

export default function ChemmailQuesets() {
  const [currentCompound, setCurrentCompound] = useState(0)
  const [rgbValues, setRgbValues] = useState<[number, number, number]>([128, 128, 128])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [completedCompounds, setCompletedCompounds] = useState<boolean[]>(new Array(compounds.length).fill(false))
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(60)
    setCurrentCompound(0)
    setScore(0)
    setGameOver(false)
    setCompletedCompounds(new Array(compounds.length).fill(false))
    setRgbValues([128, 128, 128])
    setAttempts(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentCompound(0)
    setRgbValues([128, 128, 128])
    setScore(0)
    setShowResult(false)
    setTimeLeft(60)
    setGameOver(false)
    setCompletedCompounds(new Array(compounds.length).fill(false))
    setAttempts(0)
  }

  const updateRgbValue = (index: number, value: number) => {
    const newRgb = [...rgbValues] as [number, number, number]
    newRgb[index] = value
    setRgbValues(newRgb)
  }

  const checkColorMatch = () => {
    if (gameOver) return
    
    setAttempts(attempts + 1)
    const target = compounds[currentCompound].targetRgb
    const tolerance = 30
    
    const isMatch = rgbValues.every((value, index) => 
      Math.abs(value - target[index]) <= tolerance
    )
    
    if (isMatch) {
      setScore(score + 1)
      const newCompleted = [...completedCompounds]
      newCompleted[currentCompound] = true
      setCompletedCompounds(newCompleted)
    }
    
    setShowResult(true)
  }

  const nextCompound = () => {
    if (currentCompound < compounds.length - 1) {
      setCurrentCompound(currentCompound + 1)
      setRgbValues([128, 128, 128])
      setShowResult(false)
      setAttempts(0)
    } else {
      setGameOver(true)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / compounds.length) * 100
    if (percentage >= 80) return "Excellent! You're an RGB Chemistry master!"
    if (percentage >= 60) return "Great job! You understand color chemistry!"
    if (percentage >= 40) return "Not bad! Keep experimenting with colors!"
    return "Keep practicing! RGB chemistry is fascinating!"
  }

  const getScoreColor = () => {
    const percentage = (score / compounds.length) * 100
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    if (percentage >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getCurrentColor = () => `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`
  const getTargetColor = () => {
    const target = compounds[currentCompound].targetRgb
    return `rgb(${target[0]}, ${target[1]}, ${target[2]})`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-text">RGB Chemistry</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {!gameStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="card mb-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
                  RGB Chemistry
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Mix RGB colors to create chemical compounds! Use the color sliders to match the target compound.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Trophy className="w-5 h-5" />
                    <span>{compounds.length} Compounds</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Zap className="w-5 h-5" />
                    <span>60 Seconds per Compound</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Palette className="w-5 h-5" />
                    <span>RGB Color Mixing</span>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Experiment</span>
                </button>
              </div>
            </motion.div>
          ) : gameOver ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="card">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Experiment Complete!</h2>
                <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
                  {score}/{compounds.length}
                </div>
                <p className="text-xl text-gray-300 mb-6">{getScoreMessage()}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startGame}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Play Again</span>
                  </button>
                  <Link href="/">
                    <button className="btn-secondary flex items-center space-x-2">
                      <ArrowLeft className="w-5 h-5" />
                      <span>Back to Home</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentCompound}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              {/* Timer */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-400">
                  Compound {currentCompound + 1} of {compounds.length}
                </div>
                <div className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-primary-400'}`}>
                  {timeLeft}s
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-dark-700 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((currentCompound + 1) / compounds.length) * 100}%` }}
                ></div>
              </div>

              {/* Compound Info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{compounds[currentCompound].name}</h2>
                <p className="text-lg text-primary-400 mb-2">{compounds[currentCompound].formula}</p>
                <p className="text-gray-300 text-sm">{compounds[currentCompound].description}</p>
              </div>

              {/* Color Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Target Color */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3">Target Color</h3>
                  <div 
                    className="w-32 h-32 mx-auto rounded-lg border-4 border-white/20 shadow-lg"
                    style={{ backgroundColor: getTargetColor() }}
                  ></div>
                  <p className="text-sm text-gray-400 mt-2">RGB: {compounds[currentCompound].targetRgb.join(', ')}</p>
                </div>

                {/* Your Color */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3">Your Mix</h3>
                  <div 
                    className="w-32 h-32 mx-auto rounded-lg border-4 border-white/20 shadow-lg"
                    style={{ backgroundColor: getCurrentColor() }}
                  ></div>
                  <p className="text-sm text-gray-400 mt-2">RGB: {rgbValues.join(', ')}</p>
                </div>
              </div>

              {/* RGB Sliders */}
              <div className="space-y-4 mb-8">
                {['Red', 'Green', 'Blue'].map((color, index) => (
                  <div key={color} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-300">{color}</label>
                      <span className="text-sm text-gray-400">{rgbValues[index]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbValues[index]}
                      onChange={(e) => updateRgbValue(index, parseInt(e.target.value))}
                      className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, 
                          ${index === 0 ? `rgb(${rgbValues[index]}, 0, 0)` : 
                            index === 1 ? `rgb(0, ${rgbValues[index]}, 0)` : 
                            `rgb(0, 0, ${rgbValues[index]})`}) 
                          ${index === 0 ? `rgb(255, 0, 0)` : 
                            index === 1 ? `rgb(0, 255, 0)` : 
                            `rgb(0, 0, 255)`})`
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Check Button */}
              <button
                onClick={checkColorMatch}
                disabled={gameOver}
                className="btn-primary w-full mb-4"
              >
                <Eye className="w-5 h-5 mr-2" />
                Check Match
              </button>

              {/* Result and Explanation */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 p-4 rounded-lg bg-dark-700/50"
                >
                  <div className="text-center mb-4">
                    {completedCompounds[currentCompound] ? (
                      <div className="text-green-400">
                        <p className="text-lg font-semibold">🎉 Perfect Match!</p>
                        <p className="text-sm">You successfully created {compounds[currentCompound].name}!</p>
                      </div>
                    ) : (
                      <div className="text-red-400">
                        <p className="text-lg font-semibold">❌ Not quite right</p>
                        <p className="text-sm">Try adjusting the RGB values. Attempts: {attempts}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={nextCompound}
                    className="btn-primary w-full"
                  >
                    {currentCompound < compounds.length - 1 ? 'Next Compound' : 'Finish Experiment'}
                  </button>
                </motion.div>
              )}

              {/* Score Display */}
              <div className="text-center text-gray-400">
                Score: {score}/{currentCompound + 1}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
