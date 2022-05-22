const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { UserModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createuser')
		.setDescription('Create User')
		.addStringOption(option =>
			option.setName('webid').setDescription('웹 아이디').setRequired(true),
		)
		.addStringOption(option =>
			option.setName('passwd').setDescription('비번').setRequired(true),
		)
		.addStringOption(option =>
			option.setName('nickname').setDescription('닉네임').setRequired(true),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const webId = interaction.options.getString('webid');
			const passwd = interaction.options.getString('passwd');
			const nickname = interaction.options.getString('nickname');

			/** DB Info */
			const userInfo = await UserModel.findByWeb({ webId, nickname });
			let content = 'Create User!';

			/** 유저정보가 없을 때 */
			if (!userInfo) {
				await UserModel.create({ webId, passwd, nickname });
			} else if (userInfo.nickname === nickname) {
				content = 'Nickname is duplicated';
			} else if (userInfo.webId === webId) {
				content = 'WebId is duplicated';
			} else {
				content = 'Create Error';
			}

			await interaction.reply({ content });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
