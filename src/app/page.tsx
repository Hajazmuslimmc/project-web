'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Networkak</h1>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Work in Progress</h2>
          <p className="text-gray-600 leading-relaxed">
            We're currently rebuilding our website with exciting new features and a fresh design. Check back soon for updates!
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          © 2025 Networkak. All rights reserved.
        </div>
      </div>
    </div>
  )
}
