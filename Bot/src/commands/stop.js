const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { logger },
} = require('../config/dependencyInjection');
const StudyController = require('../controller/Study');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop studying and not recording my log'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();

			const studyController = new StudyController();
			const result = studyController.stopStudy({ userId, channelId });

			let content;
			switch (result) {
				case 1:
					content = 'Stop studying and Log is deleted.';
					break;
				case 2:
					content = '[Fail]Channel is different';
					break;
				case 3:
					content = '[Fail]You are not the studying status...';
					break;
				default:
					content = '[Fail]Error Stop';
			}
			await interaction.reply({ content });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
