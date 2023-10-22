const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');


module.exports = {
    name: "roster_embed",
    description: "roster command",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'text',
            description: 'Add a roster embed to a channel.',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'The channel you want to send the text to.',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                },
                {
                    name: 'player1',
                    description: 'Player 1',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'player2',
                    description: 'Player 2',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'player3',
                    description: 'Player 3',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'player4',
                    description: 'Player 4',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'player5',
                    description: 'Player 5',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'player6',
                    description: 'Player 6',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'emoji',
                    description: 'Emoji',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'image',
                    description: 'Image Attachment',
                    type: ApplicationCommandOptionType.Attachment,
                    required: true
                }
            ]
        }
    ],

	run: async (client, interaction) => {

        const player1 = interaction.options.get('player1').value;
        const player2 = interaction.options.get('player2').value;
        const player3 = interaction.options.get('player3').value;
        const player4 = interaction.options.get('player4').value;
        const player5 = interaction.options.get('player5').value;
        const player6 = interaction.options.get('player6').value;
        const emoji = interaction.options.get('emoji').value;
        const channel = interaction.options.get('channel').channel;

        const image = interaction.options.get('image').attachment.url;

        const embed = new EmbedBuilder()
                .setTitle(`- Panic Standoff 2 Roster -`)
                .setDescription(`> **${emoji} |- ${player1}** \n > **${emoji} |- ${player2}** \n > **${emoji} |- ${player3}** \n > **${emoji} |- ${player4}** \n > **${emoji} |- ${player5}** \n > **${emoji} |- ${player6}**`)
                .setColor('#23272A')
                .setImage(image)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        await channel.send({
            embeds: [embed]
        });

        return interaction.reply({ content: `Embed Enviado!`, ephemeral: true });
	}
}