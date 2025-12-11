export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">💬</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Discord
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Get help, report issues, or chat with our community on Discord!
          </p>
          <a
            href="https://discord.gg/86deseDdbf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Join Discord Server
          </a>
          <div className="mt-8">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}