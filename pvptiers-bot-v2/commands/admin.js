const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { db, GAMEMODES, getOrCreatePlayer, updatePlayer } = require('../database');

const cooldownreset = {
  data: new SlashCommandBuilder().setName('cooldownreset').setDescription('Reset a player\'s test cooldown (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('Player to reset').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    getOrCreatePlayer(target.id, target.username);
    await interaction.reply({ content: `✅ Cooldown reset for <@${target.id}>.` });
  }
};

const tierwipe = {
  data: new SlashCommandBuilder().setName('tierwipe').setDescription('Wipe all tier data from a player (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('Player to wipe').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    updatePlayer(target.id, { gamemodes: {}, points: 0, is_retired: false, wins: 0, losses: 0, tests_completed: 0 });
    await interaction.reply({ content: `🗑️ All tier data wiped for <@${target.id}>.` });
  }
};

const unretire = {
  data: new SlashCommandBuilder().setName('unretire').setDescription('Remove retired status (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('Player to unretire').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const player = getOrCreatePlayer(target.id, target.username);
    if (!player.is_retired) return interaction.reply({ content: `❌ <@${target.id}> is not retired.`, ephemeral: true });
    updatePlayer(target.id, { is_retired: false });
    await interaction.reply({ content: `✅ <@${target.id}> is no longer retired.` });
  }
};

const resetprofile = {
  data: new SlashCommandBuilder().setName('resetprofile').setDescription('Fully reset a player profile (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('Player to reset').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    db.get('players').remove({ discord_id: target.id }).write();
    db.get('test_results').remove({ testee_id: target.id }).write();
    await interaction.reply({ content: `🗑️ Profile fully reset for <@${target.id}>.` });
  }
};

module.exports = [cooldownreset, tierwipe, unretire, resetprofile];
