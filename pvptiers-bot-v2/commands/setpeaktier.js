const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getTierPoints, getAllTierNames, getOrCreatePlayer, updatePlayer } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setpeaktier')
    .setDescription('Manually set a player\'s peak tier (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('The player').setRequired(true))
    .addStringOption(opt =>
      opt.setName('tier').setDescription('Peak tier to assign').setRequired(true)
        .addChoices(...getAllTierNames().map(t => ({ name: `${t} (${getTierPoints(t)} pts)`, value: t })))
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const tier = interaction.options.getString('tier');
    const points = getTierPoints(tier);
    getOrCreatePlayer(target.id, target.username);
    updatePlayer(target.id, { peak_tier: tier, peak_points: points, username: target.username });
    await interaction.reply({
      embeds: [{ color: 0xFFD700, title: '🏆 Peak Tier Updated', fields: [
        { name: 'Player', value: `<@${target.id}>`, inline: true },
        { name: 'Peak Tier', value: `${tier} (${points} pts)`, inline: true },
      ], timestamp: new Date().toISOString() }]
    });
  }
};
