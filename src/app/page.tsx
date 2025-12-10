'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// Mock data for now - will be replaced with real data from Firebase
const categories = ['All', 'Productivity', 'Development Tools', 'AI & Automation', 'Games', 'Utilities', 'Education']
const platforms = ['All Platforms', 'Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Web']

type App = {
  id: string
  name: string
  developer: string
  description: string
  icon: string
  category: string
  platforms: string[]
  rating: number
  downloads: string
  featured?: boolean
}

const featuredApps = [
  {
    id: 'better-notes',
    name: 'Better Notes',
    developer: 'Networkak Team',
    description: 'AI-powered note-taking with cloud sync, advanced formatting, and collaboration tools.',
    icon: '📝',
    category: 'Productivity',
    platforms: ['Windows', 'macOS', 'Web'],
    rating: 4.8,
    downloads: '15K+',
    featured: true
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Assistant',
    developer: 'Networkak Labs',
    description: 'Intelligent conversational AI for customer support and automated assistance.',
    icon: '🤖',
    category: 'AI & Automation',
    platforms: ['Web', 'API'],
    rating: 4.9,
    downloads: '5K+',
    featured: true
  }
]

const trendingApps = [
  {
    id: 'code-editor',
    name: 'Smart Code Editor',
    developer: 'DevTools Inc.',
    description: 'Advanced code editor with AI suggestions and collaborative editing.',
    icon: '💻',
    category: 'Development Tools',
    platforms: ['Windows', 'macOS', 'Linux'],
    rating: 4.7,
    downloads: '8K+'
  },
  {
    id: 'task-manager',
    name: 'Project Flow',
    developer: 'WorkSmart Ltd.',
    description: 'Visual project management with AI-powered insights and team collaboration.',
    icon: '📊',
    category: 'Productivity',
    platforms: ['Web', 'Android', 'iOS'],
    rating: 4.6,
    downloads: '12K+'
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchApps()
  }, [selectedCategory])

  const fetchApps = async () => {
    setLoading(true)
    try {
      // For now, just filter featured apps based on category
      let filteredApps = []
      if (selectedCategory === 'All') {
        filteredApps = [...featuredApps, ...trendingApps]
      } else {
        filteredApps = [...featuredApps, ...trendingApps].filter(app =>
          app.category === selectedCategory
        )
      }
      setApps(filteredApps)
    } catch (error) {
      console.error('Error fetching apps:', error)
      // Fallback to featured apps if API fails
      setApps([...featuredApps, ...trendingApps])
    }
    setLoading(false)
  }

  const handleSearch = (e: any) => {
    e.preventDefault()
    // Search functionality will be implemented
    console.log('Searching for:', searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Networkak</span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Submit App Button */}
              <Link
                href="/submit-app"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
              >
                Submit App
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to the Networkak App Store
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover, download, and manage professional applications from developers worldwide.
            From productivity tools to AI-powered solutions, find exactly what you need.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">{apps.length}+</div>
              <div className="text-blue-100">Apps Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">15K+</div>
              <div className="text-blue-100">Downloads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">4.8⭐</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">7</div>
              <div className="text-blue-100">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Applications</h2>
            <p className="text-lg text-gray-600 mt-2">Handpicked apps that showcase the best of Networkak</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredApps.map(app => (
              <div key={app.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{app.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-500">by {app.developer}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{app.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{app.category}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-600">{app.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {app.platforms.slice(0, 3).map(platform => (
                      <span key={platform} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <Link href={`/apps/${app.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending/Recent Apps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trending Applications</h2>
            <p className="text-lg text-gray-600 mt-2">Popular and newly released apps gaining traction</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingApps.map(app => (
              <div key={app.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-3">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{app.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{app.developer}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{app.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{app.category}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-gray-600 text-sm">{app.rating}</span>
                  </div>
                </div>

                <Link href={`/apps/${app.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center block transition-colors duration-200 text-sm font-medium">
                  Download Now
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/apps" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Browse All Apps
            </Link>
          </div>
        </div>
      </section>

      {/* Developer Call to Action */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Are you a developer?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Share your applications with thousands of users. Join the Networkak developer community and get your apps in front of the right audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit-app" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Submit Your App
            </Link>
            <Link href="/developer-guide" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Developer Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-900">Networkak</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Professional applications for modern workflows.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/Hajazmuslimmc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C20 6.484 15.522 0 10 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="m10 3.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zm-9.25 7.25v3.5c0 .966.784 1.75 1.75 1.75h.5a.75.75 0 01.75.75v.25a.75.75 0 01-1.5 0v-.5a.25.25 0 00-.25-.25h-.5a.25.25 0 01-.25-.25v-3.5a.25.25 0 00-.25-.25h-.5a.75.75 0 010-1.5h.5a.25.25 0 00.25-.25z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Platform</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Home</Link></li>
                <li><Link href="/apps" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Browse Apps</Link></li>
                <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">About Us</Link></li>
                <li><Link href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Categories</h3>
              <ul className="space-y-4">
                <li><a href="/apps?category=Productivity" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Productivity</a></li>
                <li><a href="/apps?category=Development%20Tools" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Development</a></li>
                <li><a href="/apps?category=AI%20%26%20Automation" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">AI & Automation</a></li>
                <li><Link href="/apps" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">All Categories</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-4">
                <li><a href="/privacy" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="/terms" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Terms of Service</a></li>
                <li><a href="/contact" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Contact</a></li>
                <li><a href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Networkak. All rights reserved. | Building the future of application discovery.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
