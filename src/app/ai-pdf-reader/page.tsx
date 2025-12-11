'use client'

import { useState } from 'react';

export default function Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const process = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput('Tool processed successfully! Feature coming soon.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Tool
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={6}
            placeholder="Enter your input here..."
          />
          <button
            onClick={process}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Process'}
          </button>
          {output && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200">{output}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
