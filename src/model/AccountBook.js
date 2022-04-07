const mongoose = require('mongoose');
const TodoCounter = require('./Counter');

const AccountBook = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	amount: {
		type: Number,
		required: true,
	},
	isFixed: {
		type: Boolean,
		required: true,
	},
	category: {
		type: String,
	},
	content: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	accountId: {
		type: Number,
	},
});

/**
 * user에 해당하는 리스트 추출
 * @this import('mongoose').Model
 * @param {import('mongoose').Query} userInfo
 */
AccountBook.statics.createMyAccount = async function (accountBookInfo) {
	if (process.env.NODE_ENV === 'development') {
		const counter = await TodoCounter.findOneAndUpdate(
			{ name: 'AccountBook' },
			{ $inc: { seq_value: 1 } },
			{ returnNewDocument: true, upsert: true },
		);
		await this.create({ ...accountBookInfo, accountId: counter?.seq_value ?? 1 });
	} else {
		await this.create({ ...accountBookInfo });
	}
	return 1;
};

/**
 * user에 해당하는 리스트 추출
 * @this import('mongoose').Model
 * @param {import('mongoose').Query} userInfo
 */
AccountBook.statics.findByUser = async function (userInfo) {
	const accountList = await this.find({ user: userInfo });

	return accountList;
};

module.exports = mongoose.model('AccountBook', AccountBook);
