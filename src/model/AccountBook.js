const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('AccountBook', AccountBook);
