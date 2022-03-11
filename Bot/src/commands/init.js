const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { ChannelModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init')
		.setDescription('Enroll Server Information'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			const isExist = await ChannelModel.findOne({
				channelId: interaction.guild?.id,
			});
			let content = 'It is an ID that has already been registered.';
			if (!isExist) {
				await ChannelModel.create({
					channelId: interaction.guild?.id,
					name: interaction.guild?.name,
				});
				content = 'Registered the server.';
			}
			await interaction.reply({ content });
		} catch (err) {
			logger.error(err);
		}
	},
};
