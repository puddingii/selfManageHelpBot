const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { StudyModel, UserModel, logger },
} = require('../config/dependencyInjection');
const StudyController = require('../controller/Study');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('end')
		.setDescription('End studying and recording my logs')
		.addStringOption(option =>
			option
				.setName('title')
				.setDescription('공부한 내용의 간략한 총 요약')
				.setRequired(true),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();
			const title = interaction.options.getString('title');
			let result;

			/** Title option is required */
			if (title) {
				const studyController = new StudyController();
				result = studyController.endStudy({ userId, channelId });
			} else {
				result = 0;
			}

			/** If controller is working normally */
			if (typeof result === 'object') {
				const owner = await UserModel.findByUserId(userId);
				const newStudyInfo = await StudyModel.create({
					title,
					startDate: result.startDate,
					endDate: result.endDate,
					commentList: result.commentList,
					owner,
				});
				result = await UserModel.addStudy(userId, newStudyInfo);
			}

			let content;
			switch (result) {
				case 0:
					content = '[Fail]Title option is essential';
					break;
				case 1:
					content = 'Stop studying and recording my logs';
					break;
				case 2:
					content = '[Fail]Channel is different';
					break;
				case 3:
					content = '[Fail]You are not the studying status...';
					break;
				default:
					content = '[Fail]Error End';
			}
			await interaction.reply({ content });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
