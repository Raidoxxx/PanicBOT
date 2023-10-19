const { Client, GatewayIntentBits, Partials, Collection, Events } = require('discord.js');
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

require('dotenv').config() 
const fs = require('fs');
const path = require('path');
const config = path.join(__dirname, '../config.json');
const handlers = path.join(__dirname, 'handlers');

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;

fs.readdirSync(handlers).forEach((handler) => {
  require(`${handlers}/${handler}`)(client)
});

client.login(process.env.DISCORD_TOKEN);