const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Player } = require("../../data/Player");

module.exports = {
  name: "profile",
  description: "Mostra o perfil do usuário",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3,
    options: [
        {
            name: 'player',
            description: 'Player',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
  run: async (client, interaction) => {

    const player = interaction.options.getUser('player');

    await client.player_manager.existPlayer(player.id).then((res) => {
        if(!res){
            return interaction.reply({ content: `Jogador não registrado.`, ephemeral: true });
        }  
    });

    await client.player_manager.getPlayer(player.id).then((res) => {

        if(res instanceof Player){
            const embed = new EmbedBuilder()
            .setTitle('Perfil')
            .setDescription(`Perfil Em Cws \n\n`)
            .setColor('#23272A')
            .addFields(
                { name: 'ID', value: `\`${res.id}\``, inline: true},
                { name: 'Nickname', value: `\`${res.username}\``, inline: true},
                { name: 'Kills', value: `\`${res.kills}\``, inline: true},
                { name: 'Deaths', value: `\`${res.deaths}\``, inline: true},
                { name: 'KDR', value: `\`${res.kdr.toFixed(2)}\``, inline: true},
                { name: 'Wins', value: `\`${res.wins}\``, inline: true},
                { name: 'Losses', value: `\`${res.losses}\``, inline: true},
                { name: 'Win Rate', value: `\`${res.wl.toFixed(2)}\``, inline: true}
            )
            .setThumbnail(player.avatarURL())
            .setTimestamp()
            .setAuthor({ name: player.globalName, iconURL: player.avatarURL()})
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [embed] });
        }
    });
  }
};
