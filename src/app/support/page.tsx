'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Support() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  })

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', category: '', message: '' })
  }

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const faqs = [
    {
      question: 'How do I download and install applications from Networkak?',
      answer: 'Visit our Apps page, find the application you\'re interested in, and click the download button. Follow the installation instructions provided with each application. For Windows apps, we provide PowerShell installers for easy setup.'
    },
    {
      question: 'Are all applications on Networkak free?',
      answer: 'Most applications are free to download and use. Some may offer premium features or enhanced versions. Each app page clearly indicates pricing and licensing terms.'
    },
    {
      question: 'What platforms do your applications support?',
      answer: 'Our applications support various platforms including Windows, macOS, Linux, Android, iOS, and web browsers. Platform compatibility is clearly indicated on each app page.'
    },
    {
      question: 'Is my personal data secure when using Networkak applications?',
      answer: 'Yes, security is our top priority. All applications undergo rigorous security testing. We never share personal data with third parties, and all communication is encrypted.'
    },
    {
      question: 'How do I report a bug or suggest a feature?',
      answer: 'You can contact us through this support page or join our Discord community. Please provide detailed information about the issue or feature request to help us assist you better.'
    },
    {
      question: 'Can developers submit their applications to Networkak?',
      answer: 'Yes! We welcome quality applications. Please reach out through our contact form with details about your application and target audience. We review all submissions carefully.'
    },
    {
      question: 'What if I need help with a specific application?',
      answer: 'Each application page includes troubleshooting guides and common solutions. If you need additional help, use our support form or visit our Discord community where our team and other users can assist you.'
    },
    {
      question: 'How frequently are applications updated?',
      answer: 'Updates depend on the developer and application. We encourage regular updates for security and feature improvements. Check our GitHub repositories for the latest developments and release notes.'
    }
  ]

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
                <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-blue-600">Support</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Need <span className="text-blue-600">Help?</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            We're here to help you get the most out of Networkak applications. Find answers, get support, or reach out to our team.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${activeAccordion === index ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {activeAccordion === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form & Quick Help */}
            <div className="space-y-8">
              {/* Quick Help */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Quick Help</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Installation Issues</h4>
                      <p className="text-gray-600 text-sm">Check our documentation or try restarting as administrator.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Compatibility</h4>
                      <p className="text-gray-600 text-sm">All apps work on Windows 10+, macOS 10.15+.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">🚀</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Performance</h4>
                      <p className="text-gray-600 text-sm">Most issues are resolved by updating to latest version.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Support</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Pricing</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Describe your issue or question in detail..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Alternative Contact */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Join Discord Community
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:support@networkak.com" className="text-gray-700 hover:text-blue-600 transition-colors">
                      support@networkak.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-green-800">Response Time</span>
                </div>
                <p className="text-green-700 text-sm">We typically respond to support requests within 24 hours during business days.</p>
              </div>
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
                Your trusted partner for professional applications and development tools.
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
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="/support" className="text-base text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="/support" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="https://discord.gg/86deseDdbf" target="_blank" rel="noopener noreferrer" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Discord</a></li>
                <li><a href="mailto:support@networkak.com" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Email Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Terms</a></li>
                <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors duration-200">Licenses</a></li>
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
