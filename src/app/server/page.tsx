'use client';

import { useState } from 'react';
import { Server, Users, Zap, Shield, Globe, Copy, Check } from 'lucide-react';

export default function ServerPage() {
  const [copied, setCopied] = useState(false);
  const serverIP = "play.networkak.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const servers = [
    {
      name: "Survival",
      ip: "survival.networkak.com",
      players: "24/100",
      version: "1.20.4",
      status: "online"
    },
    {
      name: "Creative",
      ip: "creative.networkak.com", 
      players: "12/50",
      version: "1.20.4",
      status: "online"
    },
    {
      name: "PvP Arena",
      ip: "pvp.networkak.com",
      players: "8/32",
      version: "1.20.4", 
      status: "online"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Server className="h-8 w-8 text-green-400" />
            <h1 className="text-xl font-bold">Networkak Minecraft</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#servers" className="hover:text-green-400 transition-colors">Servers</a>
            <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
            <a href="#rules" className="hover:text-green-400 transition-colors">Rules</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Networkak MC
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Premium Minecraft Server Network
          </p>
          <p className="text-lg max-w-2xl mx-auto text-green-200 mb-12">
            Join our community of builders, survivors, and adventurers. Experience Minecraft like never before with custom plugins, events, and 24/7 uptime.
          </p>
          
          {/* Server IP */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto mb-8">
            <p className="text-green-300 mb-2">Server IP:</p>
            <div className="flex items-center justify-between bg-black/50 rounded-lg p-4">
              <code className="text-xl font-mono text-white">{serverIP}</code>
              <button
                onClick={copyToClipboard}
                className="ml-4 p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/minecraft-game"
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Play Browser Version
            </a>
            <a 
              href="#servers"
              className="px-8 py-3 border-2 border-green-400 text-green-400 rounded-lg font-semibold hover:bg-green-400 hover:text-green-900 transition-colors"
            >
              View Servers
            </a>
          </div>
        </div>
      </section>

      {/* Server List */}
      <section id="servers" className="py-16 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Available Servers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {servers.map((server) => (
              <div key={server.name} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{server.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    server.status === 'online' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {server.status}
                  </span>
                </div>
                <div className="space-y-2 text-green-200">
                  <p><Users className="inline h-4 w-4 mr-2" />Players: {server.players}</p>
                  <p><Zap className="inline h-4 w-4 mr-2" />Version: {server.version}</p>
                  <p><Globe className="inline h-4 w-4 mr-2" />IP: {server.ip}</p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(server.ip)}
                  className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Copy IP
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Server Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Anti-Grief Protection</h3>
              <p className="text-green-200">Advanced protection systems keep your builds safe</p>
            </div>
            <div className="text-center p-6">
              <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Custom Plugins</h3>
              <p className="text-green-200">Unique gameplay features and enhancements</p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Active Community</h3>
              <p className="text-green-200">Join hundreds of active players daily</p>
            </div>
            <div className="text-center p-6">
              <Server className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Uptime</h3>
              <p className="text-green-200">Reliable servers with minimal downtime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="py-16 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Server Rules</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <ol className="space-y-4 text-green-200">
                <li><strong>1.</strong> No griefing or destroying other players' builds</li>
                <li><strong>2.</strong> Be respectful to all players and staff</li>
                <li><strong>3.</strong> No cheating, hacking, or exploiting</li>
                <li><strong>4.</strong> Keep chat appropriate and family-friendly</li>
                <li><strong>5.</strong> No advertising other servers</li>
                <li><strong>6.</strong> Follow staff instructions at all times</li>
                <li><strong>7.</strong> Report any issues to moderators</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 py-8 text-center">
        <div className="container mx-auto px-6">
          <p className="text-green-200">© 2024 Networkak Minecraft Server. Join the adventure!</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="/discord" className="text-green-400 hover:text-white transition-colors">Discord</a>
            <a href="/" className="text-green-400 hover:text-white transition-colors">Main Site</a>
            <a href="/minecraft-game" className="text-green-400 hover:text-white transition-colors">Browser Game</a>
          </div>
        </div>
      </footer>
    </div>
  );
}