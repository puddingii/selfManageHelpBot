const {
	cradle: { ChannelModel, logger },
} = require('./dependencyInjection');

/** @param {import('discord.js').CommandInteraction} interaction */
const isEnrolledUser = async function (interaction) {
	const channelId = interaction.guild.id.toString();
	const userId = interaction.user.id.toString();
	const channelInfo = await ChannelModel.findByChannelId(channelId.toString());
	if (!channelInfo) {
		logger.warn('Channel is not found. You must register the server first.');
		return false;
	}
	const decodedChannelInfo = await channelInfo.populate('userList');
	const isExistUser = decodedChannelInfo.userList.find(
		userInfo => userInfo.userId === userId.toString(),
	);
	if (!isExistUser) {
		logger.warn(
			'The user is not registered in the channel. You must type the enrollUser command first.',
		);
		return false;
	}
	return true;
};

module.exports = {
	isEnrolledUser,
};
