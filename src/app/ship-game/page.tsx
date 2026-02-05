'use client'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Entity = {
  x: number;
  y: number;
  r: number;
  speed: number;
};

const adIslands = [
  { label: "Ad Island A", href: "/contact", style: "left-6 top-10" },
  { label: "Ad Island B", href: "/contact", style: "right-8 top-20" },
  { label: "Ad Island C", href: "/contact", style: "left-1/2 -translate-x-1/2 bottom-8" }
];

export default function ShipGamePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = {
      width: 0,
      height: 0,
      ship: { x: 0, y: 0, r: 16 },
      speed: 3.2,
      islands: [] as Entity[],
      coins: [] as Entity[],
      distance: 0,
      lastSpawn: 0
    };

    const resize = () => {
      const nextWidth = Math.min(container.offsetWidth, 900);
      const nextHeight = 520;
      canvas.width = nextWidth * window.devicePixelRatio;
      canvas.height = nextHeight * window.devicePixelRatio;
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      state.width = nextWidth;
      state.height = nextHeight;
      state.ship.x = nextWidth / 2;
      state.ship.y = nextHeight - 90;
    };

    const spawnEntities = (time: number) => {
      if (time - state.lastSpawn < 900) return;
      state.lastSpawn = time;

      const islandCount = Math.random() > 0.6 ? 2 : 1;
      for (let i = 0; i < islandCount; i += 1) {
        state.islands.push({
          x: 60 + Math.random() * (state.width - 120),
          y: -60 - Math.random() * 120,
          r: 28 + Math.random() * 18,
          speed: 1.6 + Math.random() * 1.4
        });
      }

      if (Math.random() > 0.35) {
        state.coins.push({
          x: 50 + Math.random() * (state.width - 100),
          y: -30,
          r: 10,
          speed: 2.4
        });
      }
    };

    const reset = () => {
      state.islands = [];
      state.coins = [];
      state.distance = 0;
      state.lastSpawn = 0;
      state.ship.x = state.width / 2;
      state.ship.y = state.height - 90;
      setScore(0);
      setGameOver(false);
    };

    const drawWaves = () => {
      ctx.fillStyle = "#7cc7ec";
      ctx.fillRect(0, 0, state.width, state.height);

      ctx.fillStyle = "rgba(255,255,255,0.35)";
      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          (state.distance * 0.6 + i * 140) % (state.width + 160) - 80,
          80 + (i % 2) * 50,
          70,
          18,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    };

    const drawShip = () => {
      const { x, y, r } = state.ship;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#1d1d1b";
      ctx.beginPath();
      ctx.moveTo(-r, r);
      ctx.lineTo(r, r);
      ctx.quadraticCurveTo(r - 2, r + 10, 0, r + 12);
      ctx.quadraticCurveTo(-r + 2, r + 10, -r, r);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-2, -r - 6, 4, r + 6);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.moveTo(2, -r - 6);
      ctx.lineTo(r + 8, -r + 6);
      ctx.lineTo(2, -r + 18);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawIsland = (island: Entity) => {
      ctx.save();
      ctx.translate(island.x, island.y);
      ctx.fillStyle = "#f7d7a1";
      ctx.beginPath();
      ctx.ellipse(0, 0, island.r * 1.2, island.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2bb673";
      ctx.beginPath();
      ctx.ellipse(-island.r * 0.2, -island.r * 0.8, island.r * 0.3, island.r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawCoin = (coin: Entity) => {
      ctx.save();
      ctx.translate(coin.x, coin.y);
      ctx.fillStyle = "#ffd66b";
      ctx.beginPath();
      ctx.arc(0, 0, coin.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, coin.r - 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const update = (time: number) => {
      if (gameOver) return;

      const { ship } = state;
      const speedBoost = keysRef.current["Shift"] ? 1.35 : 1;
      if (keysRef.current["ArrowLeft"] || keysRef.current["a"]) ship.x -= state.speed * speedBoost;
      if (keysRef.current["ArrowRight"] || keysRef.current["d"]) ship.x += state.speed * speedBoost;
      if (keysRef.current["ArrowUp"] || keysRef.current["w"]) ship.y -= state.speed * speedBoost;
      if (keysRef.current["ArrowDown"] || keysRef.current["s"]) ship.y += state.speed * speedBoost;

      ship.x = Math.max(26, Math.min(state.width - 26, ship.x));
      ship.y = Math.max(40, Math.min(state.height - 40, ship.y));

      spawnEntities(time);
      state.distance += 1.6;
      setScore((prev) => prev + 1);

      state.islands.forEach((island) => {
        island.y += island.speed + 0.4;
      });
      state.coins.forEach((coin) => {
        coin.y += coin.speed + 0.6;
      });

      state.islands = state.islands.filter((island) => island.y < state.height + 80);
      state.coins = state.coins.filter((coin) => coin.y < state.height + 60);

      for (const island of state.islands) {
        const dx = ship.x - island.x;
        const dy = ship.y - island.y;
        if (Math.hypot(dx, dy) < ship.r + island.r * 0.9) {
          setGameOver(true);
          setBest((prev) => Math.max(prev, score));
          return;
        }
      }

      for (let i = state.coins.length - 1; i >= 0; i -= 1) {
        const coin = state.coins[i];
        const dx = ship.x - coin.x;
        const dy = ship.y - coin.y;
        if (Math.hypot(dx, dy) < ship.r + coin.r) {
          state.coins.splice(i, 1);
          setScore((prev) => prev + 120);
        }
      }
    };

    const render = () => {
      drawWaves();
      state.islands.forEach(drawIsland);
      state.coins.forEach(drawCoin);
      drawShip();
    };

    const loop = (time: number) => {
      update(time);
      render();
      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    reset();
    animationRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current[event.key] = true;
      if (event.key === " " && gameOver) {
        reset();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current[event.key] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameOver, score]);

  return (
    <div className="min-h-screen bg-[#f6fbff] dark:bg-[#0c1416]">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#4f7a8a] dark:text-[#9bc7d6]">Playable game</p>
              <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-[#0f2a35] dark:text-white font-display">
                Ship Game: dodge islands, collect coins, claim ads.
              </h1>
              <p className="mt-4 text-lg text-[#35535f] dark:text-[#c7dbe3] max-w-2xl">
                Use arrows or WASD. Hold Shift to boost. Collect coins for big points and avoid islands.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/games"
                className="px-5 py-3 rounded-full border border-[#0f2a35]/20 text-[#0f2a35] font-semibold hover:border-[#0f2a35] hover:bg-white/70 transition dark:text-white dark:border-white/20 dark:hover:bg-white/10"
              >
                Back to Games
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative rounded-[32px] border border-[#0f2a35]/10 bg-white/70 p-6 shadow-[0_30px_80px_-45px_rgba(10,41,52,0.4)] dark:bg-white/5 dark:border-white/10">
              <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f2a35] shadow-sm">
                Score: {score}
              </div>
              <div className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f2a35] shadow-sm">
                Best: {best}
              </div>

              <div ref={containerRef} className="relative">
                <canvas ref={canvasRef} className="block rounded-[26px] border border-white/60" />
                <div className="pointer-events-none absolute inset-0">
                  {adIslands.map((island) => (
                    <Link
                      key={island.label}
                      href={island.href}
                      className={`pointer-events-auto absolute ${island.style} rounded-full bg-[#f7d7a1] px-3 py-2 text-[11px] font-semibold text-[#0f2a35] shadow-[inset_0_-4px_0_#dfb57a,0_12px_20px_rgba(18,41,52,0.25)] transition hover:-translate-y-1`}
                    >
                      {island.label}
                    </Link>
                  ))}
                </div>
              </div>

              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[32px] bg-[#0f2a35]/70 text-white">
                  <div className="rounded-3xl bg-[#0f2a35] px-8 py-6 text-center shadow-xl">
                    <h2 className="text-2xl font-semibold">Game Over</h2>
                    <p className="mt-2 text-sm text-[#c7dbe3]">Press Space to restart</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-[#0f2a35]/10 bg-white px-6 py-5 shadow-sm dark:bg-white/10 dark:border-white/10">
                <h3 className="text-lg font-semibold text-[#0f2a35] dark:text-white">Ad Islands</h3>
                <p className="mt-2 text-sm text-[#4f7a8a] dark:text-[#b7d6e0]">
                  Each island is a clickable ad slot. Replace the links with your sponsors or embed ad units.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {adIslands.map((slot) => (
                    <Link
                      key={slot.label}
                      href={slot.href}
                      className="rounded-2xl border border-[#0f2a35]/10 bg-[#f6fbff] px-3 py-2 text-xs font-semibold text-[#0f2a35] hover:bg-white transition dark:bg-white/10 dark:text-white"
                    >
                      {slot.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#0f2a35]/10 bg-white px-6 py-5 shadow-sm dark:bg-white/10 dark:border-white/10">
                <h3 className="text-lg font-semibold text-[#0f2a35] dark:text-white">Power Tips</h3>
                <ul className="mt-3 text-sm text-[#4f7a8a] dark:text-[#b7d6e0] space-y-2">
                  <li>Use boost (Shift) to weave between islands.</li>
                  <li>Coins stack your score fast, chase the glow.</li>
                  <li>Stay centered for safer reaction time.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
