const mongoose = require('mongoose');

const ChannelUserGoal = new mongoose.Schema({
	channel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Channel',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	goalTime: {
		type: Number,
		default: 30,
	},
	content: {
		type: String,
	},
});

ChannelUserGoal.statics.isChannelUserUnique = async function (userInfo) {
	const { user, channel } = userInfo;
	const result = await this.findOne({ user, channel });
	return result ? 1 : 0;
};

module.exports = mongoose.model('ChannelUserGoal', ChannelUserGoal);
