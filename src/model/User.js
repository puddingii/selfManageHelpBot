const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

User.pre('save', async function () {
	if (this.accessKey !== '' && this.isModified('accessKey')) {
		this.accessKey = await bcrypt.hash(
			this.accessKey,
			parseInt(process.env.HASH_ROUND, 10),
		);
	}
});

/** 아이디로 유저정보 탐색 */
User.statics.findByUserId = async function (userId) {
	const userInfo = await this.findOne({ userId });
	return userInfo;
};

/** 유저정보에 채널 추가 */
User.statics.addChannel = async function (userId, channelInfo) {
	const user = await this.findOne({ userId }).populate('channelList');
	if (!user) {
		throw new Error('User is not found.');
	}
	if (user.channelList.find(dbChannel => dbChannel.channelId === channelInfo.channelId)) {
		return;
	}
	user.channelList.push(channelInfo);
	await user.save();

	return 1;
};

/** 유저정보에 공부정보 추가 */
User.statics.addStudy = async function (userId, studyInfo) {
	const user = await this.findOne({ userId }).populate('studyList');
	if (!user) {
		throw new Error('User is not found.');
	}

	user.studyList.push(studyInfo);
	await user.save();

	return 1;
};

/** 유저정보에 Todo정보 추가 */
User.statics.addTodo = async function (userId, todoInfo) {
	const user = await this.findOne({ userId }).populate('todoList');
	if (!user) {
		throw new Error('User is not found.');
	}

	user.todoList.push(todoInfo);
	await user.save();

	return 1;
};

/**
 * Random id 생성 후 저장 및 return
 * @this import('mongoose').Model
 * @param {String} userId
 */
User.statics.getRandomId = async function (userId) {
	const user = await this.findOne({ userId });
	if (!user) {
		throw new Error('User is not found.');
	}

	const randomString = Math.random().toString(36).slice(2);
	user.accessKey = randomString;
	await user.save();

	return randomString;
};

module.exports = mongoose.model('User', User);
