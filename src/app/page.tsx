"use client";

export default function Page() {
  return (
    <>
      <nav>
        <div className="logo">
          NET<span>TIERS</span>
        </div>
        <div className="nav-links">
          <button className="nav-btn">🏠 Home</button>
          <button className="nav-btn active">🏆 Rankings</button>
          <a
            href="https://discord.gg/TDSvexxwKV"
            target="_blank"
            rel="noopener"
            className="nav-btn discord-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.01.043.024.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Discord
          </a>
          <button className="nav-btn">📄 API Docs</button>
        </div>
        <input
          className="nav-search"
          placeholder="🔍 Search player..."
          id="globalSearch"
          onInput={(e) =>
            (window as any).handleGlobalSearch?.(
              (e.target as HTMLInputElement).value,
            )
          }
        />
      </nav>

      <div className="tabs-wrap">
        <div className="tabs">
          <button
            className="tab active"
            onClick={(e) =>
              (window as any).switchTab?.("overall", e.currentTarget)
            }
          >
            <span className="icon">🏆</span>Overall
          </button>
          <button
            className="tab"
            onClick={(e) =>
              (window as any).switchTab?.("vanilla", e.currentTarget)
            }
          >
            <span className="icon">🎯</span>Vanilla
          </button>
          <button
            className="tab"
            onClick={(e) => (window as any).switchTab?.("uhc", e.currentTarget)}
          >
            <span className="icon">❤️</span>UHC
          </button>
          <button
            className="tab"
            onClick={(e) => (window as any).switchTab?.("pot", e.currentTarget)}
          >
            <span className="icon">🧪</span>Pot
          </button>
          <button
            className="tab"
            onClick={(e) =>
              (window as any).switchTab?.("nethop", e.currentTarget)
            }
          >
            <span className="icon">👾</span>NethOP
          </button>
          <button
            className="tab"
            onClick={(e) => (window as any).switchTab?.("smp", e.currentTarget)}
          >
            <span className="icon">🌀</span>SMP
          </button>
          <button
            className="tab"
            onClick={(e) =>
              (window as any).switchTab?.("sword", e.currentTarget)
            }
          >
            <span className="icon">⚔️</span>Sword
          </button>
          <button
            className="tab"
            onClick={(e) => (window as any).switchTab?.("axe", e.currentTarget)}
          >
            <span className="icon">🪓</span>Axe
          </button>
          <button
            className="tab"
            onClick={(e) =>
              (window as any).switchTab?.("mace", e.currentTarget)
            }
          >
            <span className="icon">🔨</span>Mace
          </button>
          <button
            className="tab"
            onClick={(e) =>
              (window as any).switchTab?.("cart", e.currentTarget)
            }
          >
            <span className="icon">🛒</span>Cart
          </button>
          <button
            className="tab"
            onClick={(e) =>
              (window as any).switchTab?.("spearmace", e.currentTarget)
            }
          >
            <span className="icon">🏹</span>Spear Mace
          </button>
        </div>
      </div>

      <div className="content">
        <div className="top-bar">
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div className="info-badge">ℹ️ Information</div>
            <button
              className="admin-key-btn"
              onClick={() => (window as any).openKeyModal?.()}
            >
              🔑 Admin
            </button>
          </div>
          <div className="server-ip">
            <span>🖥️</span>
            <span style={{ color: "var(--muted)" }}>SERVER IP</span>
            <span style={{ fontWeight: "600", color: "var(--accent)" }}>
              ⏳ Coming Soon
            </span>
          </div>
        </div>
        <div id="mainContent">
          <div className="loading">
            <div className="spinner"></div>&nbsp;Loading players...
          </div>
        </div>
      </div>

      {/* PROFILE MODAL */}
      <div
        className="modal-overlay"
        id="profileModal"
        onClick={(e) => (window as any).closeProfileIfOutside?.(e)}
      >
        <div className="modal">
          <button
            className="modal-close"
            onClick={() => (window as any).closeProfile?.()}
          >
            ✕
          </button>
          <div className="modal-avatar">
            <img
              id="pAvatarImg"
              src=""
              alt=""
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src =
                  "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><rect width=%2280%22 height=%2280%22 fill=%22%23222736%22/><text x=%2240%22 y=%2250%22 text-anchor=%22middle%22 font-size=%2232%22>🎮</text></svg>";
              }}
            />
          </div>
          <div className="modal-name" id="pName"></div>
          <div style={{ textAlign: "center", margin: "6px 0" }}>
            <div className="modal-rank-badge">
              <span>💎</span>
              <span id="pTitle"></span>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              color: "var(--muted)",
              fontSize: ".85rem",
              marginBottom: "14px",
            }}
            id="pRegion"
          ></div>
          <div className="modal-section-label">POSITION</div>
          <div className="modal-position">
            <div className="modal-pos-num" id="pPos"></div>
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: "600" }}>
                🏆 OVERALL
              </div>
              <div
                style={{ fontSize: ".78rem", color: "var(--muted)" }}
                id="pPts"
              ></div>
            </div>
          </div>
          <div className="modal-section-label">TIERS</div>
          <div className="modal-tiers-grid" id="pTiers"></div>
          <a
            id="pNameMC"
            href="#"
            target="_blank"
            rel="noopener"
            className="namemc-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59L7.76 14.83l1.41 1.41L19 5.41V9h2V3h-7z" />
            </svg>
            View on NameMC
          </a>
        </div>
      </div>

      {/* ADMIN KEY MODAL */}
      <div
        className="key-modal"
        id="keyModal"
        onClick={(e) => (window as any).closeKeyIfOutside?.(e)}
      >
        <div className="key-box">
          <div className="key-title">🔑 Admin Access</div>
          <div className="admin-field" style={{ marginBottom: "12px" }}>
            <label>Password</label>
            <input
              className="admin-input"
              type="password"
              id="keyInput"
              placeholder="Enter password..."
              onKeyDown={(e) => {
                if (e.key === "Enter") (window as any).checkKey?.();
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="btn btn-gold"
              onClick={() => (window as any).checkKey?.()}
            >
              Enter
            </button>
            <button
              className="btn btn-gray"
              onClick={() => (window as any).closeKeyModal?.()}
            >
              Cancel
            </button>
          </div>
          <div
            id="keyErr"
            style={{
              color: "var(--red)",
              fontSize: ".8rem",
              marginTop: "8px",
              display: "none",
            }}
          >
            ❌ Incorrect password.
          </div>
        </div>
      </div>

      {/* ADMIN PANEL */}
      <div
        className="admin-panel"
        id="adminPanel"
        onClick={(e) => (window as any).closeAdminIfOutside?.(e)}
      >
        <div className="admin-box">
          <div className="admin-header">
            <div className="admin-title">⚙️ Admin Panel</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="db-status">
                <div className="db-dot" id="dbDot"></div>
                <span id="dbStatus">Connecting...</span>
              </div>
              <button
                className="btn btn-gray"
                onClick={() => (window as any).closeAdmin?.()}
              >
                ✕ Close
              </button>
            </div>
          </div>
          <div className="admin-body">
            <div
              style={{
                fontWeight: "600",
                fontSize: ".92rem",
                color: "var(--green)",
              }}
            >
              ➕ Add Player
            </div>
            <div className="admin-row">
              <div className="admin-field">
                <label>Username</label>
                <input
                  className="admin-input"
                  id="addName"
                  placeholder="PlayerName"
                />
              </div>
              <div className="admin-field">
                <label>Gamemode</label>
                <select className="admin-select" id="addMode">
                  <option value="vanilla">Vanilla</option>
                  <option value="uhc">UHC</option>
                  <option value="pot">Pot</option>
                  <option value="nethop">NethOP</option>
                  <option value="smp">SMP</option>
                  <option value="sword">Sword</option>
                  <option value="axe">Axe</option>
                  <option value="mace">Mace</option>
                  <option value="cart">Cart</option>
                  <option value="spearmace">Spear Mace</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Tier</label>
                <select className="admin-select" id="addTier">
                  <option value="1">Tier 1</option>
                  <option value="2">Tier 2</option>
                  <option value="3">Tier 3</option>
                  <option value="4">Tier 4</option>
                  <option value="5">Tier 5</option>
                </select>
              </div>
              <div className="admin-field">
                <label>HT / LT</label>
                <select className="admin-select" id="addHT">
                  <option value="HT">HT – High Tier</option>
                  <option value="LT">LT – Low Tier</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Region</label>
                <select className="admin-select" id="addRegion">
                  <option value="NA">NA</option>
                  <option value="EU">EU</option>
                  <option value="AS">AS</option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="btn btn-green"
                onClick={() => (window as any).adminAddPlayer?.()}
              >
                ➕ Add Player
              </button>
            </div>
            <div className="admin-divider"></div>
            <div
              style={{
                fontWeight: "600",
                fontSize: ".92rem",
                color: "var(--red)",
              }}
            >
              🗑️ Remove Player by Name
            </div>
            <div className="admin-row">
              <div className="admin-field">
                <label>Username</label>
                <input
                  className="admin-input"
                  id="removeName"
                  placeholder="PlayerName"
                />
              </div>
              <div className="admin-field">
                <label>From Gamemode</label>
                <select className="admin-select" id="removeMode">
                  <option value="ALL">⚡ All Gamemodes</option>
                  <option value="vanilla">Vanilla</option>
                  <option value="uhc">UHC</option>
                  <option value="pot">Pot</option>
                  <option value="nethop">NethOP</option>
                  <option value="smp">SMP</option>
                  <option value="sword">Sword</option>
                  <option value="axe">Axe</option>
                  <option value="mace">Mace</option>
                  <option value="cart">Cart</option>
                  <option value="spearmace">Spear Mace</option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="btn btn-red"
                onClick={() => (window as any).adminRemoveByName?.()}
              >
                🗑️ Remove
              </button>
            </div>
            <div className="admin-divider"></div>
            <div style={{ fontWeight: "600", fontSize: ".92rem" }}>
              📋 Browse &amp; Remove Players
            </div>
            <select
              className="admin-select"
              id="previewMode"
              onChange={() => (window as any).renderAdminPreview?.()}
              style={{ maxWidth: "220px" }}
            >
              <option value="vanilla">Vanilla</option>
              <option value="uhc">UHC</option>
              <option value="pot">Pot</option>
              <option value="nethop">NethOP</option>
              <option value="smp">SMP</option>
              <option value="sword">Sword</option>
              <option value="axe">Axe</option>
              <option value="mace">Mace</option>
              <option value="cart">Cart</option>
              <option value="spearmace">Spear Mace</option>
            </select>
            <div className="admin-players-list" id="adminPreviewList"></div>
          </div>
        </div>
      </div>

      <div className="admin-toast" id="toast"></div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
// ── CONFIG ──
const SB_URL = 'https://rljvcykuiswwriwapsgi.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsanZjeWt1aXN3d3Jpd2Fwc2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzE1NTUsImV4cCI6MjA4OTU0NzU1NX0.TL2BzGqeb8GsWEsaCTwtzqKaKqB9l8ROdVap7rOPDZI';
const ADMIN_PASS = 'KabulKarwan@2013';

const TIER_PTS = {LT5:1,HT5:2,LT4:3,HT4:4,LT3:5,HT3:10,LT2:20,HT2:40,LT1:50,HT1:60};
const GM_ICONS = {vanilla:'🎯',uhc:'❤️',pot:'🧪',nethop:'👾',smp:'🌀',sword:'⚔️',axe:'🪓',mace:'🔨',cart:'🛒',spearmace:'🏹'};
const GM_NAMES = {vanilla:'Vanilla',uhc:'UHC',pot:'Pot',nethop:'NethOP',smp:'SMP',sword:'Sword',axe:'Axe',mace:'Mace',cart:'Cart',spearmace:'Spear Mace'};
const GM_ORDER = ['vanilla','uhc','pot','nethop','smp','sword','axe','mace','cart','spearmace'];

// ── SUPABASE REST (plain fetch, no SDK needed) ──
let dbOk = false;
function sbHeaders(extra){
  const h = new Headers();
  h.append('apikey', SB_KEY);
  h.append('Authorization', 'Bearer ' + SB_KEY);
  h.append('Content-Type', 'application/json');
  if(extra) h.append('Prefer', extra);
  return h;
}
async function sbSelect(table){
  const r = await fetch(SB_URL+'/rest/v1/'+table+'?select=*&order=id.asc&limit=100000', {
    method:'GET', mode:'cors', headers: sbHeaders()
  });
  if(!r.ok){ const t=await r.text(); throw new Error(t); }
  return r.json();
}
async function sbInsert(table, rows){
  const r = await fetch(SB_URL+'/rest/v1/'+table, {
    method:'POST', mode:'cors',
    headers: sbHeaders('return=representation'),
    body: JSON.stringify(rows)
  });
  if(!r.ok){ const t=await r.text(); throw new Error(t); }
  return r.json();
}
async function sbDeleteById(table, id){
  const r = await fetch(SB_URL+'/rest/v1/'+table+'?id=eq.'+id, {
    method:'DELETE', mode:'cors', headers: sbHeaders()
  });
  if(!r.ok){ const t=await r.text(); throw new Error(t); }
}
async function sbDeleteByNameGm(table, name, gm){
  const url = SB_URL+'/rest/v1/'+table+'?name=eq.'+encodeURIComponent(name)+'&gamemode=eq.'+encodeURIComponent(gm);
  const r = await fetch(url, {method:'DELETE', mode:'cors', headers: sbHeaders()});
  if(!r.ok){ const t=await r.text(); throw new Error(t); }
}

// ── STATE ──
let DATA = {};
let allPlayers = [];
let currentTab = 'overall';

// ── SKIN URLS (mc-heads.net proxies NameMC) ──
const skinUrl  = n => \`https://mc-heads.net/avatar/\${encodeURIComponent(n)}/64\`;
const skinSm   = n => \`https://mc-heads.net/avatar/\${encodeURIComponent(n)}/32\`;
const nameMCUrl= n => \`https://namemc.com/profile/\${encodeURIComponent(n)}\`;
const fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
function imgErr(el){ el.style.display='none'; }

// ── TITLE ──
function getTitle(pts){
  if(pts>=400)return'Combat Grandmaster';
  if(pts>=250)return'Combat Master';
  if(pts>=100)return'Combat Ace';
  if(pts>=50) return'Combat Specialist';
  if(pts>=20) return'Combat Cadet';
  if(pts>=10) return'Combat Novice';
  return'Rookie';
}

// ── COMPUTE POINTS ──
function computePlayer(name){
  let total=0,tiers={};
  for(const[gm,td]of Object.entries(DATA)){
    for(const[tk,players]of Object.entries(td)){
      const n=tk.replace('t','');
      const p=players.find(p=>p.name.toLowerCase()===name.toLowerCase());
      if(p){const k=(p.ht?'HT':'LT')+n;total+=TIER_PTS[k]||0;tiers[gm]={tier:n,ht:p.ht,key:k};}
    }
  }
  return{total,tiers};
}

// ── BUILD DATA FROM FLAT LIST ──
function rebuildDATA(){
  DATA={};
  GM_ORDER.forEach(gm=>{DATA[gm]={t1:[],t2:[],t3:[],t4:[],t5:[]};});
  allPlayers.forEach(p=>{
    const gm=p.gamemode,tk='t'+p.tier;
    if(DATA[gm]&&DATA[gm][tk]!==undefined)
      DATA[gm][tk].push({name:p.name,ht:!!p.ht,region:p.region||'NA',db_id:p.id});
  });
}

// ── SUPABASE LOAD ──
async function initDB(){
  // Show loading state
  document.getElementById('mainContent').innerHTML='<div class="loading"><div class="spinner"></div>&nbsp;Connecting to database...</div>';
  try{
    const data = await sbSelect('players');
    dbOk=true; setDBStatus(true);
    if(data && data.length > 0){
      allPlayers = data;
      console.log('Loaded', data.length, 'players from Supabase');
      rebuildDATA(); renderContent();
    } else {
      console.log('Table empty, seeding initial data...');
      await seedToDB();
    }
  }catch(e){
    console.error('Supabase error:', e.message);
    setDBStatus(false);
    // Fall back to local seed so site still works
    allPlayers = getSeed();
    rebuildDATA(); renderContent();
  }
}

async function seedToDB(){
  const seed = getSeed();
  try{
    // Insert in batches of 50 to avoid request size limits
    let allInserted = [];
    for(let i=0; i<seed.length; i+=50){
      const batch = seed.slice(i, i+50);
      const inserted = await sbInsert('players', batch);
      allInserted = allInserted.concat(inserted||batch);
    }
    allPlayers = allInserted.length ? allInserted : seed;
    console.log('Seeded', allPlayers.length, 'players to Supabase');
  }catch(e){
    console.error('Seed error:', e.message);
    allPlayers = seed;
  }
  rebuildDATA(); renderContent();
}

function setDBStatus(ok){
  dbOk=ok;
  const dot=document.getElementById('dbDot');
  const lbl=document.getElementById('dbStatus');
  if(dot){dot.className='db-dot'+(ok?'':' err');}
  if(lbl){lbl.textContent=ok?'Supabase Connected':'Local (DB offline)';}
}

// ── RENDER ──
function switchTab(tab,el){
  currentTab=tab;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  renderContent();
}

function renderContent(){
  document.getElementById('mainContent').innerHTML=
    currentTab==='overall'?buildOverall():buildTierView(currentTab);
}

function buildOverall(){
  const names=new Set();
  for(const td of Object.values(DATA))for(const pl of Object.values(td))pl.forEach(p=>names.add(p.name));
  let ranked=[...names].map(n=>{const{total,tiers}=computePlayer(n);return{name:n,total,tiers};});
  ranked.sort((a,b)=>b.total-a.total);
  function reg(n){for(const td of Object.values(DATA))for(const pl of Object.values(td)){const p=pl.find(x=>x.name===n);if(p)return p.region||'NA';}return'NA';}
  let html='<div class="overall-list">';
  ranked.slice(0,100000).forEach((p,i)=>{
    const rc=i===0?'r1':i===1?'r2':i===2?'r3':'';
    const region=reg(p.name);
    const badges=GM_ORDER.map(gm=>{
      if(!p.tiers[gm])return\`<div class="tbadge lt" title="\${GM_NAMES[gm]}"><span class="badge-icon">\${GM_ICONS[gm]}</span><span class="badge-label">-</span></div>\`;
      const t=p.tiers[gm],cls=t.ht?'ht':'lt',lbl=(t.ht?'HT':'LT')+t.tier;
      return\`<div class="tbadge \${cls}" title="\${GM_NAMES[gm]} \${lbl}"><span class="badge-icon">\${GM_ICONS[gm]}</span><span class="badge-label">\${lbl}</span></div>\`;
    }).join('');
    html+=\`<div class="overall-row" onclick="openProfile(\${JSON.stringify(p.name)})">
      <div class="rank-num \${rc}">\${i+1}.</div>
      <div class="player-avatar"><img src="\${skinUrl(p.name)}" alt="\${p.name}" onerror="imgErr(this)"></div>
      <div class="player-info">
        <div class="player-name">\${p.name}</div>
        <div class="player-title">💎 \${getTitle(p.total)} (\${p.total} points)</div>
      </div>
      <div class="region-tag \${region}">\${region}</div>
      <div class="tier-badges">\${badges}</div>
    </div>\`;
  });
  return html+'</div>';
}

function buildTierView(gm){
  const td=DATA[gm];
  if(!td)return'<p style="color:var(--muted)">No data.</p>';
  const cols=[{k:'t1',l:'Tier 1',c:'t1',i:'🏆'},{k:'t2',l:'Tier 2',c:'t2',i:'🥈'},{k:'t3',l:'Tier 3',c:'t3',i:'🥉'},{k:'t4',l:'Tier 4',c:'t4',i:''},{k:'t5',l:'Tier 5',c:'t5',i:''}];
  let html='<div class="tier-grid">';
  cols.forEach(({k,l,c,i})=>{
    const pls=td[k]||[];
    html+=\`<div><div class="tier-header \${c}">\${i} \${l}</div>\`;
    pls.forEach(p=>{
      const hc=p.ht?'ht-player':'',bc=p.ht?'ht':'lt',bl=p.ht?'HT':'LT',n=k.replace('t','');
      html+=\`<div class="tier-player \${hc}" onclick="openProfile(\${JSON.stringify(p.name)})">
        <div class="region-dot \${p.region}"></div>
        <div class="tp-avatar"><img src="\${skinSm(p.name)}" alt="\${p.name}" onerror="imgErr(this)"></div>
        <div class="tp-name">\${p.name}</div>
        <div class="tp-badge \${bc}">\${bl}\${n}</div>
      </div>\`;
    });
    html+='</div>';
  });
  return html+'</div>';
}

// ── PROFILE ──
function openProfile(name){
  const{total,tiers}=computePlayer(name);
  let region='NA';
  for(const td of Object.values(DATA))for(const pl of Object.values(td)){const p=pl.find(x=>x.name===name);if(p){region=p.region||'NA';break;}}
  // rank
  const names=new Set();
  for(const td of Object.values(DATA))for(const pl of Object.values(td))pl.forEach(p=>names.add(p.name));
  const ranked=[...names].map(n=>{const{total:t}=computePlayer(n);return{name:n,total:t};}).sort((a,b)=>b.total-a.total);
  const rank=ranked.findIndex(p=>p.name===name)+1;

  document.getElementById('pAvatarImg').src=skinUrl(name);
  document.getElementById('pName').textContent=name;
  document.getElementById('pTitle').textContent=getTitle(total);
  document.getElementById('pRegion').textContent='📍 '+region;
  document.getElementById('pPos').textContent=rank+'.';
  document.getElementById('pPts').textContent=total+' points';
  document.getElementById('pNameMC').href=nameMCUrl(name);

  let th='';
  GM_ORDER.forEach(gm=>{
    const t=tiers[gm];
    if(t){const lbl=(t.ht?'HT':'LT')+t.tier,cls=t.ht?'ht':'lt';
      th+=\`<div class="modal-tbadge"><div class="ico">\${GM_ICONS[gm]}</div><div class="lbl \${cls}">\${lbl}</div><div style="font-size:.55rem;color:var(--muted)">\${GM_NAMES[gm]}</div></div>\`;}
    else th+=\`<div class="modal-tbadge"><div class="ico">\${GM_ICONS[gm]}</div><div class="lbl none">-</div><div style="font-size:.55rem;color:var(--border)">\${GM_NAMES[gm]}</div></div>\`;
  });
  document.getElementById('pTiers').innerHTML=th;
  document.getElementById('profileModal').classList.add('show');
}
function closeProfile(){document.getElementById('profileModal').classList.remove('show');}
function closeProfileIfOutside(e){if(e.target.id==='profileModal')closeProfile();}

// ── ADMIN ──
function openKeyModal(){document.getElementById('keyInput').value='';document.getElementById('keyErr').style.display='none';document.getElementById('keyModal').classList.add('show');setTimeout(()=>document.getElementById('keyInput').focus(),80);}
function closeKeyModal(){document.getElementById('keyModal').classList.remove('show');}
function closeKeyIfOutside(e){if(e.target.id==='keyModal')closeKeyModal();}
function checkKey(){
  if(document.getElementById('keyInput').value===ADMIN_PASS){closeKeyModal();openAdmin();}
  else document.getElementById('keyErr').style.display='block';
}
function openAdmin(){setDBStatus(dbOk);document.getElementById('adminPanel').classList.add('show');renderAdminPreview();}
function closeAdmin(){document.getElementById('adminPanel').classList.remove('show');}
function closeAdminIfOutside(e){if(e.target.id==='adminPanel')closeAdmin();}

async function adminAddPlayer(){
  const name=document.getElementById('addName').value.trim();
  const gm=document.getElementById('addMode').value;
  const tier=parseInt(document.getElementById('addTier').value);
  const ht=document.getElementById('addHT').value==='HT';
  const region=document.getElementById('addRegion').value;
  if(!name){showToast('Enter a player name!',true);return;}
  const tk='t'+tier;
  if(DATA[gm][tk].find(p=>p.name.toLowerCase()===name.toLowerCase())){showToast('Already in this tier!',true);return;}
  const row={name,gamemode:gm,tier,ht,region};
  try{
    const data = await sbInsert('players', [row]);
    allPlayers.push(data[0]); rebuildDATA();
    showToast('✅ Added '+name+' to '+GM_NAMES[gm]+' T'+tier);
  }catch(e){
    allPlayers.push({...row, id:Date.now()}); rebuildDATA();
    showToast('✅ Added '+name+' (local only)', false);
  }
  document.getElementById('addName').value='';
  renderAdminPreview();renderContent();
}

async function adminRemoveByName(){
  const name=document.getElementById('removeName').value.trim();
  const mode=document.getElementById('removeMode').value;
  if(!name){showToast('Enter a player name!',true);return;}
  const gms=mode==='ALL'?GM_ORDER:[mode];
  let removed=0;
  for(const gm of gms){
    const toRemove=allPlayers.filter(p=>p.name.toLowerCase()===name.toLowerCase()&&p.gamemode===gm);
    if(!toRemove.length)continue;
    for(const p of toRemove){
      try{
        if(dbOk){
          if(p.id) await sbDeleteById('players', p.id);
          else await sbDeleteByNameGm('players', p.name, gm);
        }
      }catch(e){
        console.warn('Supabase remove failed', p.name, gm, e.message);
      }
      allPlayers=allPlayers.filter(x=>x!==p);
      removed++;
    }
  }
  if(removed){
    rebuildDATA();
    showToast(\`🗑️ Removed \${name}\`);
    document.getElementById('removeName').value='';
    renderAdminPreview();
    renderContent();
  } else showToast(\`\"\${name}\" not found!\`,true);
}

async function removeRowInline(dbId,name,gm){
  try{
    if(dbOk){
      if(dbId) await sbDeleteById('players', dbId);
      else await sbDeleteByNameGm('players', name, gm);
    }
  }catch(e){
    console.warn('Supabase remove failed', name, gm, e.message);
  }
  allPlayers=allPlayers.filter(p=>!(p.id===dbId||(p.name===name&&p.gamemode===gm)));
  rebuildDATA();
  showToast(\`🗑️ Removed \${name}\`);
  renderAdminPreview();
  renderContent();
}

function renderAdminPreview(){
  const gm=document.getElementById('previewMode').value;
  const list=document.getElementById('adminPreviewList');
  let html='';
  for(const[tk,players]of Object.entries(DATA[gm]||{})){
    const n=tk.replace('t','');
    players.forEach(p=>{
      const lbl=(p.ht?'HT':'LT')+n;
      html+=\`<div class="admin-player-row">
        <img src="\${skinSm(p.name)}" width="24" height="24" style="border-radius:4px" onerror="this.style.display='none'">
        <span class="apn">\${p.name}</span>
        <span class="apm">\${lbl} · \${p.region}</span>
        <button class="rm-btn" onclick="removeRowInline(\${JSON.stringify(p.db_id)},\${JSON.stringify(p.name)},\${JSON.stringify(gm)})">🗑️ Remove</button>
      </div>\`;
    });
  }
  list.innerHTML=html||'<div style="color:var(--muted);font-size:.85rem;padding:10px 0;">No players in this gamemode.</div>';
}

// ── SEARCH ──
function handleGlobalSearch(val){
  if(!val.trim()){renderContent();return;}
  const q=val.toLowerCase();
  const names=new Set();
  for(const td of Object.values(DATA))for(const pl of Object.values(td))pl.forEach(p=>names.add(p.name));
  const matches=[...names].filter(n=>n.toLowerCase().includes(q));
  if(!matches.length){document.getElementById('mainContent').innerHTML='<p style="color:var(--muted);padding:20px 0;">No players found.</p>';return;}
  let ranked=matches.map(n=>{const{total,tiers}=computePlayer(n);return{name:n,total,tiers};}).sort((a,b)=>b.total-a.total);
  function reg(n){for(const td of Object.values(DATA))for(const pl of Object.values(td)){const p=pl.find(x=>x.name===n);if(p)return p.region||'NA';}return'NA';}
  let html='<div class="overall-list">';
  ranked.forEach((p,i)=>{
    const region=reg(p.name);
    const badges=GM_ORDER.map(gm=>{
      if(!p.tiers[gm])return\`<div class="tbadge lt"><span class="badge-icon">\${GM_ICONS[gm]}</span><span class="badge-label">-</span></div>\`;
      const t=p.tiers[gm],cls=t.ht?'ht':'lt',lbl=(t.ht?'HT':'LT')+t.tier;
      return\`<div class="tbadge \${cls}"><span class="badge-icon">\${GM_ICONS[gm]}</span><span class="badge-label">\${lbl}</span></div>\`;
    }).join('');
    html+=\`<div class="overall-row" onclick="openProfile(\${JSON.stringify(p.name)})">
      <div class="rank-num">\${i+1}.</div>
      <div class="player-avatar"><img src="\${skinUrl(p.name)}" alt="\${p.name}" onerror="imgErr(this)"></div>
      <div class="player-info"><div class="player-name">\${p.name}</div><div class="player-title">💎 \${getTitle(p.total)} (\${p.total} pts)</div></div>
      <div class="region-tag \${region}">\${region}</div>
      <div class="tier-badges">\${badges}</div>
    </div>\`;
  });
  document.getElementById('mainContent').innerHTML=html+'</div>';
}

// ── TOAST ──
function showToast(msg,err=false){
  const t=document.getElementById('toast');t.textContent=msg;
  t.className='admin-toast show'+(err?' err':'');
  setTimeout(()=>t.className='admin-toast',2800);
}

// ── SEED DATA ──
function getSeed(){return[
  // VANILLA
  {name:'K1RBE',gamemode:'vanilla',tier:1,ht:true,region:'NA'},
  {name:'Camcal',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'Demonmcc',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'KingD3fault',gamemode:'vanilla',tier:2,ht:false,region:'NA'},
  {name:'qPower',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'Tokenu',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'cloudmlol',gamemode:'vanilla',tier:2,ht:false,region:'NA'},
  {name:'Cowarted',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'Dwggo',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'GalleryWalk',gamemode:'vanilla',tier:2,ht:false,region:'NA'},
  {name:'SuperBowserSpike',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'C1utch',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'MoezXF',gamemode:'vanilla',tier:2,ht:false,region:'NA'},{name:'Amateur_Poet',gamemode:'vanilla',tier:2,ht:false,region:'NA'},
  {name:'raaicuo',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'Sonya_skvirtik',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'resettable',gamemode:'vanilla',tier:3,ht:false,region:'NA'},
  {name:'kexqa',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'noc0oo_',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'TwoSpeedy',gamemode:'vanilla',tier:3,ht:false,region:'NA'},
  {name:'Sylank',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'yesbee1',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'k4etril',gamemode:'vanilla',tier:3,ht:true,region:'EU'},
  {name:'Atlantkv',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'Wior',gamemode:'vanilla',tier:3,ht:false,region:'NA'},{name:'ksuvis',gamemode:'vanilla',tier:3,ht:false,region:'NA'},
  {name:'D3mongorgons',gamemode:'vanilla',tier:4,ht:false,region:'NA'},{name:'09024204',gamemode:'vanilla',tier:4,ht:false,region:'NA'},{name:'r3surrgence',gamemode:'vanilla',tier:4,ht:false,region:'NA'},
  {name:'a4yt',gamemode:'vanilla',tier:4,ht:false,region:'NA'},{name:'LaggyMonkey',gamemode:'vanilla',tier:4,ht:false,region:'NA'},{name:'Thai_mimi',gamemode:'vanilla',tier:4,ht:false,region:'NA'},
  {name:'soundovo',gamemode:'vanilla',tier:5,ht:false,region:'NA'},{name:'KotsaMC',gamemode:'vanilla',tier:5,ht:false,region:'NA'},{name:'bobuxv3',gamemode:'vanilla',tier:5,ht:false,region:'NA'},
  {name:'SoyDhru',gamemode:'vanilla',tier:5,ht:false,region:'NA'},{name:'polarbear1213451',gamemode:'vanilla',tier:5,ht:false,region:'NA'},{name:'rayz7n_01',gamemode:'vanilla',tier:5,ht:false,region:'NA'},
  // UHC
  {name:'Swight',gamemode:'uhc',tier:1,ht:true,region:'NA'},{name:'coldified',gamemode:'uhc',tier:1,ht:false,region:'EU'},{name:'CORZZ',gamemode:'uhc',tier:1,ht:false,region:'NA'},
  {name:'SeeBoMWABASSSSS',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'Paulinhq',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'BLMcheat',gamemode:'uhc',tier:2,ht:false,region:'NA'},
  {name:'Koharu89',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'Arsakha',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'sweatgod',gamemode:'uhc',tier:2,ht:false,region:'NA'},
  {name:'DryAU',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'Triser5000',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'Draqonate',gamemode:'uhc',tier:2,ht:false,region:'NA'},
  {name:'_PuggyWuggy',gamemode:'uhc',tier:3,ht:false,region:'NA'},{name:'xzTito',gamemode:'uhc',tier:3,ht:false,region:'NA'},{name:'Axzll',gamemode:'uhc',tier:3,ht:false,region:'NA'},
  {name:'Runn1n9',gamemode:'uhc',tier:3,ht:false,region:'NA'},{name:'Nilo10',gamemode:'uhc',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'uhc',tier:3,ht:false,region:'NA'},
  {name:'Aimingstars',gamemode:'uhc',tier:4,ht:false,region:'NA'},{name:'Masqnn',gamemode:'uhc',tier:4,ht:false,region:'NA'},{name:'Clehu',gamemode:'uhc',tier:4,ht:false,region:'NA'},
  {name:'PeaceButCool',gamemode:'uhc',tier:4,ht:false,region:'NA'},{name:'wduo',gamemode:'uhc',tier:4,ht:false,region:'NA'},
  {name:'jocko051',gamemode:'uhc',tier:5,ht:false,region:'NA'},{name:'TOPPER28',gamemode:'uhc',tier:5,ht:false,region:'NA'},{name:'voiru',gamemode:'uhc',tier:5,ht:false,region:'NA'},
  {name:'BurgerMarioo',gamemode:'uhc',tier:5,ht:false,region:'NA'},{name:'xpyw',gamemode:'uhc',tier:5,ht:false,region:'NA'},
  // POT
  {name:'Kylaz',gamemode:'pot',tier:1,ht:true,region:'NA'},{name:'sashia2m',gamemode:'pot',tier:1,ht:false,region:'NA'},
  {name:'ph4ntic',gamemode:'pot',tier:2,ht:false,region:'NA'},{name:'jano74',gamemode:'pot',tier:2,ht:false,region:'NA'},{name:'badspelhr',gamemode:'pot',tier:2,ht:false,region:'NA'},
  {name:'ciphar',gamemode:'pot',tier:2,ht:false,region:'NA'},{name:'coldified',gamemode:'pot',tier:2,ht:false,region:'NA'},{name:'Leaferd',gamemode:'pot',tier:2,ht:false,region:'NA'},
  {name:'SwiftNautilus',gamemode:'pot',tier:2,ht:false,region:'NA'},{name:'Hosit',gamemode:'pot',tier:2,ht:false,region:'NA'},{name:'Xarlaq',gamemode:'pot',tier:2,ht:false,region:'NA'},
  {name:'ZeNain',gamemode:'pot',tier:3,ht:false,region:'NA'},{name:'garlicbreed',gamemode:'pot',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'pot',tier:3,ht:false,region:'NA'},
  {name:'igekoma',gamemode:'pot',tier:3,ht:false,region:'NA'},{name:'rzuwik6',gamemode:'pot',tier:3,ht:false,region:'NA'},{name:'SlaadeWiilson',gamemode:'pot',tier:3,ht:false,region:'NA'},
  {name:'mushroomstew101',gamemode:'pot',tier:4,ht:false,region:'NA'},{name:'Osuismypet',gamemode:'pot',tier:4,ht:false,region:'NA'},{name:'ltzStack',gamemode:'pot',tier:4,ht:false,region:'NA'},
  {name:'lllExodus',gamemode:'pot',tier:5,ht:false,region:'NA'},{name:'Thrawn303',gamemode:'pot',tier:5,ht:false,region:'NA'},{name:'Infinity3void',gamemode:'pot',tier:5,ht:false,region:'NA'},
  // NETHOP
  {name:'janekv',gamemode:'nethop',tier:1,ht:true,region:'EU'},
  {name:'entit1es',gamemode:'nethop',tier:2,ht:false,region:'NA'},{name:'Merrypenguin',gamemode:'nethop',tier:2,ht:false,region:'NA'},{name:'YungExple',gamemode:'nethop',tier:2,ht:false,region:'NA'},
  {name:'Swight',gamemode:'nethop',tier:2,ht:false,region:'NA'},{name:'BetterOffSad',gamemode:'nethop',tier:2,ht:false,region:'NA'},{name:'chqsed',gamemode:'nethop',tier:2,ht:false,region:'NA'},
  {name:'YungSimsek',gamemode:'nethop',tier:3,ht:false,region:'NA'},{name:'MoOa_',gamemode:'nethop',tier:3,ht:false,region:'NA'},{name:'DontrunLOL',gamemode:'nethop',tier:3,ht:false,region:'NA'},
  {name:'LilZayy_',gamemode:'nethop',tier:3,ht:false,region:'NA'},{name:'1Critzz',gamemode:'nethop',tier:3,ht:false,region:'NA'},
  {name:'RubyLamb',gamemode:'nethop',tier:4,ht:false,region:'NA'},{name:'Infernoplex_',gamemode:'nethop',tier:4,ht:false,region:'NA'},{name:'keepmytears',gamemode:'nethop',tier:4,ht:false,region:'NA'},
  {name:'vanesssaaaaaaa',gamemode:'nethop',tier:5,ht:false,region:'NA'},{name:'Chasemm3813',gamemode:'nethop',tier:5,ht:false,region:'NA'},{name:'_nixtro_',gamemode:'nethop',tier:5,ht:false,region:'NA'},
  // SMP
  {name:'Marlowww',gamemode:'smp',tier:1,ht:true,region:'NA'},
  {name:'Freekee_Fang',gamemode:'smp',tier:2,ht:false,region:'NA'},{name:'CorruptNoob',gamemode:'smp',tier:2,ht:false,region:'NA'},{name:'Legendarryy',gamemode:'smp',tier:2,ht:false,region:'NA'},
  {name:'ibrahhhh',gamemode:'smp',tier:2,ht:false,region:'NA'},{name:'Rivise',gamemode:'smp',tier:2,ht:false,region:'NA'},{name:'Error455',gamemode:'smp',tier:2,ht:false,region:'NA'},
  {name:'ItzRelyks',gamemode:'smp',tier:3,ht:false,region:'NA'},{name:'kylanss',gamemode:'smp',tier:3,ht:false,region:'NA'},{name:'Takqo',gamemode:'smp',tier:3,ht:false,region:'NA'},
  {name:'LINGEEE',gamemode:'smp',tier:4,ht:false,region:'NA'},{name:'kretrex',gamemode:'smp',tier:4,ht:false,region:'NA'},{name:'WobbleWave',gamemode:'smp',tier:4,ht:false,region:'NA'},
  {name:'MishMishon',gamemode:'smp',tier:5,ht:false,region:'NA'},{name:'HT1Ghoulz',gamemode:'smp',tier:5,ht:false,region:'NA'},{name:'zMort_',gamemode:'smp',tier:5,ht:false,region:'NA'},
  // SWORD
  {name:'Marlowww',gamemode:'sword',tier:1,ht:true,region:'NA'},{name:'Kylaz',gamemode:'sword',tier:1,ht:false,region:'NA'},{name:'coldified',gamemode:'sword',tier:1,ht:false,region:'EU'},{name:'Leaferd',gamemode:'sword',tier:1,ht:false,region:'NA'},
  {name:'Verniq',gamemode:'sword',tier:2,ht:false,region:'NA'},{name:'dropkey',gamemode:'sword',tier:2,ht:false,region:'NA'},{name:'ngrSancion',gamemode:'sword',tier:2,ht:false,region:'NA'},
  {name:'Moroccan_Mjinina',gamemode:'sword',tier:2,ht:false,region:'NA'},{name:'Adamsony',gamemode:'sword',tier:2,ht:false,region:'NA'},{name:'TheyBeHating',gamemode:'sword',tier:2,ht:false,region:'NA'},
  {name:'Eoxie',gamemode:'sword',tier:3,ht:false,region:'NA'},{name:'PXOJA',gamemode:'sword',tier:3,ht:false,region:'NA'},{name:'Error455',gamemode:'sword',tier:3,ht:false,region:'NA'},
  {name:'Outname',gamemode:'sword',tier:3,ht:false,region:'NA'},{name:'X4shh',gamemode:'sword',tier:3,ht:false,region:'NA'},
  {name:'ViperKits',gamemode:'sword',tier:4,ht:false,region:'NA'},{name:'Fogz_14',gamemode:'sword',tier:4,ht:false,region:'NA'},{name:'dirtythug32',gamemode:'sword',tier:4,ht:false,region:'NA'},
  {name:'moonrisej_uwu',gamemode:'sword',tier:5,ht:false,region:'NA'},{name:'207Cub',gamemode:'sword',tier:5,ht:false,region:'NA'},{name:'minato15',gamemode:'sword',tier:5,ht:false,region:'NA'},
  // AXE
  {name:'Swight',gamemode:'axe',tier:1,ht:true,region:'NA'},{name:'coldified',gamemode:'axe',tier:1,ht:false,region:'EU'},
  {name:'Respect5595',gamemode:'axe',tier:2,ht:false,region:'NA'},{name:'BlvckWlf',gamemode:'axe',tier:2,ht:false,region:'NA'},{name:'vvfr',gamemode:'axe',tier:2,ht:false,region:'NA'},
  {name:'Koharu89',gamemode:'axe',tier:2,ht:false,region:'NA'},{name:'Arsakha',gamemode:'axe',tier:2,ht:false,region:'NA'},{name:'Insanel',gamemode:'axe',tier:2,ht:false,region:'NA'},
  {name:'Paulinhq',gamemode:'axe',tier:3,ht:false,region:'NA'},{name:'yMiau',gamemode:'axe',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'axe',tier:3,ht:false,region:'NA'},
  {name:'mrdarkbob2',gamemode:'axe',tier:3,ht:false,region:'NA'},{name:'Nekitbrother',gamemode:'axe',tier:3,ht:false,region:'NA'},
  {name:'AxiomSL5',gamemode:'axe',tier:4,ht:false,region:'NA'},{name:'ohAizen',gamemode:'axe',tier:4,ht:false,region:'NA'},{name:'NotEriRexFan77',gamemode:'axe',tier:4,ht:false,region:'NA'},
  {name:'ynkylo',gamemode:'axe',tier:5,ht:false,region:'NA'},{name:'Fatal1113',gamemode:'axe',tier:5,ht:false,region:'NA'},{name:'Nitwit_Owen',gamemode:'axe',tier:5,ht:false,region:'NA'},
  // MACE
  {name:'Rappture',gamemode:'mace',tier:1,ht:true,region:'NA'},{name:'AlienOverdose',gamemode:'mace',tier:1,ht:false,region:'NA'},{name:'Marlowww',gamemode:'mace',tier:1,ht:false,region:'NA'},
  {name:'AdamAdiss',gamemode:'mace',tier:2,ht:false,region:'NA'},{name:'coldified',gamemode:'mace',tier:2,ht:false,region:'EU'},{name:'elmerlizz',gamemode:'mace',tier:2,ht:false,region:'NA'},
  {name:'BlvckWlf',gamemode:'mace',tier:2,ht:false,region:'NA'},{name:'Turbinial',gamemode:'mace',tier:2,ht:false,region:'NA'},{name:'PUFFIERZ',gamemode:'mace',tier:2,ht:false,region:'NA'},
  {name:'Yaso___',gamemode:'mace',tier:3,ht:false,region:'NA'},{name:'gliiifer',gamemode:'mace',tier:3,ht:false,region:'NA'},{name:'loafuss',gamemode:'mace',tier:3,ht:false,region:'NA'},
  {name:'vickslover',gamemode:'mace',tier:3,ht:false,region:'NA'},{name:'Stormlash',gamemode:'mace',tier:3,ht:false,region:'NA'},
  {name:'RioTheOGBird',gamemode:'mace',tier:4,ht:false,region:'NA'},{name:'LuckiestBow92',gamemode:'mace',tier:4,ht:false,region:'NA'},{name:'Swordified02',gamemode:'mace',tier:4,ht:false,region:'NA'},
  {name:'_Tynan',gamemode:'mace',tier:5,ht:false,region:'NA'},{name:'Crepescular',gamemode:'mace',tier:5,ht:false,region:'NA'},{name:'disabledlove',gamemode:'mace',tier:5,ht:false,region:'NA'},
  // CART
  {name:'Speedrunner99',gamemode:'cart',tier:1,ht:true,region:'NA'},{name:'CartKing',gamemode:'cart',tier:1,ht:false,region:'EU'},
  {name:'RailMaster',gamemode:'cart',tier:2,ht:false,region:'NA'},{name:'MinecartPro',gamemode:'cart',tier:2,ht:false,region:'NA'},{name:'Derailment',gamemode:'cart',tier:2,ht:false,region:'NA'},
  {name:'TrackStar',gamemode:'cart',tier:2,ht:false,region:'EU'},{name:'BoosterMax',gamemode:'cart',tier:2,ht:false,region:'NA'},
  {name:'SlopeMaster',gamemode:'cart',tier:3,ht:false,region:'NA'},{name:'CurveSlayer',gamemode:'cart',tier:3,ht:false,region:'EU'},{name:'SwitchFlick',gamemode:'cart',tier:3,ht:false,region:'NA'},
  {name:'RailHopper',gamemode:'cart',tier:4,ht:false,region:'NA'},{name:'CartCrasher',gamemode:'cart',tier:4,ht:false,region:'NA'},{name:'DriftCart',gamemode:'cart',tier:4,ht:false,region:'NA'},
  {name:'NewRacer',gamemode:'cart',tier:5,ht:false,region:'NA'},{name:'CartNerd',gamemode:'cart',tier:5,ht:false,region:'NA'},{name:'SlowCart',gamemode:'cart',tier:5,ht:false,region:'NA'},
  // SPEAR MACE
  {name:'LanceKing',gamemode:'spearmace',tier:1,ht:true,region:'NA'},{name:'SpearGod',gamemode:'spearmace',tier:1,ht:false,region:'EU'},
  {name:'ThrustMaster',gamemode:'spearmace',tier:2,ht:false,region:'NA'},{name:'MaceAndSpear',gamemode:'spearmace',tier:2,ht:false,region:'NA'},{name:'PiercePro',gamemode:'spearmace',tier:2,ht:false,region:'EU'},
  {name:'ImpactKing',gamemode:'spearmace',tier:2,ht:false,region:'NA'},{name:'ShieldBreaker',gamemode:'spearmace',tier:2,ht:false,region:'NA'},
  {name:'SpearFlick',gamemode:'spearmace',tier:3,ht:false,region:'NA'},{name:'MaceSpin',gamemode:'spearmace',tier:3,ht:false,region:'EU'},{name:'TipDodge',gamemode:'spearmace',tier:3,ht:false,region:'NA'},
  {name:'SpearApprentice',gamemode:'spearmace',tier:4,ht:false,region:'NA'},{name:'MaceLearner',gamemode:'spearmace',tier:4,ht:false,region:'NA'},{name:'PokeFighter',gamemode:'spearmace',tier:4,ht:false,region:'EU'},
  {name:'SpearNovice',gamemode:'spearmace',tier:5,ht:false,region:'NA'},{name:'MaceBaby',gamemode:'spearmace',tier:5,ht:false,region:'NA'},{name:'PokePoker',gamemode:'spearmace',tier:5,ht:false,region:'NA'},
];}

// ── BOOT ──
initDB();
      `,
        }}
      />
    </>
  );
}
