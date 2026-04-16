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

// ══════════════════════════════════════════════════════
// GAMEMODES — Updated to your 9 gamemodes
// ══════════════════════════════════════════════════════
const GAMEMODES = ['NethSmp', 'Sword', 'Axe', 'DiaSMP', 'Cart', 'Spearmace', 'Craystal', 'UHC', 'Mace'];

const GAMEMODE_ICONS = {
  NethSmp:   '🌐',
  Sword:     '⚔️',
  Axe:       '🪓',
  DiaSMP:    '💎',
  Cart:       '🛒',
  Spearmace: '🔱',
  Craystal:  '🔮',
  UHC:       '❤️',
  Mace:      '🔨',
};

// ══════════════════════════════════════════════════════
// TIER SYSTEM
// Best → Worst: HT1 LT1 HT2 LT2 HT3 LT3 HT4 LT4 HT5 LT5
// HT = highlighted player in that tier
// LT = non-highlighted player
// ══════════════════════════════════════════════════════
const TIERS = {
  'HT1': { points: 60, order: 1  },
  'LT1': { points: 50, order: 2  },
  'HT2': { points: 40, order: 3  },
  'LT2': { points: 20, order: 4  },
  'HT3': { points: 10, order: 5  },
  'LT3': { points: 5,  order: 6  },
  'HT4': { points: 4,  order: 7  },
  'LT4': { points: 3,  order: 8  },
  'HT5': { points: 2,  order: 9  },
  'LT5': { points: 1,  order: 10 },
};

// ══════════════════════════════════════════════════════
// TITLES (based on TOTAL points across all gamemodes)
// ══════════════════════════════════════════════════════
const TITLES = [
  { min: 400, label: 'Combat Grandmaster', emoji: '👑' },
  { min: 250, label: 'Combat Master',      emoji: '🥇' },
  { min: 100, label: 'Combat Ace',         emoji: '⚡' },
  { min: 50,  label: 'Combat Specialist',  emoji: '🎯' },
  { min: 20,  label: 'Combat Cadet',       emoji: '🛡️' },
  { min: 10,  label: 'Combat Novice',      emoji: '⚔️' },
  { min: 0,   label: 'Rookie',             emoji: '🌱' },
];

function getTitle(totalPoints) {
  return TITLES.find(t => totalPoints >= t.min) || TITLES[TITLES.length - 1];
}

const RETIRED_ELIGIBLE = ['HT1', 'LT1', 'HT2', 'LT2'];

// ══════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════
function getTierPoints(tier) { return TIERS[tier]?.points || 0; }
function getTierOrder(tier)  { return TIERS[tier]?.order  || 999; }

function calcTotalPoints(player) {
  let total = 0;
  for (const gm of Object.values(player.gamemodes || {})) {
    total += getTierPoints(gm.current_tier) || 0;
  }
  return total;
}

function getOrCreatePlayer(discord_id, ign) {
  let player = db.get('players').find({ discord_id }).value();
  if (!player) {
    player = {
      discord_id,
      ign: ign || discord_id,
      is_retired: false,
      tests_completed: 0,
      wins: 0,
      losses: 0,
      gamemodes: {},   // { NethSmp: { current_tier, peak_tier }, ... }
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
  const gamemodes = { ...player.gamemodes };

  if (!gamemodes[gamemode]) {
    gamemodes[gamemode] = { current_tier: null, peak_tier: null };
  }

  // Update peak if new tier is better (lower order = better)
  const currentPeakOrder = gamemodes[gamemode].peak_tier
    ? getTierOrder(gamemodes[gamemode].peak_tier)
    : 999;
  const newOrder = getTierOrder(tier);
  if (newOrder < currentPeakOrder) {
    gamemodes[gamemode].peak_tier = tier;
  }

  gamemodes[gamemode].current_tier = tier;

  updatePlayer(discord_id, { gamemodes, ign: ign || player.ign });
  return db.get('players').find({ discord_id }).value();
}

function getAllTierNames() { return Object.keys(TIERS); }
function getConfig(key)         { return db.get('config').get(key).value(); }
function setConfig(key, value)  { db.get('config').set(key, value).write(); }

module.exports = {
  db,
  GAMEMODES,
  GAMEMODE_ICONS,
  TIERS,
  TITLES,
  RETIRED_ELIGIBLE,
  getTierPoints,
  getTierOrder,
  calcTotalPoints,
  getTitle,
  getOrCreatePlayer,
  updatePlayer,
  setGamemodeTier,
  getAllTierNames,
  getConfig,
  setConfig,
};