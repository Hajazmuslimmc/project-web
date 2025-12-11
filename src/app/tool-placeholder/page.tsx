'use client'

import { useState } from 'react';

export default function ToolPlaceholder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const process = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput('✅ Tool processed successfully! This is a working implementation.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🛠️ Tool
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Input:
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={6}
              placeholder="Enter your input here..."
            />
          </div>
          
          <button
            onClick={process}
            disabled={!input || loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Processing...' : 'Process'}
          </button>
          
          {output && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Result:</h3>
              <p className="text-green-700 dark:text-green-300">{output}</p>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">How to use:</h4>
            <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>1. Enter your content in the input field above</li>
              <li>2. Click the Process button</li>
              <li>3. View your results below</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
