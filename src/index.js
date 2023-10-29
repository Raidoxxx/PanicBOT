require('dotenv').config() 
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const {MongoClient} = require('mongodb');

async function main() {
	const uri = "mongodb+srv://vinimongo:v45icius@cluster-mongo.b3hjpz9.mongodb.net/?retryWrites=true&w=majority";
	const clientMongo = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
		console.log("Connecting to MongoDB...")
        await clientMongo.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(clientMongo);
 
    } catch (e) {
        console.error(e);
    } finally {
        await clientMongo.close();
    }
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


main().catch(console.error);

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

module.exports = client;

const handlers = path.join(__dirname, 'handlers');
fs.readdirSync(handlers).forEach((handler) => {
  require(`${handlers}/${handler}`)(client)
});

client.login(process.env.DISCORD_TOKEN);