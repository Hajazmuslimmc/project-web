'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";

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
  updatedAt?: string;
}

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [profiles, setProfiles] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const modes = ["Sword", "Axe", "DiaPot", "UHC", "Crystal"];
      const results: Player[] = [];

      for (const mode of modes) {
        const res = await fetch(`/api/tiers?mode=${mode}`);
        const data = await res.json();
        const found = data.find((p: Player) => p.username.toLowerCase() === username.toLowerCase());
        if (found) results.push(found);
      }

      setProfiles(results);
      setLoading(false);
    }
    load();
  }, [username]);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white font-sans">
      <header className="bg-[#111a2e] px-6 py-4 border-b border-white/10 flex items-center gap-4">
        <Link href="/tiers" className="text-gray-400 hover:text-white transition-colors">← Back</Link>
        <h1 className="text-xl font-bold">Player Profile</h1>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : profiles.length === 0 ? (
          <p className="text-gray-400 text-center py-20">Player not found.</p>
        ) : (
          <>
            {/* Player Header */}
            <div className="flex flex-col items-center mb-10">
              <img
                src={`https://mc-heads.net/body/${username}`}
                alt={username}
                className="h-40 mb-4"
              />
              <h2 className="text-3xl font-bold">{profiles[0].username}</h2>
              <p className="text-gray-400">{profiles[0].region}</p>
            </div>

            {/* Stats per Gamemode */}
            <div className="grid gap-4">
              {profiles.map(p => (
                <div key={p.mode} className="bg-[#111a2e] rounded-lg px-6 py-4 flex items-center justify-between border border-white/10">
                  <div>
                    <p className="font-semibold">{p.mode}</p>
                    <p className="text-sm text-gray-400">{p.points} points</p>
                  </div>
                  <p className={`text-2xl font-bold ${tierColors[p.tier] || "text-white"}`}>
                    {p.tier}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
