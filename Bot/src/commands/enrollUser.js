const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { Channel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enrolluser')
		.setDescription('Enroll User Information'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			const isExist = await Channel.findOne({ channelId: interaction.guild?.id });
			let content = 'It is an ID that has already been registered.';
			if (!isExist) {
				await Channel.create({
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
