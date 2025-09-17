'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Zap, Target, Rocket } from 'lucide-react'

interface Position3D {
  x: number
  y: number
  z: number
}

interface Enemy {
  id: number
  x: number
  y: number
  z: number
  health: number
}

interface Projectile {
  id: number
  x: number
  y: number
  z: number
}

interface GameState {
  player: Position3D
  enemies: Enemy[]
  projectiles: Projectile[]
  score: number
  health: number
  gameOver: boolean
  paused: boolean
  level: number
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const PLAYER_SPEED = 5
const PROJECTILE_SPEED = 8
const ENEMY_SPEED = 2

export default function SpaceShooter3D() {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 100, z: 0 },
    enemies: [],
    projectiles: [],
    score: 0,
    health: 100,
    gameOver: false,
    paused: false,
    level: 1
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const keysRef = useRef<Set<string>>(new Set())
  const touchKeysRef = useRef<Set<string>>(new Set())
  const [touchUsed, setTouchUsed] = useState(false)
  const touchIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const generateEnemies = useCallback((count: number): Enemy[] => {
    const enemies: Enemy[] = []
    for (let i = 0; i < count; i++) {
      enemies.push({
        id: Date.now() + i,
        x: Math.random() * (CANVAS_WIDTH - 60) + 30,
        y: -50,
        z: Math.random() * 100,
        health: 1
      })
    }
    return enemies
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 100, z: 0 },
      enemies: generateEnemies(5),
      projectiles: [],
      score: 0,
      health: 100,
      gameOver: false,
      paused: false,
      level: 1
    })
  }, [generateEnemies])

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }))
  }, [])

  const shootProjectile = useCallback(() => {
    if (gameState.gameOver || gameState.paused) return

    const newProjectile: Projectile = {
      id: Date.now(),
      x: gameState.player.x,
      y: gameState.player.y - 20,
      z: gameState.player.z
    }

    setGameState(prev => ({
      ...prev,
      projectiles: [...prev.projectiles, newProjectile]
    }))
  }, [gameState.gameOver, gameState.paused, gameState.player])

  const updateGame = useCallback(() => {
    if (gameState.gameOver || gameState.paused) return

    setGameState(prev => {
      let newPlayer = { ...prev.player }
      let newEnemies = [...prev.enemies]
      let newProjectiles = [...prev.projectiles]
      let newScore = prev.score
      let newHealth = prev.health
      let newLevel = prev.level

      // Handle player movement
      if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) {
        newPlayer.x = Math.max(30, newPlayer.x - PLAYER_SPEED)
      }
      if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) {
        newPlayer.x = Math.min(CANVAS_WIDTH - 30, newPlayer.x + PLAYER_SPEED)
      }
      if (keysRef.current.has('ArrowUp') || keysRef.current.has('w')) {
        newPlayer.y = Math.max(50, newPlayer.y - PLAYER_SPEED)
      }
      if (keysRef.current.has('ArrowDown') || keysRef.current.has('s')) {
        newPlayer.y = Math.min(CANVAS_HEIGHT - 50, newPlayer.y + PLAYER_SPEED)
      }

      // Update projectiles
      newProjectiles = newProjectiles
        .map(projectile => ({
          ...projectile,
          y: projectile.y - PROJECTILE_SPEED
        }))
        .filter(projectile => projectile.y > -20)

      // Update enemies
      newEnemies = newEnemies
        .map(enemy => ({
          ...enemy,
          y: enemy.y + ENEMY_SPEED
        }))
        .filter(enemy => enemy.y < CANVAS_HEIGHT + 50)

      // Check projectile-enemy collisions
      newProjectiles.forEach(projectile => {
        newEnemies = newEnemies.filter(enemy => {
          const distance = Math.sqrt(
            Math.pow(projectile.x - enemy.x, 2) +
            Math.pow(projectile.y - enemy.y, 2)
          )
          if (distance < 25) {
            newScore += 10
            return false // Remove enemy
          }
          return true
        })
      })

      // Remove projectiles that hit enemies
      newProjectiles = newProjectiles.filter(projectile => {
        return !newEnemies.some(enemy => {
          const distance = Math.sqrt(
            Math.pow(projectile.x - enemy.x, 2) +
            Math.pow(projectile.y - enemy.y, 2)
          )
          return distance < 25
        })
      })

      // Check player-enemy collisions
      newEnemies.forEach(enemy => {
        const distance = Math.sqrt(
          Math.pow(newPlayer.x - enemy.x, 2) +
          Math.pow(newPlayer.y - enemy.y, 2)
        )
        if (distance < 30) {
          newHealth -= 10
        }
      })

      // Remove enemies that hit player
      newEnemies = newEnemies.filter(enemy => {
        const distance = Math.sqrt(
          Math.pow(newPlayer.x - enemy.x, 2) +
          Math.pow(newPlayer.y - enemy.y, 2)
        )
        return distance >= 30
      })

      // Spawn new enemies
      if (newEnemies.length < 3) {
        newEnemies.push(...generateEnemies(1))
      }

      // Level progression
      if (newScore > newLevel * 100) {
        newLevel++
      }

      // Game over check
      if (newHealth <= 0) {
        return { ...prev, gameOver: true, health: 0 }
      }

      return {
        ...prev,
        player: newPlayer,
        enemies: newEnemies,
        projectiles: newProjectiles,
        score: newScore,
        health: newHealth,
        level: newLevel
      }
    })
  }, [gameState.gameOver, gameState.paused, generateEnemies])

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas with space background
    ctx.fillStyle = '#000011'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw stars
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % CANVAS_WIDTH
      const y = (i * 23) % CANVAS_HEIGHT
      ctx.fillRect(x, y, 1, 1)
    }

    // Draw player (spaceship)
    ctx.save()
    ctx.translate(gameState.player.x, gameState.player.y)
    ctx.fillStyle = '#00ff00'
    ctx.beginPath()
    ctx.moveTo(0, -15)
    ctx.lineTo(-10, 10)
    ctx.lineTo(10, 10)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // Draw enemies
    gameState.enemies.forEach(enemy => {
      ctx.save()
      ctx.translate(enemy.x, enemy.y)
      ctx.fillStyle = '#ff0000'
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Draw projectiles
    gameState.projectiles.forEach(projectile => {
      ctx.save()
      ctx.translate(projectile.x, projectile.y)
      ctx.fillStyle = '#ffff00'
      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }, [gameState])

  const gameLoop = useCallback(() => {
    updateGame()
    drawGame()
    animationRef.current = requestAnimationFrame(gameLoop)
  }, [updateGame, drawGame])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (touchUsed) return

    const key = event.key
    keysRef.current.add(key)
    if (key === ' ') {
      event.preventDefault()
      shootProjectile()
    }
    if (key.toLowerCase() === 'p') {
      togglePause()
    }
    if (key.toLowerCase() === 'r') {
      resetGame()
    }
  }, [shootProjectile, togglePause, resetGame, touchUsed])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    keysRef.current.delete(event.key)
  }, [])

  // Touch controls
  const startTouchMove = useCallback((direction: string) => {
    setTouchUsed(true)
    const keyMap: { [key: string]: string } = {
      'left': 'a',
      'right': 'd',
      'up': 'w',
      'down': 's'
    }
    const key = keyMap[direction] || ''
    if (key && !keysRef.current.has(key)) {
      keysRef.current.add(key)
    }
  }, [])

  const stopTouchMove = useCallback((direction: string) => {
    const keyMap: { [key: string]: string } = {
      'left': 'a',
      'right': 'd',
      'up': 'w',
      'down': 's'
    }
    const key = keyMap[direction] || ''
    if (key) {
      keysRef.current.delete(key)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  useEffect(() => {
    if (!gameState.gameOver && !gameState.paused) {
      animationRef.current = requestAnimationFrame(gameLoop)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameLoop, gameState.gameOver, gameState.paused])

  useEffect(() => {
    drawGame()
  }, [drawGame])

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-dark-800/50 rounded-xl border border-dark-700 w-full max-w-4xl">
      {/* Game Header */}
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-lg font-semibold">Score: {gameState.score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-red-400" />
            <span className="text-lg font-semibold">HP: {gameState.health}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold">Level: {gameState.level}</span>
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-dark-600 rounded-lg bg-black"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        {/* Mobile Touch Controls */}
        <div className="md:hidden flex flex-col items-center mt-4 select-none">
          <div className="flex justify-center mb-2">
            <button
              aria-label="Up"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => startTouchMove('up')}
              onTouchEnd={() => stopTouchMove('up')}
              onMouseDown={() => startTouchMove('up')}
              onMouseUp={() => stopTouchMove('up')}
            >▲</button>
          </div>
          <div className="flex justify-center space-x-12 mb-2">
            <button
              aria-label="Left"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => startTouchMove('left')}
              onTouchEnd={() => stopTouchMove('left')}
              onMouseDown={() => startTouchMove('left')}
              onMouseUp={() => stopTouchMove('left')}
            >◀</button>
            <button
              aria-label="Shoot"
              className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg active:scale-95 transition-all border-2 border-yellow-400"
              onTouchStart={shootProjectile}
              onClick={shootProjectile}
            >⚡</button>
            <button
              aria-label="Right"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => startTouchMove('right')}
              onTouchEnd={() => stopTouchMove('right')}
              onMouseDown={() => startTouchMove('right')}
              onMouseUp={() => stopTouchMove('right')}
            >▶</button>
          </div>
          <div className="flex justify-center">
            <button
              aria-label="Down"
              className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-3xl shadow-lg active:scale-95 transition-all border-2 border-primary-600"
              onTouchStart={() => startTouchMove('down')}
              onTouchEnd={() => stopTouchMove('down')}
              onMouseDown={() => startTouchMove('down')}
              onMouseUp={() => stopTouchMove('down')}
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
            <p className="text-gray-300 mb-2">Final Score: {gameState.score}</p>
            <p className="text-gray-300 mb-6">Level Reached: {gameState.level}</p>
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
            <p className="text-gray-300 mb-6">Press P to resume</p>
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
        <p className="mb-2">Press <kbd className="px-2 py-1 bg-dark-700 rounded">SPACE</kbd> to shoot</p>
        <p className="mb-2">Press <kbd className="px-2 py-1 bg-dark-700 rounded">P</kbd> to pause/resume</p>
        <p>Press <kbd className="px-2 py-1 bg-dark-700 rounded">R</kbd> to reset</p>
        <p className="mb-2 md:hidden block">Use directional buttons to move, lightning button to shoot. Once you use touch controls, keyboard movement is disabled for this session.</p>
      </div>
    </div>
  )
}
