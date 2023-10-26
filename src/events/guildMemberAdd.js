const { EmbedBuilder, Collection, PermissionsBitField } = require("discord.js");
const client = require("../index.js");
const {channel_mensage_welcome} = require("../config.json");

client.on("guildMemberAdd", async (member) => {
  const welcome_embed = new EmbedBuilder()
    .setDescription(`Bem vindo ao servidor ${member.user}! :partying_face:`)
    .setColor("#23272A");
  const channel = member.guild.channels.cache.get(channel_mensage_welcome);

  if (channel) {
    channel.send({
      embeds: [welcome_embed],
    });
  } else {
    console.log("Canal não encontrado.");
  }
});
