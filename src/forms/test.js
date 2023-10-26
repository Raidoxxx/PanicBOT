const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const {test_channel} = require('../config.json');
const { testingRole } = require('../config.json');
module.exports = {
    name: "test",
    id: "test",
    description: "marcar um teste",
    run: async (client, interaction) => {
        const player = interaction.guild.members.cache.get(interaction.customId.split('_')[1]).user;

        const horario = interaction.fields.getTextInputValue('test_hr');
        const data = interaction.fields.getTextInputValue('test_data');
        const id = interaction.fields.getTextInputValue('test_id');
        const posicao = interaction.fields.getTextInputValue('test_posicao');

        const embed = new EmbedBuilder()
        .setTitle('Teste | Panic')
        .setDescription(`**Usuário:** ${player} \n **Testador:** ${interaction.user}`)
        .setAuthor({ name: player.globalName, iconURL: player.avatarURL()})
        .setThumbnail(player.avatarURL())
        .addFields(
            { name: 'Horário', value: horario, inline: true },
            { name: 'Data', value: data, inline: true },
            { name: 'ID', value: id, inline: true },
            { name: 'Posição', value: posicao, inline: true },
            { name: 'Status [⏰]', value: 'Pendente', inline: true}
        )

        const button = new ButtonBuilder()
        .setCustomId(`test_player_${player.id}_${embed.id}_Aceito_✅`)
        .setLabel('Aceitar')
        .setStyle(ButtonStyle.Success)

        const button2 = new ButtonBuilder()
        .setCustomId(`test_player_${player.id}_${embed.id}_Negado_❌`)
        .setLabel('Recusar')
        .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder().addComponents(button, button2)

        const channel = interaction.guild.channels.cache.find(channel => channel.id === test_channel)
        channel.send({
            embeds: [embed],
            components: [row]
        })

        interaction.guild.members.cache.get(player.id).roles.add(testingRole)
        
        await interaction.reply({
            content: `${player} seu teste foi marcado com sucesso!\n\n __**Horário:**__ ${horario} \n __**Data:**__ ${data} \n __**Posição que será testado:**__ ${posicao}`,
        })
    }
}