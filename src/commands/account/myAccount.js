const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');
const {
	cradle: { UserModel, AccountBookModel, logger, util },
} = require('../../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('myaccount')
		.setDescription('내 가계부(이번달)'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const embedBox = new MessageEmbed();
			embedBox
				.setColor('#0099ff')
				.setTitle('My Account List(Recent Count: 15)')
				.setDescription(`${dayjs().format('MMMM')}'s Account Book`)
				.addField('\u200B', '\u200B')
				.setTimestamp();

			/** DB Info */
			const user = await UserModel.findByUserId(userId);
			if (!user) {
				embedBox.addField('Fail', 'User information is not existed');
			} else {
				const myAccountList = await AccountBookModel.findByUser(user);
				if (myAccountList.length === 0) {
					embedBox.addField('My Account Book List', 'List is empty..');
				} else {
					const filteredList = myAccountList.filter(myAccount => {
						return myAccount.isFixed || dayjs(myAccount.date).month() === dayjs().month();
					});
					filteredList.sort((a, b) => {
						if (a.isFixed) {
							return -1;
						}
						if (b.isFixed) {
							return 1;
						}
						return 0;
					});
					let fixedSum = 0;
					let notFixedSum = 0;
					filteredList.slice(-15).forEach(myAccount => {
						if (myAccount.isFixed) {
							fixedSum += myAccount.amount;
						} else {
							notFixedSum += myAccount.amount;
						}
						embedBox.addField(
							`${myAccount.isFixed ? '고정' : '변동'} - [${util.numberToCurrency(
								myAccount.amount,
							)}원]`,
							`${myAccount.category}: ${myAccount.content}`,
						);
					});

					embedBox
						.addField('\u200B', '\u200B')
						.addField(
							'이번달 내역 합계',
							`${util.numberToCurrency(fixedSum + notFixedSum)}원`,
						);
				}
			}

			await interaction.reply({ embeds: [embedBox] });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
