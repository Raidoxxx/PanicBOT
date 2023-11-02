const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { form_message } = require('../../config.json');

module.exports = {
    name: "form_embed",
    description: "form for enter in the clan",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'text',
            description: 'The text you want to send.',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'The channel you want to send the text to.',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                }
            ]
        },
    ],

	run: async (client, interaction) => {

        const channel = interaction.options.get('channel').channel;
        const title = form_message.title;
        const subtitle = form_message.subtitle;
        const description = form_message.description;

        const embed = new EmbedBuilder()
                .setTitle(title || 'Formulário')
                .setDescription(`${subtitle || ''}\n\n${description || ''}`)
                .setColor('#23272A')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Eu tenho interesse')
                    .setStyle('Success')
                    .setCustomId(`form_join_button_${interaction.user.id}`)
                );

        await channel.send({
            embeds: [embed],
            components: [buttons]
        });

        return interaction.reply({ content: `Embed Enviado!`, ephemeral: true });
	}
}