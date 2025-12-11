'use client'

import { useState, useRef } from 'react';

export default function AvatarCreator() {
  const [avatar, setAvatar] = useState({
    face: 0,
    hair: 0,
    eyes: 0,
    mouth: 0,
    color: '#ffdbac'
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const faces = ['😊', '😎', '🤓', '😇', '🥸'];
  const hairs = ['🦲', '👨‍🦲', '👨‍🦱', '👨‍🦰', '👨‍🦳'];
  const eyes = ['👀', '😍', '🤩', '😴', '🙄'];
  const mouths = ['😊', '😁', '😂', '🤐', '😮'];
  const colors = ['#ffdbac', '#f1c27d', '#e0ac69', '#c68642', '#8d5524'];

  const generateAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

    // Clear canvas
    ctx.clearRect(0, 0, 200, 200);

    // Draw face background
    ctx.fillStyle = avatar.color;
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.fill();

    // Draw features
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    
    // Hair
    ctx.fillText(hairs[avatar.hair], 100, 50);
    
    // Eyes
    ctx.fillText(eyes[avatar.eyes], 100, 90);
    
    // Mouth
    ctx.fillText(mouths[avatar.mouth], 100, 130);
  };

  const downloadAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'avatar.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const randomizeAvatar = () => {
    setAvatar({
      face: Math.floor(Math.random() * faces.length),
      hair: Math.floor(Math.random() * hairs.length),
      eyes: Math.floor(Math.random() * eyes.length),
      mouth: Math.floor(Math.random() * mouths.length),
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          👤 Avatar Creator
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customize Avatar</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Hair</label>
                  <div className="flex gap-2">
                    {hairs.map((hair, index) => (
                      <button
                        key={index}
                        onClick={() => setAvatar({...avatar, hair: index})}
                        className={`p-2 text-2xl border rounded ${avatar.hair === index ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                      >
                        {hair}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Eyes</label>
                  <div className="flex gap-2">
                    {eyes.map((eye, index) => (
                      <button
                        key={index}
                        onClick={() => setAvatar({...avatar, eyes: index})}
                        className={`p-2 text-2xl border rounded ${avatar.eyes === index ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                      >
                        {eye}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Mouth</label>
                  <div className="flex gap-2">
                    {mouths.map((mouth, index) => (
                      <button
                        key={index}
                        onClick={() => setAvatar({...avatar, mouth: index})}
                        className={`p-2 text-2xl border rounded ${avatar.mouth === index ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                      >
                        {mouth}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Skin Color</label>
                  <div className="flex gap-2">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setAvatar({...avatar, color})}
                        className={`w-8 h-8 rounded-full border-2 ${avatar.color === color ? 'border-blue-500' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={randomizeAvatar}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Randomize
                  </button>
                  <button
                    onClick={generateAvatar}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview</h3>
              <canvas 
                ref={canvasRef} 
                className="border rounded-lg mx-auto mb-4"
                width={200}
                height={200}
              />
              <button
                onClick={downloadAvatar}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Download Avatar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}