'use client'

import { useState } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { text: 'Weak', color: 'text-red-500', bg: 'bg-red-100' };
    if (score <= 4) return { text: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    return { text: 'Strong', color: 'text-green-500', bg: 'bg-green-100' };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔐 Password Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate secure passwords with customizable options
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Generated Password */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Generated Password
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Click 'Generate Password' to create a password"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg"
              />
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
            {password && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Strength:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${strength.color} ${strength.bg}`}>
                  {strength.text}
                </span>
              </div>
            )}
          </div>

          {/* Length Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>50</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Character Types</h3>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Uppercase Letters (A-Z)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Lowercase Letters (a-z)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Symbols (!@#$%^&*)</span>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Generate Password
          </button>

          {/* Tips */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Password Security Tips:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Use at least 12 characters for better security</li>
              <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Don't reuse passwords across multiple accounts</li>
              <li>• Consider using a password manager</li>
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