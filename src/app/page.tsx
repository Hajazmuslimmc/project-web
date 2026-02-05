'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode]);

  const featuredTools = [
    { name: "AI Code Generator", href: "/ai-code-generator", icon: "🤖", desc: "Generate code with AI" },
    { name: "Better Notes", href: "/betternotes", icon: "📝", desc: "Advanced note-taking" },
    { name: "Website Builder", href: "/website-builder", icon: "🌐", desc: "Build websites easily" },
    { name: "Dashboard", href: "/dashboard", icon: "📊", desc: "Manage your projects" },
    { name: "AI Voice Assistant", href: "/ai-voice-assistant", icon: "🎤", desc: "Voice-powered AI" },
    { name: "CodeNest IDE", href: "/codenest-ide", icon: "💻", desc: "Online code editor" }
  ];

  const gamesList = [
    { name: "Car Race Game", href: "/car-race-game", icon: "🏎️" },
    { name: "Minecraft Game", href: "/minecraft-game", icon: "⛏️" },
    { name: "Bloxed.io", href: "/bloxed-io", icon: "🎮" },
    { name: "BoxBuild", href: "/boxbuild", icon: "📦" }
  ];

  const stats = [
    { label: "Tools & Utilities", value: "50+" },
    { label: "Instant Games", value: "20+" },
    { label: "Daily Users", value: "8k" },
    { label: "Countries", value: "120" }
  ];

  const pillars = [
    {
      title: "AI that actually helps",
      body: "From code to content, our AI tools are designed for fast, practical outputs you can use today.",
      icon: "⚡"
    },
    {
      title: "Launch faster",
      body: "Ship projects with a full suite of generators, optimizers, and workflow boosters in one place.",
      icon: "🚀"
    },
    {
      title: "Play without limits",
      body: "Premium browser games that run instantly with zero setup or downloads.",
      icon: "🎮"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-[#0f1311]' : 'bg-[#f7f0e8]'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe5b4_0%,transparent_40%),radial-gradient(circle_at_80%_20%,#9ee7d8_0%,transparent_35%)] dark:bg-[radial-gradient(circle_at_top,#22302a_0%,transparent_45%),radial-gradient(circle_at_80%_20%,#123b35_0%,transparent_35%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,24,19,0.05),rgba(17,24,19,0.0))] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1d1d1b]/15 bg-white/70 text-sm font-semibold uppercase tracking-widest text-[#2a3b34] shadow-sm dark:bg-white/10 dark:border-white/10 dark:text-[#dfeee8]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#2bb673]"></span>
              Networkak Studio
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.05] text-[#1d1d1b] dark:text-white font-display">
              Build, play, and
              <span className="block text-[#2bb673]">launch faster.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#3a3a35] dark:text-[#d4e4de] max-w-xl text-balance">
              The ultimate hub for premium tools, AI utilities, and instant-play games. Everything you need to create, iterate, and unwind.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools"
                className="px-8 py-4 rounded-full bg-[#1d1d1b] text-[#f7f0e8] font-semibold text-lg hover:bg-black transition-colors"
              >
                Explore 50+ Tools
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full border border-[#1d1d1b]/20 text-[#1d1d1b] font-semibold text-lg hover:border-[#1d1d1b] hover:bg-white transition-colors dark:text-white dark:border-white/30 dark:hover:bg-white/10"
              >
                Go to Dashboard
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#1d1d1b]/10 bg-white/70 px-4 py-3 text-center shadow-sm dark:bg-white/10 dark:border-white/10">
                  <div className="text-2xl font-semibold text-[#1d1d1b] dark:text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-[#56615b] dark:text-[#c0d0c8]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-[#1d1d1b]/10 bg-white/75 shadow-[0_30px_80px_-40px_rgba(17,24,19,0.6)] backdrop-blur-md p-8 space-y-6 dark:bg-white/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-widest text-[#7b867f] dark:text-[#c6d6cf]">Featured tools</p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2bb673]/15 text-[#1f8a57] dark:text-[#b6f2d8]">
                  Updated weekly
                </span>
              </div>
              <div className="space-y-3">
                {featuredTools.slice(0, 3).map((tool) => (
                  <Link key={tool.name} href={tool.href} className="group">
                    <div className="flex items-center gap-4 rounded-2xl border border-[#1d1d1b]/10 bg-white px-4 py-3 transition-all group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-[#1a231f] dark:border-white/10">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <h3 className="text-base font-semibold text-[#1d1d1b] dark:text-white">{tool.name}</h3>
                        <p className="text-sm text-[#6c756f] dark:text-[#c0d0c8]">{tool.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="rounded-2xl bg-[#1d1d1b] text-[#f7f0e8] px-5 py-4">
                <p className="text-sm uppercase tracking-widest text-[#f7f0e8]/70">Instant games</p>
                <p className="text-lg font-semibold">Jump into premium browser games in seconds.</p>
                <Link href="/car-race-game" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#f7f0e8] hover:text-white">
                  Start playing
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-10 hidden lg:block">
              <div className="rounded-full bg-[#2bb673] text-white px-6 py-4 shadow-xl rotate-[-8deg]">
                <p className="text-sm uppercase tracking-widest">All-in-one</p>
                <p className="text-2xl font-semibold">Creator Suite</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 p-3 rounded-full bg-white/70 backdrop-blur-md border border-[#1d1d1b]/20 hover:bg-white transition-colors z-50 dark:bg-white/10 dark:border-white/20"
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-[#fdf9f1] dark:bg-[#0f1512]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6c756f] dark:text-[#c0d0c8]">Why creators stay</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1b] dark:text-white font-display">
                A platform that feels handcrafted.
              </h2>
            </div>
            <p className="max-w-xl text-[#4a4a45] dark:text-[#c6d6cf] text-lg">
              Networkak blends serious productivity with playful experiences, so you can build, test, and recharge in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-[#1d1d1b]/10 bg-white p-6 shadow-sm dark:bg-[#16211b] dark:border-white/10">
                <div className="text-3xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-semibold text-[#1d1d1b] dark:text-white">{pillar.title}</h3>
                <p className="mt-3 text-[#5a625d] dark:text-[#c0d0c8]">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-white dark:bg-[#101614]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6c756f] dark:text-[#c0d0c8]">Tool spotlight</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1b] dark:text-white font-display">
                Featured tools for your next build.
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d1d1b] dark:text-white"
            >
              View all tools <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="group">
                <div className="h-full rounded-3xl border border-[#1d1d1b]/10 bg-[#f7f0e8] px-6 py-7 transition-all group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-[#18201c] dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="text-xs uppercase tracking-widest text-[#7c847f] dark:text-[#b6c7bf]">Premium</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#1d1d1b] dark:text-white">{tool.name}</h3>
                  <p className="mt-2 text-[#5b635d] dark:text-[#c0d0c8]">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 bg-[#f2f7f4] dark:bg-[#0f1412]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6c756f] dark:text-[#c0d0c8]">Play now</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1b] dark:text-white font-display">
                Premium games, zero setup.
              </h2>
            </div>
            <p className="max-w-xl text-[#4a4a45] dark:text-[#c6d6cf] text-lg">
              Play instantly in your browser with smooth performance and modern visuals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamesList.map((game) => (
              <Link key={game.name} href={game.href} className="group">
                <div className="h-full rounded-3xl border border-[#1d1d1b]/10 bg-white px-6 py-7 text-center transition-all group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-[#18201c] dark:border-white/10">
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1d1d1b] dark:text-white">{game.name}</h3>
                  <p className="mt-2 text-sm text-[#6c756f] dark:text-[#c0d0c8]">Instant play</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-[#111816]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-14 text-[#1d1d1b] dark:text-white font-display">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI Tools",
                body: "Code generation, voice assistants, face swap, and more AI-powered utilities.",
                href: "/ai-code-generator",
                cta: "Explore AI Tools"
              },
              {
                icon: "💻",
                title: "Developer Tools",
                body: "Code formatters, API testing, JSON validators, and development utilities.",
                href: "/codenest-ide",
                cta: "View Dev Tools"
              },
              {
                icon: "🎨",
                title: "Creative Tools",
                body: "Logo generators, meme creators, thumbnail makers, and design utilities.",
                href: "/logo-generator",
                cta: "Create Now"
              },
              {
                icon: "📱",
                title: "Productivity",
                body: "Note-taking, task management, file tools, and productivity enhancers.",
                href: "/betternotes",
                cta: "Boost Productivity"
              }
            ].map((category) => (
              <div key={category.title} className="rounded-3xl border border-[#1d1d1b]/10 bg-[#f7f0e8] p-6 text-center shadow-sm dark:bg-[#18201c] dark:border-white/10">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#1d1d1b] dark:text-white">{category.title}</h3>
                <p className="text-[#5a625d] dark:text-[#c0d0c8] mb-5">{category.body}</p>
                <Link href={category.href} className="text-sm font-semibold text-[#1d1d1b] dark:text-white">
                  {category.cta} <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-[#f7f2ea] dark:bg-[#0f1512]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6c756f] dark:text-[#c0d0c8]">Sponsors</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1b] dark:text-white font-display">
                Ad Islands
              </h2>
            </div>
            <p className="max-w-xl text-[#4a4a45] dark:text-[#c6d6cf] text-lg">
              Premium image slots for sponsors. Replace these with your ad images and links.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Island A", href: "/contact" },
              { title: "Island B", href: "/contact" },
              { title: "Island C", href: "/contact" },
              { title: "Island D", href: "/contact" }
            ].map((slot) => (
              <Link
                key={slot.title}
                href={slot.href}
                className="group"
              >
                <div className="rounded-3xl border border-[#1d1d1b]/10 bg-white p-4 shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-[#16211b] dark:border-white/10">
                  <div className="relative aspect-[4/3] rounded-2xl bg-[linear-gradient(135deg,#d9f2ff_0%,#ffe3b7_60%,#ffd1a1_100%)] overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-sm uppercase tracking-widest text-[#3e5a66] font-semibold">Image Ad</div>
                      <div className="mt-2 text-lg font-semibold text-[#1d1d1b]">{slot.title}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#1d1d1b] dark:text-white">
                    <span>View sponsor</span>
                    <span aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a2b23] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 font-display">Ready to build your next big idea?</h2>
          <p className="text-xl mb-8 text-[#cfe6dc]">
            Join thousands of creators using Networkak to ship faster, play harder, and stay inspired.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[#f7f0e8] text-[#1a2b23] rounded-full font-semibold hover:bg-white transition-colors"
            >
              Access Dashboard
            </Link>
            <Link
              href="/karwan-school"
              className="px-8 py-4 border border-white/70 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              View School Site
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e1412] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold text-[#f7f0e8] mb-4 font-display">Networkak</h3>
              <p className="text-[#b5c6be] mb-4">
                The ultimate digital platform with 50+ tools, games, and AI utilities. Everything you need for productivity, creativity, and entertainment.
              </p>
              <div className="flex gap-4">
                <Link href="/discord" className="text-[#b5c6be] hover:text-white transition-colors">Discord</Link>
                <Link href="/youtube" className="text-[#b5c6be] hover:text-white transition-colors">YouTube</Link>
                <Link href="/contact" className="text-[#b5c6be] hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-[#b5c6be]">
                <li><Link href="/ai-code-generator" className="hover:text-white transition-colors">AI Code Generator</Link></li>
                <li><Link href="/website-builder" className="hover:text-white transition-colors">Website Builder</Link></li>
                <li><Link href="/betternotes" className="hover:text-white transition-colors">Better Notes</Link></li>
                <li><Link href="/codenest-ide" className="hover:text-white transition-colors">CodeNest IDE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Access</h4>
              <ul className="space-y-2 text-[#b5c6be]">
                <li><Link href="/tools" className="hover:text-white transition-colors">All Tools</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/car-race-game" className="hover:text-white transition-colors">Games</Link></li>
                <li><Link href="/karwan-school" className="hover:text-white transition-colors">School Site</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-[#8fa39a]">
            <p>© {new Date().getFullYear()} Networkak. All rights reserved. 50+ Tools. Unlimited Possibilities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
