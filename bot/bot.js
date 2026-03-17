const { Client, GatewayIntentBits } = require("discord.js");
const { MongoClient } = require("mongodb");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const mongo = new MongoClient("YOUR_MONGO_URI");
let db;

const tierPoints = {
  LT5: 1, HT5: 2, LT4: 3, HT4: 4,
  LT3: 6, HT3: 10, LT2: 20, HT2: 25,
  LT1: 50, HT1: 60
};

async function startDB() {
  await mongo.connect();
  db = mongo.db("mctiers");
}
startDB();

// API
app.get("/tiers", async (req, res) => {
  const mode = req.query.mode || "Sword";
  const data = await db.collection("tiers")
    .find({ mode })
    .sort({ points: -1 })
    .toArray();
  res.json(data);
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

server.listen(4000, () => console.log("API + Socket running on http://localhost:4000"));

// Discord Bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on("messageCreate", async (message) => {
  if (message.channel.id !== "YOUR_RESULTS_CHANNEL_ID") return;
  if (message.author.bot) return;

  let ign, tier, region, gamemode;

  if (message.embeds.length > 0) {
    const fields = message.embeds[0].fields;
    ign      = fields.find(f => f.name.includes("IGN"))?.value?.trim();
    tier     = fields.find(f => f.name.includes("Tier Earned"))?.value?.trim();
    region   = fields.find(f => f.name.includes("Region"))?.value?.trim();
    gamemode = fields.find(f => f.name.includes("Gamemode"))?.value?.trim();
  } else {
    const c = message.content;
    ign      = c.match(/IGN:\s*(.+)/i)?.[1]?.trim();
    tier     = c.match(/Tier:\s*(HT\d|LT\d)/i)?.[1]?.trim();
    region   = c.match(/Region:\s*(.+)/i)?.[1]?.trim();
    gamemode = c.match(/Gamemode:\s*(.+)/i)?.[1]?.trim();
  }

  if (!ign || !tier || !tierPoints[tier]) return;

  await db.collection("tiers").updateOne(
    { username: ign, mode: gamemode },
    {
      $set: {
        username: ign,
        tier,
        points: tierPoints[tier],
        region,
        mode: gamemode,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );

  io.emit("update"); // 🔥 instant push to website
  message.react("✅");
});

client.login("YOUR_DISCORD_BOT_TOKEN");
