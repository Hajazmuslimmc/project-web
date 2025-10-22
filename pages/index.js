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
            Discover and purchase amazing courses, artwork, and development services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Category Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Courses</h3>
            <p className="text-gray-600">
              Learn web development with expert courses in Python, Java, JavaScript, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Artwork</h3>
            <p className="text-gray-600">
              Beautiful digital artwork, UI designs, and creative services.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Development Services</h3>
            <p className="text-gray-600">
              Custom development in HTML, CSS, Python, Java, and JavaScript.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Start Exploring
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
