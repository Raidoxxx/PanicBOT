const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('../index.js');

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

    if(interaction.customId.startsWith('form_ticket_panic')){
         const player_id = interaction.customId.split('_')[3]
         return require('../buttons/form_ticket_panic.js').run(client, interaction, player_id)
    }

    if(interaction.customId.startsWith('close_ticket')){
        const player_id = interaction.customId.split('_')[2]
        return require('../buttons/close_ticket.js').run(client, interaction, player_id)
    }

    if(interaction.customId.startsWith('new_test')){
        const player_id = interaction.customId.split('_')[2]
        return require('../buttons/new_test.js').run(client, interaction, player_id)
    }

    if(interaction.customId.startsWith('test_player')){
        const player_id = interaction.customId.split('_')[2]
        const emoji = interaction.customId.split('_')[5]
        const arg = interaction.customId.split('_')[4]
        return require('../buttons/test_player.js').run(client, interaction, player_id, arg, emoji)
    }

    if(interaction.customId.startsWith('form_join_button')){
        const player_id = interaction.customId.split('_')[3]
        return require('../buttons/form_join_button.js').run(client, interaction, player_id)
    }

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