const mongoose = require('mongoose');
const dayjs = require('dayjs');

const TodoCounter = require('./Counter');

const Todo = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: dayjs().subtract(9, 'hour').toDate(),
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
	proceed: {
		type: Number,
		default: 0,
	},
});

/**
 * Todo 추가
 * @this import('mongoose').Model
 * @param {{content: String, owner: import('mongoose').Query}}
 * @returns {Number}
 */
Todo.statics.createTodo = async function ({ content, owner }) {
	/** MongoDB Cloud에서는 Auto_Increment가 trigger로 작동하기 때문에 로직 추가 */
	const counter = await TodoCounter.findOneAndUpdate(
		{ name: 'Todo' },
		{ $inc: { seq_value: 1 } },
		{ returnNewDocument: true, upsert: true },
	);
	await this.create({
		content,
		owner,
		todoId: counter?.seq_value ?? 0,
	});

	return 1;
};

/**
 * 완료한 Todo 상태값 바꿔주기
 * @this import('mongoose').Model
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
	todo.proceed = 100;

	await todo.save();

	return -1;
};

/**
 * 자기의 Todo list 가져오기
 * @this import('mongoose').Model
 * @param {import('mongoose').Query} userInfo
 */
Todo.statics.getAllData = async function (userInfo) {
	const todo = await this.find({ owner: userInfo });
	return todo;
};

module.exports = mongoose.model('Todo', Todo);
