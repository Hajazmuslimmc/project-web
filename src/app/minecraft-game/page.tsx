'use client'

import { useState, useEffect } from 'react';

type Block = {
  type: 'grass' | 'dirt' | 'stone' | 'wood' | 'water' | 'air';
  x: number;
  y: number;
};

export default function MinecraftGame() {
  const [world, setWorld] = useState<Block[][]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block['type']>('grass');
  const [playerX, setPlayerX] = useState(5);
  const [playerY, setPlayerY] = useState(5);
  const [inventory, setInventory] = useState<Record<Block['type'], number>>({
    grass: 10, dirt: 10, stone: 5, wood: 5, water: 3, air: 0
  });

  const blockColors = {
    grass: '#4ade80',
    dirt: '#a3a3a3',
    stone: '#6b7280',
    wood: '#d97706',
    water: '#3b82f6',
    air: 'transparent'
  };

  const blockEmojis = {
    grass: '🟩',
    dirt: '🟫',
    stone: '⬜',
    wood: '🟧',
    water: '🟦',
    air: ''
  };

  useEffect(() => {
    // Generate initial world
    const newWorld: Block[][] = [];
    for (let y = 0; y < 15; y++) {
      const row: Block[] = [];
      for (let x = 0; x < 20; x++) {
        let blockType: Block['type'] = 'air';
        
        if (y > 10) blockType = 'stone';
        else if (y > 8) blockType = 'dirt';
        else if (y === 8) blockType = 'grass';
        else if (Math.random() < 0.1 && y > 5) blockType = 'water';
        
        row.push({ type: blockType, x, y });
      }
      newWorld.push(row);
    }
    setWorld(newWorld);
  }, []);

  const placeBlock = (x: number, y: number) => {
    if (selectedBlock === 'air' || inventory[selectedBlock] <= 0) return;
    
    setWorld(prev => {
      const newWorld = [...prev];
      if (newWorld[y] && newWorld[y][x]) {
        newWorld[y][x] = { ...newWorld[y][x], type: selectedBlock };
      }
      return newWorld;
    });
    
    setInventory(prev => ({
      ...prev,
      [selectedBlock]: prev[selectedBlock] - 1
    }));
  };

  const breakBlock = (x: number, y: number) => {
    const block = world[y]?.[x];
    if (!block || block.type === 'air') return;
    
    setWorld(prev => {
      const newWorld = [...prev];
      if (newWorld[y] && newWorld[y][x]) {
        newWorld[y][x] = { ...newWorld[y][x], type: 'air' };
      }
      return newWorld;
    });
    
    if (block.type !== 'air') {
      setInventory(prev => ({
        ...prev,
        [block.type]: prev[block.type] + 1
      }));
    }
  };

  const movePlayer = (dx: number, dy: number) => {
    setPlayerX(prev => Math.max(0, Math.min(19, prev + dx)));
    setPlayerY(prev => Math.max(0, Math.min(14, prev + dy)));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-sky-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2">⛏️ Minecraft 2D</h1>
          <p className="text-gray-700">Build, break, and explore your blocky world!</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Inventory */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Inventory & Tools</h3>
            <div className="flex gap-2 mb-4">
              {Object.entries(inventory).map(([block, count]) => (
                <button
                  key={block}
                  onClick={() => setSelectedBlock(block as Block['type'])}
                  className={`px-3 py-2 rounded border-2 transition-colors ${
                    selectedBlock === block 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-lg">{blockEmojis[block as Block['type']]}</div>
                  <div className="text-xs capitalize">{block}: {count}</div>
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Selected: <span className="font-semibold capitalize">{selectedBlock}</span> | 
              Player: ({playerX}, {playerY})
            </div>
          </div>

          {/* Game World */}
          <div className="bg-sky-100 p-4 rounded-lg overflow-auto">
            <div className="grid grid-cols-20 gap-0 w-fit mx-auto">
              {world.map((row, y) =>
                row.map((block, x) => (
                  <div
                    key={`${x}-${y}`}
                    className="w-6 h-6 border border-gray-200 cursor-pointer relative flex items-center justify-center text-xs"
                    style={{ backgroundColor: blockColors[block.type] }}
                    onClick={(e) => {
                      if (e.shiftKey) {
                        breakBlock(x, y);
                      } else {
                        placeBlock(x, y);
                      }
                    }}
                  >
                    {block.type !== 'air' && blockEmojis[block.type]}
                    {playerX === x && playerY === y && (
                      <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
                        🧍
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Movement</h4>
              <div className="grid grid-cols-3 gap-1 w-fit">
                <div></div>
                <button
                  onClick={() => movePlayer(0, -1)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ↑
                </button>
                <div></div>
                <button
                  onClick={() => movePlayer(-1, 0)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ←
                </button>
                <div className="px-3 py-2 bg-gray-200 rounded text-center">🧍</div>
                <button
                  onClick={() => movePlayer(1, 0)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  →
                </button>
                <div></div>
                <button
                  onClick={() => movePlayer(0, 1)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ↓
                </button>
                <div></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() => placeBlock(playerX, playerY)}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Place Block
                </button>
                <button
                  onClick={() => breakBlock(playerX, playerY)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Break Block
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">How to Play:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use WASD or arrow keys to move</li>
              <li>• Click blocks to place selected block type</li>
              <li>• Shift+Click to break blocks</li>
              <li>• Select blocks from inventory to build</li>
              <li>• Red square shows your player position</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-700">← Back to Tools</a>
        </div>
      </div>
    </div>
  );
}