const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Player } = require("../../data/Player");

module.exports = {
  name: "reset",
  description: "Remove stats do jogador",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3,
    options: [
        {
            name: 'player',
            description: 'Player',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
  run: async (client, interaction) => {

    const player = interaction.options.getUser('player');

    await client.player_manager.existPlayer(player.id).then((res) => {
        if(!res){
            return interaction.reply({ content: `Jogador não registrado.`, ephemeral: true });
        }  
    });

    await client.player_manager.getPlayer(player.id).then((res) => {

        if(res instanceof Player){
           res.resetStats().then(() => {
                res.save();
                return interaction.reply({ content: `Stats resetadas com sucesso.`, ephemeral: true });
           });
        }
    });
  }
};
