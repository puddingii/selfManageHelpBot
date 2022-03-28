const mongoose = require('mongoose');

const Counter = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	seq_value: {
		type: Number,
		default: 1,
	},
});

module.exports = mongoose.model('Counter', Counter);
