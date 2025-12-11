'use client'

import { useState, useEffect } from 'react';

type ShortenedURL = {
  id: string;
  original: string;
  short: string;
  clicks: number;
  created: Date;
  custom?: string;
};

export default function URLShortener() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedURL[]>([]);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (saved) {
      setShortenedUrls(JSON.parse(saved).map((item: any) => ({
        ...item,
        created: new Date(item.created)
      })));
    }
  }, []);

  const saveToStorage = (urls: ShortenedURL[]) => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    setShortenedUrls(urls);
  };

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const shortenUrl = () => {
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    if (customAlias && shortenedUrls.some(item => item.custom === customAlias)) {
      setError('Custom alias already exists');
      return;
    }

    const shortCode = customAlias || generateShortCode();
    const shortUrl = `https://short.ly/${shortCode}`;
    
    const newUrl: ShortenedURL = {
      id: Date.now().toString(),
      original: url,
      short: shortUrl,
      clicks: 0,
      created: new Date(),
      custom: customAlias || undefined
    };

    const updated = [newUrl, ...shortenedUrls];
    saveToStorage(updated);
    setUrl('');
    setCustomAlias('');
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const simulateClick = (id: string) => {
    const updated = shortenedUrls.map(item => 
      item.id === id ? { ...item, clicks: item.clicks + 1 } : item
    );
    saveToStorage(updated);
  };

  const deleteUrl = (id: string) => {
    const updated = shortenedUrls.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  const generateQR = (url: string) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    window.open(qrUrl, '_blank');
  };

  const totalClicks = shortenedUrls.reduce((sum, item) => sum + item.clicks, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔗 URL Shortener
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Shorten long URLs with custom aliases and analytics
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          {/* URL Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Alias (Optional)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm">
                  short.ly/
                </span>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                  placeholder="my-custom-link"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded">
                {error}
              </div>
            )}

            <button
              onClick={shortenUrl}
              disabled={!url.trim()}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              Shorten URL
            </button>
          </div>
        </div>

        {/* Stats */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{shortenedUrls.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">URLs Shortened</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{totalClicks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {shortenedUrls.filter(u => u.custom).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Custom Aliases</div>
              </div>
            </div>
          </div>
        )}

        {/* Shortened URLs List */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Shortened URLs
            </h2>
            <div className="space-y-4">
              {shortenedUrls.map((item) => (
                <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-mono text-blue-600 dark:text-blue-400">
                          {item.short}
                        </span>
                        {item.custom && (
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {item.original}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Created: {item.created.toLocaleDateString()} • Clicks: {item.clicks}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => copyToClipboard(item.short)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        {copied === item.short ? '✓' : '📋'}
                      </button>
                      <button
                        onClick={() => generateQR(item.short)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        QR
                      </button>
                      <button
                        onClick={() => simulateClick(item.id)}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => deleteUrl(item.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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