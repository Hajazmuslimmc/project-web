'use client'

import { useState, useRef } from 'react';

export default function ImageOptimizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState('webp');
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setOptimizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const optimizeImage = () => {
    if (!originalImage) return;
    
    setProcessing(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const mimeType = format === 'webp' ? 'image/webp' : 
                     format === 'jpeg' ? 'image/jpeg' : 'image/png';
      
      const optimized = canvas.toDataURL(mimeType, quality / 100);
      setOptimizedImage(optimized);
      
      // Calculate optimized size (approximate)
      const base64Length = optimized.split(',')[1].length;
      const sizeInBytes = (base64Length * 3) / 4;
      setOptimizedSize(sizeInBytes);
      setProcessing(false);
    };
    
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!optimizedImage) return;
    
    const link = document.createElement('a');
    link.download = `optimized-image.${format}`;
    link.href = optimizedImage;
    link.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRatio = originalSize && optimizedSize ? 
    ((originalSize - optimizedSize) / originalSize * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🖼️ Image Optimizer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Compress and optimize images without quality loss
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Upload Section */}
          <div className="mb-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="text-4xl mb-4">📁</div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Click to upload an image or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, WebP formats
              </p>
            </div>
          </div>

          {originalImage && (
            <>
              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="webp">WebP (Best compression)</option>
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                  </select>
                </div>
              </div>

              {/* Optimize Button */}
              <div className="text-center mb-8">
                <button
                  onClick={optimizeImage}
                  disabled={processing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
                >
                  {processing ? 'Optimizing...' : 'Optimize Image'}
                </button>
              </div>

              {/* Image Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Original ({formatBytes(originalSize)})
                  </h3>
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
                  />
                </div>

                {optimizedImage && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Optimized ({formatBytes(optimizedSize)})
                      <span className="text-green-600 ml-2">-{compressionRatio}%</span>
                    </h3>
                    <img
                      src={optimizedImage}
                      alt="Optimized"
                      className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
                    />
                    <button
                      onClick={downloadImage}
                      className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Download Optimized Image
                    </button>
                  </div>
                )}
              </div>

              {/* Stats */}
              {optimizedImage && (
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                    Optimization Results:
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-green-800 dark:text-green-300">Original Size:</span>
                      <div className="font-medium">{formatBytes(originalSize)}</div>
                    </div>
                    <div>
                      <span className="text-green-800 dark:text-green-300">Optimized Size:</span>
                      <div className="font-medium">{formatBytes(optimizedSize)}</div>
                    </div>
                    <div>
                      <span className="text-green-800 dark:text-green-300">Size Reduction:</span>
                      <div className="font-medium">{compressionRatio}%</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Tools
          </a>
        </div>
      </div>
    </div>
  );
}