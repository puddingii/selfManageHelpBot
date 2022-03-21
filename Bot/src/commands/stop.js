const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { logger },
} = require('../config/dependencyInjection');
const StudyController = require('../controller/Study');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop studying and recording my logs'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			const studyController = new StudyController();
			studyController.checkStudyInfo();
			// const result = StudyController.startStudy();
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
