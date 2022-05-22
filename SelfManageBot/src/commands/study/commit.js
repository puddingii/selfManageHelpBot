const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { logger },
} = require('../../config/dependencyInjection');
const StudyController = require('../../controller/Study');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commit')
		.setDescription('공부한 내용 기록')
		.addStringOption(option =>
			option.setName('title').setDescription('제목').setRequired(true),
		)
		.addStringOption(option => option.setName('content').setDescription('냬용')),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const discordId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();
			const title = interaction.options.getString('title');
			const content = interaction.options.getString('content');
			let result = 0;

			if (title) {
				const studyController = new StudyController();
				result = studyController.addComment(
					{ discordId, channelId },
					{ title, content, isSecret: false },
				);
			}
			let replyContent;

			switch (result) {
				case 0:
					replyContent = '[Fail]Title option is essential';
					break;
				case 1:
					replyContent = 'Add Commit';
					break;
				case 2:
					replyContent = '[Fail]Channel is different';
					break;
				case 3:
					replyContent = '[Fail]You must enter the start command first';
					break;
				default:
					replyContent = '[Fail]Error Commit';
			}

			await interaction.reply({ content: replyContent });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
