# 🎮 PvPTiers Discord Bot — Setup Guide (macOS)

## 📋 Tier System
| Tier | Points |
|------|--------|
| HT1  | 60 pts |
| LT1  | 50 pts |
| HT2  | 45 pts |
| LT2  | 40 pts |
| HT3  | 30 pts |
| LT3  | 20 pts |
| HT4  | 10 pts |
| LT4  | 5 pts  |
| HT5  | 2 pts  |
| LT5  | 1 pt   |

**Peak Tier** = Highest tier a player ever reached (stored automatically, same points as that tier)
**Retired** = HT1/LT1/HT2/LT2 players who are no longer active (keep their points)

---

## 🛠️ Step 1 — Install Node.js (one time only)
1. Go to https://nodejs.org
2. Download the **LTS** version
3. Install it (just click through the installer)
4. Open **Terminal** (search "Terminal" in Spotlight with Cmd+Space)
5. Type: `node --version` — should show a version number ✅

---

## 🤖 Step 2 — Create Your Discord Bot
1. Go to https://discord.com/developers/applications
2. Click **New Application** → give it a name (e.g. "PvPTiers")
3. Click **Bot** in the left sidebar
4. Click **Reset Token** → copy the token (save it!)
5. Scroll down and enable:
   - ✅ **Server Members Intent**
   - ✅ **Message Content Intent**
6. Click **OAuth2** → **URL Generator**
7. Check **bot** and **applications.commands**
8. Under Bot Permissions check: **Manage Roles**, **Send Messages**, **Use Slash Commands**
9. Copy the generated URL → open it in browser → add bot to your server

---

## 📁 Step 3 — Set Up the Bot Files
1. Download/unzip the bot folder to your Desktop (or anywhere easy to find)
2. Open **Terminal**
3. Navigate to the bot folder:
   ```
   cd ~/Desktop/pvptiers-bot
   ```
4. Install dependencies:
   ```
   npm install
   ```

---

## ⚙️ Step 4 — Configure the Bot
1. Find the file called `.env.example`
2. Rename it to `.env` (just remove `.example`)
3. Open `.env` in TextEdit or any text editor
4. Fill in your values:
   ```
   DISCORD_TOKEN=paste_your_bot_token_here
   CLIENT_ID=your_application_id_here
   GUILD_ID=your_server_id_here
   ```

**How to get CLIENT_ID:** Discord Developer Portal → Your App → General Information → Application ID

**How to get GUILD_ID:** In Discord, right-click your server name → Copy Server ID
(You need Developer Mode ON: Discord Settings → Advanced → Developer Mode ✅)

---

## 🚀 Step 5 — Run the Bot
In Terminal (inside the bot folder):

**First time — deploy commands:**
```
npm run deploy
```

**Start the bot:**
```
npm start
```

You should see: `✅ PvPTiers Bot is online as YourBotName#0000`

---

## 💬 All Bot Commands

### Player Commands (anyone can use)
| Command | What it does |
|---------|-------------|
| `/profile` | View your tier profile |
| `/profile user:@someone` | View someone else's profile |
| `/leaderboard` | See top ranked players |
| `/join` | Join the testing queue |
| `/leave` | Leave the testing queue |
| `/queue` | View the current queue |
| `/history` | View your test history |
| `/start` | Mark yourself active as tester |
| `/stop` | Mark yourself inactive as tester |
| `/stats` | Check your tester stats |

### Tester Commands (needs Manage Messages permission)
| Command | What it does |
|---------|-------------|
| `/results` | Record a test result (pass/fail/skip) |
| `/next` | Pull next player from queue |
| `/skip` | Skip the first player in queue |

### Admin Commands (needs Manage Roles or higher)
| Command | What it does |
|---------|-------------|
| `/setrank @user tier:HT1` | Set a player's current tier |
| `/setpeaktier @user tier:HT1` | Manually set a player's peak tier |
| `/retire @user` | Mark player as retired (HT1-LT2 only) |
| `/unretire @user` | Remove retired status |
| `/addtester @user role_id:123` | Give someone tester role |
| `/stoptester @user role_id:123` | Remove tester role |
| `/cooldownreset @user` | Reset a player's test cooldown |
| `/tierwipe @user` | Remove all tier data from player |
| `/resetprofile @user` | Fully delete a player's data |
| `/clearqueue` | Clear the entire queue |
| `/stats user:@tester` | Check another tester's stats |
| `/history user:@player` | View another player's test history |

---

## 🔄 Keeping the Bot Online
The bot runs as long as Terminal is open. To keep it running even when you close Terminal, you can use a free service like:
- **Railway** (railway.app) — free hosting
- **Render** (render.com) — free hosting

Or just leave Terminal open when you want the bot active.

---

## ❓ Troubleshooting
- **Commands not showing up?** Run `npm run deploy` again and wait 1 minute
- **Bot offline?** Run `npm start` again in Terminal
- **Permission error?** Make sure the bot role is above other roles in Server Settings → Roles
