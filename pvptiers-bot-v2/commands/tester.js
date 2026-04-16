const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { db, getOrCreatePlayer, setConfig, getConfig } = require('../database');

const stats = {
  data: new SlashCommandBuilder().setName('stats').setDescription('Check tester stats')
    .addUserOption(opt => opt.setName('user').setDescription('Tester to check (empty = yourself)')),
  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const results = db.get('test_results').filter({ tester_id: target.id }).value();
    const passes = results.filter(r => r.result === 'pass').length;
    const fails = results.filter(r => r.result === 'fail').length;
    const skips = results.filter(r => r.result === 'skip').length;
    await interaction.reply({ embeds: [{ color: 0x5865F2, title: `📊 Tester Stats — ${target.username}`,
      thumbnail: { url: target.displayAvatarURL() },
      fields: [
        { name: '📋 Total Tests', value: `${results.length}`, inline: true },
        { name: '✅ Passes', value: `${passes}`, inline: true },
        { name: '❌ Fails', value: `${fails}`, inline: true },
        { name: '⏭️ Skips', value: `${skips}`, inline: true },
      ], timestamp: new Date().toISOString() }] });
  }
};

const addtester = {
  data: new SlashCommandBuilder().setName('addtester').setDescription('Add a user as tester (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('User to add').setRequired(true))
    .addStringOption(opt => opt.setName('role_id').setDescription('Tester role ID').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const roleId = interaction.options.getString('role_id');
    try {
      const member = await interaction.guild.members.fetch(target.id);
      await member.roles.add(roleId);
      await interaction.reply({ content: `✅ <@${target.id}> added as tester.` });
    } catch { await interaction.reply({ content: `❌ Could not assign role. Check the role ID and my permissions.`, ephemeral: true }); }
  }
};

const stoptester = {
  data: new SlashCommandBuilder().setName('stoptester').setDescription('Remove tester role (Admin only)')
    .addUserOption(opt => opt.setName('user').setDescription('User to remove').setRequired(true))
    .addStringOption(opt => opt.setName('role_id').setDescription('Tester role ID').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const roleId = interaction.options.getString('role_id');
    try {
      const member = await interaction.guild.members.fetch(target.id);
      await member.roles.remove(roleId);
      await interaction.reply({ content: `✅ <@${target.id}> removed as tester.` });
    } catch { await interaction.reply({ content: `❌ Could not remove role.`, ephemeral: true }); }
  }
};

const start = {
  data: new SlashCommandBuilder().setName('start').setDescription('Mark yourself active as tester'),
  async execute(interaction) {
    setConfig(`active_tester_${interaction.user.id}`, true);
    await interaction.reply({ content: `✅ <@${interaction.user.id}> is now **active** as a tester!` });
  }
};

const stop = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Mark yourself inactive as tester'),
  async execute(interaction) {
    setConfig(`active_tester_${interaction.user.id}`, false);
    await interaction.reply({ content: `🔴 <@${interaction.user.id}> is now **inactive** as a tester.` });
  }
};

module.exports = [stats, addtester, stoptester, start, stop];
