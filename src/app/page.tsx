'use client';

export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#0d0f14;color:#e8eaf0;font-family:'Inter',sans-serif;min-height:100vh;}
        .nt-nav{display:flex;align-items:center;padding:0 40px;height:64px;background:#13161d;border-bottom:1px solid #2a2f3e;position:sticky;top:0;z-index:100;}
        .nt-logo{font-family:'Rajdhani',sans-serif;font-size:1.6rem;font-weight:700;color:#f5c842;letter-spacing:3px;}
        .nt-logo span{color:#fff;}
        .nt-tag{font-size:.72rem;color:#7a8099;letter-spacing:.08em;margin-top:2px;}
        .nt-hero{text-align:center;padding:90px 20px 60px;}
        .nt-eyebrow{display:inline-flex;align-items:center;gap:7px;background:rgba(245,168,35,.12);border:1px solid rgba(245,168,35,.35);color:#f5a623;border-radius:20px;padding:5px 16px;font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:24px;}
        .nt-hero h1{font-family:'Rajdhani',sans-serif;font-size:clamp(2.4rem,6vw,4rem);font-weight:700;line-height:1.1;margin-bottom:16px;}
        .nt-hero h1 span{color:#f5c842;}
        .nt-hero p{color:#7a8099;font-size:1.05rem;max-width:480px;margin:0 auto;line-height:1.7;}
        .nt-section{max-width:1100px;margin:0 auto;padding:0 24px 80px;}
        .nt-section-label{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7a8099;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
        .nt-section-label::after{content:'';flex:1;height:1px;background:#2a2f3e;}
        .nt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;}
        .nt-card{background:#13161d;border:1px solid #2a2f3e;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px;transition:all .25s;}
        .nt-card:hover{border-color:#f5a623;transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.4);}
        .nt-card.soon{opacity:.6;}
        .nt-card.soon:hover{border-color:#2a2f3e;transform:none;box-shadow:none;}
        .nt-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
        .nt-icon{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;}
        .nt-icon.gold{background:rgba(245,200,66,.15);border:1px solid rgba(245,200,66,.3);}
        .nt-icon.blue{background:rgba(74,144,217,.15);border:1px solid rgba(74,144,217,.3);}
        .nt-icon.green{background:rgba(76,175,125,.15);border:1px solid rgba(76,175,125,.3);}
        .nt-icon.purple{background:rgba(155,109,224,.15);border:1px solid rgba(155,109,224,.3);}
        .nt-badge{font-size:.68rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;}
        .badge-live{background:rgba(76,175,125,.2);color:#4caf7d;border:1px solid rgba(76,175,125,.4);}
        .badge-soon{background:rgba(122,128,153,.15);color:#7a8099;border:1px solid #2a2f3e;}
        .nt-name{font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;}
        .nt-desc{color:#7a8099;font-size:.88rem;line-height:1.6;flex:1;}
        .nt-tags{display:flex;gap:6px;flex-wrap:wrap;}
        .nt-tag-item{background:#1a1e28;border:1px solid #2a2f3e;border-radius:6px;padding:3px 9px;font-size:.72rem;color:#7a8099;}
        .nt-btn{display:block;text-align:center;padding:12px 20px;border-radius:10px;font-size:.88rem;font-weight:600;text-decoration:none;transition:all .2s;border:none;cursor:pointer;font-family:'Inter',sans-serif;}
        .nt-btn-primary{background:#f5a623;color:#000 !important;}
        .nt-btn-primary:hover{background:#f5c842;}
        .nt-btn-disabled{background:#1a1e28;color:#7a8099;border:1px solid #2a2f3e;cursor:not-allowed;}
        .nt-footer{border-top:1px solid #2a2f3e;padding:28px 40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
        .nt-footer-logo{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:#f5c842;letter-spacing:2px;}
        .nt-footer-logo span{color:#fff;}
        .nt-footer p{color:#7a8099;font-size:.8rem;}
        @media(max-width:600px){.nt-nav{padding:0 20px;}.nt-hero{padding:60px 20px 40px;}.nt-footer{padding:20px;}}
      `}</style>

      <nav className="nt-nav">
        <div>
          <div className="nt-logo">NETWORK<span>AK</span></div>
          <div className="nt-tag">Home of Everything</div>
        </div>
      </nav>

      <div className="nt-hero">
        <div className="nt-eyebrow">🌐 Everything is Possible</div>
        <h1>The Home of<br /><span>Everything</span></h1>
        <p>Networkak is the hub for competitive Minecraft projects — rankings, mods, tools, and more. All in one place.</p>
      </div>

      <div className="nt-section">
        <div className="nt-section-label">⚔️ Ranking Systems</div>
        <div className="nt-grid">

          <div className="nt-card">
            <div className="nt-card-top">
              <div className="nt-icon gold">🏆</div>
              <span className="nt-badge badge-live">● Live</span>
            </div>
            <div className="nt-name">CompTiers</div>
            <div className="nt-desc">The competitive Minecraft Java tier list. Rankings across all major gamemodes — see where you stand against the best.</div>
            <div className="nt-tags">
              <span className="nt-tag-item">Minecraft Java</span>
              <span className="nt-tag-item">MC</span>
              <span className="nt-tag-item">Sword</span>
              <span className="nt-tag-item">Axe</span>
              <span className="nt-tag-item">UHC</span>
              <span className="nt-tag-item">DiaPot</span>
              <span className="nt-tag-item">NethPot</span>
              <span className="nt-tag-item">SMP</span>
              <span className="nt-tag-item">Craystal</span>
              <span className="nt-tag-item">Mace</span>
            </div>
            <a className="nt-btn nt-btn-primary" href="https://comptiersmc.web.app/" target="_blank" rel="noopener noreferrer">
              Open CompTiers →
            </a>
          </div>

          <div className="nt-card">
            <div className="nt-card-top">
              <div className="nt-icon blue">🌐</div>
              <span className="nt-badge badge-live">● Live</span>
            </div>
            <div className="nt-name">NetTiers</div>
            <div className="nt-desc">NetTiers — new gamemodes and more. The ranking platform built for the community with fresh competitive categories.</div>
            <div className="nt-tags">
              <span className="nt-tag-item">Minecraft Java</span>
              <span className="nt-tag-item">MC</span>
              <span className="nt-tag-item">SpearMace</span>
              <span className="nt-tag-item">DiaSMP</span>
              <span className="nt-tag-item">NethSMP</span>
              <span className="nt-tag-item">PotSMP</span>
              <span className="nt-tag-item">Cart</span>
              <span className="nt-tag-item">ShieldlessSMP</span>
            </div>
            <a className="nt-btn nt-btn-primary" href="https://comptiersmc.web.app/" target="_blank" rel="noopener noreferrer">
              Open NetTiers →
            </a>
          </div>

          <div className="nt-card">
            <div className="nt-card-top">
              <div className="nt-icon green">🛡️</div>
              <span className="nt-badge badge-live">● Live</span>
            </div>
            <div className="nt-name">AlSafe</div>
            <div className="nt-desc">The most secure privacy-first browser project on Networkak, with protected search, anti-tracking features, and dedicated downloads at /alsafe.</div>
            <div className="nt-tags">
              <span className="nt-tag-item">Privacy</span>
              <span className="nt-tag-item">Browser</span>
              <span className="nt-tag-item">Secure Search</span>
              <span className="nt-tag-item">Downloads</span>
            </div>
            <a className="nt-btn nt-btn-primary" href="/alsafe">
              Open AlSafe →
            </a>
          </div>

        </div>

        <div className="nt-section-label" style={{marginTop:'48px'}}>🔧 Coming Soon</div>
        <div className="nt-grid">

          <div className="nt-card soon">
            <div className="nt-card-top">
              <div className="nt-icon green">🧩</div>
              <span className="nt-badge badge-soon">Coming Soon</span>
            </div>
            <div className="nt-name">MCMods</div>
            <div className="nt-desc">A curated collection of Minecraft mods built by the Networkak team. Performance, PvP, and utility mods.</div>
            <div className="nt-tags">
              <span className="nt-tag-item">Mods</span>
              <span className="nt-tag-item">Fabric</span>
              <span className="nt-tag-item">Forge</span>
            </div>
            <button className="nt-btn nt-btn-disabled" disabled>Coming Soon</button>
          </div>

          <div className="nt-card soon">
            <div className="nt-card-top">
              <div className="nt-icon purple">✨</div>
              <span className="nt-badge badge-soon">Coming Soon</span>
            </div>
            <div className="nt-name">More Projects</div>
            <div className="nt-desc">More Networkak projects are in the works. Stay tuned for new tools, games, and community features.</div>
            <div className="nt-tags">
              <span className="nt-tag-item">TBA</span>
            </div>
            <button className="nt-btn nt-btn-disabled" disabled>Coming Soon</button>
          </div>

        </div>
      </div>

      <footer className="nt-footer">
        <div className="nt-footer-logo">NETWORK<span>AK</span></div>
        <p>© 2025 Networkak. All rights reserved.</p>
      </footer>
    </>
  );
}
