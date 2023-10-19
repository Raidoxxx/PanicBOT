const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');


module.exports = {
    name: "embed_guideline",
    description: "embed guideline command",
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
                },
                {
                    name: 'embed_title',
                    description: 'The title of the embed.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'embed_description',
                    description: 'The description of the embed.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
    ],

	run: async (client, interaction) => {

        const title = interaction.options.get('embed_title').value;
        const description = interaction.options.get('embed_description').value.replace(/\{line\}/g, '\n');
        const channel = interaction.options.get('channel').channel;

        const embed = new EmbedBuilder()
                .setTitle(title || 'Guidelines')
                .setDescription(description || `.`)
                .setColor('#23272A')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Reagir para registrar')
                    .setStyle('Success')
                    .setCustomId('verify_button')
                );

        await channel.send({
            embeds: [embed],
            components: [buttons]
        });

        return interaction.reply({ content: `Embed Enviado!`, ephemeral: true });
	}
}