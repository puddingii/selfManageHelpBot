const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

(function () {
	const commands = [];
	const commandFiles = fs
		.readdirSync(path.resolve(__dirname, './commands'))
		.filter(file => file.endsWith('.js'));

	commandFiles.forEach(file => {
		// eslint-disable-next-line global-require
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	});
	if (!process.env.BOT_TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
		console.log('[ERROR] Token is not valid');
		return;
	}

	const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
	if (process.env.NODE_ENV === 'production') {
		rest
			.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
				body: commands,
			})
			.then(() => console.log('Successfully registered application commands.'))
			.catch(console.error);
	} else {
		rest
			.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
			.then(() => console.log('Successfully registered global application commands.'))
			.catch(console.error);
	}
})();
