const htmlContent = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NetTiers – Minecraft PvP Rankings</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">

<!-- ═══════════════════════════════════════════════════════════════
     FIREBASE SETUP
     Replace the values below with your own Firebase project config.
     You can find these in: Firebase Console → Project Settings → Your apps.

     HOW TO SET UP FIREBASE:
     1. Go to https://console.firebase.google.com
     2. Create a project
     3. Add a Web App — copy the firebaseConfig object
     4. Enable Firestore Database (start in test mode first)
     5. Enable Authentication → Email/Password
     6. Create ONE admin user in Authentication with the email/password
        you want to use. The password is NEVER stored here in the HTML.
     7. In Firestore Security Rules, lock down writes:
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /players/{doc} {
                allow read: if true;
                allow write: if request.auth != null;
              }
            }
          }
     This means only a logged-in Firebase user can write — no one
     inspecting page source will ever see your password.
═══════════════════════════════════════════════════════════════ -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import {
    getAnalytics, isSupported as isAnalyticsSupported
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import {
    getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB-t00x0r_Us5NYey_CnBd8LWrtyPtoxJc",
    authDomain: "minecraftjava121.firebaseapp.com",
    projectId: "minecraftjava121",
    storageBucket: "minecraftjava121.firebasestorage.app",
    messagingSenderId: "1075321607998",
    appId: "1:1075321607998:web:4750a5eb1b810dc9f7be6f",
    measurementId: "G-BRJGMV1EE2"
  };

  const app  = initializeApp(firebaseConfig);
  const db   = getFirestore(app);
  const auth = getAuth(app);
  let analytics = null;

  if (await isAnalyticsSupported()) {
    analytics = getAnalytics(app);
  }

  // Expose to window so the non-module script below can call them
  window._fb = { db, auth, analytics, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, signInWithEmailAndPassword, signOut, onAuthStateChanged };
</script>

<style>
:root {
  --bg:#080b10;--bg2:#0e1219;--bg3:#141924;--bg4:#1c2333;--bg5:#232c40;
  --border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);
  --text:#dde4f0;--muted:#5c6b8a;--accent:#f0b429;--gold:#f5cc5a;
  --silver:#b8c4d8;--bronze:#c87d3a;
  --ht:rgba(240,180,41,.12);--ht-b:rgba(240,180,41,.35);
  --red:#e05252;--green:#3ec97a;--blue:#4a8fe8;--purple:#9b6de0;--discord:#5865f2;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'Barlow',sans-serif;min-height:100vh;overflow-x:hidden;}
body::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 60% 45% at 15% 0%,rgba(240,180,41,.07) 0%,transparent 70%),
    radial-gradient(ellipse 50% 40% at 85% 100%,rgba(74,143,232,.06) 0%,transparent 70%),
    repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.018) 39px,rgba(255,255,255,.018) 40px),
    repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.018) 39px,rgba(255,255,255,.018) 40px);
}
/* NAV */
nav{position:sticky;top:0;z-index:200;background:rgba(8,11,16,.9);backdrop-filter:blur(18px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:62px;}
.logo{font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:900;letter-spacing:3px;color:var(--gold);text-transform:uppercase;text-shadow:0 0 30px rgba(240,180,41,.5);}
.logo span{color:var(--text);}
.nav-links{display:flex;gap:4px;align-items:center;}
.nav-btn{background:none;border:none;color:var(--muted);cursor:pointer;padding:7px 14px;border-radius:8px;font-size:.83rem;font-family:'Barlow',sans-serif;font-weight:500;display:flex;align-items:center;gap:6px;transition:all .2s;text-decoration:none;letter-spacing:.02em;}
.nav-btn:hover,.nav-btn.active{background:var(--bg4);color:var(--text);}
.discord-btn{color:#fff;background:rgba(88,101,242,.18);border:1px solid rgba(88,101,242,.35);}
.discord-btn:hover{background:rgba(88,101,242,.35);border-color:var(--discord);color:#fff;}
.nav-search{background:var(--bg3);border:1px solid var(--border2);border-radius:9px;padding:8px 16px;color:var(--text);font-family:'Barlow',sans-serif;font-size:.85rem;width:210px;outline:none;transition:all .25s;}
.nav-search:focus{border-color:var(--accent);background:var(--bg4);box-shadow:0 0 0 3px rgba(240,180,41,.1);}
.nav-search::placeholder{color:var(--muted);}
/* TABS */
.tabs-wrap{background:rgba(14,18,25,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--border);padding:0 32px;position:sticky;top:62px;z-index:100;}
.tabs{display:flex;gap:0;overflow-x:auto;scrollbar-width:none;}
.tabs::-webkit-scrollbar{display:none;}
.tab{display:flex;flex-direction:column;align-items:center;padding:11px 16px;cursor:pointer;color:var(--muted);border-bottom:2px solid transparent;font-size:.74rem;font-weight:600;white-space:nowrap;transition:all .2s;gap:3px;background:none;border-top:none;border-left:none;border-right:none;font-family:'Barlow',sans-serif;letter-spacing:.05em;text-transform:uppercase;}
.tab .icon{font-size:1rem;transition:transform .2s;}
.tab:hover{color:var(--text);}
.tab:hover .icon{transform:scale(1.15);}
.tab.active{color:var(--accent);border-bottom-color:var(--accent);}
/* CONTENT */
.content{padding:28px 32px;max-width:1360px;margin:0 auto;position:relative;z-index:1;}
.top-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:12px;flex-wrap:wrap;}
.info-badge{display:flex;align-items:center;gap:7px;background:var(--bg3);border:1px solid var(--border2);border-radius:9px;padding:7px 16px;font-size:.8rem;color:var(--muted);cursor:pointer;transition:all .2s;}
.info-badge:hover{border-color:var(--accent);color:var(--text);}
.server-ip{background:var(--bg3);border:1px solid var(--border2);border-radius:9px;padding:7px 16px;display:flex;align-items:center;gap:10px;font-size:.8rem;}
.admin-key-btn{background:var(--bg3);border:1px solid var(--border2);border-radius:9px;padding:7px 16px;color:var(--muted);cursor:pointer;font-size:.8rem;font-family:'Barlow',sans-serif;transition:all .2s;}
.admin-key-btn:hover{border-color:var(--gold);color:var(--gold);}
/* OVERALL */
.overall-list{display:flex;flex-direction:column;gap:7px;}
.overall-row{background:var(--bg2);border:1px solid var(--border);border-radius:13px;display:flex;align-items:center;gap:16px;padding:13px 18px;transition:all .22s;cursor:pointer;position:relative;overflow:hidden;}
.overall-row:hover{border-color:rgba(240,180,41,.35);transform:translateX(4px);background:var(--bg3);}
.overall-row.top3{border-color:rgba(240,180,41,.2);}
@keyframes goldPulse{0%,100%{box-shadow:none;}50%{box-shadow:0 0 18px rgba(240,180,41,.08);}}
.overall-row.top3{animation:goldPulse 4s ease-in-out infinite;}
.rank-num{font-family:'Barlow Condensed',sans-serif;font-size:1.55rem;font-weight:900;min-width:38px;color:var(--muted);letter-spacing:-.02em;}
.rank-num.r1{color:var(--gold);text-shadow:0 0 12px rgba(245,204,90,.4);}
.rank-num.r2{color:var(--silver);}
.rank-num.r3{color:var(--bronze);}
.player-avatar{width:48px;height:48px;border-radius:9px;background:var(--bg4);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;border:1px solid var(--border2);}
.player-avatar img{width:100%;height:100%;object-fit:cover;border-radius:8px;display:block;}
.player-info{flex:1;min-width:0;}
.player-name{font-size:1rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.player-title{font-size:.76rem;color:var(--muted);margin-top:2px;}
.region-tag{padding:4px 10px;border-radius:6px;font-size:.72rem;font-weight:700;flex-shrink:0;letter-spacing:.06em;background:rgba(224,82,82,.2);color:var(--red);border:1px solid rgba(224,82,82,.3);}
.region-tag.EU{background:rgba(74,143,232,.2);color:var(--blue);border-color:rgba(74,143,232,.3);}
.region-tag.AS{background:rgba(155,109,224,.2);color:var(--purple);border-color:rgba(155,109,224,.3);}
.tier-badges{display:flex;gap:4px;flex-wrap:wrap;}
.tbadge{width:36px;height:36px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid transparent;transition:transform .15s;}
.tbadge:hover{transform:scale(1.1);}
.tbadge .badge-icon{font-size:.78rem;line-height:1;}
.tbadge .badge-label{font-size:.44rem;font-weight:800;line-height:1;}
.tbadge.ht{background:var(--ht);border-color:var(--ht-b);color:var(--gold);}
.tbadge.lt{background:rgba(255,255,255,.04);border-color:var(--border);color:var(--muted);}
/* TIER GRID */
.tier-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;}
.tier-col{border-radius:12px;overflow:hidden;background:var(--bg2);border:1px solid var(--border);}
.tier-header{padding:13px 15px;text-align:center;font-family:'Barlow Condensed',sans-serif;font-size:1.05rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:7px;border-bottom:1px solid var(--border);}
.tier-header.t1{background:linear-gradient(135deg,rgba(160,123,26,.8),rgba(201,168,76,.6));color:#ffe8a0;}
.tier-header.t2{background:linear-gradient(135deg,rgba(58,66,85,.8),rgba(90,106,136,.6));color:#c8d8f0;}
.tier-header.t3{background:linear-gradient(135deg,rgba(90,48,16,.8),rgba(138,80,32,.6));color:#f0c896;}
.tier-header.t4{background:rgba(255,255,255,.04);color:var(--muted);}
.tier-header.t5{background:rgba(255,255,255,.025);color:var(--muted);}
.tier-players{padding:8px;}
.tier-player{border-radius:8px;display:flex;align-items:center;gap:9px;padding:8px 10px;cursor:pointer;transition:all .18s;margin-bottom:4px;border:1px solid transparent;}
.tier-player:last-child{margin-bottom:0;}
.tier-player:hover{background:var(--bg4);border-color:var(--border2);}
.tier-player.ht-player{background:var(--ht);border-color:var(--ht-b);}
.tier-player.ht-player:hover{background:rgba(240,180,41,.2);}
.tp-avatar{width:26px;height:26px;border-radius:5px;background:var(--bg5);flex-shrink:0;overflow:hidden;}
.tp-avatar img{width:100%;height:100%;object-fit:cover;border-radius:4px;display:block;}
.tp-name{font-size:.8rem;font-weight:500;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.tp-badge{font-size:.62rem;padding:2px 6px;border-radius:4px;font-weight:800;letter-spacing:.04em;flex-shrink:0;}
.tp-badge.ht{background:rgba(245,200,66,.2);color:var(--gold);border:1px solid rgba(245,200,66,.3);}
.tp-badge.lt{background:rgba(255,255,255,.06);color:var(--muted);border:1px solid var(--border);}
.region-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.region-dot.NA{background:var(--red);}
.region-dot.EU{background:var(--blue);}
.region-dot.AS{background:var(--purple);}
/* VIEW HEADER */
.view-header{display:flex;align-items:center;gap:12px;margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid var(--border);}
.view-icon{font-size:2rem;}
.view-title{font-family:'Barlow Condensed',sans-serif;font-size:2rem;font-weight:900;letter-spacing:.04em;text-transform:uppercase;}
.view-sub{font-size:.8rem;color:var(--muted);margin-top:2px;letter-spacing:.03em;}
.view-count{margin-left:auto;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:6px 14px;font-size:.78rem;color:var(--muted);}
/* PROFILE MODAL */
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(6px);}
.modal-overlay.show{display:flex;}
.modal{background:var(--bg2);border:1px solid var(--border2);border-radius:18px;padding:30px;min-width:390px;max-width:470px;width:92vw;position:relative;box-shadow:0 32px 80px rgba(0,0,0,.7);animation:popIn .28s cubic-bezier(.34,1.56,.64,1);}
@keyframes popIn{from{transform:scale(.82) translateY(10px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.modal-close{position:absolute;top:14px;right:14px;background:var(--bg4);border:1px solid var(--border2);color:var(--muted);cursor:pointer;width:32px;height:32px;border-radius:8px;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.modal-close:hover{color:var(--text);border-color:var(--accent);}
.modal-avatar{width:90px;height:90px;border-radius:50%;background:var(--bg4);margin:0 auto 12px;overflow:hidden;border:3px solid var(--border2);box-shadow:0 0 0 6px rgba(240,180,41,.08);}
.modal-avatar img{width:100%;height:100%;object-fit:cover;}
.modal-name{text-align:center;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;}
.modal-rank-badge{display:inline-flex;align-items:center;gap:6px;background:var(--bg4);border:1px solid var(--border2);border-radius:20px;padding:5px 14px;font-size:.8rem;color:var(--muted);}
.modal-section-label{font-size:.7rem;font-weight:800;letter-spacing:.12em;color:var(--muted);text-transform:uppercase;margin:16px 0 8px;display:flex;align-items:center;gap:7px;}
.modal-section-label::after{content:'';flex:1;height:1px;background:var(--border);}
.modal-position{background:var(--bg3);border:1px solid var(--border);border-radius:11px;padding:12px 16px;display:flex;align-items:center;gap:14px;}
.modal-pos-num{font-family:'Barlow Condensed',sans-serif;font-size:2.2rem;font-weight:900;color:var(--gold);text-shadow:0 0 20px rgba(240,180,41,.4);letter-spacing:-.02em;}
.modal-tiers-grid{display:flex;flex-wrap:wrap;gap:8px;background:var(--bg3);border:1px solid var(--border);border-radius:11px;padding:12px;}
.modal-tbadge{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:42px;}
.modal-tbadge .ico{font-size:1.1rem;}
.modal-tbadge .lbl{font-size:.58rem;font-weight:800;padding:2px 5px;border-radius:4px;letter-spacing:.04em;}
.modal-tbadge .lbl.ht{background:rgba(245,200,66,.2);color:var(--gold);}
.modal-tbadge .lbl.lt{background:var(--bg4);color:var(--muted);}
.modal-tbadge .lbl.none{color:var(--border);}
.namemc-link{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:14px;color:var(--muted);font-size:.82rem;text-decoration:none;transition:all .2s;padding:9px;border-radius:10px;border:1px solid var(--border);background:var(--bg3);}
.namemc-link:hover{color:var(--accent);border-color:var(--accent);background:rgba(240,180,41,.06);}
/* DISCORD PICKER MODAL */
.discord-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:1500;align-items:center;justify-content:center;backdrop-filter:blur(8px);}
.discord-modal.show{display:flex;}
.discord-box{background:var(--bg2);border:1px solid rgba(88,101,242,.4);border-radius:20px;padding:28px 28px 22px;width:530px;max-width:95vw;box-shadow:0 40px 100px rgba(0,0,0,.7),0 0 60px rgba(88,101,242,.08);animation:popIn .28s cubic-bezier(.34,1.56,.64,1);position:relative;max-height:90vh;overflow-y:auto;}
.discord-box-title{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#fff;margin-bottom:4px;display:flex;align-items:center;gap:10px;}
.discord-box-sub{font-size:.82rem;color:var(--muted);margin-bottom:22px;letter-spacing:.02em;}
.discord-server-list{display:flex;flex-direction:column;gap:7px;}
.discord-server-item{display:flex;align-items:center;gap:14px;background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:12px 15px;text-decoration:none;color:var(--text);transition:all .2s;}
.discord-server-item:hover{border-color:rgba(88,101,242,.55);background:rgba(88,101,242,.1);transform:translateX(3px);}
.discord-server-item:hover .ds-arrow{opacity:1;transform:translateX(3px);}
.ds-icon{width:38px;height:38px;border-radius:9px;background:rgba(88,101,242,.18);border:1px solid rgba(88,101,242,.3);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.ds-info{flex:1;}
.ds-name{font-weight:700;font-size:.9rem;letter-spacing:.02em;}
.ds-desc{font-size:.73rem;color:var(--muted);margin-top:2px;}
.ds-arrow{color:var(--discord);font-size:.85rem;opacity:.45;transition:all .2s;}
.ds-badge{font-size:.62rem;font-weight:800;letter-spacing:.06em;padding:3px 8px;border-radius:5px;text-transform:uppercase;background:rgba(88,101,242,.18);color:#a5acff;border:1px solid rgba(88,101,242,.28);white-space:nowrap;flex-shrink:0;}
.discord-close-btn{position:absolute;top:14px;right:14px;background:var(--bg4);border:1px solid var(--border2);color:var(--muted);cursor:pointer;width:32px;height:32px;border-radius:8px;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.discord-close-btn:hover{color:var(--text);border-color:rgba(88,101,242,.6);}
/* ADMIN */
.admin-panel{display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:2000;align-items:center;justify-content:center;backdrop-filter:blur(8px);}
.admin-panel.show{display:flex;}
.admin-box{background:var(--bg2);border:1px solid var(--border2);border-radius:18px;width:760px;max-width:95vw;max-height:88vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 40px 100px rgba(0,0,0,.8);animation:popIn .25s cubic-bezier(.34,1.56,.64,1);}
.admin-header{padding:18px 26px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.02);}
.admin-title{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:800;color:var(--gold);letter-spacing:.05em;text-transform:uppercase;}
.admin-body{padding:22px 26px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:15px;}
.admin-row{display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;}
.admin-field{display:flex;flex-direction:column;gap:5px;flex:1;min-width:110px;}
.admin-field label{font-size:.72rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.06em;}
.admin-input,.admin-select{background:var(--bg3);border:1px solid var(--border2);border-radius:9px;padding:9px 13px;color:var(--text);font-family:'Barlow',sans-serif;font-size:.85rem;outline:none;transition:all .2s;width:100%;}
.admin-input:focus,.admin-select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(240,180,41,.1);}
.admin-select option{background:var(--bg3);}
.btn{padding:9px 20px;border-radius:9px;font-family:'Barlow',sans-serif;font-size:.85rem;font-weight:700;cursor:pointer;border:none;transition:all .2s;white-space:nowrap;letter-spacing:.03em;text-transform:uppercase;}
.btn-green{background:var(--green);color:#000;}
.btn-green:hover{filter:brightness(1.15);transform:translateY(-1px);}
.btn-red{background:var(--red);color:#fff;}
.btn-red:hover{filter:brightness(1.15);transform:translateY(-1px);}
.btn-gold{background:var(--gold);color:#000;}
.btn-gold:hover{filter:brightness(1.1);transform:translateY(-1px);}
.btn-gray{background:var(--bg4);color:var(--muted);border:1px solid var(--border2);}
.btn-gray:hover{color:var(--text);border-color:var(--muted);}
.admin-divider{border-top:1px solid var(--border);margin:3px 0;}
.admin-players-list{max-height:260px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;}
.admin-player-row{display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg3);border-radius:9px;border:1px solid var(--border);}
.admin-player-row .apn{flex:1;font-size:.85rem;font-weight:500;}
.admin-player-row .apm{font-size:.75rem;color:var(--muted);}
.rm-btn{background:rgba(224,82,82,.12);border:1px solid rgba(224,82,82,.3);color:var(--red);border-radius:6px;padding:3px 10px;font-size:.72rem;cursor:pointer;font-family:'Barlow',sans-serif;font-weight:700;transition:all .2s;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em;}
.rm-btn:hover{background:var(--red);color:#fff;}
/* MISC */
.admin-toast{position:fixed;bottom:24px;right:24px;background:var(--bg3);border:1px solid var(--green);color:var(--green);padding:10px 20px;border-radius:11px;font-size:.84rem;font-weight:700;z-index:9999;opacity:0;transform:translateY(10px);transition:all .3s;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.4);}
.admin-toast.show{opacity:1;transform:translateY(0);}
.admin-toast.err{border-color:var(--red);color:var(--red);}
.key-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:3000;align-items:center;justify-content:center;backdrop-filter:blur(5px);}
.key-modal.show{display:flex;}
.key-box{background:var(--bg2);border:1px solid var(--border2);border-radius:16px;padding:30px;min-width:330px;animation:popIn .22s cubic-bezier(.34,1.56,.64,1);box-shadow:0 24px 60px rgba(0,0,0,.6);}
.key-title{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;color:var(--gold);}
.key-sub{font-size:.78rem;color:var(--muted);margin-bottom:18px;}
.db-status{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);}
.db-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);}
.db-dot.err{background:var(--red);box-shadow:0 0 6px var(--red);}
.db-dot.warn{background:var(--accent);box-shadow:0 0 6px var(--accent);}
.loading{display:flex;align-items:center;justify-content:center;padding:80px;gap:14px;color:var(--muted);font-size:.9rem;letter-spacing:.05em;text-transform:uppercase;}
.spinner{width:22px;height:22px;border:2px solid var(--border2);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
.search-label{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:800;letter-spacing:.05em;margin-bottom:18px;text-transform:uppercase;color:var(--muted);}
.search-label span{color:var(--text);}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:var(--bg2);}
::-webkit-scrollbar-thumb{background:var(--bg5);border-radius:4px;}
::-webkit-scrollbar-thumb:hover{background:var(--muted);}
@media(max-width:1100px){.tier-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:760px){.tier-grid{grid-template-columns:repeat(2,1fr);}.tier-badges{display:none;}nav{padding:0 16px;}.content{padding:20px 16px;}.tabs-wrap{padding:0 16px;}}
@media(max-width:500px){.tier-grid{grid-template-columns:1fr;}.modal{min-width:96vw;padding:20px;}}
</style>
</head>
<body>

<nav>
  <div class="logo">NET<span>TIERS</span></div>
  <div class="nav-links">
    <button class="nav-btn">🏠 Home</button>
    <button class="nav-btn active">🏆 Rankings</button>
    <button class="nav-btn discord-btn" onclick="openDiscordModal()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.01.043.024.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
      Discord
    </button>
    <button class="nav-btn">📄 API Docs</button>
  </div>
  <input class="nav-search" placeholder="🔍  Search player…" id="globalSearch" oninput="handleGlobalSearch(this.value)">
</nav>

<div class="tabs-wrap">
  <div class="tabs">
    <button class="tab active" onclick="switchTab('overall',this)"><span class="icon">🏆</span>Overall</button>
    <button class="tab" onclick="switchTab('craystal',this)"><span class="icon">🔮</span>Craystal</button>
    <button class="tab" onclick="switchTab('sword',this)"><span class="icon">⚔️</span>Sword</button>
    <button class="tab" onclick="switchTab('axe',this)"><span class="icon">🪓</span>Axe</button>
    <button class="tab" onclick="switchTab('spearmaceop',this)"><span class="icon">🏹</span>Spear Mace OP</button>
    <button class="tab" onclick="switchTab('uhc',this)"><span class="icon">❤️</span>UHC</button>
    <button class="tab" onclick="switchTab('nethpot',this)"><span class="icon">⚗️</span>Netherite Pot</button>
    <button class="tab" onclick="switchTab('nethsmp',this)"><span class="icon">🔥</span>Netherite SMP</button>
    <button class="tab" onclick="switchTab('nethpotsmp',this)"><span class="icon">🖤</span>Netherite Pot SMP</button>
    <button class="tab" onclick="switchTab('potsmp',this)"><span class="icon">🧪</span>Pot SMP</button>
    <button class="tab" onclick="switchTab('dia',this)"><span class="icon">💎</span>Diamond SMP</button>
    <button class="tab" onclick="switchTab('mace',this)"><span class="icon">🔨</span>Mace</button>
  </div>
</div>

<div class="content">
  <div class="top-bar">
    <div style="display:flex;gap:8px;align-items:center;">
      <div class="info-badge">ℹ️ &nbsp;Information</div>
      <button class="admin-key-btn" onclick="openKeyModal()">🔑 &nbsp;Admin</button>
    </div>
    <div class="server-ip">
      <span>🖥️</span>
      <span style="color:var(--muted);font-size:.78rem;letter-spacing:.03em;">SERVER IP</span>
      <span style="font-weight:700;color:var(--accent);font-family:'Barlow Condensed',sans-serif;font-size:.95rem;letter-spacing:.05em;">⏳ COMING SOON</span>
    </div>
  </div>
  <div id="mainContent"><div class="loading"><div class="spinner"></div>&nbsp;Connecting to Firebase…</div></div>
</div>

<!-- PROFILE MODAL -->
<div class="modal-overlay" id="profileModal" onclick="closeProfileIfOutside(event)">
  <div class="modal">
    <button class="modal-close" onclick="closeProfile()">✕</button>
    <div class="modal-avatar"><img id="pAvatarImg" src="" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 90 90%22><rect width=%2290%22 height=%2290%22 fill=%22%231c2333%22/><text x=%2245%22 y=%2258%22 text-anchor=%22middle%22 font-size=%2236%22>🎮</text></svg>'"></div>
    <div class="modal-name" id="pName"></div>
    <div style="text-align:center;margin:8px 0"><div class="modal-rank-badge"><span>💎</span><span id="pTitle"></span></div></div>
    <div style="text-align:center;color:var(--muted);font-size:.82rem;margin-bottom:4px" id="pRegion"></div>
    <div class="modal-section-label">Position</div>
    <div class="modal-position">
      <div class="modal-pos-num" id="pPos"></div>
      <div><div style="font-size:.88rem;font-weight:700;letter-spacing:.03em;">🏆 OVERALL RANK</div><div style="font-size:.78rem;color:var(--muted);margin-top:2px" id="pPts"></div></div>
    </div>
    <div class="modal-section-label">Gamemodes</div>
    <div class="modal-tiers-grid" id="pTiers"></div>
    <a id="pNameMC" href="#" target="_blank" rel="noopener" class="namemc-link">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59L7.76 14.83l1.41 1.41L19 5.41V9h2V3h-7z"/></svg>
      View on NameMC
    </a>
  </div>
</div>

<!-- DISCORD PICKER MODAL -->
<div class="discord-modal" id="discordModal" onclick="closeDiscordIfOutside(event)">
  <div class="discord-box">
    <button class="discord-close-btn" onclick="closeDiscordModal()">✕</button>
    <div class="discord-box-title">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#5865f2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.01.043.024.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
      Join a Discord
    </div>
    <div class="discord-box-sub">Pick a gamemode server to join</div>
    <div class="discord-server-list">
      <a class="discord-server-item" href="https://discord.gg/TT37gvxPST" target="_blank" rel="noopener">
        <div class="ds-icon">🔮</div><div class="ds-info"><div class="ds-name">Craystal</div><div class="ds-desc">Craystal PvP community</div></div>
        <div class="ds-badge">Craystal</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/sw2T5xYpgn" target="_blank" rel="noopener">
        <div class="ds-icon">⚔️</div><div class="ds-info"><div class="ds-name">Sword</div><div class="ds-desc">Sword PvP community & rankings</div></div>
        <div class="ds-badge">Sword</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/Wf4bKgpnmH" target="_blank" rel="noopener">
        <div class="ds-icon">🪓</div><div class="ds-info"><div class="ds-name">Axe</div><div class="ds-desc">Axe PvP community & rankings</div></div>
        <div class="ds-badge">Axe</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/tUPxyd26xe" target="_blank" rel="noopener">
        <div class="ds-icon">🏹</div><div class="ds-info"><div class="ds-name">Spear Mace OP</div><div class="ds-desc">Spear Mace OP community</div></div>
        <div class="ds-badge">Spear Mace OP</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/mTDmNYctC5" target="_blank" rel="noopener">
        <div class="ds-icon">❤️</div><div class="ds-info"><div class="ds-name">UHC</div><div class="ds-desc">Ultra Hardcore community</div></div>
        <div class="ds-badge">UHC</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/hWmQV4QVjd" target="_blank" rel="noopener">
        <div class="ds-icon">🔥</div><div class="ds-info"><div class="ds-name">Netherite SMP</div><div class="ds-desc">Neth SMP rankings & community</div></div>
        <div class="ds-badge">Neth SMP</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/vqTfWDmrey" target="_blank" rel="noopener">
        <div class="ds-icon">🧪</div><div class="ds-info"><div class="ds-name">Pot SMP</div><div class="ds-desc">Pot SMP community</div></div>
        <div class="ds-badge">Pot SMP</div><div class="ds-arrow">→</div>
      </a>
      <a class="discord-server-item" href="https://discord.gg/T8eGXjHKnw" target="_blank" rel="noopener">
        <div class="ds-icon">💎</div><div class="ds-info"><div class="ds-name">Diamond SMP</div><div class="ds-desc">Diamond SMP rankings & community</div></div>
        <div class="ds-badge">Diamond SMP</div><div class="ds-arrow">→</div>
      </a>
    </div>
  </div>
</div>

<!-- ADMIN LOGIN MODAL — Uses Firebase Auth. Password never stored in this file. -->
<div class="key-modal" id="keyModal" onclick="closeKeyIfOutside(event)">
  <div class="key-box">
    <div class="key-title">🔑 Admin Access</div>
    <div class="key-sub">Sign in with your admin Firebase account.</div>
    <div class="admin-field" style="margin-bottom:10px;">
      <label>Email</label>
      <input class="admin-input" type="email" id="keyEmail" placeholder="admin@example.com" onkeydown="if(event.key==='Enter')checkKey()">
    </div>
    <div class="admin-field" style="margin-bottom:14px;">
      <label>Password</label>
      <input class="admin-input" type="password" id="keyInput" placeholder="Enter password…" onkeydown="if(event.key==='Enter')checkKey()">
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-gold" onclick="checkKey()">Sign In</button>
      <button class="btn btn-gray" onclick="closeKeyModal()">Cancel</button>
    </div>
    <div id="keyErr" style="color:var(--red);font-size:.8rem;margin-top:10px;display:none;">❌ Invalid credentials.</div>
    <div id="keyLoading" style="color:var(--muted);font-size:.8rem;margin-top:10px;display:none;">⏳ Signing in…</div>
  </div>
</div>

<!-- ADMIN PANEL -->
<div class="admin-panel" id="adminPanel" onclick="closeAdminIfOutside(event)">
  <div class="admin-box">
    <div class="admin-header">
      <div class="admin-title">⚙️ Admin Panel</div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="db-status"><div class="db-dot" id="dbDot"></div><span id="dbStatus">Connecting…</span></div>
        <button class="btn btn-gray" onclick="adminSignOut()" style="color:var(--red);border-color:rgba(224,82,82,.3);">🚪 Sign Out</button>
        <button class="btn btn-gray" onclick="closeAdmin()">✕ Close</button>
      </div>
    </div>
    <div class="admin-body">
      <div style="font-weight:700;font-size:.88rem;color:var(--green);letter-spacing:.04em;text-transform:uppercase;">➕ Add Player</div>
      <div class="admin-row">
        <div class="admin-field"><label>Username</label><input class="admin-input" id="addName" placeholder="PlayerName"></div>
        <div class="admin-field"><label>Gamemode</label>
          <select class="admin-select" id="addMode">
            <option value="craystal">Craystal</option>
            <option value="sword">Sword</option>
            <option value="axe">Axe</option>
            <option value="spearmaceop">Spear Mace OP</option>
            <option value="uhc">UHC</option>
            <option value="nethpot">Netherite Pot</option>
            <option value="nethsmp">Netherite SMP</option>
            <option value="nethpotsmp">Netherite Pot SMP</option>
            <option value="potsmp">Pot SMP</option>
            <option value="dia">Diamond SMP</option>
            <option value="mace">Mace</option>
          </select>
        </div>
        <div class="admin-field"><label>Tier</label>
          <select class="admin-select" id="addTier">
            <option value="1">Tier 1</option><option value="2">Tier 2</option><option value="3">Tier 3</option>
            <option value="4">Tier 4</option><option value="5">Tier 5</option>
          </select>
        </div>
        <div class="admin-field"><label>HT / LT</label>
          <select class="admin-select" id="addHT"><option value="HT">HT – High Tier</option><option value="LT">LT – Low Tier</option></select>
        </div>
        <div class="admin-field"><label>Region</label>
          <select class="admin-select" id="addRegion"><option value="NA">NA</option><option value="EU">EU</option><option value="AS">AS</option></select>
        </div>
      </div>
      <div><button class="btn btn-green" onclick="adminAddPlayer()">➕ Add Player</button></div>
      <div class="admin-divider"></div>
      <div style="font-weight:700;font-size:.88rem;color:var(--red);letter-spacing:.04em;text-transform:uppercase;">🗑️ Remove Player by Name</div>
      <div class="admin-row">
        <div class="admin-field"><label>Username</label><input class="admin-input" id="removeName" placeholder="PlayerName"></div>
        <div class="admin-field"><label>From Gamemode</label>
          <select class="admin-select" id="removeMode">
            <option value="ALL">⚡ All Gamemodes</option>
            <option value="craystal">Craystal</option>
            <option value="sword">Sword</option>
            <option value="axe">Axe</option>
            <option value="spearmaceop">Spear Mace OP</option>
            <option value="uhc">UHC</option>
            <option value="nethpot">Netherite Pot</option>
            <option value="nethsmp">Netherite SMP</option>
            <option value="nethpotsmp">Netherite Pot SMP</option>
            <option value="potsmp">Pot SMP</option>
            <option value="dia">Diamond SMP</option>
            <option value="mace">Mace</option>
          </select>
        </div>
      </div>
      <div><button class="btn btn-red" onclick="adminRemoveByName()">🗑️ Remove</button></div>
      <div class="admin-divider"></div>
      <div style="font-weight:700;font-size:.88rem;letter-spacing:.04em;text-transform:uppercase;">📋 Browse &amp; Remove Players</div>
      <select class="admin-select" id="previewMode" onchange="renderAdminPreview()" style="max-width:230px;">
        <option value="craystal">Craystal</option>
        <option value="sword">Sword</option>
        <option value="axe">Axe</option>
        <option value="spearmaceop">Spear Mace OP</option>
        <option value="uhc">UHC</option>
        <option value="nethpot">Netherite Pot</option>
        <option value="nethsmp">Netherite SMP</option>
        <option value="nethpotsmp">Netherite Pot SMP</option>
        <option value="potsmp">Pot SMP</option>
        <option value="dia">Diamond SMP</option>
        <option value="mace">Mace</option>
      </select>
      <div class="admin-players-list" id="adminPreviewList"></div>
    </div>
  </div>
</div>

<div class="admin-toast" id="toast"></div>

<script>
// ════════════════════════════════════════════════════════
//  SECURITY NOTE:
//  There is NO admin password anywhere in this file.
//  Authentication is handled entirely by Firebase Auth.
//  The admin signs in with their Firebase email + password.
//  Firestore Security Rules enforce that only authenticated
//  users can write — so even if someone finds this file,
//  they cannot add or remove players without Firebase creds.
// ════════════════════════════════════════════════════════

const TIER_PTS = {LT5:1,HT5:2,LT4:3,HT4:4,LT3:5,HT3:10,LT2:20,HT2:40,LT1:50,HT1:60};

const GM_ICONS = {
  craystal:'🔮', sword:'⚔️', axe:'🪓', spearmaceop:'🏹',
  uhc:'❤️', nethpot:'⚗️', nethsmp:'🔥', nethpotsmp:'🖤',
  potsmp:'🧪', dia:'💎', mace:'🔨'
};
const GM_NAMES = {
  craystal:'Craystal', sword:'Sword', axe:'Axe', spearmaceop:'Spear Mace OP',
  uhc:'UHC', nethpot:'Netherite Pot', nethsmp:'Netherite SMP', nethpotsmp:'Netherite Pot SMP',
  potsmp:'Pot SMP', dia:'Diamond SMP', mace:'Mace'
};
const GM_ORDER = ['craystal','sword','axe','spearmaceop','uhc','nethpot','nethsmp','nethpotsmp','potsmp','dia','mace'];

let DATA={}, allPlayers=[], currentTab='overall';
let dbOk=false, currentUser=null, unsubscribe=null;

// ── SKIN HELPERS ──
const skinUrl   = n=>`https://mc-heads.net/avatar/${encodeURIComponent(n)}/64`;
const skinSm    = n=>`https://mc-heads.net/avatar/${encodeURIComponent(n)}/32`;
const nameMCUrl = n=>`https://namemc.com/profile/${encodeURIComponent(n)}`;
function imgErr(el){el.style.display='none';}

function getTitle(pts){
  if(pts>=400)return'Combat Grandmaster';if(pts>=250)return'Combat Master';
  if(pts>=100)return'Combat Ace';if(pts>=50)return'Combat Specialist';
  if(pts>=20)return'Combat Cadet';if(pts>=10)return'Combat Novice';
  return'Rookie';
}
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
function rebuildDATA(){
  DATA={};
  GM_ORDER.forEach(gm=>{DATA[gm]={t1:[],t2:[],t3:[],t4:[],t5:[]};});
  allPlayers.forEach(p=>{
    const gm=p.gamemode,tk='t'+p.tier;
    if(DATA[gm]&&DATA[gm][tk]!==undefined)
      DATA[gm][tk].push({name:p.name,ht:!!p.ht,region:p.region||'NA',db_id:p.id});
  });
}

// ── FIREBASE HELPERS ──
// We wait for the module script to expose window._fb
function waitForFB(){
  return new Promise(resolve=>{
    if(window._fb)return resolve(window._fb);
    const iv=setInterval(()=>{if(window._fb){clearInterval(iv);resolve(window._fb);}},50);
  });
}

// ── DB INIT — Real-time Firestore listener ──
async function initDB(){
  document.getElementById('mainContent').innerHTML='<div class="loading"><div class="spinner"></div>&nbsp;Connecting to Firebase…</div>';
  const {db,collection,onSnapshot,auth,onAuthStateChanged} = await waitForFB();

  // Track auth state
  onAuthStateChanged(auth, user=>{
    currentUser=user;
  });

  // Real-time listener on 'players' collection
  const col = collection(db,'players');
  unsubscribe = onSnapshot(col,
    snapshot=>{
      allPlayers = snapshot.docs.map(d=>({...d.data(), id:d.id}));
      // If no Firebase data yet, seed with defaults
      if(!allPlayers.length){
        allPlayers = getSeed();
        seedToFirebase(db, collection, allPlayers);
      }
      dbOk=true;
      setDBStatus(true,'Firebase Connected');
      rebuildDATA();
      renderContent();
    },
    err=>{
      console.error('Firestore error:',err);
      setDBStatus(false,'Firebase Error');
      // Fallback to localStorage
      const cached=lsLoad();
      allPlayers=cached&&cached.length?cached:getSeed().map((p,i)=>({...p,id:'seed_'+i}));
      rebuildDATA();renderContent();
    }
  );
}

async function seedToFirebase(db, collection, players){
  // Only seed if collection is truly empty — don't await to block rendering
  const {addDoc} = window._fb;
  for(const p of players){
    const {id, ...data} = p;
    try{ await addDoc(collection(db,'players'), data); }catch(e){}
  }
}

function setDBStatus(ok,label){
  const dot=document.getElementById('dbDot');
  const lbl=document.getElementById('dbStatus');
  if(dot){dot.className='db-dot'+(ok?'':' err');}
  if(lbl){lbl.textContent=label||'Ready';}
}

// ── RENDER ──
function switchTab(tab,el){
  currentTab=tab;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('globalSearch').value='';
  renderContent();
}
function renderContent(){
  document.getElementById('mainContent').innerHTML=
    currentTab==='overall'?buildOverall():buildTierView(currentTab);
}
function getPlayerRegion(name){
  for(const td of Object.values(DATA))
    for(const pl of Object.values(td)){const p=pl.find(x=>x.name===name);if(p)return p.region||'NA';}
  return'NA';
}

function buildOverall(){
  const names=new Set();
  for(const td of Object.values(DATA))for(const pl of Object.values(td))pl.forEach(p=>names.add(p.name));
  let ranked=[...names].map(n=>{const{total,tiers}=computePlayer(n);return{name:n,total,tiers};});
  ranked.sort((a,b)=>b.total-a.total);
  let html=`<div class="view-header"><span class="view-icon">🏆</span><div><div class="view-title">Overall Rankings</div><div class="view-sub">Ranked by aggregate tier performance</div></div><div class="view-count">${ranked.length} Players</div></div><div class="overall-list">`;
  ranked.forEach((p,i)=>{
    const rc=i===0?'r1':i===1?'r2':i===2?'r3':'';
    const top3=i<3?' top3':'';
    const region=getPlayerRegion(p.name);
    const badges=GM_ORDER.map(gm=>{
      if(!p.tiers[gm])return`<div class="tbadge lt" title="${GM_NAMES[gm]}"><span class="badge-icon">${GM_ICONS[gm]}</span><span class="badge-label">–</span></div>`;
      const t=p.tiers[gm],cls=t.ht?'ht':'lt',lbl=(t.ht?'HT':'LT')+t.tier;
      return`<div class="tbadge ${cls}" title="${GM_NAMES[gm]} ${lbl}"><span class="badge-icon">${GM_ICONS[gm]}</span><span class="badge-label">${lbl}</span></div>`;
    }).join('');
    html+=`<div class="overall-row${top3}" onclick="openProfile(${JSON.stringify(p.name)})">
      <div class="rank-num ${rc}">${i+1}</div>
      <div class="player-avatar"><img src="${skinUrl(p.name)}" alt="${p.name}" onerror="imgErr(this)"></div>
      <div class="player-info"><div class="player-name">${p.name}</div><div class="player-title">💎 ${getTitle(p.total)} · ${p.total} pts</div></div>
      <div class="region-tag ${region}">${region}</div>
      <div class="tier-badges">${badges}</div>
    </div>`;
  });
  return html+'</div>';
}

function buildTierView(gm){
  const td=DATA[gm];if(!td)return'<p style="color:var(--muted)">No data.</p>';
  const total=Object.values(td).reduce((a,b)=>a+b.length,0);
  const cols=[{k:'t1',l:'Tier 1',c:'t1',i:'🏆'},{k:'t2',l:'Tier 2',c:'t2',i:'🥈'},{k:'t3',l:'Tier 3',c:'t3',i:'🥉'},{k:'t4',l:'Tier 4',c:'t4',i:'⚙️'},{k:'t5',l:'Tier 5',c:'t5',i:'🔰'}];
  let html=`<div class="view-header"><span class="view-icon">${GM_ICONS[gm]}</span><div><div class="view-title">${GM_NAMES[gm]}</div><div class="view-sub">Player tier rankings</div></div><div class="view-count">${total} Players</div></div><div class="tier-grid">`;
  cols.forEach(({k,l,c,i})=>{
    const pls=td[k]||[];
    html+=`<div class="tier-col"><div class="tier-header ${c}">${i} ${l}</div><div class="tier-players">`;
    if(!pls.length)html+=`<div style="color:var(--muted);font-size:.78rem;padding:10px;text-align:center;">— Empty —</div>`;
    pls.forEach(p=>{
      const hc=p.ht?'ht-player':'',bc=p.ht?'ht':'lt',bl=p.ht?'HT':'LT',n=k.replace('t','');
      html+=`<div class="tier-player ${hc}" onclick="openProfile(${JSON.stringify(p.name)})">
        <div class="region-dot ${p.region}"></div>
        <div class="tp-avatar"><img src="${skinSm(p.name)}" alt="${p.name}" onerror="imgErr(this)"></div>
        <div class="tp-name">${p.name}</div>
        <div class="tp-badge ${bc}">${bl}${n}</div>
      </div>`;
    });
    html+=`</div></div>`;
  });
  return html+'</div>';
}

// ── PROFILE ──
function openProfile(name){
  const{total,tiers}=computePlayer(name);
  const region=getPlayerRegion(name);
  const names=new Set();
  for(const td of Object.values(DATA))for(const pl of Object.values(td))pl.forEach(p=>names.add(p.name));
  const ranked=[...names].map(n=>{const{total:t}=computePlayer(n);return{name:n,total:t};}).sort((a,b)=>b.total-a.total);
  const rank=ranked.findIndex(p=>p.name===name)+1;
  document.getElementById('pAvatarImg').src=skinUrl(name);
  document.getElementById('pName').textContent=name;
  document.getElementById('pTitle').textContent=getTitle(total);
  document.getElementById('pRegion').textContent='📍 '+region;
  document.getElementById('pPos').textContent='#'+rank;
  document.getElementById('pPts').textContent=total+' total points';
  document.getElementById('pNameMC').href=nameMCUrl(name);
  let th='';
  GM_ORDER.forEach(gm=>{
    const t=tiers[gm];
    if(t){const lbl=(t.ht?'HT':'LT')+t.tier,cls=t.ht?'ht':'lt';
      th+=`<div class="modal-tbadge"><div class="ico">${GM_ICONS[gm]}</div><div class="lbl ${cls}">${lbl}</div><div style="font-size:.52rem;color:var(--muted);">${GM_NAMES[gm]}</div></div>`;
    }else{
      th+=`<div class="modal-tbadge"><div class="ico" style="opacity:.28">${GM_ICONS[gm]}</div><div class="lbl none">–</div><div style="font-size:.52rem;color:var(--border);">${GM_NAMES[gm]}</div></div>`;
    }
  });
  document.getElementById('pTiers').innerHTML=th;
  document.getElementById('profileModal').classList.add('show');
}
function closeProfile(){document.getElementById('profileModal').classList.remove('show');}
function closeProfileIfOutside(e){if(e.target.id==='profileModal')closeProfile();}

// ── DISCORD MODAL ──
function openDiscordModal(){document.getElementById('discordModal').classList.add('show');}
function closeDiscordModal(){document.getElementById('discordModal').classList.remove('show');}
function closeDiscordIfOutside(e){if(e.target.id==='discordModal')closeDiscordModal();}

// ── ADMIN AUTH — Firebase Email/Password only. Zero password in this file. ──
function openKeyModal(){
  document.getElementById('keyInput').value='';
  document.getElementById('keyEmail').value='';
  document.getElementById('keyErr').style.display='none';
  document.getElementById('keyLoading').style.display='none';
  document.getElementById('keyModal').classList.add('show');
  setTimeout(()=>document.getElementById('keyEmail').focus(),80);
}
function closeKeyModal(){document.getElementById('keyModal').classList.remove('show');}
function closeKeyIfOutside(e){if(e.target.id==='keyModal')closeKeyModal();}

async function checkKey(){
  const email=document.getElementById('keyEmail').value.trim();
  const pass=document.getElementById('keyInput').value;
  if(!email||!pass){document.getElementById('keyErr').style.display='block';return;}
  document.getElementById('keyErr').style.display='none';
  document.getElementById('keyLoading').style.display='block';
  const {auth, signInWithEmailAndPassword} = await waitForFB();
  try{
    await signInWithEmailAndPassword(auth, email, pass);
    closeKeyModal();
    openAdmin();
  }catch(e){
    document.getElementById('keyLoading').style.display='none';
    document.getElementById('keyErr').style.display='block';
  }
}

function openAdmin(){document.getElementById('adminPanel').classList.add('show');renderAdminPreview();}
function closeAdmin(){document.getElementById('adminPanel').classList.remove('show');}
function closeAdminIfOutside(e){if(e.target.id==='adminPanel')closeAdmin();}

async function adminSignOut(){
  const {auth, signOut} = await waitForFB();
  await signOut(auth);
  closeAdmin();
  showToast('Signed out.');
}

async function adminAddPlayer(){
  if(!currentUser){showToast('Not signed in!',true);return;}
  const name=document.getElementById('addName').value.trim();
  const gm=document.getElementById('addMode').value;
  const tier=parseInt(document.getElementById('addTier').value);
  const ht=document.getElementById('addHT').value==='HT';
  const region=document.getElementById('addRegion').value;
  if(!name){showToast('Enter a player name!',true);return;}
  if(DATA[gm]&&DATA[gm]['t'+tier]&&DATA[gm]['t'+tier].find(p=>p.name.toLowerCase()===name.toLowerCase())){
    showToast('Already in this tier!',true);return;
  }
  const {db, collection, addDoc} = await waitForFB();
  try{
    await addDoc(collection(db,'players'),{name,gamemode:gm,tier,ht,region});
    showToast('✅ Added '+name+' to '+GM_NAMES[gm]+' T'+tier);
    document.getElementById('addName').value='';
    renderAdminPreview();
  }catch(e){showToast('Firebase write failed: '+e.message,true);}
}

async function adminRemoveByName(){
  if(!currentUser){showToast('Not signed in!',true);return;}
  const name=document.getElementById('removeName').value.trim();
  const mode=document.getElementById('removeMode').value;
  if(!name){showToast('Enter a player name!',true);return;}
  const gms=mode==='ALL'?GM_ORDER:[mode];
  const {db, doc, deleteDoc} = await waitForFB();
  let removed=0;
  for(const gm of gms){
    const toRemove=allPlayers.filter(p=>p.name.toLowerCase()===name.toLowerCase()&&p.gamemode===gm);
    for(const p of toRemove){
      try{await deleteDoc(doc(db,'players',p.id));removed++;}catch(e){}
    }
  }
  if(removed){showToast(`🗑️ Removed ${name}`);document.getElementById('removeName').value='';renderAdminPreview();}
  else showToast(`"${name}" not found!`,true);
}

async function removeRowInline(dbId,name){
  if(!currentUser){showToast('Not signed in!',true);return;}
  const {db, doc, deleteDoc} = await waitForFB();
  try{
    await deleteDoc(doc(db,'players',dbId));
    showToast(`🗑️ Removed ${name}`);
    renderAdminPreview();
  }catch(e){showToast('Delete failed: '+e.message,true);}
}

function renderAdminPreview(){
  const gm=document.getElementById('previewMode').value;
  const list=document.getElementById('adminPreviewList');
  let html='';
  for(const[tk,players]of Object.entries(DATA[gm]||{})){
    const n=tk.replace('t','');
    players.forEach(p=>{
      const lbl=(p.ht?'HT':'LT')+n;
      html+=`<div class="admin-player-row">
        <img src="${skinSm(p.name)}" width="24" height="24" style="border-radius:4px" onerror="this.style.display='none'">
        <span class="apn">${p.name}</span><span class="apm">${lbl} · ${p.region}</span>
        <button class="rm-btn" onclick="removeRowInline(${JSON.stringify(p.db_id)},${JSON.stringify(p.name)})">🗑️ Remove</button>
      </div>`;
    });
  }
  list.innerHTML=html||'<div style="color:var(--muted);font-size:.82rem;padding:10px 0;text-align:center;">No players in this gamemode.</div>';
}

// ── SEARCH ──
function handleGlobalSearch(val){
  if(!val.trim()){renderContent();return;}
  const q=val.toLowerCase();
  const names=new Set();
  for(const td of Object.values(DATA))for(const pl of Object.values(td))pl.forEach(p=>names.add(p.name));
  const matches=[...names].filter(n=>n.toLowerCase().includes(q));
  if(!matches.length){document.getElementById('mainContent').innerHTML=`<p style="color:var(--muted);padding:30px 0;">No players found matching "<strong style="color:var(--text)">${val}</strong>"</p>`;return;}
  let ranked=matches.map(n=>{const{total,tiers}=computePlayer(n);return{name:n,total,tiers};}).sort((a,b)=>b.total-a.total);
  let html=`<div class="search-label">Results for "<span>${val}</span>" — ${ranked.length} found</div><div class="overall-list">`;
  ranked.forEach((p,i)=>{
    const region=getPlayerRegion(p.name);
    const badges=GM_ORDER.map(gm=>{
      if(!p.tiers[gm])return`<div class="tbadge lt"><span class="badge-icon">${GM_ICONS[gm]}</span><span class="badge-label">–</span></div>`;
      const t=p.tiers[gm],cls=t.ht?'ht':'lt',lbl=(t.ht?'HT':'LT')+t.tier;
      return`<div class="tbadge ${cls}"><span class="badge-icon">${GM_ICONS[gm]}</span><span class="badge-label">${lbl}</span></div>`;
    }).join('');
    html+=`<div class="overall-row" onclick="openProfile(${JSON.stringify(p.name)})">
      <div class="rank-num">${i+1}</div>
      <div class="player-avatar"><img src="${skinUrl(p.name)}" alt="${p.name}" onerror="imgErr(this)"></div>
      <div class="player-info"><div class="player-name">${p.name}</div><div class="player-title">💎 ${getTitle(p.total)} · ${p.total} pts</div></div>
      <div class="region-tag ${region}">${region}</div>
      <div class="tier-badges">${badges}</div>
    </div>`;
  });
  document.getElementById('mainContent').innerHTML=html+'</div>';
}

// ── TOAST ──
function showToast(msg,err=false){
  const t=document.getElementById('toast');t.textContent=msg;
  t.className='admin-toast show'+(err?' err':'');
  setTimeout(()=>t.className='admin-toast',2800);
}

// ── LOCAL STORAGE FALLBACK ──
function lsLoad(){try{const r=localStorage.getItem('nettiers_v3');if(r){const d=JSON.parse(r);if(d&&d.length)return d;}}catch(e){}return null;}
function lsSave(){try{localStorage.setItem('nettiers_v3',JSON.stringify(allPlayers));}catch(e){}}

// ── SEED DATA ──
function getSeed(){return[
  // CRAYSTAL
  {name:'Swight',gamemode:'craystal',tier:1,ht:true,region:'NA'},{name:'coldified',gamemode:'craystal',tier:1,ht:false,region:'EU'},{name:'CORZZ',gamemode:'craystal',tier:1,ht:false,region:'NA'},
  {name:'Paulinhq',gamemode:'craystal',tier:2,ht:false,region:'NA'},{name:'Koharu89',gamemode:'craystal',tier:2,ht:false,region:'NA'},{name:'Arsakha',gamemode:'craystal',tier:2,ht:false,region:'NA'},
  {name:'_PuggyWuggy',gamemode:'craystal',tier:3,ht:false,region:'NA'},{name:'xzTito',gamemode:'craystal',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'craystal',tier:3,ht:false,region:'NA'},
  {name:'Aimingstars',gamemode:'craystal',tier:4,ht:false,region:'NA'},{name:'Masqnn',gamemode:'craystal',tier:4,ht:false,region:'NA'},
  {name:'jocko051',gamemode:'craystal',tier:5,ht:false,region:'NA'},{name:'TOPPER28',gamemode:'craystal',tier:5,ht:false,region:'NA'},
  // SWORD
  {name:'Marlowww',gamemode:'sword',tier:1,ht:true,region:'NA'},{name:'Kylaz',gamemode:'sword',tier:1,ht:false,region:'NA'},{name:'coldified',gamemode:'sword',tier:1,ht:false,region:'EU'},{name:'Leaferd',gamemode:'sword',tier:1,ht:false,region:'NA'},
  {name:'Verniq',gamemode:'sword',tier:2,ht:false,region:'NA'},{name:'dropkey',gamemode:'sword',tier:2,ht:false,region:'NA'},{name:'Adamsony',gamemode:'sword',tier:2,ht:false,region:'NA'},
  {name:'Eoxie',gamemode:'sword',tier:3,ht:false,region:'NA'},{name:'Error455',gamemode:'sword',tier:3,ht:false,region:'NA'},{name:'Outname',gamemode:'sword',tier:3,ht:false,region:'NA'},
  {name:'ViperKits',gamemode:'sword',tier:4,ht:false,region:'NA'},{name:'Fogz_14',gamemode:'sword',tier:4,ht:false,region:'NA'},
  {name:'moonrisej_uwu',gamemode:'sword',tier:5,ht:false,region:'NA'},{name:'207Cub',gamemode:'sword',tier:5,ht:false,region:'NA'},
  // AXE
  {name:'Swight',gamemode:'axe',tier:1,ht:true,region:'NA'},{name:'coldified',gamemode:'axe',tier:1,ht:false,region:'EU'},
  {name:'BlvckWlf',gamemode:'axe',tier:2,ht:false,region:'NA'},{name:'vvfr',gamemode:'axe',tier:2,ht:false,region:'NA'},{name:'Koharu89',gamemode:'axe',tier:2,ht:false,region:'NA'},
  {name:'Paulinhq',gamemode:'axe',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'axe',tier:3,ht:false,region:'NA'},
  {name:'AxiomSL5',gamemode:'axe',tier:4,ht:false,region:'NA'},{name:'ohAizen',gamemode:'axe',tier:4,ht:false,region:'NA'},
  {name:'ynkylo',gamemode:'axe',tier:5,ht:false,region:'NA'},{name:'Fatal1113',gamemode:'axe',tier:5,ht:false,region:'NA'},
  // SPEAR MACE OP
  {name:'Rappture',gamemode:'spearmaceop',tier:1,ht:true,region:'NA'},{name:'AlienOverdose',gamemode:'spearmaceop',tier:1,ht:false,region:'NA'},{name:'Marlowww',gamemode:'spearmaceop',tier:1,ht:false,region:'NA'},
  {name:'AdamAdiss',gamemode:'spearmaceop',tier:2,ht:false,region:'NA'},{name:'BlvckWlf',gamemode:'spearmaceop',tier:2,ht:false,region:'NA'},{name:'Turbinial',gamemode:'spearmaceop',tier:2,ht:false,region:'NA'},
  {name:'Yaso___',gamemode:'spearmaceop',tier:3,ht:false,region:'NA'},{name:'gliiifer',gamemode:'spearmaceop',tier:3,ht:false,region:'NA'},{name:'Stormlash',gamemode:'spearmaceop',tier:3,ht:false,region:'NA'},
  {name:'RioTheOGBird',gamemode:'spearmaceop',tier:4,ht:false,region:'NA'},{name:'LuckiestBow92',gamemode:'spearmaceop',tier:4,ht:false,region:'NA'},
  {name:'_Tynan',gamemode:'spearmaceop',tier:5,ht:false,region:'NA'},{name:'Crepescular',gamemode:'spearmaceop',tier:5,ht:false,region:'NA'},
  // UHC
  {name:'Swight',gamemode:'uhc',tier:1,ht:true,region:'NA'},{name:'coldified',gamemode:'uhc',tier:1,ht:false,region:'EU'},{name:'CORZZ',gamemode:'uhc',tier:1,ht:false,region:'NA'},
  {name:'Paulinhq',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'Koharu89',gamemode:'uhc',tier:2,ht:false,region:'NA'},{name:'Draqonate',gamemode:'uhc',tier:2,ht:false,region:'NA'},
  {name:'_PuggyWuggy',gamemode:'uhc',tier:3,ht:false,region:'NA'},{name:'xzTito',gamemode:'uhc',tier:3,ht:false,region:'NA'},{name:'Runn1n9',gamemode:'uhc',tier:3,ht:false,region:'NA'},
  {name:'Aimingstars',gamemode:'uhc',tier:4,ht:false,region:'NA'},{name:'wduo',gamemode:'uhc',tier:4,ht:false,region:'NA'},
  {name:'jocko051',gamemode:'uhc',tier:5,ht:false,region:'NA'},{name:'xpyw',gamemode:'uhc',tier:5,ht:false,region:'NA'},
  // NETHERITE POT
  {name:'Kylaz',gamemode:'nethpot',tier:1,ht:true,region:'NA'},{name:'sashia2m',gamemode:'nethpot',tier:1,ht:false,region:'NA'},
  {name:'ph4ntic',gamemode:'nethpot',tier:2,ht:false,region:'NA'},{name:'ciphar',gamemode:'nethpot',tier:2,ht:false,region:'NA'},{name:'Leaferd',gamemode:'nethpot',tier:2,ht:false,region:'NA'},
  {name:'ZeNain',gamemode:'nethpot',tier:3,ht:false,region:'NA'},{name:'garlicbreed',gamemode:'nethpot',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'nethpot',tier:3,ht:false,region:'NA'},
  {name:'mushroomstew101',gamemode:'nethpot',tier:4,ht:false,region:'NA'},{name:'ltzStack',gamemode:'nethpot',tier:4,ht:false,region:'NA'},
  {name:'lllExodus',gamemode:'nethpot',tier:5,ht:false,region:'NA'},{name:'Infinity3void',gamemode:'nethpot',tier:5,ht:false,region:'NA'},
  // NETHERITE SMP
  {name:'janekv',gamemode:'nethsmp',tier:1,ht:true,region:'EU'},
  {name:'entit1es',gamemode:'nethsmp',tier:2,ht:false,region:'NA'},{name:'Merrypenguin',gamemode:'nethsmp',tier:2,ht:false,region:'NA'},{name:'chqsed',gamemode:'nethsmp',tier:2,ht:false,region:'NA'},
  {name:'YungSimsek',gamemode:'nethsmp',tier:3,ht:false,region:'NA'},{name:'MoOa_',gamemode:'nethsmp',tier:3,ht:false,region:'NA'},{name:'LilZayy_',gamemode:'nethsmp',tier:3,ht:false,region:'NA'},
  {name:'RubyLamb',gamemode:'nethsmp',tier:4,ht:false,region:'NA'},{name:'Infernoplex_',gamemode:'nethsmp',tier:4,ht:false,region:'NA'},
  {name:'vanesssaaaaaaa',gamemode:'nethsmp',tier:5,ht:false,region:'NA'},{name:'_nixtro_',gamemode:'nethsmp',tier:5,ht:false,region:'NA'},
  // NETHERITE POT SMP
  {name:'Marlowww',gamemode:'nethpotsmp',tier:1,ht:true,region:'NA'},
  {name:'CorruptNoob',gamemode:'nethpotsmp',tier:2,ht:false,region:'NA'},{name:'Legendarryy',gamemode:'nethpotsmp',tier:2,ht:false,region:'NA'},{name:'Rivise',gamemode:'nethpotsmp',tier:2,ht:false,region:'NA'},
  {name:'ItzRelyks',gamemode:'nethpotsmp',tier:3,ht:false,region:'NA'},{name:'kylanss',gamemode:'nethpotsmp',tier:3,ht:false,region:'NA'},{name:'Takqo',gamemode:'nethpotsmp',tier:3,ht:false,region:'NA'},
  {name:'LINGEEE',gamemode:'nethpotsmp',tier:4,ht:false,region:'NA'},{name:'kretrex',gamemode:'nethpotsmp',tier:4,ht:false,region:'NA'},
  {name:'MishMishon',gamemode:'nethpotsmp',tier:5,ht:false,region:'NA'},{name:'zMort_',gamemode:'nethpotsmp',tier:5,ht:false,region:'NA'},
  // POT SMP
  {name:'Kylaz',gamemode:'potsmp',tier:1,ht:true,region:'NA'},{name:'sashia2m',gamemode:'potsmp',tier:1,ht:false,region:'NA'},
  {name:'ph4ntic',gamemode:'potsmp',tier:2,ht:false,region:'NA'},{name:'ciphar',gamemode:'potsmp',tier:2,ht:false,region:'NA'},{name:'Leaferd',gamemode:'potsmp',tier:2,ht:false,region:'NA'},
  {name:'ZeNain',gamemode:'potsmp',tier:3,ht:false,region:'NA'},{name:'garlicbreed',gamemode:'potsmp',tier:3,ht:false,region:'NA'},{name:'1Wenzy',gamemode:'potsmp',tier:3,ht:false,region:'NA'},
  {name:'mushroomstew101',gamemode:'potsmp',tier:4,ht:false,region:'NA'},{name:'ltzStack',gamemode:'potsmp',tier:4,ht:false,region:'NA'},
  {name:'lllExodus',gamemode:'potsmp',tier:5,ht:false,region:'NA'},{name:'Infinity3void',gamemode:'potsmp',tier:5,ht:false,region:'NA'},
  // DIAMOND SMP
  {name:'K1RBE',gamemode:'dia',tier:1,ht:true,region:'NA'},
  {name:'Camcal',gamemode:'dia',tier:2,ht:false,region:'NA'},{name:'KingD3fault',gamemode:'dia',tier:2,ht:false,region:'NA'},{name:'qPower',gamemode:'dia',tier:2,ht:false,region:'NA'},
  {name:'raaicuo',gamemode:'dia',tier:3,ht:false,region:'NA'},{name:'Sylank',gamemode:'dia',tier:3,ht:false,region:'NA'},{name:'k4etril',gamemode:'dia',tier:3,ht:true,region:'EU'},
  {name:'LaggyMonkey',gamemode:'dia',tier:4,ht:false,region:'NA'},{name:'a4yt',gamemode:'dia',tier:4,ht:false,region:'NA'},
  {name:'soundovo',gamemode:'dia',tier:5,ht:false,region:'NA'},{name:'KotsaMC',gamemode:'dia',tier:5,ht:false,region:'NA'},
  // MACE
  {name:'Rappture',gamemode:'mace',tier:1,ht:true,region:'NA'},{name:'AlienOverdose',gamemode:'mace',tier:1,ht:false,region:'NA'},
  {name:'Turbinial',gamemode:'mace',tier:2,ht:false,region:'NA'},{name:'AdamAdiss',gamemode:'mace',tier:2,ht:false,region:'NA'},{name:'Yaso___',gamemode:'mace',tier:2,ht:false,region:'NA'},
  {name:'gliiifer',gamemode:'mace',tier:3,ht:false,region:'NA'},{name:'Stormlash',gamemode:'mace',tier:3,ht:false,region:'NA'},{name:'RioTheOGBird',gamemode:'mace',tier:3,ht:false,region:'NA'},
  {name:'LuckiestBow92',gamemode:'mace',tier:4,ht:false,region:'NA'},{name:'_Tynan',gamemode:'mace',tier:4,ht:false,region:'NA'},
  {name:'Crepescular',gamemode:'mace',tier:5,ht:false,region:'NA'},{name:'NewMacePlayer',gamemode:'mace',tier:5,ht:false,region:'NA'},
];}

// ── BOOT ──
initDB();
</script>
</body>
</html>`;

export default htmlContent;
