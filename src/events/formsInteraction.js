const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('../index.js');

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit) return;
    
    if (interaction.isModalSubmit()) {
        if(interaction.customId.startsWith('test')) {
            const form = client.forms.get("test");
            form.run(client, interaction);
        }
        if(interaction.customId.startsWith('register')) {
            const form = client.forms.get("register");
            form.run(client, interaction);
        }
    }
});