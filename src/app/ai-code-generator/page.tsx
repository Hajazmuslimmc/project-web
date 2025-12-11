'use client'

import { useState } from 'react';

export default function AICodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCode = () => {
    setLoading(true);
    setTimeout(() => {
      const templates = {
        javascript: `// Generated JavaScript code for: ${prompt}
function ${prompt.replace(/\s+/g, '')}() {
  console.log('Hello World');
  return true;
}`,
        python: `# Generated Python code for: ${prompt}
def ${prompt.replace(/\s+/g, '_').toLowerCase()}():
    print("Hello World")
    return True`,
        java: `// Generated Java code for: ${prompt}
public class ${prompt.replace(/\s+/g, '')} {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`
      };
      setCode(templates[language as keyof typeof templates] || templates.javascript);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🤖 AI Code Generator
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Describe what you want to code:
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., function to calculate fibonacci"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Programming Language:
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          
          <button
            onClick={generateCode}
            disabled={!prompt || loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
          
          {code && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Generated Code:</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}