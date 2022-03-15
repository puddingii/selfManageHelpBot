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
			const isExist = await UserModel.findByUserId(interaction.user.id);
			if (isExist) {
				throw new Error('User is already existed.');
			}
			const newUser = await UserModel.create({
				userId: interaction.user.id,
				nickname: interaction.user.username,
			});
			await ChannelModel.addUser(interaction.guild?.id, newUser);
			await interaction.reply({ content: 'Registered User!' });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
