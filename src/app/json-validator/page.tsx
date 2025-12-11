'use client'

import { useState } from 'react';

export default function JSONValidator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('validate');
  const [copied, setCopied] = useState(false);

  const validateJSON = () => {
    if (!input.trim()) {
      setError('Please enter JSON to validate');
      setIsValid(false);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setIsValid(true);
      setError('');
      
      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'minify') {
        setOutput(JSON.stringify(parsed));
      } else {
        setOutput('✅ Valid JSON');
      }
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (output && output !== '✅ Valid JSON') {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSample = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipcode": "10001"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "active": true
    };
    setInput(JSON.stringify(sample, null, 2));
    setOutput('');
    setIsValid(null);
    setError('');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setIsValid(null);
    setError('');
  };

  const getStats = () => {
    if (!input) return { chars: 0, lines: 0, size: '0 B' };
    const chars = input.length;
    const lines = input.split('\n').length;
    const bytes = new Blob([input]).size;
    const size = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
    return { chars, lines, size };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📋 JSON Validator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Validate, format, and minify JSON data with error detection
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="validate">Validate Only</option>
              <option value="format">Format (Pretty Print)</option>
              <option value="minify">Minify (Compress)</option>
            </select>
            <button
              onClick={loadSample}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={validateJSON}
              disabled={!input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              {mode === 'validate' ? 'Validate' : mode === 'format' ? 'Format' : 'Minify'}
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Input/Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  JSON Input
                </label>
                <div className="text-xs text-gray-500">
                  {stats.chars} chars • {stats.lines} lines • {stats.size}
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value", "array": [1, 2, 3]}'
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Output */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Result
                </label>
                {output && output !== '✅ Valid JSON' && (
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                )}
              </div>
              <div className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-auto">
                {isValid === true && (
                  <div className="text-green-600 font-semibold mb-2">✅ Valid JSON</div>
                )}
                {isValid === false && (
                  <div className="text-red-600 font-semibold mb-2">❌ Invalid JSON</div>
                )}
                {error && (
                  <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                {output && (
                  <pre className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap">
                    {output}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
              Features:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-green-800 dark:text-green-300">
              <div>• Syntax validation</div>
              <div>• Pretty formatting</div>
              <div>• Minification</div>
              <div>• Error detection</div>
            </div>
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