const { SlashCommandBuilder } = require('@discordjs/builders');
const bcrypt = require('bcrypt');
const {
	cradle: { ChannelModel, UserModel, ChannelUserGoalModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enrolluser')
		.setDescription('Enroll User Information')
		.addStringOption(option =>
			option.setName('userid').setDescription('웹 아이디').setRequired(true),
		)
		.addStringOption(option =>
			option.setName('passwd').setDescription('비번').setRequired(true),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const discordId = interaction.user.id.toString();
			const channelId = interaction.guild.id.toString();
			const userId = interaction.options.getString('userid');
			const passwd = interaction.options.getString('passwd');

			/** DB Info */
			const userInfo = await UserModel.findByWeb({ userId });
			const channelInfo = await ChannelModel.findByChannelId(channelId);

			/** 유저정보가 없을 때 */
			if (!userInfo) {
				await interaction.reply({ content: 'Create User First' });
				return;
			}

			const match = await bcrypt.compare(passwd, userInfo.passwd);
			if (!match) {
				await interaction.reply({ content: 'Password is incorrect' });
				return;
			}

			if (!userInfo.discordId) {
				userInfo.discordId = discordId;
				await userInfo.save();
			}

			userInfo.discordId = discordId;
			await userInfo.save();

			const isExistCUGInfo = await ChannelUserGoalModel.isChannelUserUnique({
				user: userInfo,
				channel: channelInfo,
			});
			if (!isExistCUGInfo) {
				await ChannelUserGoalModel.create({ user: userInfo, channel: channelInfo });
				await ChannelModel.addUser(channelId, userInfo);
				await UserModel.addChannel(userInfo, channelInfo);
				await interaction.reply({ content: 'Connect User and Discord!' });
				return;
			}
			await interaction.reply({ content: 'Already existed User!' });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
