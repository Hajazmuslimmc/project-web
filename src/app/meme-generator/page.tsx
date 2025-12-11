'use client'

import { useState, useRef } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('drake');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const templates = {
    drake: 'https://i.imgflip.com/30b1gx.jpg',
    distracted: 'https://i.imgflip.com/1ur9b0.jpg',
    woman_cat: 'https://i.imgflip.com/345v97.jpg'
  };

  const generateMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      
      ctx?.drawImage(img, 0, 0, 500, 500);
      
      if (ctx) {
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        
        // Top text
        ctx.fillText(topText, 250, 50);
        ctx.strokeText(topText, 250, 50);
        
        // Bottom text
        ctx.fillText(bottomText, 250, 450);
        ctx.strokeText(bottomText, 250, 450);
      }
    };
    
    img.src = templates[selectedTemplate as keyof typeof templates];
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          😂 Meme Generator
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Template:
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="drake">Drake Pointing</option>
                  <option value="distracted">Distracted Boyfriend</option>
                  <option value="woman_cat">Woman Yelling at Cat</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Top Text:
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Bottom Text:
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={generateMeme}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Generate Meme
                </button>
                <button
                  onClick={downloadMeme}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Download
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview:</h3>
              <canvas ref={canvasRef} className="w-full border rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}