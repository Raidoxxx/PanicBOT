const { EmbedBuilder } = require('discord.js');
const path = require('path');
const backgroundPath = path.join(__dirname, '..', 'assets', 'images', 'leaderboard', 'background_leaderboard_week.png');
const fontPath = path.join(__dirname, "..", "assets", "fonts", "DroidSansBold.fnt");

module.exports = {
    name: "leaderboard",
    cooldown: 5000,

    run: async (client) => {
        const Jimp = require("jimp");
        const fundo = await Jimp.read(backgroundPath);
        const fonte = await Jimp.loadFont(fontPath);

        client.player_manager.getPlayers().then((players) => {
            const topPlayers = players.sort((a, b) => {
                return b.kdr - a.kdr;
            });

            var top1 = topPlayers[0];

            // strings

            var kills = top1.stats.kills.toString();
            var deaths = top1.stats.deaths.toString();
            var kdr = top1.kdr.toFixed(2).toString();
            var wins = top1.stats.wins.toString();
            var losses = top1.stats.losses.toString();

            // fundo.write(kills, 1172, 428);
            // fundo.write(deaths, 1251, 553);
            // fundo.write(kdr, 1110, 682);
            // fundo.write(wins, 1162, 805);
            // fundo.write(losses, 1234, 933);

            fundo.print(fonte, 1128, 428, kills, 500);
            fundo.print(fonte, 1128, 553, deaths, 500);
            fundo.print(fonte, 1128, 682, kdr, 500);
            fundo.print(fonte, 1128, 805, wins, 500);
            fundo.print(fonte, 1128, 933, losses, 500);

            //fundo.write(top1.name, 1128, 291);

            fundo.print(fonte, 1128, 291, top1.name, 1000);

            fundo.write('test.png')

            const newEmbed = new EmbedBuilder()
                .setTitle('Top Week')
                .setColor('#23272A')
                .setTimestamp()
                .setFooter({ text: client.guilds.cache.get(process.env.GUILD_ID).name, iconURL: client.guilds.cache.get(process.env.GUILD_ID).iconURL() })
                .setDescription(`** O jogador que mais se destacou na semana foi ${top1.name}** \n\n **Kills:** ${top1.stats.kills} \n **Deaths:** ${top1.stats.deaths} \n **KDR:** ${(top1.kdr).toFixed(2)} \n **Wins:** ${top1.stats.wins} \n **Losses:** ${top1.stats.losses} \n **Win Rate:** ${(top1.wl).toFixed(2)}`)
                .setImage('attachment://test.png');

            client.channels.cache.get('1148712892124897441').send({ embeds: [newEmbed], files: ['test.png'] });


        });
    }
}

