const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('../index.js');

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
    const button = client.buttons.get(interaction.customId);
    if (!button) return;

    try {
        if(button.permissions) {
            if(!interaction.memberPermissions.has(PermissionsBitField.resolve(button.permissions || []))) {
                const perms = new EmbedBuilder()
                .setDescription(`🚫 ${interaction.user}, Você não tem permissão para interagir com este botão!`)
                .setColor('Red')
                return interaction.reply({ embeds: [perms], ephemeral: true })
            }
        }
        await button.run(client, interaction);
    } catch (error) {
        console.log(error);
    }
});