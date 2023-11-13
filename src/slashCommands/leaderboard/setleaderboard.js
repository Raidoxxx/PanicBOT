const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Player } = require("../../data/Player");
const { Leaderboard } = require("../../data/LeaderBoards");

module.exports = {
  name: "setleaderboard",
  description: "Seta o leaderboard",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3,
  default_member_permissions: 'Administrator',
  run: async (client, interaction) => {

    if(client.leaderboard instanceof Leaderboard){
        await client.leaderboard.getLeaderboardChannel().then((res) => {
            if(res){
                client.player_manager.getPlayers().then((players) => {

                    /*
                    Player {
                        id: '61142957',
                        dc_id: '823956411720400916',
                        name: 'Yned',
                        database: Database {
                            connection: Connection {
                            _events: [Object: null prototype] {},
                            _eventsCount: 0,
                            _maxListeners: undefined,
                            config: [ConnectionConfig],
                            _socket: [Socket],
                            _protocol: [Protocol],
                            _connectCalled: true,
                            state: 'authenticated',
                            threadId: 66756,
                            [Symbol(kCapture)]: false
                        },
                        stats: { kills: 0, deaths: 0, wins: 0, losses: 0 }
                    */
                        const topPlayers = players.sort((a, b) => {
                            const kdA = a.stats.kills / a.stats.deaths;
                            const kdB = b.stats.kills / b.stats.deaths;
                            return kdB - kdA;
                        });

                        const embed = new EmbedBuilder()
                        .setTitle('Leaderboard')
                        .setColor('#23272A')
                        .setTimestamp()
                        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
                        

                        var message = '**Top 5 Panic Players** \n\n';

                        for(var i = 0; i < topPlayers.length; i++){
                            const player = topPlayers[i];
                            message += `${i+1}° - ${player.name} \n \`Kills: ${player.stats.kills} | Deaths: ${player.stats.deaths} | KDR: ${(player.kdr).toFixed(2)} \n Wins: ${player.stats.wins} | Losses: ${player.stats.losses} | Win Rate: ${(player.wl).toFixed(2)}\` \n\n`;
                        }

                        embed.setDescription(message);

                        const leaderboard = client.channels.cache.get(client.leaderboard.leaderboard_channel);
                        leaderboard.send({ embeds: [embed] }).then((message) => {
                            client.leaderboard.addLeaderboardEmbed(leaderboard.id, message.id, 'kdr').then(() => {
                                return interaction.reply('Leaderboard setado com sucesso.', { ephemeral: true });
                            });
                        });
                });
            }else{
                return interaction.reply({ content: `Canal não encontrado`, ephemeral: true });
            }
        });
    }
  }
}
