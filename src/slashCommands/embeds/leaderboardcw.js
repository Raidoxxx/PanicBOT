const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Player } = require("../../data/Player");
const { Leaderboard } = require("../../data/LeaderBoards");

module.exports = {
  name: "leaderboard",
  description: "Mostra os melhores jogadores",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3,
  default_member_permissions: 'Administrator',
    options: [
        {
            name: 'channel',
            description: 'Canal',
            type: ApplicationCommandOptionType.Channel,
            required: false
        },
        {
            name: 'category',
            description: 'Categoria',
            type: ApplicationCommandOptionType.String
        }
    ],
  run: async (client, interaction) => {

    if(client.leaderboard instanceof Leaderboard){
        await client.leaderboard.getLeaderboardChannel().then((res) => {
            if(!res){
                if(interaction.options.getChannel('channel') != null){
                    client.leaderboard.setLeaderboardChannel(interaction.options.getChannel('channel').id).then(() => {
                        return interaction.reply('Canal setado com sucesso.', { ephemeral: true });
                    });
                }else{
                    return interaction.reply({ content: `Canal não encontrado`, ephemeral: true });
                }
            }
        });

        const category = interaction.options.getString('category');

        if(!category){
            return interaction.reply({ content: `Categoria não encontrada`, ephemeral: true });
        }
        
        await client.leaderboard.hasLeaderboardEmbed(category).then((res) => {
            if(!res){
                return interaction.reply('Embed não encontrada.', { ephemeral: true });
            }else{
                client.leaderboard.getLeaderboardEmbed(category).then((embed) => {
                    
                    const tops = client.player_manager.getPlayers().sort((a, b) => {
                        if(category == 'kills'){
                            return b.kills - a.kills;
                        }else if(category == 'deaths'){
                            return b.deaths - a.deaths;
                        }else if(category == 'wins'){
                            return b.wins - a.wins;
                        }else if(category == 'losses'){
                            return b.losses - a.losses;
                        }else if(category == 'kdr'){
                            return b.kdr - a.kdr;
                        }else if(category == 'wl'){
                            return b.wl - a.wl;
                        }
                    }).slice(0, 10);

                    const newEmbed = new EmbedBuilder()
                    .setTitle('Leaderboard - ' + category)
                    .setColor('#23272A')
                    .setTimestamp()

                    var message = '**Top 10**\n\n';

                    for(var i = 0; i < tops.length; i++){
                        message += `**${i + 1}°** - ${tops[i].username} | ${tops[i][category]}\n`;
                    }

                    newEmbed.setDescription(message);

                    if(!embed){
                        console.log(newEmbed.id)
                        client.leaderboard.addLeaderboardEmbed(client.leaderboard.leaderboard_channel, newEmbed.id, category).then(() => {
                            return interaction.reply('Leaderboard atualizado com sucesso.', { ephemeral: true });
                        });
                    }

                    return client.channels.cache.get(client.leaderboard.leaderboard_channel).messages.fetch(client.leaderboard.leaderboard_embeds[category]).then((msg) => {
                        msg.edit({ embeds: [newEmbed] });
                        return interaction.reply('Leaderboard atualizado com sucesso.', { ephemeral: true });
                    });
                });
            }
        });
    }
  }
}
