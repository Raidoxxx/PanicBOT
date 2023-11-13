const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Player } = require("../../data/Player");

module.exports = {
  name: "addstats",
  description: "Adiciona stats ao jogador",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'Administrator',
  cooldown: 3,
    options: [
        {
            name: 'player',
            description: 'Player',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'kills',
            description: 'Kills',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'deaths',
            description: 'Deaths',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'wins',
            description: 'Wins',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'losses',
            description: 'Losses',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
  run: async (client, interaction) => {

    const player = interaction.options.getUser('player');
    const kills = interaction.options.getInteger('kills');
    const deaths = interaction.options.getInteger('deaths');
    const wins = interaction.options.getInteger('wins');
    const losses = interaction.options.getInteger('losses');


    await client.player_manager.existPlayer(player.id).then((res) => {
        if(!res){
            return interaction.reply({ content: `Jogador não registrado.`, ephemeral: true });
        }  
    });

    await client.player_manager.getPlayer(player.id).then((res) => {
            
            if(res instanceof Player){
                res.addStats(kills, deaths, wins, losses).then(() => {
                    const embed = new EmbedBuilder()
                    .setTitle('Stats adicionadas')
                    .setDescription(`Stats adicionadas ao jogador ${player.tag} com sucesso.`)
                    .setColor('#23272A')
                    .setTimestamp()
                    .setAuthor({ name: player.globalName, iconURL: player.avatarURL()})
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        
                    res.save();
                    return interaction.reply({ embeds: [embed] });
                });
            }
    });

      
  }
};
