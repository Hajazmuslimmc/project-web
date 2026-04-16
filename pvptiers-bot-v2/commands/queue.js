const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { db, getOrCreatePlayer, getConfig } = require('../database');

const join = {
  data: new SlashCommandBuilder().setName('join').setDescription('Join the testing queue'),
  async execute(interaction) {
    const isOpen = getConfig('queue_open');
    if (!isOpen) return interaction.reply({ content: '🔒 The queue is **closed**. Wait for an admin to open it!', ephemeral: true });
    const queueChannel = getConfig('queue_channel');
    if (queueChannel && queueChannel !== interaction.channel.id) return interaction.reply({ content: `❌ Join the queue in <#${queueChannel}>!`, ephemeral: true });
    const player = getOrCreatePlayer(interaction.user.id, interaction.user.username);
    const already = db.get('queue').find({ discord_id: interaction.user.id }).value();
    if (already) {
      const pos = db.get('queue').value().findIndex(e => e.discord_id === interaction.user.id) + 1;
      return interaction.reply({ content: `⚠️ You're already in the queue at position **#${pos}**!`, ephemeral: true });
    }
    db.get('queue').push({ discord_id: interaction.user.id, username: interaction.user.username, joined_at: new Date().toISOString() }).write();
    const pos = db.get('queue').size().value();
    await interaction.reply({ embeds: [{ color: 0x57F287, title: '✅ Joined Queue',
      description: `<@${interaction.user.id}> joined!\n📍 Position: **#${pos}**\n🎖️ Tier: **${player.current_tier || 'Unranked'}**`,
      timestamp: new Date().toISOString() }] });
  }
};

const leave = {
  data: new SlashCommandBuilder().setName('leave').setDescription('Leave the testing queue'),
  async execute(interaction) {
    const entry = db.get('queue').find({ discord_id: interaction.user.id }).value();
    if (!entry) return interaction.reply({ content: `❌ You're not in the queue.`, ephemeral: true });
    db.get('queue').remove({ discord_id: interaction.user.id }).write();
    await interaction.reply({ content: `✅ <@${interaction.user.id}> left the queue.` });
  }
};

const queue = {
  data: new SlashCommandBuilder().setName('queue').setDescription('View the current testing queue'),
  async execute(interaction) {
    const isOpen = getConfig('queue_open');
    const statusLabel = isOpen ? '🟢 Open' : '🔴 Closed';
    const entries = db.get('queue').take(20).value();
    if (!entries.length) return interaction.reply({ content: `📭 Queue is empty! (${statusLabel})`, ephemeral: true });
    const rows = entries.map((e, i) => {
      const player = db.get('players').find({ discord_id: e.discord_id }).value();
      return `**${i + 1}.** <@${e.discord_id}> — ${player?.current_tier || 'Unranked'}`;
    });
    await interaction.reply({ embeds: [{ color: isOpen ? 0x57F287 : 0xED4245,
      title: `📋 Queue (${entries.length} players) — ${statusLabel}`, description: rows.join('\n'),
      timestamp: new Date().toISOString() }] });
  }
};

const next = {
  data: new SlashCommandBuilder().setName('next').setDescription('Pull next player from queue (Tester only)').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const entries = db.get('queue').value();
    if (!entries.length) return interaction.reply({ content: '📭 Queue is empty!', ephemeral: true });
    const entry = entries[0];
    db.get('queue').remove({ discord_id: entry.discord_id }).write();
    const remaining = db.get('queue').size().value();
    const player = db.get('players').find({ discord_id: entry.discord_id }).value();
    await interaction.reply({ embeds: [{ color: 0xFFD700, title: '⚔️ Next Player',
      description: `<@${entry.discord_id}> is up!\n🎖️ Tier: **${player?.current_tier || 'Unranked'}**\n📋 Remaining: **${remaining}**`,
      timestamp: new Date().toISOString() }] });
  }
};

const skip = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Skip first player in queue (Tester only)').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const entries = db.get('queue').value();
    if (!entries.length) return interaction.reply({ content: '📭 Queue is empty!', ephemeral: true });
    const entry = entries[0];
    db.get('queue').remove({ discord_id: entry.discord_id }).write();
    await interaction.reply({ content: `⏭️ Skipped <@${entry.discord_id}> from the queue.` });
  }
};

const clearqueue = {
  data: new SlashCommandBuilder().setName('clearqueue').setDescription('Clear the entire queue (Admin only)').setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    db.set('queue', []).write();
    await interaction.reply({ content: '🗑️ Queue cleared.' });
  }
};

module.exports = [join, leave, queue, next, skip, clearqueue];
