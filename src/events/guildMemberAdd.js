const { EmbedBuilder, Collection, PermissionsBitField } = require("discord.js");
const config = require("../config.json");
const client = require("../index.js");

const path = require("path");
const backgroundPath = path.join(
  __dirname,
  "..",
  "assets",
  "images",
  "background.png"
);
const backgroundCompositePath = path.join(
  __dirname,
  "..",
  "assets",
  "images",
  "background_comp.png"
);
const maskPath = path.join(__dirname, "..", "assets", "images", "mascara.png");
const fontPath = path.join(
  __dirname,
  "..",
  "assets",
  "fonts",
  "DroidSansBold.fnt"
);
const savePath = path.join(__dirname, "..", "assets", "images", "avatar.png");
const channelID = "1148780968841322508";

client.on("guildMemberAdd", async (member) => {
  console.log(member.username);

  const Jimp = require("jimp");
  let avatarURL = member.displayAvatarURL();
  if (avatarURL.endsWith(".webp")) avatarURL = avatarURL.slice(0, -4) + "png";
  const avatar = Jimp.read(avatarURL);
  const fonte = await Jimp.loadFont(fontPath);
  const mask = await Jimp.read(maskPath);
  const fundo = await Jimp.read(backgroundPath);
  const composite = await Jimp.read(backgroundCompositePath);

  const welcome_embed = new EmbedBuilder()
    .setDescription(`Bem vindo ao servidor ${member.user}!`)
    .setColor("#23272A");
  const channel = member.guild.channels.cache.get(channelID);

  if (channel) {
    channel.send({
      embeds: [welcome_embed],
    });
  } else {
    console.log("Canal não encontrado.");
  }

  // avatar
  //   .then((avatar) => {
  //     avatar.resize(580, 580);
  //     mask.resize(580, 580);
  //     avatar.mask(mask);
  //     fundo.composite(avatar, 910, 95);
  //     fundo.print(fonte, 1100, 850, member.nickname || member.user.username);
  //     fundo.composite(composite, 0, 0).write(savePath);

  //     const welcome_embed = new EmbedBuilder()
  //       .setDescription(`Bem vindo ao servidor ${member.user}!`)
  //       .setColor("#23272A")
  //       .setImage("attachment://avatar.png");

  //     const channel = member.guild.channels.cache.get("1148712892124897441");

  //     if (channel) {
  //       channel.send({
  //         embeds: [welcome_embed],
  //         files: [{ attachment: savePath, name: "avatar.png" }],
  //       });
  //     } else {
  //       console.log("Canal não encontrado.");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

client.on("guildMemberRemove", async (interaction) => {
  const bye_embed = new EmbedBuilder()
    .setDescription(`Até mais ${interaction.user}!`)
    .setColor("#23272A");

  const channel = interaction.guild.channels.cache.get(channelID);

  if (channel) {
    channel.send({
      embeds: [bye_embed],
    });
  } else {
    console.log("Canal não encontrado.");
  }

});
