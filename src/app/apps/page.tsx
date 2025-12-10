'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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

const categories = ['All', 'Productivity', 'Development Tools', 'AI & Automation', 'Games', 'Utilities', 'Education']
const platforms = ['All Platforms', 'Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Web']

const mockApps: App[] = [
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
  },
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
  },
  {
    id: 'game-builder',
    name: 'Game Builder Pro',
    developer: 'GameDev Studio',
    description: 'Professional game development suite with visual scripting and asset management.',
    icon: '🎮',
    category: 'Games',
    platforms: ['Windows', 'macOS'],
    rating: 4.5,
    downloads: '6K+'
  },
  {
    id: 'learning-platform',
    name: 'EduLearn',
    developer: 'EduTech Corp',
    description: 'Interactive learning platform with gamification and progress tracking.',
    icon: '🎓',
    category: 'Education',
    platforms: ['Web', 'Android', 'iOS'],
    rating: 4.4,
    downloads: '9K+'
  }
]

export default function Apps() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [selectedView, setSelectedView] = useState('grid') // grid or list
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredApps, setFilteredApps] = useState<App[]>(mockApps)

  useEffect(() => {
    let filtered = mockApps

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(app => app.category === selectedCategory)
    }

    // Platform filter
    if (selectedPlatform !== 'All Platforms') {
      filtered = filtered.filter(app =>
        app.platforms.includes(selectedPlatform)
      )
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.developer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredApps(filtered)
  }, [selectedCategory, selectedPlatform, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Networkak</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
              <Link href="/apps" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-blue-600">Apps</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</Link>
              <Link href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Support</Link>
            </nav>

            <Link href="/submit-app" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm">
              Submit App
            </Link>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>Category: {category}</option>
                ))}
              </select>

              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>Platform: {platform}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setSelectedView('grid')}
                  className={`px-4 py-2 ${selectedView === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border-r border-gray-300 last:border-r-0`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 12h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedView('list')}
                  className={`px-4 py-2 ${selectedView === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredApps.length} of {mockApps.length} applications
            {(selectedCategory !== 'All' || selectedPlatform !== 'All Platforms' || searchQuery) && (
              <span className="ml-2">
                • Filtered by:
                {selectedCategory !== 'All' && <span className="ml-1">Category: {selectedCategory}</span>}
                {selectedPlatform !== 'All Platforms' && <span className="ml-1">Platform: {selectedPlatform}</span>}
                {searchQuery && <span className="ml-1">Search: "{searchQuery}"</span>}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Apps Grid/List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredApps.length === 0 ? (
            <div className="text-center py-16">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedPlatform('All Platforms')
                  setSearchQuery('')
                }}
                className="mt-4 text-blue-600 hover:text-blue-500"
              >
                Clear filters
              </button>
            </div>
          ) : selectedView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <div key={app.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{app.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.developer}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{app.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{app.category}</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-gray-600 text-sm">{app.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {app.platforms.slice(0, 2).map(platform => (
                        <span key={platform} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {platform}
                        </span>
                      ))}
                      {app.platforms.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{app.platforms.length - 2}
                        </span>
                      )}
                    </div>

                    <Link href={`/apps/${app.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center block transition-colors duration-200 text-sm font-medium">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApps.map(app => (
                <div key={app.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-4xl">{app.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{app.category}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">by {app.developer}</p>
                        <p className="text-gray-600 text-sm">{app.description}</p>

                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span className="text-gray-600 text-sm">{app.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">{app.downloads} downloads</span>
                          <div className="flex space-x-1">
                            {app.platforms.slice(0, 3).map(platform => (
                              <span key={platform} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6">
                      <Link href={`/apps/${app.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Networkak</span>
            </Link>
            <p className="text-gray-400">© 2025 Networkak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
