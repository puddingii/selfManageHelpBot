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

/**
 * Todo 추가
 * @param {{content: String, owner: import('mongoose').Query}}
 * @returns {Number}
 */
Todo.statics.createTodo = async function ({ content, owner }) {
	/** MongoDB Cloud에서는 Auto_Increment가 trigger로 작동하기 때문에 로직 추가 */
	if (process.env.NODE_ENV === 'development') {
		const counter = await TodoCounter.findOneAndUpdate(
			{ name: 'Todo' },
			{ $inc: { seq_value: 1 } },
			{ returnNewDocument: true, upsert: true },
		);
		await this.create({
			content,
			owner,
			todoId: counter.seq_value ?? 1,
		});
	} else {
		await this.create({ content, owner });
	}
	return 1;
};

/**
 * 완료한 Todo 상태값 바꿔주기
 * @param {import('mongoose').Query} userInfo
 * @param {Number} todoId
 * @returns {Number} -1 : Success,  x > -1 : failed Index
 */
Todo.statics.updateComplete = async function (userInfo, todoId) {
	const todo = await this.findOne({ owner: userInfo, todoId });
	if (!todo) {
		return todoId;
	}
	todo.isCompleted = true;

	await todo.save();

	return -1;
};

module.exports = mongoose.model('Todo', Todo);
