'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Trophy, Target } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface GameState {
  snake: Position[]
  food: Position
  direction: string
  gameOver: boolean
  paused: boolean
  score: number
  highScore: number
}

const GRID_SIZE = 25
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
]

const INITIAL_FOOD = { x: 15, y: 15 }

export default function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'UP',
    gameOver: false,
    paused: false,
    score: 0,
    highScore: 0
  })

  const gameLoopRef = useRef<NodeJS.Timeout>()
  const lastDirectionRef = useRef<string>('UP')
  const [touchUsed, setTouchUsed] = useState(false)

  const generateFood = useCallback((): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [gameState.snake])

  const resetGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'UP',
      gameOver: false,
      paused: false,
      score: 0,
      highScore: Math.max(gameState.score, gameState.highScore)
    })
    lastDirectionRef.current = 'UP'
  }, [gameState.score, gameState.highScore])

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }))
  }, [])

  const moveSnake = useCallback(() => {
    if (gameState.gameOver || gameState.paused) return

    setGameState(prev => {
      const newSnake = [...prev.snake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (lastDirectionRef.current) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE
          break
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE
          break
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE
          break
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE
          break
      }

      // Check collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, gameOver: true }
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === prev.food.x && head.y === prev.food.y) {
        const newFood = generateFood()
        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: prev.score + 10
        }
      } else {
        newSnake.pop()
        return { ...prev, snake: newSnake }
      }
    })
  }, [gameState.gameOver, gameState.paused, generateFood])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver || touchUsed) return

    const key = event.key.toLowerCase()
    const currentDirection = lastDirectionRef.current

    switch (key) {
      case 'arrowup':
      case 'w':
        if (currentDirection !== 'DOWN') {
          lastDirectionRef.current = 'UP'
          setGameState(prev => ({ ...prev, direction: 'UP' }))
        }
        break
      case 'arrowdown':
      case 's':
        if (currentDirection !== 'UP') {
          lastDirectionRef.current = 'DOWN'
          setGameState(prev => ({ ...prev, direction: 'DOWN' }))
        }
        break
      case 'arrowleft':
      case 'a':
        if (currentDirection !== 'RIGHT') {
          lastDirectionRef.current = 'LEFT'
          setGameState(prev => ({ ...prev, direction: 'LEFT' }))
        }
        break
      case 'arrowright':
      case 'd':
        if (currentDirection !== 'LEFT') {
          lastDirectionRef.current = 'RIGHT'
          setGameState(prev => ({ ...prev, direction: 'RIGHT' }))
        }
        break
      case ' ':
        event.preventDefault()
        togglePause()
        break
      case 'r':
        resetGame()
        break
    }
  }, [gameState.gameOver, togglePause, resetGame, touchUsed])

  // Touch controls for mobile
  const handleTouchDirection = (dir: string) => {
    setTouchUsed(true)
    const currentDirection = lastDirectionRef.current
    switch (dir) {
      case 'UP':
        if (currentDirection !== 'DOWN') {
          lastDirectionRef.current = 'UP'
          setGameState(prev => ({ ...prev, direction: 'UP' }))
        }
        break
      case 'DOWN':
        if (currentDirection !== 'UP') {
          lastDirectionRef.current = 'DOWN'
          setGameState(prev => ({ ...prev, direction: 'DOWN' }))
        }
        break
      case 'LEFT':
        if (currentDirection !== 'RIGHT') {
          lastDirectionRef.current = 'LEFT'
          setGameState(prev => ({ ...prev, direction: 'LEFT' }))
        }
        break
      case 'RIGHT':
        if (currentDirection !== 'LEFT') {
          lastDirectionRef.current = 'RIGHT'
          setGameState(prev => ({ ...prev, direction: 'RIGHT' }))
        }
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!gameState.gameOver && !gameState.paused) {
      gameLoopRef.current = setInterval(moveSnake, 150)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [moveSnake, gameState.gameOver, gameState.paused])

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = gameState.snake[0]?.x === x && gameState.snake[0]?.y === y
    const isSnakeBody = gameState.snake.slice(1).some(segment => segment.x === x && segment.y === y)
    const isFood = gameState.food.x === x && gameState.food.y === y

    let cellClass = 'w-4 h-4 border border-dark-600'
    
    if (isSnakeHead) {
      cellClass += ' bg-gradient-to-r from-primary-500 to-purple-500 rounded-sm'
    } else if (isSnakeBody) {
      cellClass += ' bg-primary-400 rounded-sm'
    } else if (isFood) {
      cellClass += ' bg-red-500 rounded-full animate-pulse'
    } else {
      cellClass += ' bg-dark-700'
    }

    return <div key={`${x}-${y}`} className={cellClass} />
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-dark-800/50 rounded-xl border border-dark-700 w-full max-w-full">
      {/* Game Header */}
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary-400" />
            <span className="text-lg font-semibold">Score: {gameState.score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold">Best: {gameState.highScore}</span>
          </div>
        </div>
      </div>

  {/* Game Board */}
  <div className="relative">
        <div 
          className="grid gap-0.5 p-4 bg-dark-900 rounded-lg border-2 border-dark-600"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }}
        >
          {Array.from({ length: GRID_SIZE }, (_, y) =>
            Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
          )}
        </div>

        {/* Mobile Touch Controls */}
        <div className="md:hidden flex flex-col items-center mt-4 select-none">
          <div className="flex justify-center mb-2">
            <button
              aria-label="Up"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => handleTouchDirection('UP')}
              onClick={() => handleTouchDirection('UP')}
            >▲</button>
          </div>
          <div className="flex justify-center space-x-12 mb-2">
            <button
              aria-label="Left"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => handleTouchDirection('LEFT')}
              onClick={() => handleTouchDirection('LEFT')}
            >◀</button>
            <button
              aria-label="Right"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => handleTouchDirection('RIGHT')}
              onClick={() => handleTouchDirection('RIGHT')}
            >▶</button>
          </div>
          <div className="flex justify-center">
            <button
              aria-label="Down"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => handleTouchDirection('DOWN')}
              onClick={() => handleTouchDirection('DOWN')}
            >▼</button>
          </div>
        </div>

        {/* Game Over Overlay */}
        {gameState.gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-dark-900/90 rounded-lg flex flex-col items-center justify-center"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-4">Game Over!</h2>
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
            <p className="text-gray-300 mb-6">Press SPACE to resume</p>
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
        <p className="mb-2 md:block hidden">Use <kbd className="px-2 py-1 bg-dark-700 rounded">WASD</kbd> or <kbd className="px-2 py-1 bg-dark-700 rounded">Arrow Keys</kbd> to move</p>
        <p className="mb-2">Press <kbd className="px-2 py-1 bg-dark-700 rounded">SPACE</kbd> to pause/resume</p>
        <p>Press <kbd className="px-2 py-1 bg-dark-700 rounded">R</kbd> to reset</p>
        <p className="mb-2 md:hidden block">Tap the arrows to move on mobile. Once you use touch controls, keyboard movement is disabled for this session.</p>
      </div>
    </div>
  )
}
