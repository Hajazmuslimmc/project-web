const { Client, GatewayIntentBits } = require("discord.js");
const { MongoClient } = require("mongodb");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

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

client.on("messageCreate", async (message) => {
  if (message.channel.id !== "YOUR_RESULTS_CHANNEL_ID") return;
  if (message.author.bot) return;

  let ign, tier, region, gamemode;

  // Embed support
  if (message.embeds.length > 0) {
    const embed = message.embeds[0];
    const fields = embed.fields;
    ign      = fields.find(f => f.name.includes("IGN"))?.value;
    tier     = fields.find(f => f.name.includes("Tier Earned"))?.value;
    region   = fields.find(f => f.name.includes("Region"))?.value;
    gamemode = fields.find(f => f.name.includes("Gamemode"))?.value;
  } else {
    const content = message.content;
    ign      = content.match(/IGN:\s*(.+)/i)?.[1]?.trim();
    tier     = content.match(/Tier:\s*(HT\d|LT\d)/i)?.[1]?.trim();
    region   = content.match(/Region:\s*(.+)/i)?.[1]?.trim();
    gamemode = content.match(/Gamemode:\s*(.+)/i)?.[1]?.trim();
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

  message.react("✅");
});

client.login("YOUR_DISCORD_BOT_TOKEN");
