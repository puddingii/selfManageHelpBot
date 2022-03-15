const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
	userId: {
		type: Number,
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

User.pre('save', async function () {
	if (this.accessKey !== '' && this.isModified('accessKey')) {
		this.accessKey = await bcrypt.hash(this.accessKey, process.env.HASH_ROUND);
	}
});

User.statics.findByUserId = async function (userId) {
	const userInfo = await this.findOne({ userId });
	return userInfo;
};

module.exports = mongoose.model('User', User);
