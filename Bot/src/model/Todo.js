const mongoose = require('mongoose');
const TodoCounter = require('./Counter');

const Todo = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	todoId: {
		type: Number,
	},
});

Todo.pre('save', async function (next) {
	if (process.env.NODE_ENV === 'development') {
		const counter = await TodoCounter.findOneAndUpdate(
			{ name: 'Todo' },
			{ $inc: { seq_value: 1 } },
			{ returnNewDocument: true, upsert: true },
		);

		this.todoId = counter.seq_value ?? 1;
	}

	next();
});

module.exports = mongoose.model('Todo', Todo);
