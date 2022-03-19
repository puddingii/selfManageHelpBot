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
			const userId = interaction.user.id.toString();
			const nickname = interaction.user.username;
			const channelId = interaction.guild.id.toString();
			const isExist = await UserModel.findByUserId(userId);
			if (isExist) {
				throw new Error('User is already existed.');
			}
			const newUser = await UserModel.create({ userId, nickname });
			await ChannelModel.addUser(channelId, newUser);
			await interaction.reply({ content: 'Registered User!' });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
