const { SlashCommandBuilder } = require('discord.js');
const { db, GAMEMODES } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show top ranked players')
    .addStringOption(opt =>
      opt.setName('gamemode').setDescription('Filter by gamemode (leave empty for overall)')
        .addChoices(...GAMEMODES.map(g => ({ name: g, value: g })))
    )
    .addIntegerOption(opt => opt.setName('top').setDescription('How many to show (default 10)').setMinValue(1).setMaxValue(25)),

  async execute(interaction) {
    const gamemode = interaction.options.getString('gamemode');
    const limit = interaction.options.getInteger('top') || 10;

    let players, title;

    if (gamemode) {
      // Filter players who have a tier in that gamemode
      players = db.get('players')
        .filter(p => p.gamemodes?.[gamemode]?.current_tier)
        .value()
        .sort((a, b) => (b.gamemodes[gamemode]?.points || 0) - (a.gamemodes[gamemode]?.points || 0))
        .slice(0, limit);
      title = `🏆 ${gamemode} Leaderboard`;
    } else {
      players = db.get('players').filter(p => p.points > 0).orderBy(['points'], ['desc']).take(limit).value();
      title = '🏆 Overall PvP Leaderboard';
    }

    if (!players.length) return interaction.reply({ content: '📭 No ranked players yet!', ephemeral: true });

    const medals = ['🥇', '🥈', '🥉'];
    const rows = players.map((p, i) => {
      const medal = medals[i] || `**${i + 1}.**`;
      const retired = p.is_retired ? ' *(Retired)*' : '';
      const tierInfo = gamemode
        ? `**${p.gamemodes[gamemode].current_tier}${retired}** (${p.gamemodes[gamemode].points} pts)`
        : `**${p.points} pts**`;
      return `${medal} **${p.ign || `<@${p.discord_id}>`}** — ${tierInfo}`;
    });

    await interaction.reply({
      embeds: [{
        color: 0xFFD700, title,
        description: rows.join('\n'),
        footer: { text: gamemode ? `Top ${limit} in ${gamemode}` : `Top ${limit} overall` },
        timestamp: new Date().toISOString()
      }]
    });
  }
};
