'use client';

import { useState, useEffect } from "react";

const GAMEMODES = ["DiaPot", "Sword", "Axe", "UHC", "Crystal"];

const tierColors: Record<string, string> = {
  HT1: "text-yellow-400", LT1: "text-yellow-300",
  HT2: "text-orange-400", LT2: "text-orange-300",
  HT3: "text-red-400",    LT3: "text-red-300",
  HT4: "text-blue-400",   LT4: "text-blue-300",
  HT5: "text-gray-400",   LT5: "text-gray-300",
};

interface Player {
  username: string;
  tier: string;
  points: number;
  region: string;
  mode: string;
}

export default function TiersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [mode, setMode] = useState("DiaPot");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTiers(selectedMode: string) {
    setLoading(true);
    const res = await fetch(`/api/tiers?mode=${selectedMode}`);
    const data = await res.json();
    setPlayers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadTiers(mode);
    const interval = setInterval(() => loadTiers(mode), 5000);
    return () => clearInterval(interval);
  }, [mode]);

  const filtered = players.filter(p =>
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  const rankStyle = (index: number) => {
    if (index === 0) return "border-l-4 border-yellow-400";
    if (index === 1) return "border-l-4 border-gray-400";
    if (index === 2) return "border-l-4 border-orange-600";
    return "";
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white font-sans">
      {/* Header */}
      <header className="bg-[#111a2e] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">⚔️ Networkak Tiers</h1>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search player..."
          className="px-4 py-2 rounded-lg bg-[#1e293b] border border-white/10 text-white placeholder-gray-400 w-full md:w-64"
        />
      </header>

      {/* Gamemode Tabs */}
      <div className="flex gap-2 px-6 py-4 overflow-x-auto">
        {GAMEMODES.map(gm => (
          <button
            key={gm}
            onClick={() => setMode(gm)}
            className={`px-5 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${
              mode === gm
                ? "bg-blue-600 text-white"
                : "bg-[#111a2e] text-gray-400 hover:text-white"
            }`}
          >
            {gm}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="px-6 pb-10">
        {loading ? (
          <p className="text-gray-400 text-center py-20">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No players found.</p>
        ) : (
          filtered.map((player, index) => (
            <div
              key={player.username}
              className={`flex items-center gap-4 bg-[#111a2e] hover:bg-[#1e293b] transition-colors rounded-lg px-4 py-3 mb-2 ${rankStyle(index)}`}
            >
              <span className="w-8 font-bold text-gray-400">#{index + 1}</span>
              <img
                src={`https://mc-heads.net/avatar/${player.username}`}
                alt={player.username}
                className="w-10 h-10 rounded-md"
              />
              <div className="flex-1">
                <p className="font-bold">{player.username}</p>
                <p className="text-sm text-gray-400">{player.region} • {player.mode}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${tierColors[player.tier] || "text-white"}`}>
                  {player.tier}
                </p>
                <p className="text-xs text-gray-400">{player.points} pts</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
