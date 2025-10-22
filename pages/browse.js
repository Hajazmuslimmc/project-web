import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Header from '../components/Header';

export default function Browse() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  const programmingLanguages = [
    'All',
    'Python',
    'Java',
    'JavaScript',
    'HTML',
    'CSS',
    'C++',
  ];

  const serviceTypes = [
    'All',
    'Service',
    'Course',
    'Artwork',
  ];

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);
      setFilteredServices(servicesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching services:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = services;

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(service => service.programmingLanguage === selectedLanguage);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(service => service.type === selectedType);
    }

    setFilteredServices(filtered);
  }, [services, selectedLanguage, selectedType]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Services</h1>
            <p className="text-gray-600">Find development services, courses, and projects across multiple programming languages</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programming Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {programmingLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No services found</h2>
              <p className="text-gray-600">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {service.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        service.programmingLanguage === 'Python' ? 'bg-green-100 text-green-800' :
                        service.programmingLanguage === 'Java' ? 'bg-red-100 text-red-800' :
                        service.programmingLanguage === 'JavaScript' ? 'bg-yellow-100 text-yellow-800' :
                        service.programmingLanguage === 'HTML' ? 'bg-orange-100 text-orange-800' :
                        service.programmingLanguage === 'CSS' ? 'bg-blue-100 text-blue-800' :
                        service.programmingLanguage === 'C++' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {service.programmingLanguage}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        Type: {service.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        Category: {service.category || 'General'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        ${service.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        By: {service.creatorName}
                      </span>
                    </div>

                    <div className="mt-4">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
