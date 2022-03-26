const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { UserModel, ChannelModel, ChannelUserGoalModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setusergoal')
		.setDescription('내 목표 설정')
		.addStringOption(option =>
			option.setName('minute').setDescription('공부 목표 시간(일주일 기준/분 단위)'),
		)
		.addStringOption(option =>
			option.setName('content').setDescription('목표내용(optional)'),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();
			const minute = parseInt(interaction.options.getString('minute'), 10);
			const content = interaction.options.getString('content');
			let result = 0;

			/** DB Info */
			const user = await UserModel.findByUserId(userId);
			if (!user) {
				result = 2;
			}
			const channel = await ChannelModel.findByChannelId(channelId);
			if (!channel) {
				result = 3;
			}

			if (minute && result === 0) {
				result = await ChannelUserGoalModel.updateUserGoal(
					{ user, channel },
					minute,
					content,
				);
			}
			let replyContent;

			switch (result) {
				case 0:
					replyContent = '[Fail]Minute option is essential/Please check type.(Number)';
					break;
				case 1:
					replyContent = 'Set Goal';
					break;
				case 2:
					replyContent = '[Fail]User information is not existed';
					break;
				case 3:
					replyContent = '[Fail]Channel information is not existed';
					break;
				default:
					replyContent = '[Fail]Error SetUserGoal';
			}

			await interaction.reply({ content: replyContent });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
