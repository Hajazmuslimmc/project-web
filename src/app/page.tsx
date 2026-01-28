'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";

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

  const featuredTools = [
    { name: "AI Code Generator", href: "/ai-code-generator", icon: "🤖", desc: "Generate code with AI" },
    { name: "Better Notes", href: "/betternotes", icon: "📝", desc: "Advanced note-taking" },
    { name: "Website Builder", href: "/website-builder", icon: "🌐", desc: "Build websites easily" },
    { name: "Dashboard", href: "/dashboard", icon: "📊", desc: "Manage your projects" },
    { name: "AI Voice Assistant", href: "/ai-voice-assistant", icon: "🎤", desc: "Voice-powered AI" },
    { name: "CodeNest IDE", href: "/codenest-ide", icon: "💻", desc: "Online code editor" }
  ];

  const gamesList = [
    { name: "Car Race Game", href: "/car-race-game", icon: "🏎️" },
    { name: "Minecraft Game", href: "/minecraft-game", icon: "⛏️" },
    { name: "Bloxed.io", href: "/bloxed-io", icon: "🎮" },
    { name: "BoxBuild", href: "/boxbuild", icon: "📦" }
  ];

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
            The Ultimate Digital Platform
          </p>
          <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-4xl mx-auto">
            Access 50+ premium tools, AI-powered utilities, games, and productivity apps. From code generation to website building - everything you need in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/tools"
              className="px-10 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Explore 50+ Tools
            </Link>
            <Link 
              href="/dashboard"
              className="px-10 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Get Started
            </Link>
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

      {/* Featured Tools Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Featured Tools
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16">
            Discover our most popular and powerful tools
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="group">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 hover:shadow-lg transition-all group-hover:scale-105">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/tools"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Premium Games
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16">
            Play instantly in your browser - no downloads required
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamesList.map((game) => (
              <Link key={game.name} href={game.href} className="group">
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all group-hover:scale-105">
                  <div className="text-4xl mb-4 text-center">{game.icon}</div>
                  <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white">{game.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">AI Tools</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Code generation, voice assistants, face swap, and more AI-powered utilities.
              </p>
              <Link href="/ai-code-generator" className="text-blue-600 hover:underline">Explore AI Tools →</Link>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Developer Tools</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Code formatters, API testing, JSON validators, and development utilities.
              </p>
              <Link href="/codenest-ide" className="text-blue-600 hover:underline">View Dev Tools →</Link>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Creative Tools</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Logo generators, meme creators, thumbnail makers, and design utilities.
              </p>
              <Link href="/logo-generator" className="text-blue-600 hover:underline">Create Now →</Link>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Productivity</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Note-taking, task management, file tools, and productivity enhancers.
              </p>
              <Link href="/betternotes" className="text-blue-600 hover:underline">Boost Productivity →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users accessing premium tools, games, and AI-powered utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Access Dashboard
            </Link>
            <Link 
              href="/karwan-school"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View School Site
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold gradient-text mb-4">Networkak</h3>
              <p className="text-gray-300 mb-4">
                The ultimate digital platform with 50+ tools, games, and AI utilities. Everything you need for productivity, creativity, and entertainment.
              </p>
              <div className="flex gap-4">
                <Link href="/discord" className="text-gray-400 hover:text-white transition-colors">Discord</Link>
                <Link href="/youtube" className="text-gray-400 hover:text-white transition-colors">YouTube</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/ai-code-generator" className="hover:text-white transition-colors">AI Code Generator</Link></li>
                <li><Link href="/website-builder" className="hover:text-white transition-colors">Website Builder</Link></li>
                <li><Link href="/betternotes" className="hover:text-white transition-colors">Better Notes</Link></li>
                <li><Link href="/codenest-ide" className="hover:text-white transition-colors">CodeNest IDE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Access</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/tools" className="hover:text-white transition-colors">All Tools</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/car-race-game" className="hover:text-white transition-colors">Games</Link></li>
                <li><Link href="/karwan-school" className="hover:text-white transition-colors">School Site</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Networkak. All rights reserved. 50+ Tools. Unlimited Possibilities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}