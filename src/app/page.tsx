export default function Page() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Networkak – Home of Everything</title>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          *{margin:0;padding:0;box-sizing:border-box;}
          body{background:#0d0f14;color:#e8eaf0;font-family:'Inter',sans-serif;min-height:100vh;}

          /* NAV */
          nav{display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#13161d;border-bottom:1px solid #2a2f3e;position:sticky;top:0;z-index:100;}
          .nav-logo{font-family:'Rajdhani',sans-serif;font-size:1.6rem;font-weight:700;color:#f5c842;letter-spacing:3px;}
          .nav-logo span{color:#fff;}
          .nav-tag{font-size:.72rem;color:#7a8099;letter-spacing:.08em;margin-top:2px;}

          /* HERO */
          .hero{text-align:center;padding:90px 20px 60px;}
          .hero-eyebrow{display:inline-flex;align-items:center;gap:7px;background:rgba(245,168,35,.12);border:1px solid rgba(245,168,35,.35);color:#f5a623;border-radius:20px;padding:5px 16px;font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:24px;}
          .hero h1{font-family:'Rajdhani',sans-serif;font-size:clamp(2.4rem,6vw,4rem);font-weight:700;line-height:1.1;margin-bottom:16px;}
          .hero h1 span{color:#f5c842;}
          .hero p{color:#7a8099;font-size:1.05rem;max-width:480px;margin:0 auto;line-height:1.7;}

          /* SECTION */
          .section{max-width:1100px;margin:0 auto;padding:0 24px 80px;}
          .section-label{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7a8099;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
          .section-label::after{content:'';flex:1;height:1px;background:#2a2f3e;}

          /* CARDS GRID */
          .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;}

          /* CARD */
          .card{background:#13161d;border:1px solid #2a2f3e;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px;transition:all .25s;position:relative;overflow:hidden;}
          .card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(245,200,66,.04),transparent);opacity:0;transition:opacity .25s;}
          .card:hover{border-color:#f5a623;transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.4);}
          .card:hover::before{opacity:1;}
          .card.soon{opacity:.6;cursor:default;}
          .card.soon:hover{border-color:#2a2f3e;transform:none;box-shadow:none;}
          .card.soon:hover::before{opacity:0;}

          .card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
          .card-icon{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;}
          .card-icon.gold{background:rgba(245,200,66,.15);border:1px solid rgba(245,200,66,.3);}
          .card-icon.blue{background:rgba(74,144,217,.15);border:1px solid rgba(74,144,217,.3);}
          .card-icon.green{background:rgba(76,175,125,.15);border:1px solid rgba(76,175,125,.3);}
          .card-icon.purple{background:rgba(155,109,224,.15);border:1px solid rgba(155,109,224,.3);}

          .card-badge{font-size:.68rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;}
          .badge-live{background:rgba(76,175,125,.2);color:#4caf7d;border:1px solid rgba(76,175,125,.4);}
          .badge-soon{background:rgba(122,128,153,.15);color:#7a8099;border:1px solid #2a2f3e;}

          .card-name{font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;}
          .card-desc{color:#7a8099;font-size:.88rem;line-height:1.6;flex:1;}

          .card-tags{display:flex;gap:6px;flex-wrap:wrap;}
          .tag{background:#1a1e28;border:1px solid #2a2f3e;border-radius:6px;padding:3px 9px;font-size:.72rem;color:#7a8099;}

          .card-btn{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px 20px;border-radius:10px;font-size:.88rem;font-weight:600;text-decoration:none;transition:all .2s;border:none;cursor:pointer;font-family:'Inter',sans-serif;}
          .btn-primary{background:#f5a623;color:#000;}
          .btn-primary:hover{background:#f5c842;}
          .btn-disabled{background:#1a1e28;color:#7a8099;border:1px solid #2a2f3e;cursor:not-allowed;}

          /* FOOTER */
          footer{border-top:1px solid #2a2f3e;padding:28px 40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
          .footer-logo{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:#f5c842;letter-spacing:2px;}
          .footer-logo span{color:#fff;}
          footer p{color:#7a8099;font-size:.8rem;}

          @media(max-width:600px){
            nav{padding:0 20px;}
            .hero{padding:60px 20px 40px;}
            footer{padding:20px;}
          }
        `}</style>
      </head>
      <body>
        <nav>
          <div>
            <div className="nav-logo">NETWORK<span>AK</span></div>
            <div className="nav-tag">Home of Everything</div>
          </div>
        </nav>

        <div className="hero">
          <div className="hero-eyebrow">🌐 Everything is Possible</div>
          <h1>The Home of<br /><span>Everything</span></h1>
          <p>Networkak is the hub for competitive Minecraft projects — rankings, mods, tools, and more. All in one place.</p>
        </div>

        <div className="section">
          <div className="section-label">⚔️ Ranking Systems</div>
          <div className="grid">

            {/* CompTiers */}
            <div className="card">
              <div className="card-top">
                <div className="card-icon gold">🏆</div>
                <span className="card-badge badge-live">● Live</span>
              </div>
              <div>
                <div className="card-name">CompTiers</div>
                <div className="card-desc">The competitive Minecraft Java tier list. Rankings across all major gamemodes — see where you stand against the best.</div>
              </div>
              <div className="card-tags">
                <span className="tag">Minecraft Java</span>
                <span className="tag">MC</span>
                <span className="tag">Sword</span>
                <span className="tag">Axe</span>
                <span className="tag">UHC</span>
                <span className="tag">DiaPot</span>
                <span className="tag">NethPot</span>
                <span className="tag">SMP</span>
                <span className="tag">Craystal</span>
                <span className="tag">Mace</span>
              </div>
              <a className="card-btn btn-primary" href="https://comptiersmc.web.app/" target="_blank" rel="noopener noreferrer">
                Open CompTiers →
              </a>
            </div>

            {/* NetTiers */}
            <div className="card">
              <div className="card-top">
                <div className="card-icon blue">🌐</div>
                <span className="card-badge badge-live">● Live</span>
              </div>
              <div>
                <div className="card-name">NetTiers</div>
                <div className="card-desc">NetTiers — new gamemodes and more. The ranking platform built for the community with fresh competitive categories.</div>
              </div>
              <div className="card-tags">
                <span className="tag">Minecraft Java</span>
                <span className="tag">MC</span>
                <span className="tag">SpearMace</span>
                <span className="tag">DiaSMP</span>
                <span className="tag">NethSMP</span>
                <span className="tag">PotSMP</span>
                <span className="tag">Cart</span>
                <span className="tag">ShieldlessSMP</span>
              </div>
              <a className="card-btn btn-primary" href="/NetTiers">
                Open NetTiers →
              </a>
            </div>

          </div>

          <div className="section-label" style={{marginTop:'48px'}}>🔧 Coming Soon</div>
          <div className="grid">

            {/* MCMods */}
            <div className="card soon">
              <div className="card-top">
                <div className="card-icon green">🧩</div>
                <span className="card-badge badge-soon">Coming Soon</span>
              </div>
              <div>
                <div className="card-name">MCMods</div>
                <div className="card-desc">A curated collection of Minecraft mods built by the Networkak team. Performance, PvP, and utility mods.</div>
              </div>
              <div className="card-tags">
                <span className="tag">Mods</span>
                <span className="tag">Fabric</span>
                <span className="tag">Forge</span>
              </div>
              <button className="card-btn btn-disabled" disabled>Coming Soon</button>
            </div>

            {/* More */}
            <div className="card soon">
              <div className="card-top">
                <div className="card-icon purple">✨</div>
                <span className="card-badge badge-soon">Coming Soon</span>
              </div>
              <div>
                <div className="card-name">More Projects</div>
                <div className="card-desc">More Networkak projects are in the works. Stay tuned for new tools, games, and community features.</div>
              </div>
              <div className="card-tags">
                <span className="tag">TBA</span>
              </div>
              <button className="card-btn btn-disabled" disabled>Coming Soon</button>
            </div>

          </div>
        </div>

        <footer>
          <div className="footer-logo">NETWORK<span>AK</span></div>
          <p>© 2025 Networkak. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
