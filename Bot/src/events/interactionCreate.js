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
		if (commandName !== 'init' && commandName !== 'enrolluser') {
			const isExist = isEnrolledUser(interaction);
			if (!isExist) {
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
