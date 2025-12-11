'use client'

import { useState, useEffect, useCallback } from 'react';

export default function CarRaceGame() {
  const [carPosition, setCarPosition] = useState(50);
  const [obstacles, setObstacles] = useState<{id: number, x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const moveCar = useCallback((direction: 'left' | 'right') => {
    if (!gameRunning) return;
    setCarPosition(prev => {
      if (direction === 'left') return Math.max(10, prev - 10);
      return Math.min(90, prev + 10);
    });
  }, [gameRunning]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveCar('left');
      if (e.key === 'ArrowRight') moveCar('right');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveCar]);

  useEffect(() => {
    if (!gameRunning) return;
    
    const gameLoop = setInterval(() => {
      setObstacles(prev => {
        const updated = prev.map(obs => ({ ...obs, y: obs.y + 5 }))
          .filter(obs => obs.y < 100);
        
        if (Math.random() < 0.3) {
          updated.push({
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: -5
          });
        }
        
        // Check collision
        const collision = updated.some(obs => 
          obs.y > 70 && obs.y < 85 && 
          Math.abs(obs.x - carPosition) < 8
        );
        
        if (collision) {
          setGameOver(true);
          setGameRunning(false);
        }
        
        return updated;
      });
      
      setScore(prev => prev + 1);
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameRunning, carPosition]);

  const startGame = () => {
    setScore(0);
    setObstacles([]);
    setCarPosition(50);
    setGameOver(false);
    setGameRunning(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🏎️ Car Race Game</h1>
          <p className="text-gray-300">Use arrow keys or buttons to avoid obstacles!</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8">
          {/* Score */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold">Score: {score}</div>
          </div>

          {/* Game Area */}
          <div className="relative w-full h-96 bg-gray-700 rounded-lg overflow-hidden border-4 border-yellow-400">
            {/* Road lines */}
            <div className="absolute left-1/2 top-0 w-1 h-full bg-white opacity-50 transform -translate-x-1/2"></div>
            
            {/* Car */}
            <div 
              className="absolute bottom-4 w-8 h-12 bg-red-500 rounded transition-all duration-100"
              style={{ left: `${carPosition}%`, transform: 'translateX(-50%)' }}
            >
              🚗
            </div>

            {/* Obstacles */}
            {obstacles.map(obstacle => (
              <div
                key={obstacle.id}
                className="absolute w-8 h-8 bg-blue-500 rounded"
                style={{ 
                  left: `${obstacle.x}%`, 
                  top: `${obstacle.y}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                🚙
              </div>
            ))}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-4">Game Over!</div>
                  <div className="text-xl mb-4">Final Score: {score}</div>
                </div>
              </div>
            )}

            {/* Start Screen */}
            {!gameRunning && !gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-4">Ready to Race?</div>
                  <div className="text-sm text-gray-300">Use ← → arrow keys to move</div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6">
            {!gameRunning ? (
              <button
                onClick={startGame}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {gameOver ? 'Play Again' : 'Start Game'}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => moveCar('left')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ← Left
                </button>
                <button
                  onClick={() => moveCar('right')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Right →
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-blue-400 hover:text-blue-300">← Back to Tools</a>
        </div>
      </div>
    </div>
  );
}