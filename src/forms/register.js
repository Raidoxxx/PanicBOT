const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const {form_channel} = require('../config.json');
const { PlayerManager } = require('../managers/PlayerManager.js');

module.exports = {
    name: "register",
    id: "register",
    description: "registrar um jogador",
    channel: "register_channel",
    run: async (client, interaction) => {
        const username = interaction.fields.getTextInputValue('register_username');
        const id = interaction.fields.getTextInputValue('register_id');

        if(!username || !id) return interaction.reply({ content: 'Você precisa preencher todos os campos!', ephemeral: true });


        const player_manager = new PlayerManager();
        player_manager.registerPlayer(id, username).then(() => {
            interaction.reply({ content: 'Jogador registrado com sucesso!', ephemeral: true })
        }).catch((err) => {
            console.log(err);
            interaction.reply({ content: 'Ocorreu um erro ao registrar o jogador!', ephemeral: true })
        });
    }
}