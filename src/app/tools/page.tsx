'use client'

import React, { useState, useEffect } from "react";

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  url: string;
  status: 'live' | 'beta' | 'coming-soon';
  featured: boolean;
};

export default function ToolsDirectory() {
  const tools: Tool[] = [
    {
      id: "1",
      name: "Better Notes",
      description: "Cross-platform note-taking app with advanced features, sync, and collaboration tools.",
      category: "Productivity",
      icon: "📝",
      url: "/betternotes",
      status: "live",
      featured: true
    },
    {
      id: "2",
      name: "Code Formatter Pro",
      description: "Beautiful code formatting tool supporting 50+ programming languages with custom themes.",
      category: "Development",
      icon: "💻",
      url: "/code-formatter",
      status: "live",
      featured: true
    },
    {
      id: "3",
      name: "Image Optimizer",
      description: "Compress and optimize images without quality loss. Supports WebP, AVIF, and more.",
      category: "Media",
      icon: "🖼️",
      url: "/image-optimizer",
      status: "live",
      featured: false
    },
    {
      id: "4",
      name: "Password Generator",
      description: "Generate secure passwords with customizable length, characters, and complexity.",
      category: "Security",
      icon: "🔐",
      url: "/password-generator",
      status: "live",
      featured: false
    },
    {
      id: "5",
      name: "Color Palette Studio",
      description: "Create beautiful color palettes for your designs with AI-powered suggestions.",
      category: "Design",
      icon: "🎨",
      url: "/color-palette",
      status: "live",
      featured: true
    },
    {
      id: "6",
      name: "URL Shortener",
      description: "Shorten long URLs with custom aliases, analytics, and QR code generation.",
      category: "Utility",
      icon: "🔗",
      url: "/url-shortener",
      status: "live",
      featured: false
    },
    {
      id: "7",
      name: "JSON Validator",
      description: "Validate, format, and minify JSON data with syntax highlighting and error detection.",
      category: "Development",
      icon: "📋",
      url: "/json-validator",
      status: "live",
      featured: false
    },
    {
      id: "8",
      name: "AI Text Summarizer",
      description: "Summarize long articles and documents using advanced AI technology.",
      category: "AI Tools",
      icon: "🤖",
      url: "/ai-summarizer",
      status: "live",
      featured: true
    },
    {
      id: "9",
      name: "QR Code Generator",
      description: "Generate QR codes for your website links with customizable size and error correction.",
      category: "Utility",
      icon: "📱",
      url: "/qr-generator",
      status: "live",
      featured: false
    },
    {
      id: "10",
      name: "Car Race Game",
      description: "Fast-paced car racing game. Avoid obstacles and get the highest score!",
      category: "Games",
      icon: "🏎️",
      url: "/car-race-game",
      status: "live",
      featured: true
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const categories = ["All", ...Array.from(new Set(tools.map(tool => tool.category)))];
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Live</span>;
      case 'beta':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">Beta</span>;
      case 'coming-soon':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">Coming Soon</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-bold gradient-text">Tools Directory</h2>
              <div className="hidden md:block">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 w-80 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <div className="md:hidden mt-4">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </nav>

      {/* All Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md card-hover border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{tool.icon}</div>
                  {getStatusBadge(tool.status)}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{tool.category}</span>
                  <a
                    href={tool.url}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No tools found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}