'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

// Sample apps data - in a real app, this would come from an API or CMS
const appsData = {
  'better-notes': {
    id: 'better-notes',
    title: 'Better Notes',
    tagline: 'Intelligent note-taking for developers and students',
    description: 'A powerful note-taking application with AI-powered organization, cloud sync, and advanced formatting tools for developers and students.',
    longDescription: `Better Notes redefines note-taking with intelligent features that adapt to your workflow. From code snippets to meeting notes, this cross-platform application ensures your thoughts are always organized and accessible.

    Our AI-powered features automatically categorize your notes, suggest tags, and help you find information instantly. With cloud synchronization across all your devices, your notes are always available when you need them.`,
    category: 'Productivity',
    platforms: ['Windows', 'macOS', 'Web'],
    price: 'Free',
    downloads: '15,000+',
    rating: 4.8,
    version: '2.3.1',
    lastUpdated: '2024-12-01',
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
      'Dark mode support',
      'Search with filters',
      'Export to multiple formats',
      'Mobile app support'
    ],
    screenshots: [
      '/screenshots/better-notes-1.png',
      '/screenshots/better-notes-2.png',
      '/screenshots/better-notes-3.png',
      '/screenshots/better-notes-4.png'
    ],
    downloadLinks: {
      windows: '/downloads/better-notes-windows.exe',
      macos: '/downloads/better-notes-macos.dmg',
      web: 'https://app.betternotes.com'
    },
    developer: 'Networkak Team',
    support: 'support@networkak.com'
  }
}

export default function AppDetail() {
  const params = useParams()
  const appId = params.id as string
  const app = appsData[appId as keyof typeof appsData]

  if (!app) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h1>
          <p className="text-gray-600 mb-6">The application you're looking for doesn't exist.</p>
          <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            Back to Apps
          </Link>
        </div>
      </div>
    )
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

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {app.category}
              </span>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
              {app.title}
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-6">{app.tagline}</p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {app.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{app.downloads}</div>
                <div className="text-sm text-gray-500">Downloads</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{app.rating}</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-lg font-bold text-purple-600">{app.version}</div>
                <div className="text-sm text-gray-500">Version</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-lg font-bold text-gray-900">{app.price}</div>
                <div className="text-sm text-gray-500">Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Screenshots & Features */}
            <div className="lg:col-span-2 space-y-12">
              {/* Screenshots */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {app.screenshots.map((screenshot, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {app.title}</h2>
                <div className="prose prose-lg max-w-none">
                  {app.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* System Requirements */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">System Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(app.systemRequirements).map(([platform, requirement]) => (
                    <div key={platform} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 capitalize mb-2">{platform}</h3>
                      <p className="text-gray-600 text-sm">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Download & Info */}
            <div className="space-y-8">
              {/* Download Section */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Download {app.title}</h3>

                <div className="space-y-4 mb-6">
                  {Object.entries(app.downloadLinks).map(([platform, link]) => (
                    <a
                      key={platform}
                      href={link}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center block"
                    >
                      Download for {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>

                <div className="border-t border-blue-200 pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="text-gray-900 font-medium">{app.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="text-gray-900 font-medium">{app.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <span className="text-gray-900 font-medium">{app.languages.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-gray-900 font-medium">{app.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Platform Support */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Platform Support</h3>
                <div className="space-y-3">
                  {app.platforms.map(platform => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-gray-700">{platform}</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">Having trouble with installation or usage?</p>
                <div className="space-y-2">
                  <Link href="/support" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200">
                    Contact Support
                  </Link>
                  <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200">
                    Join Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Apps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">More Applications</h2>
            <p className="mt-4 text-xl text-gray-600">Explore other applications from Networkak</p>
          </div>

          <div className="text-center">
            <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View All Apps
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-900">Networkak</span>
              </div>
              <p className="text-sm text-gray-500">
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
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Help Center</a></li>
                <li><a href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Contact</a></li>
                <li><a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Discord</a></li>
                <li><a href="mailto:support@networkak.com" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Email</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><span className="text-base text-gray-500">Developer: {app.developer}</span></li>
                <li><a href={`mailto:${app.support}`} className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">{app.support}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-400">© 2025 Networkak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
