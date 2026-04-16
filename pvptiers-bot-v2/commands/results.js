const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { db, GAMEMODES, getTierPoints, getAllTierNames, getOrCreatePlayer, updatePlayer, setGamemodeTier } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('results')
    .setDescription('Record a PvP test result (Tester only)')
    .addUserOption(opt => opt.setName('testee').setDescription('The player being tested').setRequired(true))
    .addStringOption(opt =>
      opt.setName('gamemode').setDescription('Which gamemode was tested').setRequired(true)
        .addChoices(...GAMEMODES.map(g => ({ name: g, value: g })))
    )
    .addStringOption(opt =>
      opt.setName('outcome').setDescription('Test result').setRequired(true)
        .addChoices({ name: 'Pass', value: 'pass' }, { name: 'Fail', value: 'fail' }, { name: 'Skip / Discontinue', value: 'skip' })
    )
    .addStringOption(opt =>
      opt.setName('new_tier').setDescription('New tier achieved (required if Pass)')
        .addChoices(...getAllTierNames().map(t => ({ name: `${t} (${getTierPoints(t)} pts)`, value: t })))
    )
    .addStringOption(opt => opt.setName('notes').setDescription('Optional notes about the test'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const testee = interaction.options.getUser('testee');
    const gamemode = interaction.options.getString('gamemode');
    const outcome = interaction.options.getString('outcome');
    const newTier = interaction.options.getString('new_tier');
    const notes = interaction.options.getString('notes') || null;

    const player = getOrCreatePlayer(testee.id, testee.username);
    const oldTier = player.gamemodes?.[gamemode]?.current_tier || null;

    if (outcome === 'pass' && !newTier) {
      return interaction.reply({ content: '❌ You must pick a **new_tier** when outcome is Pass.', ephemeral: true });
    }

    let description = '', color = 0x808080;

    if (outcome === 'pass' && newTier) {
      setGamemodeTier(testee.id, testee.username, gamemode, newTier);
      const updatedPlayer = db.get('players').find({ discord_id: testee.id }).value();
      updatePlayer(testee.id, { wins: (player.wins || 0) + 1, tests_completed: (player.tests_completed || 0) + 1 });
      color = 0x57F287;
      description = `✅ **PASS** — <@${testee.id}> (**${updatedPlayer.ign}**)\n🎮 Gamemode: **${gamemode}**\n📈 ${oldTier || 'Unranked'} → **${newTier}** (${getTierPoints(newTier)} pts)`;
    } else if (outcome === 'fail') {
      updatePlayer(testee.id, { losses: (player.losses || 0) + 1, tests_completed: (player.tests_completed || 0) + 1 });
      color = 0xED4245;
      description = `❌ **FAIL** — <@${testee.id}> (**${player.ign}**)\n🎮 Gamemode: **${gamemode}**\n📍 Stays at: **${oldTier || 'Unranked'}**`;
    } else {
      description = `⏭️ **SKIPPED** — <@${testee.id}> (**${player.ign}**)\n🎮 Gamemode: **${gamemode}**`;
    }

    db.get('test_results').push({
      id: Date.now(), testee_id: testee.id, tester_id: interaction.user.id,
      gamemode, result: outcome, old_tier: oldTier, new_tier: newTier || null,
      notes, created_at: new Date().toISOString()
    }).write();

    await interaction.reply({
      embeds: [{
        color, title: '📋 Test Result Recorded', description,
        fields: [
          { name: 'Tester', value: `<@${interaction.user.id}>`, inline: true },
          ...(notes ? [{ name: 'Notes', value: notes }] : [])
        ],
        timestamp: new Date().toISOString()
      }]
    });
  }
};
