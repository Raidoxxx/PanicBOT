const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "register",
  description: "Registra um jogador",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'Administrator',
  cooldown: 3,
    options: [
        {
            name: 'player',
            description: 'Player',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'nickname',
            description: 'Nickname',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'id',
            description: 'ID',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
  run: async (client, interaction) => {

    const player = interaction.options.getUser('player');
    const nickname = interaction.options.getString('nickname');
    const id = interaction.options.getString('id');

    await client.player_manager.existPlayer(player.id).then((res) => {
        if(res){
            return interaction.reply('Jogador já registrado.', { ephemeral: true });
        }else{
            client.player_manager.registerPlayer(id, player.id, nickname).then(() => {
                return interaction.reply({ content: `Jogador registrado com sucesso.`, ephemeral: true });
        }
    });
  }
};
