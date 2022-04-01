const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { logger },
} = require('../../config/dependencyInjection');
const StudyController = require('../../controller/Study');

module.exports = {
	data: new SlashCommandBuilder().setName('start').setDescription('Start studying'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();

			const studyController = new StudyController();
			const result = studyController.startStudy({ userId, channelId });
			const content = result ? 'Start study!' : '[Fail]Already studying...';

			await interaction.reply({ content });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
