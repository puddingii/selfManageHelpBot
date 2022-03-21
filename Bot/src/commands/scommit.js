const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { logger },
} = require('../config/dependencyInjection');
const StudyController = require('../controller/Study');

// FIXME 좀더 봐야함. 현재 commit복붙한 상황
module.exports = {
	data: new SlashCommandBuilder()
		.setName('scommit')
		.setDescription('공부한 내용 기록')
		.addStringOption(option => option.setName('title').setDescription('제목'))
		.addStringOption(option => option.setName('content').setDescription('냬용')),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();
			const title = interaction.options.getUser('title');
			const content = interaction.options.getUser('content');

			const studyController = new StudyController();
			const result = studyController.addComment(
				{ userId, channelId },
				{ title, content, isSecret: false },
			);

			switch (result) {
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				default:
			}

			await interaction.reply({
				content: 'Commit 완료',
				ephemeral: true,
			});
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
