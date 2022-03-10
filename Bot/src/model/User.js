const mongoose = require('mongoose');

const User = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	nickname: {
		type: String,
		required: true,
	},
	channelList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Channel',
		},
	],
	studyList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Study',
		},
	],
	todoList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Todo',
		},
	],
	accessKey: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('User', User);
