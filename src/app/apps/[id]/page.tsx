'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function AppDetail() {
  const params = useParams()
  const appId = params.id as string

  const [app, setApp] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (appId) {
      fetchAppData()
    }
  }, [appId])

  const fetchAppData = async () => {
    try {
      setLoading(true)
      setError(null)

      // In a real app, this would fetch from your API
      // For now, using mock data that matches the apps from the catalog
      const mockAppData = {
        'better-notes': {
          id: 'better-notes',
          name: 'Better Notes',
          tagline: 'Intelligent note-taking for developers and students',
          description: 'A powerful note-taking application with AI-powered organization, cloud sync, and advanced formatting tools for developers and students.',
          longDescription: 'Better Notes redefines note-taking with intelligent features that adapt to your workflow. Our AI-powered features automatically categorize your notes, suggest tags, and help you find information instantly. With cloud synchronization across all your devices, your notes are always available when you need them.',
          category: 'Productivity',
          platforms: ['Windows', 'macOS', 'Web'],
          developer: 'Networkak Team',
          email: 'support@networkak.com',
          price: 'Free',
          downloadCount: '15,000+',
          rating: 4.8,
          version: '2.3.1',
          size: '45 MB',
          languages: ['English', 'Spanish', 'French'],
          systemRequirements: {
            windows: 'Windows 10 or later',
            macos: 'macOS 10.15 or later',
            web: 'Modern web browser with JavaScript enabled'
          },
          features: [
            'AI-powered note organization',
            'Cross-platform synchronization',
            'Advanced formatting tools',
            'Code syntax highlighting',
            'Offline access',
            'Collaboration features',
            'Dark mode support'
          ]
        }
      }

      const appData = mockAppData[appId as keyof typeof mockAppData]

      if (appData) {
        setApp(appData)

        // JavaScript-like functionality - trigger download count update
        setTimeout(() => {
          console.log('Download count would be updated here')
        }, 1000)
      } else {
        setError('App not found')
      }
    } catch (err) {
      console.error('Error fetching app:', err)
      setError('Failed to load app details')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (platform: string) => {
    // Plain JavaScript download functionality
    console.log(`Downloading ${app.name} for ${platform}`)

    // In a real app, this would trigger actual download
    if (platform === 'windows') {
      // window.location.href = app.downloadUrl.windows // example
      alert(`Downloading ${app.name} for Windows (demo)`)
    } else if (platform === 'macos') {
      alert(`Downloading ${app.name} for macOS (demo)`)
    } else if (platform === 'web') {
      alert(`Opening ${app.name} in browser (demo)`)
    }
  }

  const showSystemRequirements = () => {
    // JavaScript function to show requirements
    const requirementsEl = document.getElementById('system-requirements')
    if (requirementsEl) {
      requirementsEl.style.display = requirementsEl.style.display === 'none' ? 'table-row-group' : 'none'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading app details...</p>
        </div>
      </div>
    )
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">App Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The application you\'re looking for doesn\'t exist.'}</p>
          <a href="/apps" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            Back to Apps
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Networkak</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
              <a href="/apps" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-600">Apps</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm mb-4">
              {app.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{app.name}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">{app.tagline}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{app.rating}⭐</div>
                <div className="text-sm text-blue-100">Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{app.downloadCount}</div>
                <div className="text-sm text-blue-100">Downloads</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{app.version}</div>
                <div className="text-sm text-blue-100">Version</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{app.price}</div>
                <div className="text-sm text-blue-100">Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Screenshots */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-gray-500">📱 Screenshot 1</span>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-gray-500">💻 Screenshot 2</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {app.name}</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {app.longDescription.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {app.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Requirements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">System Requirements</h2>
                <button
                  onClick={showSystemRequirements}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Show Details
                </button>
              </div>

              <div className="md:hidden" id="system-requirements" style={{ display: 'none' }}>
                <div className="space-y-4">
                  {Object.entries(app.systemRequirements).map(([platform, req]) => (
                    <div key={platform} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 capitalize mb-2">{platform}</h3>
                      <p className="text-gray-600">{req as string}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase">Platform</th>
                      <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase">Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(app.systemRequirements).map(([platform, req], index) => (
                      <tr key={platform} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-200 px-6 py-4 capitalize font-medium">{platform}</td>
                        <td className="border border-gray-200 px-6 py-4 text-gray-600">{req as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Download {app.name}</h3>

              <div className="space-y-3 mb-6">
                {app.platforms.map((platform: string) => (
                  <button
                    key={platform}
                    onClick={() => handleDownload(platform)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Download for {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>

              {/* App Info */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{app.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{app.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages:</span>
                  <span className="font-medium">{app.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Developer:</span>
                  <a href={`mailto:${app.email}`} className="font-medium text-blue-600 hover:text-blue-700">
                    {app.developer}
                  </a>
                </div>
              </div>

              {/* Platform icons */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {app.platforms.map((platform: string) => (
                    <span key={platform} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                      {platform === 'windows' ? '🖥️' : platform === 'macos' ? '💻' : platform === 'web' ? '🌐' : platform === 'android' ? '📱' : platform === 'ios' ? '📱' : '💻'} {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">Having trouble with installation or usage?</p>
              <div className="space-y-2">
                <a href="/support" className="block w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg text-center transition-colors duration-200">
                  Contact Support
                </a>
                <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-center transition-colors duration-200">
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a href="/" className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">Networkak</span>
          </a>
          <p className="text-gray-400">© 2025 Networkak. All rights reserved.</p>
        </div>
      </footer>

      {/* Custom JavaScript - simulating vanilla JS approach */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Vanilla JavaScript simulation within Next.js
          console.log('App detail page loaded for ${app.name}');

          // Add some interactive functionality
          document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM fully loaded');

            // Add click tracking for downloads
            const downloadButtons = document.querySelectorAll('[class*="bg-blue-600"]');
            downloadButtons.forEach(button => {
              button.addEventListener('click', function() {
                console.log('Download button clicked');
                // Analytics tracking would go here
              });
            });
          });
        `
      }} />
    </div>
  )
}
