const mongoose = require('mongoose');

const Channel = new mongoose.Schema({
	channelId: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	userList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

/** 아이디로 채널 검색 */
Channel.statics.findByChannelId = async function (channelId) {
	const channelInfo = await this.findOne({ channelId });
	return channelInfo;
};

/** 채널에 유저 추가 */
Channel.statics.addUser = async function (channelId, user) {
	const channel = await this.findOne({ channelId }).populate('userList');
	if (!channel) {
		throw new Error('Channel is not found.');
	}
	if (channel.userList.find(dbUser => dbUser.userId === user.userId)) {
		return;
	}
	channel.userList.push(user._id);
	await channel.save();
};

module.exports = mongoose.model('Channel', Channel);
