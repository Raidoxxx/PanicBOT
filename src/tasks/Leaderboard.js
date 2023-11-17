const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "leaderboard",
    cooldown: 1800000,

    run: async (client) => {
        const leaderboard = client.channels.cache.get(client.leaderboard.leaderboard_channel);
            client.leaderboard.getLeaderboardEmbed(leaderboard.id, 'kdr').then((embed) => {
                leaderboard.messages.fetch().then((messages) => {
                    messages.find((message) => {
                        if(message.id == embed){
                            const newEmbed = new EmbedBuilder()
                            .setTitle('Leaderboard')
                            .setColor('#23272A')
                            .setTimestamp()
                            .setFooter({ text: client.guilds.cache.get(process.env.GUILD_ID).name, iconURL: client.guilds.cache.get(process.env.GUILD_ID).iconURL() });
        
                            client.player_manager.getPlayers().then((players) => {
                                const topPlayers = players.sort((a, b) => {
                                    return b.kdr - a.kdr;
                                });
        
                                var mesg = '**Top 5 Panic Players** \n\n';
                
                                if(topPlayers.length < 5){
                                    for(var i = 0; i < topPlayers.length; i++){
                                        const player = topPlayers[i];
                                        mesg += `${i+1}° - ${player.name} \n \`Kills: ${player.stats.kills} | Deaths: ${player.stats.deaths} | KDR: ${(player.kdr).toFixed(2)} \n Wins: ${player.stats.wins} | Losses: ${player.stats.losses} | Win Rate: ${(player.wl).toFixed(2)}\` \n\n`;
                                    }
                                }else{
                                    for(var i = 0; i < 5; i++){
                                        const player = topPlayers[i];
                                        mesg += `${i+1}° - ${player.name} \n \`Kills: ${player.stats.kills} | Deaths: ${player.stats.deaths} | KDR: ${(player.kdr).toFixed(2)} \n Wins: ${player.stats.wins} | Losses: ${player.stats.losses} | Win Rate: ${(player.wl).toFixed(2)}\` \n\n`;
                                    }
                                }
                
                                newEmbed.setDescription(mesg);
                
                                message.edit({ embeds: [newEmbed] });
                            });
                        }
                    });
                });
            });
        
    }
}

