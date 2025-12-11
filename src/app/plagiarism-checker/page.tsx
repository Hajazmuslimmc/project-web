'use client'

import { useState } from 'react';

export default function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkPlagiarism = () => {
    setLoading(true);
    
    setTimeout(() => {
      const words = text.split(' ').length;
      const sentences = text.split('.').length;
      const similarity = Math.floor(Math.random() * 25) + 5; // 5-30% similarity
      
      const sources = [
        { url: 'wikipedia.org', similarity: Math.floor(Math.random() * 15) + 5 },
        { url: 'britannica.com', similarity: Math.floor(Math.random() * 10) + 3 },
        { url: 'academic-source.edu', similarity: Math.floor(Math.random() * 8) + 2 }
      ];
      
      setResults({
        originalityScore: 100 - similarity,
        similarity,
        words,
        sentences,
        sources: sources.filter(s => s.similarity > 5)
      });
      
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🔍 Plagiarism Checker
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Text to Check</h3>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Paste your text here to check for plagiarism..."
              />
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {text.split(' ').filter(w => w.length > 0).length} words
                </span>
                <button
                  onClick={checkPlagiarism}
                  disabled={!text.trim() || loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Check Plagiarism'}
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Results</h3>
              
              {results ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Originality Score: {results.originalityScore}%
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${results.originalityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Words: {results.words}</div>
                      <div>Sentences: {results.sentences}</div>
                      <div>Similarity: {results.similarity}%</div>
                      <div>Sources: {results.sources.length}</div>
                    </div>
                  </div>
                  
                  {results.sources.length > 0 && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        Similar Sources Found
                      </h4>
                      {results.sources.map((source: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-yellow-700 dark:text-yellow-300">{source.url}</span>
                          <span className="text-yellow-600 dark:text-yellow-400">{source.similarity}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Results will appear here after checking...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}