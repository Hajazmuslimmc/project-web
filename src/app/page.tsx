'use client'

import Link from "next/link";

const highlights = [
  {
    title: "Network-First Strategy",
    body: "Design resilient systems that scale across regions, devices, and edge environments.",
    tag: "Architecture"
  },
  {
    title: "Security by Design",
    body: "Threat modeling, zero-trust hardening, and continuous monitoring baked into every deployment.",
    tag: "Security"
  },
  {
    title: "Always-On Support",
    body: "Dedicated engineers and a 24/7 response desk keep your business running without downtime.",
    tag: "Operations"
  }
];

const services = [
  {
    title: "Managed Infrastructure",
    body: "Cloud, on-prem, and hybrid infrastructure that stays fast, compliant, and cost-aware.",
    icon: "☁️"
  },
  {
    title: "Network Optimization",
    body: "Latency audits, routing upgrades, and performance tuning for global traffic.",
    icon: "🛰️"
  },
  {
    title: "Cyber Defense",
    body: "Endpoint hardening, SOC coverage, and compliance reporting tailored to your industry.",
    icon: "🛡️"
  },
  {
    title: "Enterprise Connectivity",
    body: "SD-WAN, secure VPNs, and private links that connect teams without friction.",
    icon: "🔗"
  }
];

const caseStudies = [
  {
    name: "Helio Retail",
    result: "42% reduction in checkout latency",
    detail: "Rolled out edge caching and route optimization across 180 stores."
  },
  {
    name: "Northline Health",
    result: "99.98% uptime achieved",
    detail: "Built a dual-region failover with proactive monitoring and rapid recovery."
  },
  {
    name: "Atlas Freight",
    result: "Security incidents down 63%",
    detail: "Implemented zero-trust access with continuous device verification."
  }
];

const metrics = [
  { label: "Avg. response time", value: "6 min" },
  { label: "Global nodes managed", value: "240+" },
  { label: "Enterprise clients", value: "120" },
  { label: "Security audits delivered", value: "3,400" }
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-[#0b1013] text-white"
      style={{ fontFamily: '"Space Grotesk", "IBM Plex Sans", "Segoe UI", sans-serif' }}
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(42,201,159,0.25),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(255,203,120,0.18),_transparent_35%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.06),_transparent_60%)]"></div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#2ac99f] text-[#0b1013] flex items-center justify-center font-bold">
                N
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9fb6b3]">Networkak</p>
                <p className="text-sm text-[#cbd7d4]">Enterprise Network Company</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#cbd7d4]">
              <Link href="/tools" className="hover:text-white transition-colors">Solutions</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Operations</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </header>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#c7f7ea] bg-white/5">
                <span className="h-2 w-2 rounded-full bg-[#2ac99f] animate-pulse"></span>
                Always-on networks
              </div>
              <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-tight">
                Networkak builds resilient, secure, and fast
                <span className="block text-[#2ac99f]">enterprise infrastructure.</span>
              </h1>
              <p className="mt-6 text-lg text-[#cbd7d4] max-w-xl">
                We are a company focused on modern networks, cybersecurity, and global connectivity. From strategy to
                operations, Networkak keeps your infrastructure reliable, monitored, and future-ready.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-full bg-[#2ac99f] text-[#0b1013] font-semibold hover:bg-[#27b38e] transition-colors"
                >
                  Request a Network Audit
                </Link>
                <Link
                  href="/download"
                  className="px-7 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-white/60 transition-colors"
                >
                  View Company Deck
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_-35px_rgba(42,201,159,0.45)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#9fb6b3]">
                <span>Live Operations</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-[#c7f7ea]">24/7</span>
              </div>
              <div className="mt-6 grid gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/10 bg-[#11181c] px-5 py-4 flex items-center justify-between"
                  >
                    <p className="text-sm text-[#cbd7d4]">{metric.label}</p>
                    <p className="text-lg font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[#2ac99f] text-[#0b1013] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em]">Next review</p>
                <p className="text-lg font-semibold">Executive Network Briefing</p>
                <p className="text-sm">Monthly performance and risk overview.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f1519] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8aa3a0]">Why Networkak</p>
              <h2 className="text-4xl md:text-5xl font-semibold">A network partner built for modern businesses.</h2>
            </div>
            <p className="max-w-xl text-[#cbd7d4]">
              We bring engineering depth, operational speed, and executive-level clarity to every engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#0b1013] p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-[#8aa3a0]">{item.tag}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-[#cbd7d4]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0b1013]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8aa3a0]">Services</p>
              <h2 className="text-4xl md:text-5xl font-semibold">What Networkak delivers</h2>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-[#c7f7ea] hover:text-white transition-colors">
              See full capability map <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl border border-white/10 bg-[#11181c] p-6">
                <div className="text-3xl">{service.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-[#cbd7d4]">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#10181d]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8aa3a0]">Results</p>
              <h2 className="text-4xl md:text-5xl font-semibold">Client outcomes that speak for themselves.</h2>
            </div>
            <p className="max-w-xl text-[#cbd7d4]">
              Every partnership is measured by concrete improvements in resilience, speed, and security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((item) => (
              <div key={item.name} className="rounded-3xl border border-white/10 bg-[#0b1013] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-[#8aa3a0]">{item.name}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.result}</h3>
                <p className="mt-3 text-[#cbd7d4]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0b1013]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(120deg,_rgba(42,201,159,0.15),_rgba(15,21,25,0.9))] p-10 md:p-14">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#c7f7ea]">Next Step</p>
                <h2 className="mt-4 text-4xl md:text-5xl font-semibold">Talk to Networkak today.</h2>
                <p className="mt-4 text-lg text-[#cbd7d4] max-w-2xl">
                  Schedule a strategy session and receive a tailored roadmap for your network, security, and operations.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-full bg-[#2ac99f] text-[#0b1013] font-semibold hover:bg-[#27b38e] transition-colors"
                >
                  Book a Strategy Call
                </Link>
                <Link
                  href="/dashboard"
                  className="px-7 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-white/60 transition-colors"
                >
                  Client Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10 bg-[#0b1013]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-[#8aa3a0]">
          <div>
            <p className="text-white font-semibold">Networkak</p>
            <p>Resilient networks. Secure operations. Global reach.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/download" className="hover:text-white transition-colors">Press Kit</Link>
            <Link href="/discord" className="hover:text-white transition-colors">Community</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
