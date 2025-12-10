'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Networkak</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
                <Link href="/projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Apps</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</Link>
                <Link href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-8">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Your Gateway to</span>
              <span className="block text-blue-600">All Our Apps</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Networkak is your trusted destination for professionally crafted applications. From productivity tools to creative software, find everything you need in one place.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="rounded-md shadow">
                <Link href="/projects" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                  Browse Our Apps
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/about" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Applications</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover our most popular and essential applications
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Better Notes */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Better Notes</h3>
                  <p className="text-sm text-gray-500">Productivity</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">A powerful note-taking application with AI-powered organization, cloud sync, and advanced formatting tools for developers and students.</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Windows</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">macOS</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Web</span>
                </div>
              </div>
              <Link href="/betternotes" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center block transition-colors duration-200 text-sm font-medium">
                View Details
              </Link>
            </div>

            {/* Roblox Scripts */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Roblox Scripts</h3>
                  <p className="text-sm text-gray-500">Development Tools</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">Comprehensive collection of automation scripts and development tools for Roblox game creation and enhancement.</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Windows</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Lua</span>
                </div>
              </div>
              <button className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md text-center block cursor-not-allowed text-sm font-medium" disabled>
                Coming Soon
              </button>
            </div>

            {/* AI Chatbot */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Chatbot</h3>
                  <p className="text-sm text-gray-500">Artificial Intelligence</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">Intelligent conversational AI with natural language processing capabilities for automated customer support and assistance.</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Web</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">API</span>
                </div>
              </div>
              <button className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md text-center block cursor-not-allowed text-sm font-medium" disabled>
                In Development
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/projects" className="text-blue-600 hover:text-blue-500 text-base font-medium transition-colors duration-200">
              View all applications →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Trusted by Developers Worldwide</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600">15K+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600">50+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Products</div>
            </div>
            <div className="text-4xl font-extrabold text-blue-600 text-center">
              99.9%
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Uptime</div>
            </div>
            <div className="text-4xl font-extrabold text-blue-600 text-center">
              24/7
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to explore our apps?</span>
            <span className="block">Start your journey today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of users who trust Networkak applications for their daily productivity and development needs.
          </p>
          <Link href="/projects" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 sm:w-auto transition-colors duration-200">
            Browse All Apps
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-900">Networkak</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Your trusted source for professional software applications and development tools.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Home</Link></li>
                <li><Link href="/projects" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Apps</Link></li>
                <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">About</Link></li>
                <li><Link href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Apps</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/betternotes" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Better Notes</Link></li>
                <li><span className="text-base text-gray-400">Roblox Scripts</span></li>
                <li><span className="text-base text-gray-400">AI Chatbot</span></li>
                <li><Link href="/projects" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">All Apps</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Help Center</Link></li>
                <li><Link href="/support" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Contact</Link></li>
                <li><a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">Discord</a></li>
                <li><a href="mailto:support@networkak.com" className="text-base text-gray-500 hover:text-gray-900 transition-colors duration-200">support@networkak.com</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="text-base text-gray-400">
              © 2025 Networkak. All rights reserved.
            </div>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="https://github.com/Hajazmuslimmc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C20 6.484 15.522 2 10 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                <span className="sr-only">Discord</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
