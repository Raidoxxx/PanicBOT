const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Player } = require("../../data/Player");
const { Leaderboard } = require("../../data/LeaderBoards");

module.exports = {
  name: "create_leaderboard_channel",
  description: "Cria um leaderboard",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3,
  default_member_permissions: 'Administrator',
    options: [
        {
            name: 'channel',
            description: 'Canal',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
  run: async (client, interaction) => {

    if(client.leaderboard instanceof Leaderboard){
        await client.leaderboard.getLeaderboardChannel().then((res) => {
            if(!res){
                if(interaction.options.getChannel('channel') != null){
                    client.leaderboard.addLeaderboardChannel(interaction.options.getChannel('channel').id).then(() => {
                        return interaction.reply('Canal setado com sucesso.', { ephemeral: true });
                    });
                }else{
                    return interaction.reply({ content: `Canal não encontrado`, ephemeral: true });
                }
            }
        });
    }
  }
}
