export default function NetTiersPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NetTiers – Coming Soon</title>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          *{margin:0;padding:0;box-sizing:border-box;}
          body{background:#0d0f14;color:#e8eaf0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;}
          .wrap{text-align:center;padding:40px 20px;}
          .logo{font-family:'Rajdhani',sans-serif;font-size:3rem;font-weight:700;color:#f5c842;letter-spacing:4px;margin-bottom:8px;}
          .logo span{color:#fff;}
          .badge{display:inline-block;background:rgba(245,168,35,0.15);border:1px solid rgba(245,168,35,0.4);color:#f5a623;border-radius:20px;padding:5px 18px;font-size:.8rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:28px;}
          h1{font-family:'Rajdhani',sans-serif;font-size:2.2rem;font-weight:700;margin-bottom:12px;}
          p{color:#7a8099;font-size:1rem;max-width:400px;margin:0 auto 32px;line-height:1.6;}
          .dots{display:flex;gap:10px;justify-content:center;}
          .dot{width:10px;height:10px;border-radius:50%;background:#f5a623;animation:bounce .8s infinite alternate;}
          .dot:nth-child(2){animation-delay:.2s;}
          .dot:nth-child(3){animation-delay:.4s;}
          @keyframes bounce{from{opacity:.3;transform:translateY(0)}to{opacity:1;transform:translateY(-8px)}}
        `}</style>
      </head>
      <body>
        <div className="wrap">
          <div className="logo">NET<span>TIERS</span></div>
          <div className="badge">🚧 Coming Soon</div>
          <h1>We&apos;re Building Something Epic</h1>
          <p>NetTiers is under construction. The ultimate Minecraft PvP ranking platform is on its way.</p>
          <div className="dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      </body>
    </html>
  );
}
