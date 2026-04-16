const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getOrCreatePlayer, updatePlayer } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setign')
    .setDescription('Set a player\'s Minecraft IGN (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('The Discord user').setRequired(true))
    .addStringOption(opt => opt.setName('ign').setDescription('Their Minecraft in-game name').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const ign = interaction.options.getString('ign');
    getOrCreatePlayer(target.id, ign);
    updatePlayer(target.id, { ign });
    await interaction.reply({
      embeds: [{
        color: 0x57F287, title: '✅ IGN Set',
        description: `<@${target.id}>'s Minecraft IGN has been set to **${ign}**.\nTheir profile can now be looked up with \`/profile ign:${ign}\`.`,
        thumbnail: { url: `https://crafatar.com/avatars/${ign}?size=64&overlay` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
