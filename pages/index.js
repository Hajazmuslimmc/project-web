import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { ArrowRight, Star, Code2, Briefcase, Palette } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Premium <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Developer</span>
              <br />Services Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with expert developers across Python, Java, JavaScript, HTML, CSS, and C++.
              Find the perfect service for your project needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/browse" className="btn-primary flex items-center space-x-2 text-lg px-8 py-4">
                <span>Browse Services</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>4.9</span>
                </div>
                <span>•</span>
                <span>10,000+ Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Programming Languages We Support
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access expert developers in every major programming language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Python */}
            <div className="card group">
              <div className="p-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Python</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Data science, machine learning, web development, and automation services with the world's most popular programming language.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">🐍</div>
                  <span className="text-sm font-semibold text-green-600">2,500+ Services</span>
                </div>
              </div>
            </div>

            {/* Java */}
            <div className="card group">
              <div className="p-8">
                <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Java</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Enterprise applications, Android development, Spring Boot backends, and robust enterprise solutions.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">☕</div>
                  <span className="text-sm font-semibold text-red-600">1,800+ Services</span>
                </div>
              </div>
            </div>

            {/* C++ */}
            <div className="card group">
              <div className="p-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">C++</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  System programming, game development, performance-critical applications, and embedded systems.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">💿</div>
                  <span className="text-sm font-semibold text-blue-600">950+ Services</span>
                </div>
              </div>
            </div>

            {/* JavaScript */}
            <div className="card group">
              <div className="p-8">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">JavaScript</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Web applications, Node.js backends, React/Vue/Angular frontends, and full-stack development.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">⚛️</div>
                  <span className="text-sm font-semibold text-yellow-600">3,200+ Services</span>
                </div>
              </div>
            </div>

            {/* HTML & CSS */}
            <div className="card group">
              <div className="p-8">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">HTML & CSS</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Beautiful websites, responsive designs, UI/UX development, and web optimization services.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">🌐</div>
                  <span className="text-sm font-semibold text-orange-600">1,500+ Services</span>
                </div>
              </div>
            </div>

            {/* Design & Artwork */}
            <div className="card group">
              <div className="p-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Design & Artwork</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Digital art, graphics design, branding, and creative visual services for your projects.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">🎨</div>
                  <span className="text-sm font-semibold text-purple-600">1,200+ Services</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/browse" className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4 mx-auto justify-center w-fit">
              <span>Explore All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl opacity-90">Services Available</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-xl opacity-90">Expert Developers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl opacity-90">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and clients connecting through our secure platform.
            Find the perfect service for your needs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
              Create Your Account
            </Link>
            <Link href="/browse" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200">
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
