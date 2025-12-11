'use client'

import { useState } from 'react';

export default function CodeBeautifier() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [beautified, setBeautified] = useState('');

  const beautifyCode = () => {
    let result = code;
    
    // Basic beautification
    if (language === 'javascript' || language === 'json') {
      try {
        if (language === 'json') {
          result = JSON.stringify(JSON.parse(code), null, 2);
        } else {
          result = code
            .replace(/;/g, ';\n')
            .replace(/{/g, '{\n  ')
            .replace(/}/g, '\n}')
            .replace(/,/g, ',\n  ');
        }
      } catch (e) {
        result = code.replace(/\s+/g, ' ').trim();
      }
    } else {
      result = code.replace(/\s+/g, ' ').replace(/;/g, ';\n').replace(/{/g, '{\n  ').replace(/}/g, '\n}');
    }
    
    setBeautified(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          ✨ Code Beautifier
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="json">JSON</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Input Code</h3>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Paste your code here..."
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Beautified Code</h3>
              <pre className="w-full h-96 p-4 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 overflow-auto">
                {beautified || 'Beautified code will appear here...'}
              </pre>
            </div>
          </div>
          
          <button
            onClick={beautifyCode}
            disabled={!code}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Beautify Code
          </button>
        </div>
      </div>
    </div>
  );
}