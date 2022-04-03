const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { UserModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getid')
		.setDescription('Create an ID to access the website.'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();

			/** DB Info */
			const result = await UserModel.getRandomId(userId);

			let replyContent;
			switch (result) {
				case 2:
					replyContent = '[Fail]User information is not existed';
					break;
				default:
					replyContent = `Temporary login id is : ${result}`;
			}

			/** 유저정보가 없을 때 */
			await interaction.reply({ content: replyContent });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
