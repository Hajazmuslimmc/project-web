'use client'

import Link from 'next/link'
import { useState } from 'react'

// Sample apps data - in a real app, this would come from an API or CMS
const apps = [
  {
    id: 'better-notes',
    title: 'Better Notes',
    description: 'A powerful note-taking application with AI-powered organization, cloud sync, and advanced formatting tools for developers and students.',
    longDescription: 'Better Notes redefines note-taking with intelligent features that adapt to your workflow. From code snippets to meeting notes, this cross-platform application ensures your thoughts are always organized and accessible.',
    category: 'Productivity',
    platforms: ['Windows', 'macOS', 'Web'],
    price: 'Free',
    downloads: '15K+',
    rating: 4.8,
    image: '/screenshots/better-notes-main.png',
    featured: true,
    status: 'available',
    tags: ['Productivity', 'AI', 'Cross-platform', 'Cloud Sync']
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot Assistant',
    description: 'Intelligent conversational AI with natural language processing capabilities for automated customer support and assistance.',
    longDescription: 'Our AI Chatbot provides intelligent conversations, task assistance, and automated support. Built with cutting-edge NLP models and optimized for performance.',
    category: 'AI & Automation',
    platforms: ['Web', 'API'],
    price: 'Coming Soon',
    downloads: 'N/A',
    rating: 0,
    image: '/screenshots/ai-chatbot.png',
    featured: false,
    status: 'development',
    tags: ['AI', 'NLP', 'Support', 'Automation']
  },
  {
    id: 'roblox-scripts',
    title: 'Roblox Development Suite',
    description: 'Comprehensive collection of automation scripts and development tools for Roblox game creation and enhancement.',
    longDescription: 'Our Roblox Development Suite provides developers with powerful tools for game creation, content generation, and automation scripts to streamline the development process.',
    category: 'Development Tools',
    platforms: ['Windows', 'Lua'],
    price: 'Coming Soon',
    downloads: 'N/A',
    rating: 0,
    image: '/screenshots/roblox-scripts.png',
    featured: false,
    status: 'beta',
    tags: ['Roblox', 'Game Development', 'Lua', 'Automation']
  }
]

const categories = ['All', 'Productivity', 'AI & Automation', 'Development Tools', 'Games']
const platforms = ['All Platforms', 'Windows', 'macOS', 'Web', 'API', 'Lua']

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
    const matchesPlatform = selectedPlatform === 'All Platforms' ||
      app.platforms.some(platform => platform.toLowerCase().includes(selectedPlatform.toLowerCase()))
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesPlatform && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'beta': return 'bg-yellow-100 text-yellow-800'
      case 'development': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available'
      case 'beta': return 'Beta Testing'
      case 'development': return 'In Development'
      default: return 'Coming Soon'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">Networkak</span>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="/projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-blue-600">Apps</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative bg-gray-50 py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Our <span className="text-blue-600">Applications</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Discover professional software applications designed to enhance your productivity and streamline your workflow.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  id="platform"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map(app => (
              <div key={app.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* App Image/Icon */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative">
                  {!app.image.includes('screenshots') ? (
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{app.title.charAt(0)}</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {app.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* App Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
                      <p className="text-sm text-gray-500">{app.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{app.price}</div>
                      {app.downloads !== 'N/A' && (
                        <div className="text-sm text-gray-500">{app.downloads} downloads</div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{app.description}</p>

                  {/* Platform Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {app.platforms.map(platform => (
                      <span key={platform} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {platform}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  {app.rating > 0 && (
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(app.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{app.rating}/5.0</span>
                    </div>
                  )}

                  {/* Action Button */}
                  {app.status === 'available' ? (
                    <Link href={`/app/${app.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center block transition-colors duration-200">
                      View Details
                    </Link>
                  ) : (
                    <button className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md text-center block cursor-not-allowed text-sm font-medium">
                      {getStatusText(app.status)}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to enhance your workflow?
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Explore our suite of professional applications designed to boost your productivity.
          </p>
          <div className="mt-8">
            <Link href="/" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-900">Networkak</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Professional software applications for modern workflows.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Home</a></li>
                <li><a href="/projects" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Apps</a></li>
                <li><a href="/about" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">About</a></li>
                <li><a href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><span className="text-base text-gray-500">Productivity</span></li>
                <li><span className="text-base text-gray-500">Development Tools</span></li>
                <li><span className="text-base text-gray-500">AI & Automation</span></li>
                <li><span className="text-base text-gray-500">Education</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Help Center</a></li>
                <li><a href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Contact</a></li>
                <li><a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Discord</a></li>
                <li><a href="mailto:support@networkak.com" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-400">© 2025 Networkak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
