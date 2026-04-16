const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'pvptiers.json'));
const db = low(adapter);

db.defaults({
  players: [],
  queue: [],
  test_results: [],
  config: {}
}).write();

const GAMEMODES = ['Sword', 'Axe', 'Dia SMP', 'Neth SMP', 'Neth Pot', 'UHC', 'Spear', 'Mace', 'OP', 'Cart', 'Pot SMP'];

const TIERS = {
  'HT1': { points: 60, order: 1 },
  'LT1': { points: 50, order: 2 },
  'HT2': { points: 45, order: 3 },
  'LT2': { points: 40, order: 4 },
  'HT3': { points: 30, order: 5 },
  'LT3': { points: 20, order: 6 },
  'HT4': { points: 10, order: 7 },
  'LT4': { points: 5,  order: 8 },
  'HT5': { points: 2,  order: 9 },
  'LT5': { points: 1,  order: 10 },
};

const RETIRED_ELIGIBLE = ['HT1', 'LT1', 'HT2', 'LT2'];

function getTierPoints(tier) { return TIERS[tier]?.points || 0; }
function getTierOrder(tier) { return TIERS[tier]?.order || 999; }

function getOrCreatePlayer(discord_id, ign) {
  let player = db.get('players').find({ discord_id }).value();
  if (!player) {
    player = {
      discord_id,
      ign: ign || discord_id,
      is_retired: false,
      points: 0,
      tests_completed: 0,
      wins: 0,
      losses: 0,
      gamemodes: {}, // { Sword: { current_tier, peak_tier, points, peak_points }, ... }
      created_at: new Date().toISOString()
    };
    db.get('players').push(player).write();
  }
  return player;
}

function updatePlayer(discord_id, updates) {
  updates.updated_at = new Date().toISOString();
  db.get('players').find({ discord_id }).assign(updates).write();
  return db.get('players').find({ discord_id }).value();
}

function setGamemodeTier(discord_id, ign, gamemode, tier) {
  const player = getOrCreatePlayer(discord_id, ign);
  const points = getTierPoints(tier);
  const gamemodes = { ...player.gamemodes };
  if (!gamemodes[gamemode]) gamemodes[gamemode] = { current_tier: null, peak_tier: null, points: 0, peak_points: 0 };

  // Update peak if better
  const currentPeakOrder = gamemodes[gamemode].peak_tier ? getTierOrder(gamemodes[gamemode].peak_tier) : 999;
  const newOrder = getTierOrder(tier);
  if (newOrder < currentPeakOrder) {
    gamemodes[gamemode].peak_tier = tier;
    gamemodes[gamemode].peak_points = points;
  }

  gamemodes[gamemode].current_tier = tier;
  gamemodes[gamemode].points = points;

  // Overall best tier across all gamemodes
  let bestOrder = 999, bestTier = null, bestPoints = 0;
  for (const gm of Object.values(gamemodes)) {
    if (gm.current_tier && getTierOrder(gm.current_tier) < bestOrder) {
      bestOrder = getTierOrder(gm.current_tier);
      bestTier = gm.current_tier;
      bestPoints = gm.points;
    }
  }

  updatePlayer(discord_id, { gamemodes, points: bestPoints, ign: ign || player.ign });
  return db.get('players').find({ discord_id }).value();
}

function getAllTierNames() { return Object.keys(TIERS); }
function getConfig(key) { return db.get('config').get(key).value(); }
function setConfig(key, value) { db.get('config').set(key, value).write(); }

module.exports = { db, TIERS, GAMEMODES, RETIRED_ELIGIBLE, getTierPoints, getTierOrder, getOrCreatePlayer, updatePlayer, setGamemodeTier, getAllTierNames, getConfig, setConfig };
