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
				.setDescription('고정 금액인지?')
				.setRequired(true)
				.addChoice('고정금액', 'true')
				.addChoice('변동금액', 'false'),
		)
		.addStringOption(option =>
			option.setName('category').setDescription('카테고리(음식, 교통, 집세 등...)'),
		)
		.addStringOption(option => option.setName('content').setDescription('내용'))
		.addStringOption(option =>
			option
				.setName('fixedduration')
				.setDescription('고정금액 주기(d:일,w:주,m:월,y:년)ex: 2w'),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const discordId = interaction.user.id.toString();
			const isFixed = JSON.parse(interaction.options.getString('isfixed'));
			const amount = interaction.options.getInteger('amount');
			const category = interaction.options.getString('category') ?? 'etc';
			const content = interaction.options.getString('content') ?? '';
			const fixedDuration = interaction.options.getString('fixedduration') ?? '';
			let replyContent = 'Save account information.';

			const type = ['d', 'w', 'm', 'y'];
			const durationType = fixedDuration.slice(-1);
			const cnt = parseInt(fixedDuration.slice(0, -1), 10);
			if (isFixed && (!type.includes(durationType) || typeof cnt !== 'number')) {
				await interaction.reply({
					content: 'fixedDuration값이 잘못되었음. option) 12d 2w 1m 1y',
				});
				return;
			}

			/** DB Info */
			const user = await UserModel.findBydiscordId(discordId);
			if (!user) {
				replyContent = '[Fail]User information is not existed';
			} else {
				await AccountBookModel.createMyAccount({
					user,
					isFixed,
					amount,
					category,
					content,
					fixedDuration,
				});
			}

			await interaction.reply({ content: replyContent });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
