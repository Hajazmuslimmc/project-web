export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Download FreeMC Launcher</h1>
      <p className="text-lg mb-6 text-center max-w-2xl">
        Get the latest version of the FreeMC Launcher to access all features including capes, ranks, and more.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Java 21 or higher</li>
          <li>Windows/Mac/Linux</li>
          <li>Internet connection for authentication</li>
        </ul>
        <a
          href="/freemc/freemc-launcher.jar"
          download
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Download FreeMC Launcher (JAR)
        </a>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          After downloading, run with: <code className="bg-gray-700 px-2 py-1 rounded">java -jar freemc-launcher.jar</code>
        </p>
      </div>
    </div>
  );
}