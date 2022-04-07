const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { UserModel, AccountBookModel, logger },
} = require('../../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enrollaccount')
		.setDescription('가계부 기록')
		.addIntegerOption(option =>
			option.setName('amount').setDescription('금액').setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('isfixed')
				.setDescription('고정 지출인지?')
				.setRequired(true)
				.addChoice('고정지출', 'true')
				.addChoice('변동지출', 'false'),
		)
		.addStringOption(option =>
			option.setName('category').setDescription('카테고리(음식, 교통, 집세 등...)'),
		)
		.addStringOption(option => option.setName('content').setDescription('내용')),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const isFixed = JSON.parse(interaction.options.getString('isfixed'));
			const amount = interaction.options.getInteger('amount');
			const category = interaction.options.getString('category') ?? 'etc';
			const content = interaction.options.getString('content') ?? '';
			let replyContent = 'Save account information.';

			/** DB Info */
			const user = await UserModel.findByUserId(userId);
			if (!user) {
				replyContent = '[Fail]User information is not existed';
			} else {
				AccountBookModel.create({
					user,
					isFixed,
					amount,
					category,
					content,
				});
			}

			await interaction.reply({ content: replyContent });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
