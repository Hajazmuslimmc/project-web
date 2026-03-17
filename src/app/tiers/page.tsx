'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const GAMEMODES = ["Sword", "Axe", "DiaPot", "UHC", "Crystal"];

const tierColors: Record<string, string> = {
  HT1: "text-yellow-400", LT1: "text-yellow-300",
  HT2: "text-orange-400", LT2: "text-orange-300",
  HT3: "text-red-400",    LT3: "text-red-300",
  HT4: "text-blue-400",   LT4: "text-blue-300",
  HT5: "text-gray-400",   LT5: "text-gray-300",
};

const rankBorder = (i: number) => {
  if (i === 0) return "border-l-4 border-yellow-400";
  if (i === 1) return "border-l-4 border-gray-400";
  if (i === 2) return "border-l-4 border-orange-600";
  return "border-l-4 border-transparent";
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
  const [mode, setMode] = useState("Sword");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(false);
  const socketRef = useRef<any>(null);

  async function loadTiers(selectedMode: string) {
    const res = await fetch(`/api/tiers?mode=${selectedMode}`);
    const data = await res.json();
    setPlayers(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadTiers(mode);
  }, [mode]);

  // WebSocket real-time updates
  useEffect(() => {
    const connectSocket = async () => {
      const { io } = await import("socket.io-client");
      socketRef.current = io("http://localhost:4000");
      socketRef.current.on("update", () => {
        loadTiers(mode);
        setFlash(true);
        setTimeout(() => setFlash(false), 1000);
      });
    };
    connectSocket();
    return () => socketRef.current?.disconnect();
  }, [mode]);

  const filtered = players.filter(p =>
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1220] text-white font-sans">
      {/* Top Bar */}
      <header className="bg-[#111a2e] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚔️</span>
          <h1 className="text-2xl font-bold">Networkak Tiers</h1>
          {flash && (
            <span className="text-xs bg-green-600 px-2 py-1 rounded-full animate-pulse">
              Live Update
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search player..."
            className="px-4 py-2 rounded-lg bg-[#1e293b] border border-white/10 text-white placeholder-gray-400 w-full md:w-56"
          />
          <a
            href="https://discord.gg/YOUR_INVITE"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            Join Discord
          </a>
        </div>
      </header>

      {/* Gamemode Tabs */}
      <div className="flex gap-2 px-6 py-4 overflow-x-auto border-b border-white/10">
        {GAMEMODES.map(gm => (
          <button
            key={gm}
            onClick={() => setMode(gm)}
            className={`px-5 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
              mode === gm
                ? "bg-blue-600 text-white scale-105"
                : "bg-[#1e293b] text-gray-400 hover:text-white hover:bg-[#2d3f55]"
            }`}
          >
            {gm}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="px-6 py-6 max-w-3xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No players found.</p>
        ) : (
          filtered.map((player, index) => (
            <Link key={player.username} href={`/tiers/${player.username}`}>
              <div
                className={`flex items-center gap-4 bg-[#111a2e] hover:bg-[#1e293b] transition-all rounded-lg px-4 py-3 mb-2 cursor-pointer animate-fadeIn ${rankBorder(index)}`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className="w-8 font-bold text-gray-400 text-sm">#{index + 1}</span>
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
