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
      status: "beta",
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
    },
    {
      id: "11",
      name: "Bloxed.io",
      description: "Multiplayer-style block collection game with 4 different game modes to master.",
      category: "Games",
      icon: "🟫",
      url: "/bloxed-io",
      status: "live",
      featured: true
    },
    {
      id: "12",
      name: "Minecraft 2D",
      description: "Build and explore in this 2D Minecraft-inspired sandbox game with blocks and crafting.",
      category: "Games",
      icon: "⛏️",
      url: "/minecraft-game",
      status: "live",
      featured: true
    },
    {
      id: "13",
      name: "IceCut",
      description: "Professional video editing app with timeline, effects, and export capabilities like CapCut.",
      category: "Media",
      icon: "❄️",
      url: "/icecut",
      status: "beta",
      featured: true
    },
    {
      id: "14",
      name: "AI Background Noise Remover",
      description: "Remove background noise from audio files using advanced AI technology.",
      category: "AI Tools",
      icon: "🎧",
      url: "/ai-noise-remover",
      status: "live",
      featured: false
    },
    {
      id: "15",
      name: "Audio Enhancer",
      description: "Enhance audio quality with AI-powered noise reduction and clarity improvement.",
      category: "AI Tools",
      icon: "🔊",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "16",
      name: "Video Quality Upscaler",
      description: "Upscale video resolution and enhance quality using AI machine learning algorithms.",
      category: "AI Tools",
      icon: "🎥",
      url: "/video-upscaler",
      status: "live",
      featured: false
    },
    {
      id: "17",
      name: "Photo Fixer",
      description: "Fix and enhance photos with AI-powered restoration, denoising, and quality improvement.",
      category: "AI Tools",
      icon: "🖼️",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "18",
      name: "AI Code Generator",
      description: "Generate code snippets and functions using AI for multiple programming languages.",
      category: "Development",
      icon: "🤖",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "19",
      name: "Code Error Fixer",
      description: "Automatically detect and fix common coding errors with AI-powered suggestions.",
      category: "Development",
      icon: "🔧",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "20",
      name: "Code Beautifier",
      description: "Format and beautify code with proper indentation and styling for better readability.",
      category: "Development",
      icon: "✨",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "21",
      name: "CSS/JS/HTML Generator",
      description: "Generate CSS, JavaScript, and HTML code templates with modern best practices.",
      category: "Development",
      icon: "🎨",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "22",
      name: "API Testing Tool",
      description: "Test REST APIs with request builder, response viewer, and automated testing features.",
      category: "Development",
      icon: "🔌",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "23",
      name: "UI Design Assistant",
      description: "Create beautiful UI components and layouts with drag-and-drop design tools.",
      category: "Design",
      icon: "🎨",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "24",
      name: "Invoice Generator",
      description: "Create professional invoices with customizable templates and automatic calculations.",
      category: "Business",
      icon: "📊",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "25",
      name: "Inventory Manager",
      description: "Track products, stock levels, and manage inventory with real-time updates and alerts.",
      category: "Business",
      icon: "📦",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "26",
      name: "Website Builder",
      description: "Build professional websites with drag-and-drop editor and responsive templates.",
      category: "Business",
      icon: "🏢",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "27",
      name: "Social Media Post Creator",
      description: "Design engaging social media posts with templates for Instagram, Facebook, Twitter.",
      category: "Business",
      icon: "📱",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "28",
      name: "Logo Generator",
      description: "Create professional logos with AI-powered design suggestions and customization options.",
      category: "Business",
      icon: "🎨",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "29",
      name: "VPN Service",
      description: "Secure your internet connection with encrypted VPN tunneling and IP masking.",
      category: "Security",
      icon: "🔒",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "30",
      name: "Password Manager",
      description: "Store and manage passwords securely with encryption and auto-fill capabilities.",
      category: "Security",
      icon: "🔑",
      url: "/password-generator",
      status: "live",
      featured: false
    },
    {
      id: "31",
      name: "File Encryption Tool",
      description: "Encrypt and decrypt files with military-grade AES encryption for maximum security.",
      category: "Security",
      icon: "🔐",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "32",
      name: "Anti-virus Checker",
      description: "Scan files and URLs for malware, viruses, and security threats in real-time.",
      category: "Security",
      icon: "🚫",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "33",
      name: "IP Checker",
      description: "Check your IP address, location, ISP information, and detect VPN usage.",
      category: "Security",
      icon: "🌍",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "34",
      name: "Device Security Scanner",
      description: "Scan your device for security vulnerabilities, open ports, and potential threats.",
      category: "Security",
      icon: "🔍",
      url: "#",
      status: "coming-soon",
      featured: false
    },
    {
      id: "35",
      name: "Citation Generator",
      description: "Generate accurate citations in APA, MLA, Chicago, and Harvard formats automatically.",
      category: "Education",
      icon: "📚",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "36",
      name: "AI Essay Helper",
      description: "Get writing assistance, structure suggestions, and grammar improvements for essays.",
      category: "Education",
      icon: "✍️",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "37",
      name: "Math Solver",
      description: "Solve complex math problems step-by-step with AI-powered explanations and solutions.",
      category: "Education",
      icon: "🔢",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "38",
      name: "Plagiarism Checker",
      description: "Check text for plagiarism against billions of sources with detailed similarity reports.",
      category: "Education",
      icon: "🔍",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "39",
      name: "Flashcard Creator",
      description: "Create interactive flashcards with spaced repetition for effective studying and memorization.",
      category: "Education",
      icon: "🃏",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "40",
      name: "Meme Generator",
      description: "Create viral memes with popular templates, custom text, and trending formats.",
      category: "Entertainment",
      icon: "😂",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "41",
      name: "Avatar Creator",
      description: "Design custom avatars and profile pictures with AI-powered character generation.",
      category: "Entertainment",
      icon: "👤",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "42",
      name: "Photo Cartoonizer",
      description: "Transform photos into cartoon-style images with AI artistic filters and effects.",
      category: "Entertainment",
      icon: "🎨",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "43",
      name: "AI Face Swap",
      description: "Swap faces in photos and videos with realistic AI-powered face replacement technology.",
      category: "Entertainment",
      icon: "🔄",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "44",
      name: "AI Voice Changer",
      description: "Transform your voice with AI effects, celebrity impressions, and character voices.",
      category: "Entertainment",
      icon: "🎤",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "45",
      name: "Thumbnail Maker",
      description: "Create eye-catching YouTube thumbnails with templates, text effects, and design tools.",
      category: "Creator Tools",
      icon: "🖼️",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "46",
      name: "Title + Description Generator",
      description: "Generate viral YouTube titles and SEO-optimized descriptions with AI assistance.",
      category: "Creator Tools",
      icon: "📝",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "47",
      name: "Video Captions Generator",
      description: "Auto-generate accurate captions and subtitles for videos with AI speech recognition.",
      category: "Creator Tools",
      icon: "💬",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "48",
      name: "Music Remover",
      description: "Remove background music from videos while preserving voice and sound effects.",
      category: "Creator Tools",
      icon: "🎵",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "49",
      name: "Sound Effects Finder",
      description: "Browse and download royalty-free sound effects for videos, podcasts, and content.",
      category: "Creator Tools",
      icon: "🔊",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "50",
      name: "AI PDF Reader",
      description: "Chat with PDFs, extract information, and get AI-powered summaries from documents.",
      category: "AI Tools",
      icon: "📄",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "51",
      name: "AI Homework Helper",
      description: "Get step-by-step homework solutions and explanations across all subjects with AI.",
      category: "AI Tools",
      icon: "🎓",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "52",
      name: "AI Writing Helper",
      description: "Improve writing with AI grammar checking, style suggestions, and content generation.",
      category: "AI Tools",
      icon: "✍️",
      url: "/ai-summarizer",
      status: "live",
      featured: true
    },
    {
      id: "53",
      name: "AI Business Chatbot",
      description: "Create custom AI chatbots for customer service, sales, and business automation.",
      category: "AI Tools",
      icon: "🤖",
      url: "#",
      status: "coming-soon",
      featured: true
    },
    {
      id: "54",
      name: "AI Voice Assistant",
      description: "Personal AI voice assistant for tasks, reminders, questions, and smart home control.",
      category: "AI Tools",
      icon: "🎤",
      url: "#",
      status: "coming-soon",
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

  const featuredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return tool.featured && matchesSearch && matchesCategory;
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Networkak</span> Tools
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover our collection of powerful, free tools designed to boost your productivity and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Tools
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

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

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Featured Tools</h2>
        {featuredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map(tool => (
              <div key={tool.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg card-hover border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{tool.icon}</div>
                    {getStatusBadge(tool.status)}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{tool.category}</span>
                    <a
                      href={tool.url}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Try Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">No featured tools match your search criteria.</p>
          </div>
        )}
      </section>

      {/* All Tools */}
      <section id="tools-section" className="max-w-7xl mx-auto px-4 py-12">
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

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{tools.length}+</div>
              <div className="text-blue-200">Tools Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{categories.length - 1}</div>
              <div className="text-blue-200">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">60%</div>
              <div className="text-blue-200">Free to Use</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Available</div>
            </div>
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
                Building the future of web tools. Our mission is to provide powerful, accessible tools that enhance productivity and creativity for everyone.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="/discord" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">All Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Featured</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bug Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Networkak. All rights reserved. Built with ❤️ for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
