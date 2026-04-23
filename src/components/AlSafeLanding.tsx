import Link from 'next/link';

const productPillars = [
  {
    title: 'Privacy Engine',
    text: 'Advanced tracker blocking, cookie isolation, HTTPS upgrades, fingerprint resistance, and session containment.',
  },
  {
    title: 'Secure Search',
    text: 'Visual search results, instant suggestions, category views, and a no-query-logging search experience at /Search.',
  },
  {
    title: 'Browser Control',
    text: 'Permission management, private windows, bookmarks, history, downloads, profiles, and premium sync architecture.',
  },
];

const browserFeatures = [
  'Tab strip with favicon, title, mute state, and secure session indicators',
  'Bookmarks, history timeline, and download manager with progress states',
  'Private browsing with temporary storage isolation and data discard',
  'Permission center for camera, microphone, clipboard, notifications, and location',
  'Developer tools panel, extension surface, profile switching, and sync-ready settings',
  'AlSafe+ tier with premium masking nodes, advanced filters, themes, and cloud sync',
];

const securityLayers = [
  'Ad blocker enabled by default with rule-stack updates and cosmetic filtering',
  'Anti-tracking protection for beacons, fingerprint scripts, third-party cookies, and hidden redirects',
  'Force-HTTPS upgrades with visible transport status and downgrade warnings',
  'IP protection design for relay or VPN routing with regional server selection',
];

const accountFlow = [
  'Sign up and sign in with JWT or OAuth-style identity providers',
  'Encrypted sync for bookmarks, browsing preferences, saved sessions, and profile data',
  'Tier-aware account settings for Free and AlSafe+ experiences',
];

const downloadTargets = [
  {
    platform: 'macOS',
    format: '.dmg',
    architecture: 'Apple Silicon + Intel',
    status: 'Desktop package target',
  },
  {
    platform: 'Windows',
    format: '.exe',
    architecture: 'Windows 10/11',
    status: 'Installer target',
  },
  {
    platform: 'Linux',
    format: '.AppImage',
    architecture: 'Portable desktop build',
    status: 'Universal target',
  },
];

export default function AlSafeLanding() {
  return (
    <main className="alsafe-home">
      <section className="alsafe-hero-section">
        <header className="alsafe-topbar">
          <Link className="alsafe-brand" href="/alsafe">
            <span className="alsafe-brand-mark">A</span>
            <span>AlSafe Browser</span>
          </Link>

          <nav className="alsafe-nav">
            <a href="#security">Security</a>
            <a href="#browser">Browser</a>
            <a href="#downloads">Downloads</a>
            <a href="#accounts">Accounts</a>
            <Link href="/Search">Search</Link>
          </nav>
        </header>

        <div className="alsafe-hero-grid">
          <div className="alsafe-hero-copy">
            <div className="alsafe-chip">Safest Browser in the World</div>
            <h1>Privacy-first browsing with a visual search engine built for user control.</h1>
            <p>
              AlSafe Browser is positioned as a secure browser and search ecosystem for Networkak.com:
              anti-tracking by default, premium-grade IP masking architecture, private sessions, and a
              modern interface that treats safety as the main product.
            </p>

            <div className="alsafe-hero-actions">
              <Link className="alsafe-primary-btn" href="/Search">
                Launch Search
              </Link>
              <a className="alsafe-secondary-btn" href="#security">
                Inspect Security Stack
              </a>
            </div>

            <div className="alsafe-pillars">
              {productPillars.map((pillar) => (
                <article key={pillar.title} className="alsafe-panel">
                  <span className="eyebrow">Core</span>
                  <h2>{pillar.title}</h2>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="alsafe-browser-frame">
            <div className="alsafe-window-bar">
              <div className="window-actions">
                <span />
                <span />
                <span />
              </div>
              <div className="window-url">https://networkak.com/Search</div>
              <div className="window-lock">Shielded</div>
            </div>

            <div className="alsafe-tabs">
              <div className="tab active">A Search</div>
              <div className="tab">Docs</div>
              <div className="tab">Private Window</div>
            </div>

            <div className="alsafe-browser-content">
              <div className="alsafe-browser-sidebar">
                <div className="side-card">
                  <span className="eyebrow">Session</span>
                  <strong>Private Shield</strong>
                  <p>Trackers blocked: 148</p>
                  <p>Cookies isolated: 31</p>
                  <p>HTTPS upgraded: 19</p>
                </div>
                <div className="side-card">
                  <span className="eyebrow">Network</span>
                  <strong>IP Masking</strong>
                  <p>Relay: Seattle Secure 03</p>
                  <p>Status: Encrypted tunnel ready</p>
                </div>
              </div>

              <div className="alsafe-browser-main">
                <div className="search-demo-bar">
                  <span>⌕</span>
                  <span>private browser</span>
                  <span className="demo-filter">Web</span>
                </div>

                <div className="preview-grid">
                  <article className="preview-card large">
                    <div className="preview-thumb mint" />
                    <h3>Search result with preview image</h3>
                    <p>Every result includes a thumbnail, title, description, source domain, and clear secure state.</p>
                  </article>
                  <article className="preview-card">
                    <div className="preview-thumb blue" />
                    <h3>Smart suggestions</h3>
                    <p>Autocomplete ranked for privacy topics, browsing utilities, and protected navigation.</p>
                  </article>
                  <article className="preview-card">
                    <div className="preview-thumb gold" />
                    <h3>Permission control</h3>
                    <p>Mic, camera, and location access surfaced in one place instead of being buried.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="alsafe-section">
        <div className="alsafe-section-heading">
          <span className="eyebrow">Security First</span>
          <h2>Protection is the default runtime, not an optional setting.</h2>
          <p>
            A real browser-grade implementation would need Chromium hardening, network proxy/VPN infrastructure,
            audited storage boundaries, and ongoing filter updates. This product surface is designed around those
            requirements from the start.
          </p>
        </div>

        <div className="alsafe-feature-grid">
          {securityLayers.map((item) => (
            <article key={item} className="alsafe-feature-card">
              <span className="feature-icon">◆</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="browser" className="alsafe-section compact">
        <div className="alsafe-dual-grid">
          <article className="alsafe-list-panel">
            <span className="eyebrow">Browser Features</span>
            <h2>Core browser surface</h2>
            <ul>
              {browserFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="alsafe-list-panel premium">
            <span className="eyebrow">AlSafe+</span>
            <h2>Premium tier</h2>
            <ul>
              <li>Faster masking routes and premium VPN server pools</li>
              <li>Advanced ad-block rules and deeper tracker coverage</li>
              <li>Encrypted cloud sync for settings, bookmarks, and history controls</li>
              <li>Custom themes, performance presets, and private search enhancements</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="downloads" className="alsafe-section">
        <div className="alsafe-section-heading">
          <span className="eyebrow">Downloads</span>
          <h2>Desktop release targets for every major platform.</h2>
          <p>
            AlSafe Browser is now presented with native installer targets for Mac, Windows, and Linux.
            The release surface is structured around `.dmg`, `.exe`, and `.AppImage` distribution.
          </p>
        </div>

        <div className="alsafe-download-grid">
          {downloadTargets.map((target) => (
            <article key={target.platform} className="alsafe-download-card">
              <span className="eyebrow">{target.platform}</span>
              <h2>{target.format}</h2>
              <p>{target.architecture}</p>
              <p>{target.status}</p>
              <button type="button" className="alsafe-download-btn">
                Download for {target.platform}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="accounts" className="alsafe-section compact">
        <div className="alsafe-dual-grid">
          <article className="alsafe-list-panel">
            <span className="eyebrow">Accounts</span>
            <h2>User identity and sync</h2>
            <ul>
              {accountFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="alsafe-architecture-panel">
            <span className="eyebrow">Recommended Stack</span>
            <h2>Delivery architecture</h2>
            <p>Frontend: Next.js / React</p>
            <p>Backend: Node.js / Express</p>
            <p>Database: PostgreSQL or MongoDB</p>
            <p>Browser core: Chromium-based hardened distribution</p>
            <p>Auth: JWT session tokens or OAuth-style providers</p>
          </article>
        </div>
      </section>
    </main>
  );
}
