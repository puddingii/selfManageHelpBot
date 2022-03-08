const logger = require('../config/winston');

module.exports = {
	name: 'interactionCreate',
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		if (!interaction.isCommand()) {
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			return;
		}

		try {
			await command.execute(interaction);
			logger.info(
				`[interactionCreate]${interaction.user.username} - ${interaction.commandName}`,
			);
		} catch (error) {
			logger.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	},
};
