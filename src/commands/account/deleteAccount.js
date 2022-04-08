const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { AccountBookModel, logger },
} = require('../../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deleteaccount')
		.setDescription('가계부 삭제')
		.addIntegerOption(option =>
			option
				.setName('accountid')
				.setDescription('삭제할 번호를 입력하세요')
				.setRequired(true),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const accountId = interaction.options.getInteger('accountid');
			let content = 'Delete account information.';

			/** DB Info */
			const isExist = await AccountBookModel.exists({ accountId });
			if (isExist) {
				await AccountBookModel.remove({ accountId });
			} else {
				content = '[Fail]Account Book Information is not existed.';
			}

			await interaction.reply({ content });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
