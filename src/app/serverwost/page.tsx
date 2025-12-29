'use client'

import React, { useState } from 'react';

export default function ServerwostPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🚀</div>
              <h1 className="text-2xl font-bold">SERVERWOST</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            🧱 Everything Your Server Needs
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-600 dark:text-green-400">
            🌐 Minecraft Website Builder
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Launch a professional server website in minutes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 text-left">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">✅ Server IP & live player count</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">✅ Java + Bedrock support</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">✅ Voting pages</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">✅ Rules & staff pages</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">✅ Custom themes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">✅ Works on mobile</p>
            </div>
          </div>

          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-8">
            No coding. No hosting headaches.
          </p>

          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors">
            👉 Start Your Free Trial Now
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Discord Bot Integration */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Discord Bot Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Keep your Discord fully synced.</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• /ip and /online commands</li>
                <li>• Player join/leave logs</li>
                <li>• Vote reminders</li>
                <li>• Rank sync</li>
                <li>• Auto announcements</li>
              </ul>
              <p className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                Your Discord becomes part of your server — not separate.
              </p>
            </div>

            {/* Vote Rewards System */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vote Rewards System</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Boost votes and rankings effortlessly.</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Auto vote rewards</li>
                <li>• Vote streaks</li>
                <li>• Anti-abuse protection</li>
                <li>• Vote analytics</li>
                <li>• Simple Paper plugin</li>
              </ul>
              <p className="mt-4 font-semibold text-green-600 dark:text-green-400">
                More votes = more players.
              </p>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Know exactly what's happening.</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Daily & peak players</li>
                <li>• Player retention (Day 1 / 7 / 30)</li>
                <li>• Vote performance</li>
                <li>• Discord activity</li>
                <li>• Revenue tracking</li>
              </ul>
              <p className="mt-4 font-semibold text-purple-600 dark:text-purple-400">
                Make decisions based on data — not guesses.
              </p>
            </div>

            {/* Built-In Store */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Built-In Store</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Monetize without complexity.</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Ranks, keys, cosmetics</li>
                <li>• Stripe payments</li>
                <li>• Instant delivery</li>
                <li>• Secure & fast</li>
                <li>• No third-party stores needed</li>
              </ul>
              <p className="mt-4 font-semibold text-yellow-600 dark:text-yellow-400">
                Start earning from your server today.
              </p>
            </div>

            {/* Player Retention Tools */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🔁</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Player Retention Tools</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Keep players coming back.</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Daily rewards</li>
                <li>• Playtime rewards</li>
                <li>• Comeback bonuses</li>
                <li>• Inactivity alerts</li>
                <li>• Discord reminders</li>
              </ul>
              <p className="mt-4 font-semibold text-red-600 dark:text-red-400">
                Servers don't die from lack of players — they die from poor retention.
              </p>
            </div>

            {/* Why Choose SERVERWOST */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why Server Owners Choose SERVERWOST</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✅ Built specifically for Minecraft</li>
                <li>✅ No bloated plugins</li>
                <li>✅ Beginner-friendly</li>
                <li>✅ Saves time & money</li>
                <li>✅ Scales as you grow</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium italic">
                  "SERVERWOST replaced 6 plugins and 3 services for us."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">💎 Simple Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">👉 7-Day Free Trial — No Credit Card Required</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="text-2xl mb-2">🟢</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Starter</h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">$9/month</div>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                <li>✅ Website builder</li>
                <li>✅ Discord bot</li>
                <li>✅ Basic analytics</li>
              </ul>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Best for new servers.</p>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                Choose Starter
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-xl border-2 border-orange-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <div className="text-2xl mb-2">🔥</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pro</h3>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">$19/month</div>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                <li>✅ Everything in Starter</li>
                <li>✅ Vote rewards system</li>
                <li>✅ Advanced analytics</li>
                <li>✅ Retention tools</li>
              </ul>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Perfect for growing servers.</p>
              <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Choose Pro
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-xl border-2 border-purple-500">
              <div className="text-center mb-6">
                <div className="text-2xl mb-2">👑</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Elite</h3>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">$29/month</div>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                <li>✅ Everything in Pro</li>
                <li>✅ Built-in store</li>
                <li>✅ Custom domain</li>
                <li>✅ Branding removal</li>
                <li>✅ Priority support</li>
              </ul>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">For serious networks.</p>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Choose Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🛠️ Easy Setup (5 Minutes)</h2>
            <p className="text-xl opacity-90">No technical skills required.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">1</div>
              <h3 className="font-bold mb-2">Create an account</h3>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">2</div>
              <h3 className="font-bold mb-2">Connect your server</h3>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">3</div>
              <h3 className="font-bold mb-2">Install the plugin</h3>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">4</div>
              <h3 className="font-bold mb-2">Invite the Discord bot</h3>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">5</div>
              <h3 className="font-bold mb-2">Start growing</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">🚀 Ready to Grow Your Server?</h2>
          <p className="text-xl mb-4">Stop wasting time managing tools.</p>
          <p className="text-xl mb-8">Start growing with SERVERWOST.</p>
          
          <button className="bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors mb-8">
            👉 Start Your Free Trial Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">SERVERWOST — All-in-One Minecraft Server Growth Platform</h3>
          <p className="text-gray-400">A product by Networkak.</p>
        </div>
      </footer>
    </div>
  );
}