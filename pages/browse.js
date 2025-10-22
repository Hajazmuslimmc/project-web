import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Header from '../components/Header';
import { Filter, Code2, Star, Heart } from 'lucide-react';

export default function Browse() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  const programmingLanguages = [
    { value: 'All', label: 'All Languages', color: 'gray' },
    { value: 'Python', label: 'Python', color: 'green' },
    { value: 'Java', label: 'Java', color: 'red' },
    { value: 'JavaScript', label: 'JavaScript', color: 'yellow' },
    { value: 'HTML', label: 'HTML', color: 'orange' },
    { value: 'CSS', label: 'CSS', color: 'blue' },
    { value: 'C++', label: 'C++', color: 'purple' },
  ];

  const serviceTypes = [
    { value: 'All', label: 'All Types' },
    { value: 'Service', label: 'Development Service' },
    { value: 'Course', label: 'Course/Tutorial' },
    { value: 'Artwork', label: 'Design/Artwork' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
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
    let filtered = [...services];

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(service => service.programmingLanguage === selectedLanguage);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(service => service.type === selectedType);
    }

    // Sort services
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt.seconds * 1000) - new Date(a.createdAt.seconds * 1000));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt.seconds * 1000) - new Date(b.createdAt.seconds * 1000));
        break;
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
    }

    setFilteredServices(filtered);
  }, [services, selectedLanguage, selectedType, sortBy]);

  const getLanguageIcon = (language) => {
    return {
      'Python': '🐍',
      'Java': '☕',
      'JavaScript': '⚛️',
      'HTML': '🌐',
      'CSS': '🎨',
      'C++': '💿',
    }[language] || '💻';
  };

  const getLanguageColor = (language) => {
    return {
      'Python': 'bg-green-100 text-green-800 border-green-200',
      'Java': 'bg-red-100 text-red-800 border-red-200',
      'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'HTML': 'bg-orange-100 text-orange-800 border-orange-200',
      'CSS': 'bg-blue-100 text-blue-800 border-blue-200',
      'C++': 'bg-purple-100 text-purple-800 border-purple-200',
    }[language] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Developer Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find expert developers across Python, Java, JavaScript, HTML, CSS, and C++.
              Quality services backed by our satisfaction guarantee.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">{filteredServices.length}</div>
              <div className="text-sm text-gray-600">Services Found</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">24h</div>
              <div className="text-sm text-gray-600">Average Response</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-1">⭐ 4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {programmingLanguages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {serviceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-50">🔍</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No services found</h2>
            <p className="text-lg text-gray-600 mb-8">Try adjusting your filters to discover more services</p>
            <button
              onClick={() => {
                setSelectedLanguage('All');
                setSelectedType('All');
                setSortBy('newest');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="card group cursor-pointer">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl">{getLanguageIcon(service.programmingLanguage)}</div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getLanguageColor(service.programmingLanguage)}`}>
                        {service.programmingLanguage}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {service.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {service.category || 'General'}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {service.creatorName?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 truncate">
                        {service.creatorName}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${service.price}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
