'use client'

import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="gradient-text">Networkak</span>
          </h1>
          <p className="text-2xl md:text-4xl mb-6 text-blue-100 font-semibold">
            Anything is Possible
          </p>
          <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-4xl mx-auto">
            Welcome to Networkak.com - where innovation meets possibility. Experience premium web gaming, powerful productivity tools, and cutting-edge technology that transforms the way you work, play, and create.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/tools"
              className="px-10 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Explore Tools
            </a>
            <a 
              href="/car-race-game"
              className="px-10 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Play Games
            </a>
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-colors z-50"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Endless Possibilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Premium Gaming</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience cutting-edge web games with stunning graphics and smooth gameplay. No downloads required.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-700 dark:to-gray-600">
              <div className="text-5xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Powerful Tools</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access a comprehensive suite of productivity tools, AI-powered utilities, and development resources.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-700 dark:to-gray-600">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Push the boundaries of what's possible with cutting-edge technology and creative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have discovered that with Networkak, anything is truly possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/tools"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Tools
            </a>
            <a 
              href="/betternotes"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Try Better Notes
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold gradient-text mb-4">Networkak.com</h3>
              <p className="text-gray-300 mb-4">
                Where anything is possible. Building the future of web gaming and online tools for creators, developers, and innovators worldwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="/discord" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/tools" className="hover:text-white transition-colors">All Tools</a></li>
                <li><a href="/car-race-game" className="hover:text-white transition-colors">Games</a></li>
                <li><a href="/betternotes" className="hover:text-white transition-colors">Better Notes</a></li>
                <li><a href="/youtube" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Networkak. All rights reserved. Anything is possible.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}