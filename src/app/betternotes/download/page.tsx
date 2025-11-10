import Link from 'next/link';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Better Notes</h1>
                <p className="text-sm text-gray-600">Download Center</p>
              </div>
            </div>
            <Link
              href="/betternotes"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Better Notes
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Download <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Better Notes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your platform and start taking better notes across all your devices
          </p>
        </div>

        {/* Download Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Mac Download */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">macOS</h3>
              <p className="text-gray-600 mb-6">Available now for Mac computers</p>
              <a
                href="https://drive.google.com/drive/folders/15NKp-IEN8mrIlqS_DLZpr7coOQPD9PFF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Download for Mac
              </a>
            </div>
          </div>

          {/* Android - Coming Soon */}
          <div className="bg-white rounded-2xl shadow-xl p-8 opacity-75 hover:opacity-100 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm-11.046 0c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm11.046-5.732c0-.8278-.6722-1.5-1.5-1.5H8.977c-.8278 0-1.5.6722-1.5 1.5v.5886c0 .5511-.4482.9993-.9993.9993s-.9993-.4482-.9993-.9993V9.6094c0-1.9304 1.5696-3.5 3.5-3.5h7.046c1.9304 0 3.5 1.5696 3.5 3.5v.5886c0 .5511-.4482.9993-.9993.9993s-.9993-.4482-.9993-.9993V9.6094z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Android</h3>
              <p className="text-gray-600 mb-6">Coming soon to Android devices</p>
              <button
                disabled
                className="inline-block w-full bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* iOS - Coming Soon */}
          <div className="bg-white rounded-2xl shadow-xl p-8 opacity-75 hover:opacity-100 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">iOS</h3>
              <p className="text-gray-600 mb-6">Coming soon to iPhone and iPad</p>
              <button
                disabled
                className="inline-block w-full bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Windows - Coming Soon */}
          <div className="bg-white rounded-2xl shadow-xl p-8 opacity-75 hover:opacity-100 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.551h-10.949M0 12.6h9.75V24L0 22.449M10.949 12.397L24 11.551V24L10.949 23.478"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Windows</h3>
              <p className="text-gray-600 mb-6">Coming soon to Windows PCs</p>
              <button
                disabled
                className="inline-block w-full bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Linux - Coming Soon */}
          <div className="bg-white rounded-2xl shadow-xl p-8 opacity-75 hover:opacity-100 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.23 12.004a2.236 2.236 0 0 0 .23-1.004c0-.379-.094-.74-.23-1.004C13.784 8.74 12.087 8 10.5 8s-3.284.74-3.73 1.996c-.136.264-.23.625-.23 1.004 0 .379.094.74.23 1.004C7.216 13.26 8.913 14 10.5 14s3.284-.74 3.73-1.996zM10.5 9c.828 0 1.5.672 1.5 1.5S11.328 12 10.5 12 9 11.328 9 10.5 9.672 9 10.5 9zm5.5 2.5c0 1.379-1.122 2.5-2.5 2.5S11 12.879 11 11.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Linux</h3>
              <p className="text-gray-600 mb-6">Coming soon to Linux distributions</p>
              <button
                disabled
                className="inline-block w-full bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Web Version - Coming Soon */}
          <div className="bg-white rounded-2xl shadow-xl p-8 opacity-75 hover:opacity-100 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Web</h3>
              <p className="text-gray-600 mb-6">Access anywhere in your browser</p>
              <button
                disabled
                className="inline-block w-full bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">macOS</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• macOS 10.15 or later</li>
                <li>• Intel or Apple Silicon processor</li>
                <li>• 256 MB RAM</li>
                <li>• 50 MB free disk space</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Coming Soon</h4>
              <p className="text-gray-600">Requirements for other platforms will be available when they launch.</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6">Get notified when new platforms become available</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              <p>&copy; 2025 Better Notes. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/betternotes" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
