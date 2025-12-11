'use client'

export default function NetworkakApp() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Networkak Application
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
          <div className="text-6xl mb-6">📱</div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Desktop Application
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            This is a desktop application. Download it from our official website.
          </p>
          <a
            href="/download"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Download Application
          </a>
        </div>
      </div>
    </div>
  );
}
