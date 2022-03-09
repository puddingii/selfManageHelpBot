const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commit')
		.setDescription('공부한 내용 기록')
		.addStringOption(option => option.setName('title').setDescription('제목'))
		.addStringOption(option => option.setName('content').setDescription('냬용')),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		await interaction.reply({
			content: 'pong',
			ephemeral: true,
		});
	},
};
