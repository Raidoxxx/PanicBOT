const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const {form_channel} = require('../config.json');
const { playerManager } = require('../index.js');

module.exports = {
    name: "register",
    id: "register",
    description: "registrar um jogador",
    channel: "register_channel",
    run: async (client, interaction) => {
        const username = interaction.fields.getTextInputValue('register_username');
        const id = interaction.fields.getTextInputValue('register_id');

        playerManager.registerPlayer(id, username).then(() => {
            interaction.reply({ content: 'Jogador registrado com sucesso!', ephemeral: true })
        }).catch((err) => {
            console.log(err);
            interaction.reply({ content: 'Ocorreu um erro ao registrar o jogador!', ephemeral: true })
        });
    }
}