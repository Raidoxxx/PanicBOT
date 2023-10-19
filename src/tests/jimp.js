const path = require('path');
const backgroundPath = path.join(__dirname, '..', 'assets', 'images', 'background.png');
const backgroundCompositePath = path.join(__dirname, '..', 'assets', 'images', 'background_comp.png');
const maskPath = path.join(__dirname, '..', 'assets', 'images', 'mascara.png');
const fontPath = path.join(__dirname, "..", "assets", "fonts", "DroidSansBold.fnt");
const test = path.join(__dirname, '..', 'assets', 'images', 'rdx.png');
const fs = require('fs');


async function main() {
  const Jimp = require("jimp");
  const avatar = Jimp.read(test);
  const fonte = await Jimp.loadFont(fontPath);
  const mask = await Jimp.read(maskPath);
  const fundo = await Jimp.read(backgroundPath);
  const composite = await Jimp.read(backgroundCompositePath);

  avatar
    .then((avatar) => {
      avatar.resize(610, 610);
      mask.resize(610, 610);
      avatar.mask(mask);
      fundo.composite(avatar, 900, 80);
      fundo.print(fonte, 1100, 850, "RAIDOXX", 1000);
      fundo.composite(composite, 0, 0).write("avatar.png");
      
    })
    .catch((err) => {
      console.log(err);
    });
}

main();
