'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white">networkak</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#courses" className="text-gray-300 hover:text-white transition-colors font-medium">Learn</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors font-medium">Projects</a>
              <a href="#tools" className="text-gray-300 hover:text-white transition-colors font-medium">Tools</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Learning Platform Style */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black opacity-80"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Learn.<br />Code.<br />Build.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Interactive learning platform where developers and students come together to master modern technologies through hands-on courses and collaborative projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/projects" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-xl">
              Explore Courses
            </Link>
            <Link href="/betternotes/download" className="border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 text-xl">
              Download Tools
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                15K+
              </div>
              <div className="text-gray-300 text-lg">Students Learning</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                50+
              </div>
              <div className="text-gray-300 text-lg">Interactive Courses</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                24/7
              </div>
              <div className="text-gray-300 text-lg">Community Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Learning Platform Style */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Popular Courses</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Master modern technologies with our interactive courses designed for developers and enthusiasts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Cards */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Web Development</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Learn HTML, CSS, JavaScript, and modern frameworks like React and Node.js through hands-on projects.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold">Free Course</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-400">4.8</span>
                </div>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Python & AI</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Master Python programming and build intelligent AI applications with machine learning and data science.</p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-semibold">Featured</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-400">4.9</span>
                </div>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Cybersecurity</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Protect systems and networks with ethical hacking, security protocols, and threat intelligence training.</p>
              <div className="flex justify-between items-center">
                <span className="text-purple-400 font-semibold">Advanced</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-400">4.7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Projects/Tools Section */}
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Developer Tools</h2>
            <p className="text-xl text-gray-300">Powerful tools and applications to supercharge your development workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Better Notes</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">Cross-platform note-taking application with AI-powered organization, cloud sync, and advanced formatting tools. Perfect for developers and students.</p>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-sm">Available now</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-purple-400 font-semibold">15K+ downloads</span>
                  </div>
                  <Link href="/betternotes/download" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Download Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Roblox Development Suite</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">Comprehensive collection of automation scripts and development tools for Roblox game creation. Includes game mechanics, UI components, and scripting utilities.</p>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-400 text-sm">Coming soon</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-blue-400 font-semibold">Beta testing open</span>
                  </div>
                  <button className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Join Beta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Learning Community</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            We believe in empowering developers and creatives worldwide. Whether you're starting your journey or looking to advance your skills, our platform provides the tools, courses, and community to help you succeed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">🌍</div>
              <h4 className="text-lg font-semibold text-white mb-2">Global Community</h4>
              <p className="text-gray-400 text-sm">Connect with developers and students from around the world</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">🚀</div>
              <h4 className="text-lg font-semibold text-white mb-2">Hands-on Learning</h4>
              <p className="text-gray-400 text-sm">Practical projects and real-world applications</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">💡</div>
              <h4 className="text-lg font-semibold text-white mb-2">Innovation First</h4>
              <p className="text-gray-400 text-sm">Cutting-edge tools and modern teaching methods</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <span>Join Our Community</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="m10 3.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zm-9.25 7.25v3.5c0 .966.784 1.75 1.75 1.75h.5a.75.75 0 01.75.75v.25a.75.75 0 01-1.5 0v-.5a.25.25 0 00-.25-.25h-.5a.25.25 0 01-.25-.25v-3.5a.25.25 0 00-.25-.25h-.5a.75.75 0 010-1.5h.5a.25.25 0 00.25-.25z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-lg font-bold">networkak</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering developers and students worldwide through innovative software solutions and collaborative learning.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <div className="space-y-2">
                <a href="#courses" className="block text-gray-400 hover:text-white transition-colors">Courses</a>
                <a href="#tools" className="block text-gray-400 hover:text-white transition-colors">Tools</a>
                <Link href="/projects" className="block text-gray-400 hover:text-white transition-colors">Projects</Link>
                <Link href="/betternotes" className="block text-gray-400 hover:text-white transition-colors">Better Notes</Link>
              </div>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <div className="space-y-2">
                <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>

            {/* Contact / Newsletter */}
            <div>
              <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4 text-sm">Get notified about new tools and courses</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 networkak. Building the future of developer education. | Made with ❤️ for global developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
