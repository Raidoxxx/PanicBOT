const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const {form_channel} = require('../config.json');

module.exports = {
    name: "register",
    id: "register",
    description: "registrar um jogador",
    channel: "register_channel",
    run: async (client, interaction) => {
        const username = interaction.fields.getTextInputValue('register_username');
        const id = interaction.fields.getTextInputValue('register_id');

        if(!username || !id) return interaction.reply({ content: 'Você precisa preencher todos os campos!', ephemeral: true });

        client.player_manager.registerPlayer(id, username);
        
        return interaction.reply({ content: 'Jogador registrado com sucesso!', ephemeral: true });
    }
}