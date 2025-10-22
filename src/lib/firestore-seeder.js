// Firestore seeder script - initialize player tier data
// Run this once after setting up Firebase Firestore

const { collection, query, where, doc, setDoc, getDocs } = require('firebase/firestore');
const { db } = require('./firebase.ts'); // This needs to be converted to CommonJS

const seedPlayerTiers = async () => {
  try {
    console.log('🌱 Seeding Firestore player tier data...');

    const playerData = [
      {
        player_id: 'itzrealme_legendary',
        name: 'itzrealme',
        tier: 'S',
        reason: 'Legendary PvP pro with insane reflexes and build knowledge. Master of all weapons and game mechanics.',
        added_by: 'System'
      },
      {
        player_id: 'clownperice_elite',
        name: 'clownperice',
        tier: 'A',
        reason: 'Exceptional movement and smart positioning. Strong in both PvP and PvE scenarios with unpredictable plays.',
        added_by: 'System'
      },
      {
        player_id: 'marlowww_survival',
        name: 'marlowww',
        tier: 'S',
        reason: 'God-tier survival skills and resource gathering. Master strategist in endgame scenarios.',
        added_by: 'System'
      },
      {
        player_id: 'refraction_crystal',
        name: 'Refraction',
        tier: 'A',
        reason: 'Elite crystal PvP specialist with perfect ping mechanics and crystal knowledge.',
        added_by: 'System'
      },
      {
        player_id: 'venetami_allround',
        name: 'Venetami',
        tier: 'B',
        reason: 'Solid all-around player with great potential in endgame scenarios. Strong trident gameplay.',
        added_by: 'System'
      },
      {
        player_id: 'punz_pvp_hof',
        name: 'Punz',
        tier: 'S',
        reason: 'Hall of Fame PvPer with incredible build knowledge and clutch moments. Game-changing player.',
        added_by: 'System'
      },
      {
        player_id: 'technoblade_content',
        name: 'Technoblade',
        tier: 'S',
        reason: 'The ultimate Minecraft strategist and PvP master. Forever known for incredible comebacks and strategy.',
        added_by: 'System'
      }
    ];

    const playerTiersRef = collection(db, 'playerTiers');

    for (const player of playerData) {
      // Check if player already exists (avoid duplicates)
      const existingQuery = query(
        playerTiersRef,
        where('player_id', '==', player.player_id)
      );
      const existingDocs = await getDocs(existingQuery);

      if (existingDocs.empty) {
        // Create new document
        const newDocRef = doc(playerTiersRef);
        await setDoc(newDocRef, {
          ...player,
          addedAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`✅ Added ${player.name}`);
      } else {
        console.log(`⏭️  Skipped ${player.name} (already exists)`);
      }
    }

    console.log('✅ Successfully seeded Firestore player tier data!');
    console.log('🔥 Now using Firebase Firestore instead of Neon PostgreSQL!');
  } catch (error) {
    console.error('❌ Error seeding Firestore data:', error);
  }
};

// Export for use if needed
module.exports = { seedPlayerTiers };

// Run if called directly
if (require.main === module) {
  seedPlayerTiers();
}
