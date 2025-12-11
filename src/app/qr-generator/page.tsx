'use client'

import { useState } from 'react';

export default function QRGenerator() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState('300');
  const [errorLevel, setErrorLevel] = useState('M');

  const generateQR = () => {
    if (!url.trim()) return;
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&ecc=${errorLevel}&data=${encodeURIComponent(url)}`;
    setQrCode(qrUrl);
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qr-code.png';
    link.click();
  };

  const clearAll = () => {
    setUrl('');
    setQrCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📱 QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate QR codes for your website links instantly
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Settings */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size (px)
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="200">200x200</option>
                <option value="300">300x300</option>
                <option value="400">400x400</option>
                <option value="500">500x500</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Error Correction
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={generateQR}
              disabled={!url.trim()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              Generate QR Code
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* QR Code Display */}
          {qrCode && (
            <div className="text-center">
              <div className="mb-4">
                <img
                  src={qrCode}
                  alt="Generated QR Code"
                  className="mx-auto border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={downloadQR}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => window.open(qrCode, '_blank')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              QR Code Uses:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Share website links easily</li>
              <li>• Mobile-friendly access</li>
              <li>• Print on business cards</li>
              <li>• Add to marketing materials</li>
            </ul>
          </div>
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