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
			default: [],
		},
	],
});

module.exports = mongoose.model('Channel', Channel);
