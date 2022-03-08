const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Sends a random gif!')
		.addStringOption(option =>
			option
				.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoice('Funny', 'gif_funny')
				.addChoice('Meme', 'gif_meme')
				.addChoice('Movie', 'gif_movie'),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		await interaction.reply({
			content: 'pong',
			ephemeral: true,
		});
	},
};
