'use client'

import Link from "next/link";

const islandAds = [
  { name: "Ad Island A", href: "/contact" },
  { name: "Ad Island B", href: "/contact" },
  { name: "Ad Island C", href: "/contact" },
  { name: "Ad Island D", href: "/contact" }
];

const islandHotspots = [
  { label: "Ad A", href: "/contact", className: "left-10 top-24 h-24 w-32" },
  { label: "Ad B", href: "/contact", className: "right-10 top-16 h-28 w-36" },
  { label: "Ad C", href: "/contact", className: "left-1/2 -translate-x-1/2 bottom-24 h-28 w-40" }
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[#f6fbff] dark:bg-[#0c1416]">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#4f7a8a] dark:text-[#9bc7d6]">New game zone</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-[#0f2a35] dark:text-white font-display">
              Game Sea: sail, explore, and drop your ads on islands.
            </h1>
            <p className="mt-5 text-lg text-[#35535f] dark:text-[#c7dbe3]">
              A playful ocean scene with ad-ready islands and a calm boat route. Perfect for showcasing sponsors
              or featured promos inside your game world.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/ship-game"
                className="px-6 py-3 rounded-full bg-[#0f2a35] text-white font-semibold hover:bg-[#0b1f27] transition"
              >
                Play Ship Game
              </Link>
              <Link
                href="/car-race-game"
                className="px-6 py-3 rounded-full border border-[#0f2a35]/20 text-[#0f2a35] font-semibold hover:border-[#0f2a35] hover:bg-white/70 transition dark:text-white dark:border-white/20 dark:hover:bg-white/10"
              >
                Try Car Race
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {islandAds.map((slot) => (
                <Link
                  key={slot.name}
                  href={slot.href}
                  className="rounded-2xl border border-[#0f2a35]/10 bg-white px-4 py-3 text-sm font-semibold text-[#0f2a35] shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-white/10 dark:border-white/10 dark:text-white"
                >
                  {slot.name}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#5c7884] dark:text-[#a9c2cb]">
              Tip: replace each island link with your ad image, embed, or sponsor landing page.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_top,#b7ecff_0%,transparent_55%),radial-gradient(circle_at_80%_20%,#ffe9b0_0%,transparent_45%)] opacity-80 dark:bg-[radial-gradient(circle_at_top,#204450_0%,transparent_60%),radial-gradient(circle_at_80%_20%,#26423b_0%,transparent_45%)]"></div>
            <div className="relative h-[420px] w-full rounded-[36px] border border-[#0f2a35]/10 bg-gradient-to-b from-[#c9f2ff] via-[#8fd7f6] to-[#4aa3d3] shadow-[0_30px_80px_-45px_rgba(10,41,52,0.55)] overflow-hidden dark:border-white/10 dark:from-[#123440] dark:via-[#0f2b36] dark:to-[#0b1d24]">
              {/* Waves */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.6)_0%,transparent_45%),radial-gradient(circle_at_60%_20%,rgba(255,255,255,0.6)_0%,transparent_50%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.5)_0%,transparent_45%)] opacity-70"></div>

              {/* Islands */}
              <Link
                href={islandHotspots[0].href}
                className={`absolute ${islandHotspots[0].className} rounded-[999px] bg-[#f6d7a5] shadow-[inset_0_-6px_0_#dfb57a,0_12px_20px_rgba(18,41,52,0.25)] transition hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(18,41,52,0.3)]`}
              >
                <div className="absolute -top-6 left-6 h-10 w-6 rounded-full bg-[#2bb673] shadow-[inset_0_-4px_0_#1f8a57]"></div>
                <div className="absolute -top-4 left-14 h-8 w-5 rounded-full bg-[#37c07a] shadow-[inset_0_-4px_0_#1f8a57]"></div>
                <div className="absolute right-4 bottom-2 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-[#0f2a35]">
                  {islandHotspots[0].label}
                </div>
              </Link>

              <Link
                href={islandHotspots[1].href}
                className={`absolute ${islandHotspots[1].className} rounded-[999px] bg-[#f4c98f] shadow-[inset_0_-6px_0_#d9aa6b,0_12px_24px_rgba(18,41,52,0.3)] transition hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(18,41,52,0.35)]`}
              >
                <div className="absolute -top-5 right-12 h-9 w-6 rounded-full bg-[#2bb673] shadow-[inset_0_-4px_0_#1f8a57]"></div>
                <div className="absolute right-6 bottom-2 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-[#0f2a35]">
                  {islandHotspots[1].label}
                </div>
              </Link>

              <Link
                href={islandHotspots[2].href}
                className={`absolute ${islandHotspots[2].className} rounded-[999px] bg-[#ffd79e] shadow-[inset_0_-6px_0_#e0b172,0_16px_28px_rgba(18,41,52,0.3)] transition hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(18,41,52,0.35)]`}
              >
                <div className="absolute -top-6 left-10 h-12 w-7 rounded-full bg-[#2bb673] shadow-[inset_0_-4px_0_#1f8a57]"></div>
                <div className="absolute -top-4 left-20 h-9 w-6 rounded-full bg-[#37c07a] shadow-[inset_0_-4px_0_#1f8a57]"></div>
                <div className="absolute right-6 bottom-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold text-[#0f2a35]">
                  {islandHotspots[2].label}
                </div>
              </Link>

              {/* Boat */}
              <div className="absolute left-20 bottom-20">
                <div className="relative h-12 w-20">
                  <div className="absolute bottom-0 h-6 w-20 rounded-b-[24px] rounded-t-[12px] bg-[#1d1d1b] shadow-[0_10px_20px_rgba(0,0,0,0.25)]"></div>
                  <div className="absolute bottom-3 left-8 h-10 w-1 bg-white"></div>
                  <div className="absolute bottom-6 left-9 h-10 w-12 origin-bottom-left skew-x-[-12deg] rounded-sm bg-white/90"></div>
                </div>
              </div>

              {/* Route dots */}
              <div className="absolute left-24 bottom-28 flex gap-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <span key={idx} className="h-2 w-2 rounded-full bg-white/80"></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
