'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function DownloadPage() {
  const platforms = [
    {
      name: 'Windows',
      logo: '🪟',
      description: 'Download for Windows 10/11',
      downloadUrl: '/Networkak/dist/Networkak Setup 1.0.0.exe',
      fileName: 'Networkak Setup 1.0.0.exe',
      size: '45.2 MB'
    },
    {
      name: 'macOS',
      logo: '🍎',
      description: 'Download for macOS 10.15+ (Apple Silicon M1/M2/M3/M4)',
      downloadUrl: '/Networkak/dist/Networkak-1.0.0-arm64.dmg',
      fileName: 'Networkak-1.0.0-arm64.dmg',
      size: '52.8 MB'
    },
    {
      name: 'Linux',
      logo: '🐧',
      description: 'Download for Linux (Ubuntu, Fedora, etc.)',
      downloadUrl: '/Networkak/dist/Networkak-1.0.0-arm64.AppImage',
      fileName: 'Networkak-1.0.0-arm64.AppImage',
      size: '48.6 MB'
    },
    {
      name: 'Android',
      logo: '🤖',
      description: 'Use Web App on Android Devices',
      downloadUrl: '/',
      fileName: 'Web App',
      size: 'N/A',
      webApp: true
    },
    {
      name: 'iOS',
      logo: '📱',
      description: 'Coming Soon - iOS App Store',
      downloadUrl: '#',
      fileName: 'Coming Soon',
      size: 'TBA',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold gradient-text">
              🎮 Networkak
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/fc-messenger" className="text-gray-300 hover:text-white transition-colors">
                Messenger
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Download Networkak
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the ultimate social gaming platform on your desktop or mobile device.
            Play games offline, chat with friends, and compete on leaderboards!
          </p>

          {/* App Preview */}
          <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">🎮 Features</h3>
                <ul className="text-left space-y-2 text-gray-300">
                  <li>✅ Offline Snake Game</li>
                  <li>✅ Real-time Messenger</li>
                  <li>✅ Global Leaderboards</li>
                  <li>✅ Social Gaming</li>
                  <li>✅ Cross-Platform</li>
                  <li>✅ No Internet Required for Games</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">🎯</div>
                <p className="text-lg text-gray-400">Ready to play anywhere!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Choose Your Platform
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                  platform.comingSoon ? 'opacity-60' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{platform.logo}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-gray-400 mb-4">{platform.description}</p>

                  <div className="text-sm text-gray-500 mb-4">
                    <p>File: {platform.fileName}</p>
                    <p>Size: {platform.size}</p>
                  </div>

                  {platform.comingSoon ? (
                    <button
                      disabled
                      className="w-full bg-gray-600 text-gray-400 py-3 px-6 rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  ) : platform.webApp ? (
                    <button
                      onClick={() => window.location.href = platform.downloadUrl}
                      className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
                    >
                      Open Web App
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = platform.downloadUrl;
                        link.download = platform.fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
                    >
                      Download Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            System Requirements
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">💻 Desktop (Windows/macOS/Linux)</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• OS: Windows 10+, macOS 10.15+, Ubuntu 18.04+</li>
                <li>• RAM: 2GB minimum, 4GB recommended</li>
                <li>• Storage: 100MB free space</li>
                <li>• Display: 1280x720 minimum resolution</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📱 Mobile (Android)</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• OS: Android 8.0+ (API 26+)</li>
                <li>• RAM: 1GB minimum, 2GB recommended</li>
                <li>• Storage: 50MB free space</li>
                <li>• Display: Any modern Android device</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">🎮 Can I play games offline?</h3>
              <p className="text-gray-300">Yes! The Snake game and other offline features work without an internet connection.</p>
            </div>

            <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">💬 Do I need internet for messaging?</h3>
              <p className="text-gray-300">For the full social features, internet is recommended. However, you can use local messaging offline.</p>
            </div>

            <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">🔒 Is the app safe to download?</h3>
              <p className="text-gray-300">Yes, Networkak is built with security in mind. All downloads are virus-free and safe.</p>
            </div>

            <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/60 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">📱 When will iOS be available?</h3>
              <p className="text-gray-300">iOS support is coming soon! We're working on getting Networkak approved for the App Store.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2025 Networkak. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Back to Website
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
