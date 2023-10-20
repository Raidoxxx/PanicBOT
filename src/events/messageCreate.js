const { UserFlagsBitField, PermissionFlagsBits } = require('discord.js');
const client = require('../index.js');

client.on("messageCreate", async (message) => {
    const bannedWords = [`www.`,`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
    try {
        if(message.author.bot) return;
        if (message.member.permissions.has(PermissionFlagsBits.Administrator)) return
        
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === message.guild.ownerID) return;
            await message.delete();
            await message.channel.send(`${message.author}, você não pode enviar links de outros servidores aqui!`).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 5000)
            })
        }
    } catch (e) {
        console.log(e);
    }
});