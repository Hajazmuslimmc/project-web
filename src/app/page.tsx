'use client'

import React, { useState, useEffect } from "react";

// Networkak - Single-file React app
// Features:
// - Search apps
// - Categories filter
// - App cards with details modal
// - Bookmarks (localStorage)
// - Dark mode (persisted)
// - Simple "download manager" simulator
// - Minimal, responsive layout using Tailwind utility classes

// NOTE: This file expects Tailwind CSS to be configured in your project.
// If you prefer plain CSS, replace classNames with your own styles.

type App = {
  id: string;
  title: string;
  desc: string;
  category: string;
  icon: string;
  size: string;
  url: string;
};

type Download = {
  id: string;
  title: string;
  progress: number;
  size: string;
};

export default function NetworkakApp() {
  const sampleApps: App[] = [
    {
      id: "1",
      title: "FlowChat",
      desc: "Real-time chat for communities and creators.",
      category: "Communication",
      icon: "💬",
      size: "25MB",
      url: "#",
    },
    {
      id: "2",
      title: "ClipMaster",
      desc: "Quick video trimming and converter in the cloud.",
      category: "Productivity",
      icon: "✂️",
      size: "45MB",
      url: "#",
    },
    {
      id: "3",
      title: "Pixel Studio",
      desc: "Lightweight online image editor.",
      category: "Design",
      icon: "🖌️",
      size: "30MB",
      url: "#",
    },
    {
      id: "4",
      title: "DevPad",
      desc: "In-browser code editor with terminals.",
      category: "Development",
      icon: "💻",
      size: "60MB",
      url: "#",
    },
  ];

  const [query, setQuery] = useState("");
  const [apps, setApps] = useState<App[]>(sampleApps);
  const [category, setCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("networkak:bookmarks") || "[]");
    } catch (e) {
      return [];
    }
  });
  const [dark, setDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("networkak:dark") || "false");
    } catch (e) {
      return false;
    }
  });
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [downloads, setDownloads] = useState<Download[]>([]);

  useEffect(() => {
    localStorage.setItem("networkak:bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("networkak:dark", JSON.stringify(dark));
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const categories = ["All", ...Array.from(new Set(apps.map((a) => a.category)))];

  function toggleBookmark(appId: string) {
    setBookmarks((prev) => {
      if (prev.includes(appId)) return prev.filter((id) => id !== appId);
      return [...prev, appId];
    });
  }

  function startDownload(app: App) {
    const id = Date.now().toString();
    const entry = { id, title: app.title, progress: 0, size: app.size };
    setDownloads((d) => [entry, ...d]);

    // simulate progress
    const interval = setInterval(() => {
      setDownloads((current) =>
        current.map((dl) =>
          dl.id === id ? { ...dl, progress: Math.min(100, dl.progress + Math.floor(Math.random() * 20) + 5) } : dl
        )
      );
    }, 500);

    // finish
    setTimeout(() => {
      clearInterval(interval);
      setDownloads((current) => current.map((dl) => (dl.id === id ? { ...dl, progress: 100 } : dl)));
    }, 3000 + Math.random() * 3000);
  }

  const filtered = apps.filter((a) => {
    const q = query.trim().toLowerCase();
    if (category !== "All" && a.category !== category) return false;
    if (!q) return true;
    return a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
  });

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      <header className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#" className="text-2xl font-extrabold tracking-tight">
            <span className="inline-block mr-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Networkak</span>
          </a>
          <div className="hidden md:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps..."
              className="px-3 py-2 rounded border w-72 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={() => setDark((d) => !d)}
            className="px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            aria-label="Toggle dark mode"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          <div className="relative">
            <button
              onClick={() => {
                // show bookmarks quick list (simple)
                const list = bookmarks.map((id) => apps.find((a) => a.id === id)).filter((l): l is App => l !== undefined);
                alert(list.length ? list.map((l) => `${l.icon} ${l.title}`).join("\n") : "No bookmarks yet");
              }}
              className="px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
              aria-label="Bookmarks"
            >
              ⭐ {bookmarks.length}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {/* Mobile search */}
        <div className="md:hidden mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps..."
            className="px-3 py-2 rounded border w-full dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-3">Discover</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((app) => (
                <article key={app.id} className="p-4 rounded-lg border dark:border-gray-700 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{app.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold">{app.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{app.category} • {app.size}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleBookmark(app.id)}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        {bookmarks.includes(app.id) ? "★" : "☆"}
                      </button>
                      <button onClick={() => startDownload(app)} className="px-2 py-1 border rounded text-sm">
                        ⤓
                      </button>
                    </div>
                  </div>

                  <p className="text-sm flex-1">{app.desc}</p>

                  <div className="flex items-center justify-between">
                    <button onClick={() => setSelectedApp(app)} className="text-sm underline">
                      View
                    </button>
                    <a href={app.url} className="text-sm opacity-80">
                      Open
                    </a>
                  </div>
                </article>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center p-8 border rounded dark:border-gray-700">No apps found — try another search.</div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-4 border rounded dark:border-gray-700">
              <h4 className="font-semibold">Top categories</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-2 py-1 rounded border text-sm ${category === c ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded dark:border-gray-700">
              <h4 className="font-semibold">Downloads</h4>
              <div className="space-y-2 mt-2">
                {downloads.length === 0 && <div className="text-sm text-gray-500">No active downloads</div>}
                {downloads.map((d: Download) => (
                  <div key={d.id} className="text-sm">
                    <div className="flex justify-between">
                      <div>{d.title}</div>
                      <div>{d.progress}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2 mt-1 overflow-hidden dark:bg-gray-700">
                      <div style={{ width: `${d.progress}%` }} className="h-2 bg-gray-500 dark:bg-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded dark:border-gray-700">
              <h4 className="font-semibold">Bookmarks</h4>
              <div className="space-y-2 mt-2">
                {bookmarks.length === 0 && <div className="text-sm text-gray-500">No bookmarks yet</div>}
                {bookmarks.map((id) => {
                  const a = apps.find((x) => x.id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex items-center justify-between">
                      <div className="text-sm">{a.icon} {a.title}</div>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedApp(a)} className="text-sm underline">View</button>
                        <button onClick={() => toggleBookmark(id)} className="text-sm">Remove</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border rounded dark:border-gray-700 text-sm">
              <strong>Quick tips</strong>
              <ul className="mt-2 list-disc ml-5 text-sm">
                <li>Add bookmarks for quick access.</li>
                <li>Use the search bar to find apps by name, category or description.</li>
                <li>Dark mode is persisted between visits.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-xl w-full p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{selectedApp.icon} {selectedApp.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedApp.category} • {selectedApp.size}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleBookmark(selectedApp.id)} className="px-3 py-1 border rounded">{bookmarks.includes(selectedApp.id) ? '★' : '☆'}</button>
                <button onClick={() => { startDownload(selectedApp); }} className="px-3 py-1 border rounded">Download</button>
                <button onClick={() => setSelectedApp(null)} className="px-3 py-1 border rounded">Close</button>
              </div>
            </div>

            <div className="mt-4 text-sm">{selectedApp.desc}</div>
            <div className="mt-4 text-xs text-gray-500">Demo URL: {selectedApp.url}</div>
          </div>
        </div>
      )}

      <footer className="max-w-7xl mx-auto p-4 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Networkak — Find anything. Make anything possible.
      </footer>
    </div>
  );
}

/* README (paste into your project root as README.md):

# Networkak - Single-file React app

This is a single-file React component for a lightweight app directory UI.
It uses Tailwind CSS utility classes for styling. To run it locally:

1. Create a new React app (Vite or Create React App). Example with Vite:
   ```bash
   npm create vite@latest networkak -- --template react
   cd networkak
   npm install
   ```

2. Install Tailwind CSS (optional but recommended):
   Follow Tailwind docs: https://tailwindcss.com/docs/guides/vite

3. Replace `src/App.jsx` with this file's content and ensure the export is the default App.

4. Run:
   ```bash
   npm run dev
   ```

This demo uses localStorage for bookmarks and dark mode. The download manager is simulated.

*/
