const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { RETIRED_ELIGIBLE, getOrCreatePlayer, updatePlayer } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('retire')
    .setDescription('Mark a player as retired (HT1/LT1/HT2/LT2 only, Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('The player to retire').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const player = getOrCreatePlayer(target.id, target.username);
    if (!player.current_tier || !RETIRED_ELIGIBLE.includes(player.current_tier)) {
      return interaction.reply({ content: `❌ **${target.username}** must be **HT1, LT1, HT2, or LT2** to retire. Current tier: **${player.current_tier || 'Unranked'}**`, ephemeral: true });
    }
    if (player.is_retired) return interaction.reply({ content: `❌ **${target.username}** is already retired.`, ephemeral: true });
    updatePlayer(target.id, { is_retired: true });
    await interaction.reply({
      embeds: [{ color: 0x808080, title: '🏁 Player Retired',
        description: `**<@${target.id}>** is now **Retired ${player.current_tier}**.\nThey keep their **${player.points} points**.`,
        timestamp: new Date().toISOString() }]
    });
  }
};
