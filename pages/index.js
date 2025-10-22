import React from 'react';
import Header from '../components/Header';

function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Web Games Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover and purchase amazing courses, artwork, and development services in multiple programming languages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Programming Language Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🐍</div>
            <h3 className="text-xl font-semibold mb-2">Python</h3>
            <p className="text-gray-600">
              Data science, machine learning, web development, and automation services.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">☕</div>
            <h3 className="text-xl font-semibold mb-2">Java</h3>
            <p className="text-gray-600">
              Enterprise applications, Android development, and backend services.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💿</div>
            <h3 className="text-xl font-semibold mb-2">C++</h3>
            <p className="text-gray-600">
              System programming, game development, and high-performance applications.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">⚛️</div>
            <h3 className="text-xl font-semibold mb-2">JavaScript</h3>
            <p className="text-gray-600">
              Web applications, Node.js backends, and frontend development.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-2">HTML & CSS</h3>
            <p className="text-gray-600">
              Beautiful websites, responsive designs, and UI/UX development.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Design & Artwork</h3>
            <p className="text-gray-600">
              Digital art, graphics design, and creative visual services.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a href="/browse" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
            Start Browsing Services
          </a>
        </div>
      </main>
    </div>
  );
}

export default Home;
