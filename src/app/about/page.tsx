export default function About() {
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
                <a href="/projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Apps</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-blue-600">About</a>
                <a href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About <span className="text-blue-600">Networkak</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Building the future of software development through innovative applications and connected ecosystems.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Our Story */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Story</h2>
            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                Networkak was founded with a simple mission: to create a trusted platform where developers and users can discover,
                access, and manage high-quality software applications in one place. Born from the frustration of scattered
                tools and inconsistent software experiences, we set out to build a better ecosystem.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                What started as a personal passion project has grown into a comprehensive platform serving thousands of users
                worldwide. We believe in the power of connected software ecosystems and the impact that thoughtfully designed
                tools can have on productivity and creativity.
              </p>
            </div>
          </div>

          {/* Mission & Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To create a connected ecosystem of apps that empowers users and developers alike. We strive to make
                software discovery, installation, and management effortless while maintaining the highest standards
                of quality, security, and user experience.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Quality First: Every app in our ecosystem meets rigorous standards</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">User-Centric: Everything we build starts with user needs</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Innovation: Constantly pushing boundaries and exploring new possibilities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team/Founder Section */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Meet the Founder</h2>
              <p className="mt-4 text-lg text-gray-600">The vision behind Networkak</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-6">
                  <span className="text-white text-6xl font-bold">H</span>
                </div>
              </div>

              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hamed Rohani</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  With over 15 years in software engineering and education technology, Hamed founded Networkak
                  to solve real problems faced by developers and software users worldwide. His experience ranges
                  from enterprise software development to educational platform creation, giving him unique insights
                  into what makes software truly valuable.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">300+</div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">50+</div>
                    <div className="text-sm text-gray-500">Publications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">15K+</div>
                    <div className="text-sm text-gray-500">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Sets Us Apart */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">What Sets Us Apart</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security First</h3>
                <p className="text-gray-600 text-sm">All applications undergo rigorous security testing before being added to our platform.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
                <p className="text-gray-600 text-sm">Optimized applications that prioritize speed, efficiency, and responsive user experiences.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Built with community feedback and driven by user needs to create meaningful solutions.</p>
              </div>
            </div>
          </div>

          {/* Contact/Join Us CTA */}
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Ecosystem?</h2>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a developer looking to share your work or a user seeking the best tools,
              Networkak is your gateway to professional software applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/projects" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Explore Our Apps
              </a>
              <a href="/support" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="ml-2 text-lg font-bold">Networkak</span>
              </div>
              <p className="text-sm text-gray-400">
                Building professional software solutions with trust and innovation.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/projects" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Apps</a></li>
                <li><a href="/about" className="text-base text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="/support" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Discord</a></li>
                <li><a href="https://github.com/Hajazmuslimmc" target="_blank" rel="noopener noreferrer" className="text-base text-gray-400 hover:text-white transition-colors duration-200">GitHub</a></li>
                <li><a href="/support" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@networkak.com" className="text-base text-gray-400 hover:text-white transition-colors duration-200">support@networkak.com</a></li>
                <li><span className="text-base text-gray-400">Available 24/7</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2025 Networkak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
