const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getConfig, setConfig } = require('../database');

const open_queue = {
  data: new SlashCommandBuilder().setName('open_queue').setDescription('Open the testing queue (Admin only)').setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    setConfig('queue_open', true);
    setConfig('queue_channel', interaction.channel.id);
    await interaction.reply({ embeds: [{ color: 0x57F287, title: '✅ Queue Opened',
      description: `Queue is now **OPEN** in <#${interaction.channel.id}>!\nPlayers can use \`/join\` to enter.`,
      timestamp: new Date().toISOString() }] });
  }
};

const close_queue = {
  data: new SlashCommandBuilder().setName('close_queue').setDescription('Close the testing queue (Admin only)').setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    setConfig('queue_open', false);
    await interaction.reply({ embeds: [{ color: 0xED4245, title: '🔒 Queue Closed',
      description: `Queue is now **CLOSED**.\nUse \`/open_queue\` to reopen.`,
      footer: { text: `Closed by ${interaction.user.username}` }, timestamp: new Date().toISOString() }] });
  }
};

const setup_queue_channel = {
  data: new SlashCommandBuilder().setName('setup_queue_channel').setDescription('Set the queue channel (Admin only)')
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel for the queue').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    setConfig('queue_channel', channel.id);
    await interaction.reply({ embeds: [{ color: 0x5865F2, title: '⚙️ Queue Channel Set',
      description: `Queue channel set to <#${channel.id}>.\nUse \`/open_queue\` there to open it.`,
      timestamp: new Date().toISOString() }] });
  }
};

module.exports = [open_queue, close_queue, setup_queue_channel];
