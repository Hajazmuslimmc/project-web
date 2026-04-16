const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { GAMEMODES, getTierPoints, getAllTierNames, getOrCreatePlayer, setGamemodeTier } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setrank')
    .setDescription('Set a player\'s tier for a specific gamemode (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('The player').setRequired(true))
    .addStringOption(opt =>
      opt.setName('gamemode').setDescription('Which gamemode').setRequired(true)
        .addChoices(...GAMEMODES.map(g => ({ name: g, value: g })))
    )
    .addStringOption(opt =>
      opt.setName('tier').setDescription('The tier to assign').setRequired(true)
        .addChoices(...getAllTierNames().map(t => ({ name: `${t} (${getTierPoints(t)} pts)`, value: t })))
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const gamemode = interaction.options.getString('gamemode');
    const tier = interaction.options.getString('tier');
    const points = getTierPoints(tier);

    const player = getOrCreatePlayer(target.id, target.username);
    const oldTier = player.gamemodes?.[gamemode]?.current_tier || 'Unranked';

    setGamemodeTier(target.id, target.username, gamemode, tier);

    await interaction.reply({
      embeds: [{
        color: 0x5865F2, title: '✅ Rank Updated',
        fields: [
          { name: 'Player', value: `<@${target.id}> (${player.ign || target.username})`, inline: true },
          { name: 'Gamemode', value: gamemode, inline: true },
          { name: 'Old Tier', value: oldTier, inline: true },
          { name: 'New Tier', value: `${tier} (${points} pts)`, inline: true },
        ],
        timestamp: new Date().toISOString()
      }]
    });
  }
};
