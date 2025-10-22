'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Sword, Shield, Heart } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface Enemy {
  id: number
  x: number
  y: number
  health: number
}

interface GameState {
  player: Position
  enemies: Enemy[]
  projectiles: Position[]
  direction: string
  gameOver: boolean
  paused: boolean
  score: number
  health: number
  level: number
}

const GRID_SIZE = 15
const PLAYER_SPEED = 200 // ms
const ENEMY_SPEED = 400 // ms
const PROJECTILE_SPEED = 100 // ms

export default function PixelWarriorGame() {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 7, y: 7 },
    enemies: [],
    projectiles: [],
    direction: 'DOWN',
    gameOver: false,
    paused: false,
    score: 0,
    health: 100,
    level: 1
  })

  const gameLoopRef = useRef<NodeJS.Timeout>()
  const enemyMoveRef = useRef<NodeJS.Timeout>()
  const projectileMoveRef = useRef<NodeJS.Timeout>()
  const [touchUsed, setTouchUsed] = useState(false)

  const generateEnemies = useCallback((count: number): Enemy[] => {
    const enemies: Enemy[] = []
    for (let i = 0; i < count; i++) {
      let enemy: Enemy
      do {
        enemy = {
          id: i,
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
          health: 2
        }
      } while (
        (enemy.x === gameState.player.x && enemy.y === gameState.player.y) ||
        enemies.some(e => e.x === enemy.x && e.y === enemy.y)
      )
      enemies.push(enemy)
    }
    return enemies
  }, [gameState.player])

  const resetGame = useCallback(() => {
    setGameState({
      player: { x: 7, y: 7 },
      enemies: generateEnemies(3),
      projectiles: [],
      direction: 'DOWN',
      gameOver: false,
      paused: false,
      score: 0,
      health: 100,
      level: 1
    })
  }, [generateEnemies])

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }))
  }, [])

  const movePlayer = useCallback((direction: string) => {
    if (gameState.gameOver || gameState.paused) return

    setGameState(prev => {
      const newPlayer = { ...prev.player }

      switch (direction) {
        case 'UP':
          newPlayer.y = Math.max(0, newPlayer.y - 1)
          break
        case 'DOWN':
          newPlayer.y = Math.min(GRID_SIZE - 1, newPlayer.y + 1)
          break
        case 'LEFT':
          newPlayer.x = Math.max(0, newPlayer.x - 1)
          break
        case 'RIGHT':
          newPlayer.x = Math.min(GRID_SIZE - 1, newPlayer.x + 1)
          break
      }

      return { ...prev, player: newPlayer, direction }
    })
  }, [gameState.gameOver, gameState.paused])

  const shootProjectile = useCallback(() => {
    if (gameState.gameOver || gameState.paused) return

    setGameState(prev => ({
      ...prev,
      projectiles: [...prev.projectiles, { ...prev.player }]
    }))
  }, [gameState.gameOver, gameState.paused])

  const moveProjectiles = useCallback(() => {
    setGameState(prev => {
      const newProjectiles = prev.projectiles
        .map(projectile => {
          switch (prev.direction) {
            case 'UP':
              return { ...projectile, y: projectile.y - 1 }
            case 'DOWN':
              return { ...projectile, y: projectile.y + 1 }
            case 'LEFT':
              return { ...projectile, x: projectile.x - 1 }
            case 'RIGHT':
              return { ...projectile, x: projectile.x + 1 }
            default:
              return projectile
          }
        })
        .filter(projectile =>
          projectile.x >= 0 && projectile.x < GRID_SIZE &&
          projectile.y >= 0 && projectile.y < GRID_SIZE
        )

      // Check projectile-enemy collisions
      const newEnemies = prev.enemies.filter(enemy => {
        const hit = newProjectiles.some(projectile =>
          projectile.x === enemy.x && projectile.y === enemy.y
        )
        if (hit) {
          // Remove projectile that hit
          const projectileIndex = newProjectiles.findIndex(p =>
            p.x === enemy.x && p.y === enemy.y
          )
          if (projectileIndex !== -1) {
            newProjectiles.splice(projectileIndex, 1)
          }
          return false // Remove enemy
        }
        return true
      })

      // Check if level is complete
      let newScore = prev.score
      let newLevel = prev.level
      if (newEnemies.length === 0) {
        newLevel++
        newScore += 100 * prev.level
        return {
          ...prev,
          enemies: generateEnemies(3 + prev.level),
          projectiles: newProjectiles,
          score: newScore,
          level: newLevel
        }
      }

      return { ...prev, projectiles: newProjectiles, enemies: newEnemies, score: newScore + newEnemies.length < prev.enemies.length ? 10 : 0 }
    })
  }, [generateEnemies])

  const moveEnemies = useCallback(() => {
    setGameState(prev => {
      const newEnemies = prev.enemies.map(enemy => {
        const directions = [
          { x: enemy.x, y: enemy.y - 1 },
          { x: enemy.x, y: enemy.y + 1 },
          { x: enemy.x - 1, y: enemy.y },
          { x: enemy.x + 1, y: enemy.y }
        ].filter(dir =>
          dir.x >= 0 && dir.x < GRID_SIZE &&
          dir.y >= 0 && dir.y < GRID_SIZE &&
          !(dir.x === prev.player.x && dir.y === prev.player.y)
        )

        if (directions.length > 0) {
          const randomDir = directions[Math.floor(Math.random() * directions.length)]
          return { ...enemy, x: randomDir.x, y: randomDir.y }
        }
        return enemy
      })

      // Check player-enemy collisions
      const playerHit = newEnemies.some(enemy =>
        enemy.x === prev.player.x && enemy.y === prev.player.y
      )

      if (playerHit) {
        const newHealth = prev.health - 20
        if (newHealth <= 0) {
          return { ...prev, gameOver: true, health: 0 }
        }
        return { ...prev, health: newHealth }
      }

      return { ...prev, enemies: newEnemies }
    })
  }, [])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver || touchUsed) return

    const key = event.key.toLowerCase()

    switch (key) {
      case 'arrowup':
      case 'w':
        movePlayer('UP')
        break
      case 'arrowdown':
      case 's':
        movePlayer('DOWN')
        break
      case 'arrowleft':
      case 'a':
        movePlayer('LEFT')
        break
      case 'arrowright':
      case 'd':
        movePlayer('RIGHT')
        break
      case ' ':
        event.preventDefault()
        shootProjectile()
        break
      case 'p':
        togglePause()
        break
      case 'r':
        resetGame()
        break
    }
  }, [gameState.gameOver, movePlayer, shootProjectile, togglePause, resetGame, touchUsed])

  // Touch controls
  const handleTouchDirection = (dir: string) => {
    setTouchUsed(true)
    movePlayer(dir)
  }

  const handleTouchShoot = () => {
    setTouchUsed(true)
    shootProjectile()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!gameState.gameOver && !gameState.paused) {
      gameLoopRef.current = setInterval(() => {}, PLAYER_SPEED)
      enemyMoveRef.current = setInterval(moveEnemies, ENEMY_SPEED)
      projectileMoveRef.current = setInterval(moveProjectiles, PROJECTILE_SPEED)
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      if (enemyMoveRef.current) clearInterval(enemyMoveRef.current)
      if (projectileMoveRef.current) clearInterval(projectileMoveRef.current)
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      if (enemyMoveRef.current) clearInterval(enemyMoveRef.current)
      if (projectileMoveRef.current) clearInterval(projectileMoveRef.current)
    }
  }, [moveEnemies, moveProjectiles, gameState.gameOver, gameState.paused])

  useEffect(() => {
    setGameState(prev => ({ ...prev, enemies: generateEnemies(3) }))
  }, [generateEnemies])

  const renderCell = (x: number, y: number) => {
    const isPlayer = gameState.player.x === x && gameState.player.y === y
    const enemy = gameState.enemies.find(e => e.x === x && e.y === y)
    const isProjectile = gameState.projectiles.some(p => p.x === x && p.y === y)

    let cellClass = 'w-6 h-6 border border-dark-600'

    if (isPlayer) {
      cellClass += ' bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm flex items-center justify-center'
    } else if (enemy) {
      cellClass += ' bg-gradient-to-r from-red-500 to-red-600 rounded-sm flex items-center justify-center'
    } else if (isProjectile) {
      cellClass += ' bg-yellow-400 rounded-full'
    } else {
      cellClass += ' bg-dark-700'
    }

    return (
      <div key={`${x}-${y}`} className={cellClass}>
        {isPlayer && <Sword className="w-3 h-3 text-white" />}
        {enemy && <Shield className="w-3 h-3 text-white" />}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-dark-800/50 rounded-xl border border-dark-700 w-full max-w-full">
      {/* Game Header */}
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sword className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold">Score: {gameState.score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-lg font-semibold">HP: {gameState.health}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-lg font-semibold">Level: {gameState.level}</span>
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
              className="w-14 h-14 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-2xl shadow-md active:scale-95 transition-all"
              onTouchStart={() => handleTouchDirection('UP')}
              onClick={() => handleTouchDirection('UP')}
            >▲</button>
          </div>
          <div className="flex justify-center space-x-8">
            <button
              aria-label="Left"
              className="w-14 h-14 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-2xl shadow-md active:scale-95 transition-all"
              onTouchStart={() => handleTouchDirection('LEFT')}
              onClick={() => handleTouchDirection('LEFT')}
            >◀</button>
            <button
              aria-label="Shoot"
              className="w-14 h-14 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xl shadow-md active:scale-95 transition-all"
              onTouchStart={handleTouchShoot}
              onClick={handleTouchShoot}
            >⚔</button>
            <button
              aria-label="Right"
              className="w-14 h-14 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-2xl shadow-md active:scale-95 transition-all"
              onTouchStart={() => handleTouchDirection('RIGHT')}
              onClick={() => handleTouchDirection('RIGHT')}
            >▶</button>
          </div>
          <div className="flex justify-center mt-2">
            <button
              aria-label="Down"
              className="w-14 h-14 bg-dark-700 rounded-full flex items-center justify-center text-primary-400 text-2xl shadow-md active:scale-95 transition-all"
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
        <p className="mb-2 md:hidden block">Tap arrows to move, sword button to shoot. Once you use touch controls, keyboard movement is disabled for this session.</p>
      </div>
    </div>
  )
}
