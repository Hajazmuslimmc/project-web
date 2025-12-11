'use client'

import { useState } from 'react';

export default function MathSolver() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);

  const solveProblem = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        // Basic math evaluation
        const result = eval(problem.replace(/[^0-9+\-*/().]/g, ''));
        setSolution(`Solution: ${result}\n\nStep-by-step:\n1. Given: ${problem}\n2. Calculate: ${result}`);
      } catch {
        setSolution('Please enter a valid mathematical expression (e.g., 2+2, 5*3-1)');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          🔢 Math Solver
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Enter Math Problem:
            </label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g., 2+2, 5*3-1, (10+5)/3"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <button
            onClick={solveProblem}
            disabled={!problem || loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Solving...' : 'Solve Problem'}
          </button>
          
          {solution && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">Solution:</h3>
              <pre className="text-green-700 dark:text-green-300 whitespace-pre-wrap">{solution}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}