const { SlashCommandBuilder } = require('discord.js');
const { db, GAMEMODES } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription('View test history for a player')
    .addStringOption(opt => opt.setName('ign').setDescription('Minecraft IGN to look up').setRequired(true))
    .addStringOption(opt =>
      opt.setName('gamemode').setDescription('Filter by gamemode')
        .addChoices(...GAMEMODES.map(g => ({ name: g, value: g })))
    ),

  async execute(interaction) {
    const ign = interaction.options.getString('ign');
    const gamemode = interaction.options.getString('gamemode');

    const player = db.get('players').find(p => p.ign && p.ign.toLowerCase() === ign.toLowerCase()).value();
    if (!player) return interaction.reply({ content: `❌ No player found with IGN **${ign}**.`, ephemeral: true });

    let records = db.get('test_results').filter({ testee_id: player.discord_id }).value();
    if (gamemode) records = records.filter(r => r.gamemode === gamemode);
    records = records.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);

    if (!records.length) return interaction.reply({ content: `📭 No test history for **${ign}**${gamemode ? ` in ${gamemode}` : ''}.`, ephemeral: true });

    const rows = records.map(r => {
      const icon = r.result === 'pass' ? '✅' : r.result === 'fail' ? '❌' : '⏭️';
      const change = r.new_tier ? `${r.old_tier || 'Unranked'} → ${r.new_tier}` : (r.old_tier || 'Unranked');
      return `${icon} **${r.result.toUpperCase()}** [${r.gamemode}] — ${change} | ${r.created_at?.split('T')[0]}`;
    });

    await interaction.reply({
      embeds: [{
        color: 0x5865F2,
        title: `📋 Test History — ${ign}${gamemode ? ` (${gamemode})` : ''}`,
        description: rows.join('\n'),
        timestamp: new Date().toISOString()
      }]
    });
  }
};
