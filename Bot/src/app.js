const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
require('./config/db');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_PRESENCES,
	],
});
/** commands때문에 index.d.ts수정. */
client.commands = new Collection();

const commandFiles = fs
	.readdirSync(path.resolve(__dirname, './commands'))
	.filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
	const command = require(`./commands/${file}`);
	if (command.data) {
		client.commands.set(command.data.name, command);
	}
});

const eventFiles = fs
	.readdirSync(path.resolve(__dirname, './events'))
	.filter(file => file.endsWith('.js'));
eventFiles.forEach(file => {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
});

client.login(process.env.BOT_TOKEN);
