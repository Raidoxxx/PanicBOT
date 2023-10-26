const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const {form_channel} = require('../config.json');

module.exports = {
    name: "form_panic",
    id: "form_panic",
    description: "fazer um pedido de clã",
    channel: "form_channel",
    run: async (client, interaction) => {
        const player = interaction.guild.members.cache.get(interaction.customId.split('_')[2]).user;

        const rank = interaction.fields.getTextInputValue('rank_panic_form');
        const idade = interaction.fields.getTextInputValue('idade_panic_form');
        const id = interaction.fields.getTextInputValue('id_panic_form');
        const posicao = interaction.fields.getTextInputValue('posicao_panic_form');
        const dispositivo = interaction.fields.getTextInputValue('dispositivo_panic_form');

        const embed = new EmbedBuilder()
        .setTitle('Formulário | Panic')
        .setDescription(`**ID:** ${id}\n**Rank:** ${rank}\n**Idade:** ${idade}\n**Posição:** ${posicao}\n**Dispositivo:** ${dispositivo}`)
        .setAuthor({ name: player.globalName, iconURL: player.avatarURL()})
        .setThumbnail(player.avatarURL())

        const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`form_ticket_panic_${player.id}`)
                        .setEmoji('📩')
                        .setStyle(ButtonStyle.Primary),
                )

        const channel = client.channels.cache.get(form_channel);

        channel.send({ embeds: [embed], components: [buttons],}).then(() => {
            interaction.reply({ content: 'Formulário enviado com sucesso!', ephemeral: true })
        })
    }
}