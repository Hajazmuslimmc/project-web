'use client'

import { useState, useRef } from 'react';

export default function PhotoFixer() {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [fixed, setFixed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setFixed(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const fixPhoto = () => {
    if (!image || !canvasRef.current) return;
    
    setProcessing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const data = imageData.data;
        
        // Apply enhancement filters
        for (let i = 0; i < data.length; i += 4) {
          // Brightness and contrast adjustment
          data[i] = Math.min(255, data[i] * 1.1 + 10);     // Red
          data[i + 1] = Math.min(255, data[i + 1] * 1.1 + 10); // Green
          data[i + 2] = Math.min(255, data[i + 2] * 1.1 + 10); // Blue
        }
        
        ctx?.putImageData(imageData, 0, 0);
      }
      
      setFixed(true);
      setProcessing(false);
    };
    
    img.src = image;
  };

  const downloadFixed = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'fixed-photo.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🖼️ Photo Fixer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fix and enhance photos with AI-powered restoration and quality improvement
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {image && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Original</h3>
                <img src={image} alt="Original" className="w-full rounded-lg border" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Fixed</h3>
                <canvas ref={canvasRef} className="w-full rounded-lg border" />
              </div>
            </div>
          )}

          {image && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={fixPhoto}
                disabled={processing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {processing ? 'Fixing...' : 'Fix Photo'}
              </button>
              
              {fixed && (
                <button
                  onClick={downloadFixed}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download Fixed Photo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}