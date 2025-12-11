'use client'

import { useState, useEffect, useCallback } from 'react';

type Player = {
  x: number;
  y: number;
  color: string;
  name: string;
  size: number;
  score: number;
};

type Block = {
  x: number;
  y: number;
  color: string;
  size: number;
};

export default function BloxedIO() {
  const [player, setPlayer] = useState<Player>({
    x: 50, y: 50, color: '#ff4444', name: 'Player', size: 20, score: 0
  });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [gameMode, setGameMode] = useState('classic');
  const [gameRunning, setGameRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (!gameRunning) return;
    setPlayer(prev => ({
      ...prev,
      x: Math.max(5, Math.min(95, prev.x + dx)),
      y: Math.max(5, Math.min(95, prev.y + dy))
    }));
  }, [gameRunning]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const speed = 2;
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -speed);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, speed);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-speed, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(speed, 0);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      // Spawn blocks
      if (Math.random() < 0.3) {
        const newBlock: Block = {
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          size: Math.random() * 15 + 5
        };
        setBlocks(prev => [...prev, newBlock]);
      }

      // Check collisions
      setBlocks(prev => {
        const remaining = prev.filter(block => {
          const distance = Math.sqrt(
            Math.pow(block.x - player.x, 2) + Math.pow(block.y - player.y, 2)
          );
          
          if (distance < (player.size + block.size) / 4) {
            if (gameMode === 'classic' || gameMode === 'survival') {
              if (block.size <= player.size) {
                setPlayer(p => ({ 
                  ...p, 
                  size: Math.min(50, p.size + 1),
                  score: p.score + Math.floor(block.size)
                }));
                return false;
              }
            } else if (gameMode === 'collect') {
              setPlayer(p => ({ ...p, score: p.score + 10 }));
              return false;
            }
          }
          return true;
        });
        
        return remaining.slice(-20); // Limit blocks
      });

      // Timer for timed modes
      if (gameMode === 'timed' || gameMode === 'collect') {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameRunning, player, gameMode]);

  const startGame = () => {
    setPlayer({ x: 50, y: 50, color: '#ff4444', name: 'Player', size: 20, score: 0 });
    setBlocks([]);
    setTimeLeft(gameMode === 'timed' || gameMode === 'collect' ? 60 : 999);
    setGameRunning(true);
  };

  const gameModes = {
    classic: 'Eat smaller blocks to grow',
    survival: 'Survive as long as possible',
    timed: 'Get highest score in 60 seconds',
    collect: 'Collect as many blocks as possible'
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🟦 Bloxed.io</h1>
          <p className="text-gray-300">Multiplayer block collection game</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8">
          {/* Game Mode Selection */}
          {!gameRunning && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Select Game Mode</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(gameModes).map(([mode, desc]) => (
                  <button
                    key={mode}
                    onClick={() => setGameMode(mode)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      gameMode === mode 
                        ? 'border-blue-500 bg-blue-900' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-semibold capitalize">{mode}</div>
                    <div className="text-sm text-gray-400">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Game Stats */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg">Score: {player.score}</div>
            <div className="text-lg">Size: {player.size}</div>
            {(gameMode === 'timed' || gameMode === 'collect') && (
              <div className="text-lg">Time: {timeLeft}s</div>
            )}
          </div>

          {/* Game Area */}
          <div className="relative w-full h-96 bg-gray-700 rounded-lg overflow-hidden border-4 border-blue-400">
            {/* Player */}
            <div
              className="absolute rounded-full transition-all duration-100"
              style={{
                left: `${player.x}%`,
                top: `${player.y}%`,
                width: `${player.size}px`,
                height: `${player.size}px`,
                backgroundColor: player.color,
                transform: 'translate(-50%, -50%)'
              }}
            />

            {/* Blocks */}
            {blocks.map((block, index) => (
              <div
                key={index}
                className="absolute rounded"
                style={{
                  left: `${block.x}%`,
                  top: `${block.y}%`,
                  width: `${block.size}px`,
                  height: `${block.size}px`,
                  backgroundColor: block.color,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}

            {/* Game Over/Start Overlay */}
            {!gameRunning && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-4">
                    {player.score > 0 ? `Game Over! Score: ${player.score}` : 'Ready to Play?'}
                  </div>
                  <div className="text-sm text-gray-300 mb-4">
                    Use WASD or arrow keys to move
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6">
            {!gameRunning ? (
              <button
                onClick={startGame}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Start Game
              </button>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => movePlayer(0, -5)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  ↑
                </button>
                <button
                  onClick={() => movePlayer(-5, 0)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  ←
                </button>
                <button
                  onClick={() => movePlayer(0, 5)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  ↓
                </button>
                <button
                  onClick={() => movePlayer(5, 0)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="font-semibold mb-2">How to Play:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Move with WASD or arrow keys</li>
              <li>• Collect blocks to increase your score</li>
              <li>• In Classic mode, eat smaller blocks to grow</li>
              <li>• Avoid larger blocks in Survival mode</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-blue-400 hover:text-blue-300">← Back to Tools</a>
        </div>
      </div>
    </div>
  );
}