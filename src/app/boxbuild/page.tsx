'use client'

import React, { useState } from 'react';

export default function BoxBuildPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showTemplateCreator, setShowTemplateCreator] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [templateEmoji, setTemplateEmoji] = useState('');
  const [templateColor, setTemplateColor] = useState('from-blue-500 to-purple-600');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string, initials: string} | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  React.useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('coachlaunch_templates') || '[]');
    setCustomTemplates(savedTemplates);
  }, []);

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName || !templateEmoji) return;
    
    if (editingTemplate) {
      // Update existing template
      const updatedTemplates = customTemplates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, name: templateName, image: templateEmoji, color: templateColor }
          : t
      );
      setCustomTemplates(updatedTemplates);
      localStorage.setItem('coachlaunch_templates', JSON.stringify(updatedTemplates));
      alert('Template updated successfully!');
    } else {
      // Create new template
      const newTemplate = {
        name: templateName,
        image: templateEmoji,
        color: templateColor,
        custom: true,
        id: Date.now().toString()
      };
      
      const updatedTemplates = [...customTemplates, newTemplate];
      setCustomTemplates(updatedTemplates);
      localStorage.setItem('coachlaunch_templates', JSON.stringify(updatedTemplates));
      alert('Custom template created successfully!');
    }
    
    setTemplateName('');
    setTemplateEmoji('');
    setTemplateColor('from-blue-500 to-purple-600');
    setEditingTemplate(null);
    setShowTemplateCreator(false);
  };

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setTemplateEmoji(template.image);
    setTemplateColor(template.color);
    setShowTemplateCreator(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = customTemplates.filter(t => t.id !== templateId);
      setCustomTemplates(updatedTemplates);
      localStorage.setItem('coachlaunch_templates', JSON.stringify(updatedTemplates));
      alert('Template deleted successfully!');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('coachlaunch_users') || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.find((user: any) => user.name === name);
      if (userExists) {
        alert('User already exists! Please choose a different name.');
        setLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        password,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage database
      existingUsers.push(newUser);
      localStorage.setItem('coachlaunch_users', JSON.stringify(existingUsers));
      
      setTimeout(() => {
        alert(`Welcome ${name}! Account created and saved successfully.`);
        setCurrentUser({
          name: name,
          initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        });
        setIsLoggedIn(true);
        setShowSignup(false);
        setPassword('');
        setName('');
        setLoading(false);
      }, 1500);
    } catch (error) {
      alert('Error creating account. Please try again.');
      setLoading(false);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get users from localStorage database
      const existingUsers = JSON.parse(localStorage.getItem('coachlaunch_users') || '[]');
      
      // Find user with matching name and password
      const user = existingUsers.find((user: any) => user.name === name && user.password === password);
      
      setTimeout(() => {
        if (user) {
          alert(`Welcome back ${name}!`);
          setCurrentUser({
            name: name,
            initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
          });
          setIsLoggedIn(true);
          setShowSignin(false);
        } else {
          alert('Invalid name or password. Please try again.');
        }
        setPassword('');
        setName('');
        setLoading(false);
      }, 1500);
    } catch (error) {
      alert('Error signing in. Please try again.');
      setLoading(false);
    }
  };

  const templates = [
    { name: "Life Coach Pro", image: "🧠", color: "from-blue-500 to-purple-600" },
    { name: "Fitness Expert", image: "💪", color: "from-green-500 to-blue-500" },
    { name: "Business Mentor", image: "📈", color: "from-orange-500 to-red-500" },
    { name: "Wellness Coach", image: "🌿", color: "from-green-400 to-teal-500" },
    { name: "Minecraft PVP Server", image: "⚔️", color: "from-red-500 to-gray-800" },
    ...customTemplates
  ];

  const features = [
    { icon: "⚡", title: "10-Minute Setup", desc: "Professional website ready in minutes" },
    { icon: "📱", title: "Mobile Responsive", desc: "Perfect on all devices" },
    { icon: "🎨", title: "Beautiful Templates", desc: "Coach-focused designs" },
    { icon: "📅", title: "Booking Integration", desc: "Calendly & built-in booking" },
    { icon: "💳", title: "Accept Payments", desc: "Stripe integration included" },
    { icon: "🌐", title: "Custom Domain", desc: "Your brand, your domain" },
    { icon: "📊", title: "Analytics", desc: "Track visitors and conversions" },
    { icon: "🔒", title: "SSL Secure", desc: "Bank-level security" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🚀</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CoachLaunch</h1>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Features</a>
                <a href="#templates" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Templates</a>
                <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a>
              </nav>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              {!isLoggedIn ? (
                <button 
                  onClick={() => setShowSignup(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {currentUser?.initials}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{currentUser?.name}</span>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setCurrentUser(null);
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Build Your Coaching Website in 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 10 Minutes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional websites for life coaches, fitness coaches, and business mentors. No coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                🚀 Start 7-Day Free Trial
              </button>
              <a 
                href="/dashboard"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
              >
                👀 View Dashboard
              </a>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              ✅ 7-day free trial • ✅ No credit card required • ✅ Cancel anytime
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10min</div>
                <div className="text-gray-600 dark:text-gray-400">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
                <div className="text-gray-600 dark:text-gray-400">Coaches Trust Us</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">99.9%</div>
                <div className="text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Built specifically for coaches who want results, not tech headaches</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Professional Templates</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Designed by experts, optimized for conversions</p>
            <button
              onClick={() => setShowTemplateCreator(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              + Create Custom Template
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {templates.map((template, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                  <div className="text-6xl">{template.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {template.name === 'Minecraft PVP Server' ? 'Perfect for gaming servers' : `Perfect for ${template.name.toLowerCase()}s`}
                  </p>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Preview Template
                    </button>
                    {template.custom && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditTemplate(template)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">From signup to live website in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Choose Template</h3>
              <p className="text-gray-600 dark:text-gray-300">Pick from our coach-focused templates designed to convert visitors into clients</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Customize Content</h3>
              <p className="text-gray-600 dark:text-gray-300">Add your content, photos, and branding with our simple drag-and-drop editor</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Go Live</h3>
              <p className="text-gray-600 dark:text-gray-300">Publish your website and start attracting clients with booking and payment features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Choose the plan that fits your coaching business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Starter</h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">$19</div>
                <div className="text-gray-600 dark:text-gray-300">/month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  1 website
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Professional templates
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  SSL hosting
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Mobile responsive
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Basic analytics
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Start Free Trial
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">$29</div>
                <div className="text-gray-600 dark:text-gray-300">/month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Everything in Starter
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Custom domain
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Booking integration
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Email support
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Start Free Trial
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium</h3>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">$49</div>
                <div className="text-gray-600 dark:text-gray-300">/month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Accept payments
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Branding removal
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  Priority support
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-3">✅</span>
                  White-label option
                </li>
              </ul>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">What Coaches Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Join hundreds of successful coaches</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "CoachLaunch helped me get my coaching business online in just one afternoon. The templates are beautiful and my clients love the booking system!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Sarah Mitchell</div>
                  <div className="text-gray-600 dark:text-gray-400">Life Coach</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "Finally, a website builder that understands coaches! The payment integration saved me from using 3 different tools."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Mike Johnson</div>
                  <div className="text-gray-600 dark:text-gray-400">Fitness Coach</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "I went from zero to a professional coaching website in 8 minutes. The analytics help me understand my audience better."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LC
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Lisa Chen</div>
                  <div className="text-gray-600 dark:text-gray-400">Business Coach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch Your Coaching Website?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of coaches who've built their online presence with CoachLaunch
          </p>
          
          <button 
            onClick={() => setShowSignup(true)}
            className="bg-white text-blue-600 px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors mb-6"
          >
            🚀 Start Your 7-Day Free Trial
          </button>
          
          <div className="text-sm opacity-75">
            No credit card required • 7-day free trial • Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="text-xl font-bold">CoachLaunch</span>
              </div>
              <p className="text-gray-400 mb-4">
                Professional websites for coaches. Built by Networkak.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 CoachLaunch by Networkak. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
              <button 
                onClick={() => setShowSignup(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password (min 6 characters)"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button 
                  onClick={() => {
                    setShowSignup(false);
                    setShowSignin(true);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signin Modal */}
      {showSignin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
              <button 
                onClick={() => setShowSignin(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSignin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button 
                  onClick={() => {
                    setShowSignin(false);
                    setShowSignup(true);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Template Creator Modal */}
      {showTemplateCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingTemplate ? 'Edit Template' : 'Create Custom Template'}
              </h2>
              <button 
                onClick={() => {
                  setShowTemplateCreator(false);
                  setEditingTemplate(null);
                  setTemplateName('');
                  setTemplateEmoji('');
                  setTemplateColor('from-blue-500 to-purple-600');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateTemplate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Yoga Instructor"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Emoji Icon
                </label>
                <input
                  type="text"
                  value={templateEmoji}
                  onChange={(e) => setTemplateEmoji(e.target.value)}
                  required
                  maxLength={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                  placeholder="🧘"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color Theme
                </label>
                <select
                  value={templateColor}
                  onChange={(e) => setTemplateColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="from-blue-500 to-purple-600">Blue to Purple</option>
                  <option value="from-green-500 to-blue-500">Green to Blue</option>
                  <option value="from-orange-500 to-red-500">Orange to Red</option>
                  <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                  <option value="from-yellow-400 to-orange-500">Yellow to Orange</option>
                  <option value="from-teal-400 to-blue-500">Teal to Blue</option>
                </select>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Preview:</p>
                <div className={`h-24 bg-gradient-to-br ${templateColor} rounded-lg flex items-center justify-center`}>
                  <div className="text-4xl">{templateEmoji || '🎨'}</div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}