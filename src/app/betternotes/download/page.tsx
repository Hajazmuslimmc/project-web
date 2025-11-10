import Link from 'next/link';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Download Better Notes
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your platform to download the app
          </p>
        </div>
        <div className="space-y-4">
          {/* Mac Download */}
          <a
            href="https://drive.google.com/drive/folders/15NKp-IEN8mrIlqS_DLZpr7coOQPD9PFF"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Download for Mac
          </a>

          {/* Android - Coming Soon */}
          <button
            disabled
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
          >
            Android - Not Available Yet
          </button>

          {/* iOS - Coming Soon */}
          <button
            disabled
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
          >
            iOS - Not Available Yet
          </button>

          {/* Linux - Coming Soon */}
          <button
            disabled
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
          >
            Linux - Not Available Yet
          </button>

          {/* Windows - Coming Soon */}
          <button
            disabled
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed"
          >
            Windows - Not Available Yet
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
