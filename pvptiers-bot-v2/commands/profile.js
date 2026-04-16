const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, GAMEMODES, getOrCreatePlayer } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View a player\'s tier profile by Minecraft IGN')
    .addStringOption(opt => opt.setName('ign').setDescription('Minecraft IGN (in-game name)').setRequired(true)),

  async execute(interaction) {
    const ign = interaction.options.getString('ign');

    // Search by IGN (case insensitive)
    const player = db.get('players').find(p => p.ign && p.ign.toLowerCase() === ign.toLowerCase()).value();

    if (!player) {
      return interaction.reply({ content: `❌ No player found with IGN **${ign}**. They may need to be registered with \`/setign\` first.`, ephemeral: true });
    }

    // Build gamemode fields
    const gamemodeFields = [];
    for (const gm of GAMEMODES) {
      const data = player.gamemodes?.[gm];
      if (data?.current_tier) {
        const retired = player.is_retired ? ' *(Retired)*' : '';
        gamemodeFields.push({
          name: `🎮 ${gm}`,
          value: `Tier: **${data.current_tier}${retired}** (${data.points} pts)\nPeak: **${data.peak_tier || data.current_tier}**`,
          inline: true
        });
      }
    }

    if (!gamemodeFields.length) {
      gamemodeFields.push({ name: 'No Tiers Yet', value: 'This player has not been tested yet.', inline: false });
    }

    const winRate = (player.wins + player.losses) > 0
      ? `${Math.round((player.wins / (player.wins + player.losses)) * 100)}%`
      : 'N/A';

    // Get Minecraft skin from Crafatar (3rd party skin renderer)
    const skinUrl = `https://crafatar.com/renders/body/${ign}?scale=4&overlay`;
    const avatarUrl = `https://crafatar.com/avatars/${ign}?size=64&overlay`;

    const embed = new EmbedBuilder()
      .setColor(player.is_retired ? 0x808080 : 0x5865F2)
      .setTitle(`📊 Profile — ${player.ign}`)
      .setThumbnail(avatarUrl)
      .setImage(skinUrl)
      .addFields(
        { name: '⭐ Total Points', value: `${player.points}`, inline: true },
        { name: '✅ Tests Done', value: `${player.tests_completed}`, inline: true },
        { name: '🏅 W/L', value: `${player.wins}W / ${player.losses}L (${winRate})`, inline: true },
        { name: '\u200b', value: '**— Gamemode Tiers —**', inline: false },
        ...gamemodeFields
      )
      .setFooter({ text: `Discord: <@${player.discord_id}> • Since ${player.created_at?.split('T')[0] || 'N/A'}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
