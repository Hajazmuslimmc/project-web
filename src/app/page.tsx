'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                networkak
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#showcase" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                Showcase
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#tools" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                Tools
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#community" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                Community
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/projects" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra Modern */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/20">
                  <span className="text-sm font-semibold text-blue-600">🚀 Powering Developer Innovation</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Revolutionize
                  </span>
                  <br />
                  <span className="text-gray-900">Your Development</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Experience cutting-edge tools, AI-powered solutions, and a thriving community that accelerates your journey to becoming a world-class developer.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/projects" className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-purple-500/25">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Explore Projects</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link href="/betternotes/download" className="group border-2 border-gray-300 hover:border-blue-300 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg">
                  <span>Download Tools</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">U</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">D</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">S</div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">15,000+</span> developers trust networkak
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/20 shadow-2xl">
                {/* Mock Dashboard UI */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">N</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Welcome back</div>
                      <div className="font-bold text-gray-900">Developer</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">Better Notes Ready</span>
                      </div>
                      <p className="text-sm text-gray-600">Your AI-powered note taker is updated and ready for action.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">42</div>
                        <div className="text-sm text-gray-600">Projects</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">127</div>
                        <div className="text-sm text-gray-600">Commits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Ultra Modern Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Animated Stat Cards */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 hover:border-blue-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">15K+</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Active Users</div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 hover:border-purple-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">50+</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Downloads</div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 hover:border-pink-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">99%</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Uptime</div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 hover:border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-green-600 transition-colors">24/7</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Cutting-Edge Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Empowering developers with next-generation tools and platforms that redefine what's possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Advanced Analytics</h3>
              <p className="text-gray-300 leading-relaxed">Real-time insights and predictive analytics that help you make data-driven decisions with unprecedented accuracy.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">Lightning Performance</h3>
              <p className="text-gray-300 leading-relaxed">Optimized for speed with sub-millisecond response times, ensuring your applications run blazingly fast.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">AI Integration</h3>
              <p className="text-gray-300 leading-relaxed">Seamlessly integrated AI capabilities that enhance productivity and unlock new possibilities in development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section - Interactive Cards */}
      <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Featured Showcases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore groundbreaking projects and innovative solutions that are shaping the future of technology.</p>
          </div>

          {/* Interactive Project Cards */}
          <div className="space-y-8">
            <div className="group bg-gradient-to-r from-blue-50 via-white to-purple-50 p-10 rounded-3xl border-2 border-transparent hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Better Notes</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">Revolutionary note-taking application with AI-powered organization, real-time collaboration, and seamless cross-platform sync.</p>
                  <div className="flex items-center space-x-6 pt-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold">2.3M Downloads</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927a.25.25 0 00-.102.054l-2.5 1.5a.25.25 0 00-.106.222V8.5c0 2.236.613 4.339 1.733 6.212a.25.25 0 00.231.137H10.5a.25.25 0 00.231-.137C12.351 12.839 12.964 10.736 12.964 8.5V4.703a.25.25 0 00-.106-.222l-2.5-1.5a.25.25 0 00-.102-.054z"/>
                      </svg>
                      <span className="font-semibold">4.9/5 Rating</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">React</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">AI</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Productivity</span>
                  </div>
                </div>
                <div className="w-full lg:w-96 h-64 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-lg font-semibold">Interactive Demo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Futuristic */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join a global community of innovators and start creating something extraordinary today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/projects" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
              Start Building Now
            </Link>
            <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-sm">
              Join Community (10K+ Members)
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Ultra Modern */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  networkak
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering developers worldwide with cutting-edge tools, innovative solutions, and a thriving community that pushes the boundaries of what's possible.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="m10 3.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zm-9.25 7.25v3.5c0 .966.784 1.75 1.75 1.75h.5a.75.75 0 01.75.75v.25a.75.75 0 01-1.5 0v-.5a.25.25 0 00-.25-.25h-.5a.25.25 0 01-.25-.25v-3.5a.25.25 0 00-.25-.25h-.5a.75.75 0 010-1.5h.5a.25.25 0 00.25-.25z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C20 6.484 15.522 2 10 2z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Platform</h3>
              <div className="space-y-4">
                <Link href="/projects" className="block text-gray-400 hover:text-white transition-colors">Projects</Link>
                <Link href="/betternotes" className="block text-gray-400 hover:text-white transition-colors">Better Notes</Link>
                <a href="#tools" className="block text-gray-400 hover:text-white transition-colors">Developer Tools</a>
                <a href="#showcase" className="block text-gray-400 hover:text-white transition-colors">Showcase</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Community</h3>
              <div className="space-y-4">
                <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Discord (10K+)</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-6">Get the latest updates on new tools and features.</p>
              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-r-xl font-semibold transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left">
                © 2025 networkak. Revolutionizing development one innovation at a time.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
