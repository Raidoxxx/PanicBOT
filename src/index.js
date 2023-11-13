require('dotenv').config() 
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const { Database } = require('./data/Database.js');
const { PlayerManager } = require('./managers/PlayerManager.js');
const { Leaderboard } = require('./data/LeaderBoards.js');
const db = new Database();
db.connect();
db.init();

const player_manager = new PlayerManager(db);
player_manager.init();

const leaderboard = new Leaderboard(db);
leaderboard.init();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});


client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.forms = new Collection();
client.prefix = config.prefix;
client.db = db;
client.player_manager = player_manager;
client.leaderboard = leaderboard;

module.exports = client;

const handlers = path.join(__dirname, 'handlers');
fs.readdirSync(handlers).forEach((handler) => {
  require(`${handlers}/${handler}`)(client)
});
//getLeaderboardEmbed(channel_id, type){
function updateMessage() {
	const leaderboard = client.channels.cache.get(client.leaderboard.leaderboard_channel);
	client.leaderboard.getLeaderboardEmbed(leaderboard.id, 'kdr').then((embed) => {
		leaderboard.messages.fetch().then((messages) => {
			messages.find((message) => {
				if(message.id == embed){
					//message.embeds[0];
					const newEmbed = new EmbedBuilder()
					.setTitle('Leaderboard')
					.setColor('#23272A')
					.setTimestamp()
					.setFooter({ text: client.guilds.cache.get(process.env.GUILD_ID).name, iconURL: client.guilds.cache.get(process.env.GUILD_ID).iconURL() });

					client.player_manager.getPlayers().then((players) => {
						const topPlayers = players.sort((a, b) => {
							const kdA = a.stats.kills / a.stats.deaths;
							const kdB = b.stats.kills / b.stats.deaths;
							return kdB - kdA;
						});
		
						var mesg = '**Top 5 Panic Players** \n\n';
		
						for(var i = 0; i < topPlayers.length; i++){
							const player = topPlayers[i];
							mesg += `${i+1}° - ${player.name} \n \`Kills: ${player.stats.kills} | Deaths: ${player.stats.deaths} | KDR: ${(player.kdr).toFixed(2)} \n Wins: ${player.stats.wins} | Losses: ${player.stats.losses} | Win Rate: ${(player.wl).toFixed(2)}\` \n\n`;
						}
		
						newEmbed.setDescription(mesg);
		
						message.edit({ embeds: [newEmbed] });
					});
				}
			});
		});
	});
}

const intervalo = 30 * 60 * 1000;

setInterval(updateMessage, intervalo);

client.login(process.env.DISCORD_TOKEN);