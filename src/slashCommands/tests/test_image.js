const { ApplicationCommandType } = require("discord.js");
const path = require("path");
const backgroundPath = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "images",
  "background.png"
);
const backgroundCompositePath = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "images",
  "background_comp.png"
);
const maskPath = path.join(__dirname, "..","..", "assets", "images", "mascara.png");
const fontPath = path.join(__dirname, "..", "..", "assets", "fonts", "DroidSansBold.fnt");
const savePath = path.join(__dirname, "..", "..", "assets", "images", "avatar.png");
const fs = require("fs");

module.exports = {
  name: "test_image",
  description: "test image command",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3,
  run: async (client, interaction) => {
    console.log("Testando o slash command");

    const Jimp = require("jimp");
    let avatarURL = interaction.user.displayAvatarURL();
    if(avatarURL.endsWith(".webp")) avatarURL = avatarURL.slice(0, -4) + "png";
    const avatar = Jimp.read(avatarURL);
    const fonte = await Jimp.loadFont(fontPath);
    const mask = await Jimp.read(maskPath);
    const fundo = await Jimp.read(backgroundPath);
    const composite = await Jimp.read(backgroundCompositePath);

    avatar
      .then((avatar) => {
        avatar.resize(580, 580);
        mask.resize(580, 580);
        avatar.mask(mask);
        fundo.composite(avatar, 910, 95);
        fundo.print(fonte, 1100, 850, "RAIDOXX");
        fundo.composite(composite, 0, 0).write("avatar.png");
      })
      .catch((err) => {
        console.log(err);
      });

      
      interaction.reply({
        content: "Bem vindo ao teste de imagem!",
        files: ["avatar.png"],
      });
  },
};
