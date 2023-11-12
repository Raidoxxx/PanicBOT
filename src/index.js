require('dotenv').config() 
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const { Database } = require('./data/Database.js');
const { PlayerManager } = require('./managers/PlayerManager.js');

const db = new Database();
db.connect();
db.init();

const player_manager = new PlayerManager(db);
player_manager.init();


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

module.exports = client;

const handlers = path.join(__dirname, 'handlers');
fs.readdirSync(handlers).forEach((handler) => {
  require(`${handlers}/${handler}`)(client)
});

client.login(process.env.DISCORD_TOKEN);