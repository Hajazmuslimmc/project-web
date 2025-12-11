'use client'

import { useState, useRef } from 'react';

export default function ThumbnailMaker() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [bgColor, setBgColor] = useState('#ff6b6b');
  const [textColor, setTextColor] = useState('#ffffff');
  const [template, setTemplate] = useState('gradient');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const templates = {
    gradient: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', name: 'Gradient Blue' },
    red: { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', name: 'Pink Red' },
    green: { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', name: 'Blue Cyan' },
    orange: { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', name: 'Green Mint' }
  };

  const generateThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (template === 'gradient') {
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
    } else if (template === 'red') {
      gradient.addColorStop(0, '#f093fb');
      gradient.addColorStop(1, '#f5576c');
    } else if (template === 'green') {
      gradient.addColorStop(0, '#4facfe');
      gradient.addColorStop(1, '#00f2fe');
    } else {
      gradient.addColorStop(0, '#43e97b');
      gradient.addColorStop(1, '#38f9d7');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    
    const titleY = canvas.height / 2 - 40;
    ctx.strokeText(title, canvas.width / 2, titleY);
    ctx.fillText(title, canvas.width / 2, titleY);

    // Subtitle
    if (subtitle) {
      ctx.font = 'bold 40px Arial';
      const subtitleY = canvas.height / 2 + 60;
      ctx.strokeText(subtitle, canvas.width / 2, subtitleY);
      ctx.fillText(subtitle, canvas.width / 2, subtitleY);
    }

    // Border
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  };

  const downloadThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'thumbnail.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🖼️ Thumbnail Maker
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customize Thumbnail</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter main title"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter subtitle (optional)"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Template</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {Object.entries(templates).map(([key, tmpl]) => (
                      <option key={key} value={key}>{tmpl.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-12 border rounded-lg"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={generateThumbnail}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Generate Thumbnail
                  </button>
                  <button
                    onClick={downloadThumbnail}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview (1280x720)</h3>
              <canvas 
                ref={canvasRef} 
                className="w-full max-w-md border rounded-lg mx-auto"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}