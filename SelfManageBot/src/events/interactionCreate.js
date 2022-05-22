const {
	cradle: { logger },
} = require('../config/dependencyInjection');
const { isEnrolledUser } = require('../config/middleware');

module.exports = {
	name: 'interactionCreate',
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		const {
			commandName,
			user: { username },
		} = interaction;
		if (!interaction.isCommand()) {
			return;
		}

		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return;
		}
		const notCheckCommandList = ['init', 'enrolluser', 'createuser'];
		if (!notCheckCommandList.includes(commandName)) {
			const isExist = await isEnrolledUser(interaction);
			if (!isExist) {
				await interaction.reply('You are not enrolled this server.');
				return;
			}
		}

		try {
			await command.execute(interaction);
			logger.info(`[interactionCreate]${username} - ${commandName}`);
		} catch (error) {
			logger.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	},
};
