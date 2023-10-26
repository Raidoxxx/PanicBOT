const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { testerRole, panicRole, testingRole } = require("../config.json");
const { test_result_channel } = require('../config.json')
module.exports = {
  id: "test_player",
  permissions: [],
  run: async (client, interaction, playerID, arg, emoji) => {

    const player = interaction.guild.members.cache.get(
      playerID
    ).user;
    const embed = interaction.message.embeds[0];

    if (!interaction.member.roles.cache.get(testerRole)) {
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.resolve([PermissionsBitField.Flags.Administrator])
        )
      ) {
        return interaction.reply({
          content: `${interaction.user}, Você não tem permissão para usar isso!`,
          ephemeral: true,
        });
      }
    }

    embed.fields[4].name = `Status [${emoji}]`;
    embed.fields[4].value = arg;

    let color = 'Red'

    if(arg === 'Aceito') {
      interaction.guild.members.cache.get(playerID).roles.add(panicRole)
      color = 'Green'
    }else{
      interaction.guild.members.cache.get(playerID).roles.remove(testingRole)
      color = 'Red'
    }

    const newEmbed = new EmbedBuilder()
    .setTitle(embed.title)
    .setDescription(embed.description)
    .setAuthor(embed.author)
    .setThumbnail(embed.author.iconURL)
    .addFields(embed.fields)
    .setColor(color)

    const channel = interaction.guild.channels.cache.find(channel => channel.id === test_result_channel);

    const result_embed = new EmbedBuilder()
    .setTitle('Resultado do teste')
    .setDescription(`**Usuário:** ${player} \n **Testador:** ${interaction.user} \n **Resultado:** ${arg}`)
    .setAuthor({ name: player.globalName, iconURL: player.avatarURL()})
    .setThumbnail(player.avatarURL())
    .setColor(color)

    channel.send({
      embeds: [result_embed]
    })

    await interaction.update({
      embeds: [newEmbed],
      components: [],
    });
  },
};
