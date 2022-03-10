const mongoose = require('mongoose');

const Study = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	commentList: [
		{
			type: { title: String, content: String, date: Date, isSecret: Boolean },
		},
	],
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ChannelUserGoal',
	},
});

module.exports = mongoose.model('Study', Study);
