'use client'

import { useState } from 'react';

export default function CodeFormatter() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [formattedCode, setFormattedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const formatCode = () => {
    let formatted = code;
    
    // Basic formatting based on language
    switch (language) {
      case 'javascript':
      case 'typescript':
        formatted = formatJavaScript(code);
        break;
      case 'json':
        try {
          formatted = JSON.stringify(JSON.parse(code), null, 2);
        } catch {
          formatted = code;
        }
        break;
      case 'css':
        formatted = formatCSS(code);
        break;
      case 'html':
        formatted = formatHTML(code);
        break;
      case 'python':
        formatted = formatPython(code);
        break;
      default:
        formatted = code;
    }
    
    setFormattedCode(formatted);
  };

  const formatJavaScript = (code: string) => {
    return code
      .replace(/;/g, ';\n')
      .replace(/{/g, ' {\n  ')
      .replace(/}/g, '\n}')
      .replace(/,/g, ',\n  ')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  };

  const formatCSS = (code: string) => {
    return code
      .replace(/{/g, ' {\n  ')
      .replace(/}/g, '\n}\n')
      .replace(/;/g, ';\n  ')
      .replace(/,/g, ',\n')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  };

  const formatHTML = (code: string) => {
    let formatted = code;
    let indent = 0;
    const indentSize = 2;
    
    formatted = formatted.replace(/></g, '>\n<');
    const lines = formatted.split('\n');
    
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('</')) indent -= indentSize;
      const result = ' '.repeat(Math.max(0, indent)) + trimmed;
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
        indent += indentSize;
      }
      return result;
    }).join('\n');
  };

  const formatPython = (code: string) => {
    return code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  };

  const copyToClipboard = async () => {
    if (formattedCode) {
      await navigator.clipboard.writeText(formattedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'json', label: 'JSON' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'sql', label: 'SQL' }
  ];

  const sampleCode = {
    javascript: 'function hello(name){if(name){return "Hello, "+name+"!";}else{return "Hello, World!";}}',
    json: '{"name":"John","age":30,"city":"New York","hobbies":["reading","swimming"]}',
    css: 'body{margin:0;padding:0;font-family:Arial,sans-serif;}h1{color:#333;text-align:center;}',
    html: '<div><h1>Title</h1><p>This is a paragraph.</p><ul><li>Item 1</li><li>Item 2</li></ul></div>',
    python: 'def hello(name):if name:return f"Hello, {name}!"else:return "Hello, World!"'
  };

  const loadSample = () => {
    const sample = sampleCode[language as keyof typeof sampleCode] || '';
    setCode(sample);
    setFormattedCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            💻 Code Formatter Pro
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Format and beautify your code with syntax highlighting
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            <button
              onClick={loadSample}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={formatCode}
              disabled={!code.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              Format Code
            </button>
          </div>

          {/* Code Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Input Code
                </label>
                <span className="text-xs text-gray-500">
                  {code.length} characters
                </span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Output */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Formatted Code
                </label>
                {formattedCode && (
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                )}
              </div>
              <textarea
                value={formattedCode}
                readOnly
                placeholder="Formatted code will appear here..."
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              Supported Features:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-800 dark:text-blue-300">
              <div>• Indentation</div>
              <div>• Line breaks</div>
              <div>• Bracket alignment</div>
              <div>• JSON prettify</div>
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