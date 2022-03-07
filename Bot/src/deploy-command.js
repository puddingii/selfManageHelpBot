const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

(function () {
	const commands = [
		new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
		new SlashCommandBuilder()
			.setName('server')
			.setDescription('Replies with server info!'),
		new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	].map(command => command.toJSON());

	if (!process.env.BOT_TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
		console.log('[ERROR] Token is not valid');
		return;
	}
	const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
	rest
		.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
			body: commands,
		})
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
})();
