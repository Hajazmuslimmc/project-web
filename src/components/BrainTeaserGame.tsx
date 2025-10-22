'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Brain, Trophy, Timer } from 'lucide-react'

interface Card {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

interface GameState {
  cards: Card[]
  flippedCards: number[]
  moves: number
  matches: number
  gameOver: boolean
  paused: boolean
  timeElapsed: number
  score: number
}

const CARD_VALUES = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐔', '🐧', '🐦']
const GRID_SIZE = 4 // 4x4 grid = 16 cards = 8 pairs

export default function BrainTeaserGame() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    matches: 0,
    gameOver: false,
    paused: false,
    timeElapsed: 0,
    score: 0
  })

  const [timerActive, setTimerActive] = useState(false)

  const generateCards = useCallback((): Card[] => {
    const selectedValues = CARD_VALUES.slice(0, (GRID_SIZE * GRID_SIZE) / 2)
    const cardPairs = [...selectedValues, ...selectedValues]

    // Shuffle the cards
    const shuffledCards = cardPairs
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5)

    return shuffledCards
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      cards: generateCards(),
      flippedCards: [],
      moves: 0,
      matches: 0,
      gameOver: false,
      paused: false,
      timeElapsed: 0,
      score: 0
    })
    setTimerActive(false)
  }, [generateCards])

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }))
    setTimerActive(prev => !prev)
  }, [])

  const flipCard = useCallback((cardId: number) => {
    if (gameState.gameOver || gameState.paused) return

    setGameState(prev => {
      const card = prev.cards.find(c => c.id === cardId)
      if (!card || card.isFlipped || card.isMatched || prev.flippedCards.length >= 2) {
        return prev
      }

      const newFlippedCards = [...prev.flippedCards, cardId]
      const newCards = prev.cards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )

      // Start timer on first move
      if (prev.moves === 0 && newFlippedCards.length === 1) {
        setTimerActive(true)
      }

      return {
        ...prev,
        cards: newCards,
        flippedCards: newFlippedCards,
        moves: newFlippedCards.length === 1 ? prev.moves : prev.moves + 1
      }
    })
  }, [gameState.gameOver, gameState.paused])

  // Check for matches
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [firstId, secondId] = gameState.flippedCards
      const firstCard = gameState.cards.find(c => c.id === firstId)
      const secondCard = gameState.cards.find(c => c.id === secondId)

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            cards: prev.cards.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            ),
            flippedCards: [],
            matches: prev.matches + 1,
            score: prev.score + 100
          }))
        }, 500)
      } else {
        // No match, flip back
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            cards: prev.cards.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            ),
            flippedCards: []
          }))
        }, 1000)
      }
    }
  }, [gameState.flippedCards, gameState.cards])

  // Check for game over
  useEffect(() => {
    if (gameState.matches === (GRID_SIZE * GRID_SIZE) / 2 && gameState.matches > 0) {
      setGameState(prev => {
        const timeBonus = Math.max(0, 300 - prev.timeElapsed) * 2
        const moveBonus = Math.max(0, 100 - prev.moves) * 5
        const finalScore = prev.score + timeBonus + moveBonus

        setTimerActive(false)

        return {
          ...prev,
          gameOver: true,
          score: finalScore
        }
      })
    }
  }, [gameState.matches, gameState.timeElapsed, gameState.moves, gameState.score])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && !gameState.paused) {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }))
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, gameState.paused])

  // Initialize game
  useEffect(() => {
    resetGame()
  }, [resetGame])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-dark-800/50 rounded-xl border border-dark-700 w-full max-w-2xl">
      {/* Game Header */}
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-lg font-semibold">Moves: {gameState.moves}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-green-400" />
            <span className="text-lg font-semibold">{formatTime(gameState.timeElapsed)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold">Score: {gameState.score}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative">
        <div
          className="grid gap-2 p-4 bg-dark-900 rounded-lg border-2 border-dark-600"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }}
        >
          <AnimatePresence>
            {gameState.cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="aspect-square"
              >
                <button
                  onClick={() => flipCard(card.id)}
                  disabled={card.isMatched || gameState.flippedCards.length >= 2}
                  className={`
                    w-full h-full rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                    ${card.isMatched
                      ? 'bg-green-600 border-green-400 cursor-default'
                      : card.isFlipped
                        ? 'bg-primary-600 border-primary-400'
                        : 'bg-dark-700 border-dark-600 hover:border-primary-400'
                    }
                    ${gameState.paused ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <AnimatePresence mode="wait">
                    {card.isFlipped || card.isMatched ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center text-2xl"
                      >
                        {card.value}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center text-primary-400"
                      >
                        <Brain className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Game Over Overlay */}
        {gameState.gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-dark-900/90 rounded-lg flex flex-col items-center justify-center"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">Congratulations!</h2>
            <p className="text-gray-300 mb-2">Time: {formatTime(gameState.timeElapsed)}</p>
            <p className="text-gray-300 mb-2">Moves: {gameState.moves}</p>
            <p className="text-gray-300 mb-6">Final Score: {gameState.score}</p>
            <button
              onClick={resetGame}
              className="btn-primary flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </motion.div>
        )}

        {/* Pause Overlay */}
        {gameState.paused && !gameState.gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-dark-900/90 rounded-lg flex flex-col items-center justify-center"
          >
            <h2 className="text-2xl font-bold text-primary-400 mb-4">Paused</h2>
            <p className="text-gray-300 mb-6">Click resume to continue</p>
            <button
              onClick={togglePause}
              className="btn-primary flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePause}
          disabled={gameState.gameOver}
          className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
        >
          {gameState.paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          <span>{gameState.paused ? 'Resume' : 'Pause'}</span>
        </button>
        <button
          onClick={resetGame}
          className="btn-secondary flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 max-w-md">
        <p className="mb-2">Click cards to flip them and find matching pairs</p>
        <p className="mb-2">Match all pairs to win the game</p>
        <p>Try to complete it in fewer moves and less time for a higher score!</p>
      </div>
    </div>
  )
}
