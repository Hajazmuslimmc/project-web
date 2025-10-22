import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Header from '../components/Header';
import toast, { Toaster } from 'react-hot-toast';
import { Code2, DollarSign, FileText, Briefcase, Tag } from 'lucide-react';

export default function CreateService() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    programmingLanguage: 'JavaScript',
    price: '',
    type: 'Service',
  });

  const programmingLanguages = [
    { value: 'Python', label: 'Python', emoji: '🐍' },
    { value: 'Java', label: 'Java', emoji: '☕' },
    { value: 'JavaScript', label: 'JavaScript', emoji: '⚛️' },
    { value: 'HTML', label: 'HTML', emoji: '🌐' },
    { value: 'CSS', label: 'CSS', emoji: '🎨' },
    { value: 'C++', label: 'C++', emoji: '💿' },
  ];

  const categories = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Apps', label: 'Mobile Apps' },
    { value: 'Data Science', label: 'Data Science & AI' },
    { value: 'Game Development', label: 'Game Development' },
    { value: 'Desktop Apps', label: 'Desktop Applications' },
    { value: 'Other', label: 'Other' },
  ];

  const types = [
    { value: 'Service', label: 'Development Service', icon: Code2 },
    { value: 'Course', label: 'Course/Tutorial', icon: FileText },
    { value: 'Artwork', label: 'Design/Artwork', icon: Briefcase },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-12 text-center max-w-md">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to create a service</h1>
            <p className="text-gray-600 mb-8">Only registered creators can post services on our platform</p>
            <button
              onClick={() => signIn()}
              className="btn-primary"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (session.user.role !== 'Creator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-12 text-center max-w-md">
            <div className="text-6xl mb-6">👨‍💻</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Creator Account Required</h1>
            <p className="text-gray-600 mb-8">Only verified creators can post services. Upgrade to a creator account or sign up as a creator.</p>
            <a href="/auth/signup" className="btn-primary block">
              Become a Creator
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        creatorId: session.user.id,
        creatorEmail: session.user.email,
        creatorName: session.user.name,
        createdAt: new Date(),
        status: 'active',
      };

      await addDoc(collection(db, 'services'), serviceData);

      toast.success('Service created successfully!', {
        duration: 4000,
        style: {
          background: '#10B981',
          color: 'white',
          fontSize: '16px'
        }
      });
      router.push('/browse');
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Error creating service. Please try again.', {
        duration: 4000,
        style: {
          background: '#EF4444',
          color: 'white'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="top-center" />
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Create Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your expertise and connect with clients who need your programming skills
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">New Service</h2>
                  <p className="opacity-90">Fill in the details to get started</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-3">
                  Service Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Custom Python Web Application Development"
                    className="w-full pl-4 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  />
                  <Tag className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mb-3">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your service in detail. What technologies you'll use, what the client will receive, and any specific requirements..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-lg"
                  />
                  <FileText className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Three Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Service Type */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Service Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  >
                    {types.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Programming Language with Emojis */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Programming Language
                  </label>
                  <select
                    name="programmingLanguage"
                    value={formData.programmingLanguage}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  >
                    {programmingLanguages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.emoji} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-lg font-semibold text-gray-900 mb-3">
                  Price (USD)
                </label>
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="99.99"
                    className="pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-xl font-semibold"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Set a competitive price based on the complexity and scope of your service
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Creating Service...</span>
                    </>
                  ) : (
                    <>
                      <Code2 className="h-6 w-6" />
                      <span>Create Service</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
