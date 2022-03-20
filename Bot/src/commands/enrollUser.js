const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { ChannelModel, UserModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enrolluser')
		.setDescription('Enroll User Information'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const nickname = interaction.user.username;
			const channelId = interaction.guild.id.toString();

			/** DB Info */
			let userInfo = await UserModel.findByUserId(userId);
			const channelInfo = await ChannelModel.findByChannelId(channelId);

			/** 유저정보가 없을 때 */
			if (!userInfo) {
				userInfo = await UserModel.create({ userId, nickname });
			}
			await ChannelModel.addUser(channelId, userInfo);
			await UserModel.addChannel(userId, channelInfo);
			await interaction.reply({ content: 'Registered User!' });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
