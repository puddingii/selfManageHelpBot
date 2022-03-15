const mongoose = require('mongoose');

const Channel = new mongoose.Schema({
	channelId: {
		type: Number,
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
			default: [],
		},
	],
});

/** 채널아이디로 검색 */
Channel.statics.findByChannelId = async function (channelId) {
	const channelInfo = await this.findOne({ channelId });
	return channelInfo;
};

/** 채널에 유저 추가 */
Channel.statics.addUser = async function (channelId, user) {
	const channel = await this.findOne({ channelId });
	if (!channel) {
		throw new Error('Channel is not found.');
	}
	channel.userList.push(user._id);
	await channel.save();
};

module.exports = mongoose.model('Channel', Channel);
