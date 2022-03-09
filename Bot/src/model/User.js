const mongoose = require('mongoose');

const User = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	nickname: {
		type: String,
		required: true,
	},
	channel: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Channel',
		},
	],
	study: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Study',
		},
	],
	memo: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Memo',
		},
	],
});

module.exports = mongoose.model('User', User);
