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
		required: true,
	},
	content: {
		type: String,
	},
});

module.exports = mongoose.model('ChannelUserGoal', ChannelUserGoal);
