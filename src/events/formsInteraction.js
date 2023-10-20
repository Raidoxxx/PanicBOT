const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('../index.js');

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit) return;
    
    if (interaction.isModalSubmit()) {
        console.log(interaction.customId)
        console.log("AAAAAAAAA")
        if(interaction.customId.startsWith('form_panic')) {
            console.log("BBBBBBBBBBBB")
            const form = client.forms.get("form_panic");
            form.run(client, interaction);
        }
    }
});