const { EmbedBuilder } = require('discord.js');
const {form_channel} = require('../config.json');

module.exports = {
    name: "form_panic",
    id: "form_panic",
    description: "fazer um pedido de clã",
    channel: "form_channel",
    run: async (client, interaction) => {
        console.log(interaction.customId)
        console.log(interaction.customId.split('_')[2])

        const player = interaction.guild.members.cache.get(interaction.customId.split('_')[2]).user;

        const rank = interaction.fields.getTextInputValue('rank_panic_form');
        const idade = interaction.fields.getTextInputValue('idade_panic_form');
        const id = interaction.fields.getTextInputValue('id_panic_form');
        const posicao = interaction.fields.getTextInputValue('posicao_panic_form');
        const dispositivo = interaction.fields.getTextInputValue('dispositivo_panic_form');

        console.log(player)
        const embed = new EmbedBuilder()
        .setTitle('Formulário | Panic')
        .setDescription(`**ID:** ${id}\n**Rank:** ${rank}\n**Idade:** ${idade}\n**Posição:** ${posicao}\n**Dispositivo:** ${dispositivo}`)
        .setAuthor({ name: player.globalName, iconURL: player.avatarURL()})
        .setThumbnail(player.avatarURL())

        const channel = client.channels.cache.get(form_channel);

        channel.send({ embeds: [embed]}).then(() => {
            interaction.reply({ content: 'Formulário enviado com sucesso!', ephemeral: true })
        })
    }
}