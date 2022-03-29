const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { UserModel, TodoModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('completetodos')
		.setDescription('할일 완료로 바꾸기')
		.addStringOption(option =>
			option
				.setName('todolist')
				.setDescription('쉼표로 구분해서 띄워쓰기없이 할일 번호를 입력해주세요.')
				.setRequired(true),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const todoString = (interaction.options.getString('todolist') ?? '').split(',');
			const todoList = new Set(todoString);
			let result = todoString ? 1 : 0;

			/** DB Info */
			const user = await UserModel.findByUserId(userId);
			if (!user) {
				result = 2;
			}

			const updatedObject = await Promise.all(
				Array.from(todoList).map(todo => {
					const todoIndex = parseInt(todo, 10);
					if (todoIndex) {
						return TodoModel.updateComplete(user, todoIndex);
					}
					return -1;
				}),
			);

			let notUpdatedTodo = '';
			if (updatedObject.find(updateIndex => updateIndex > -1)) {
				result = 3;
				notUpdatedTodo = updatedObject.reduce((result, currentVal) => {
					return currentVal > -1 ? `${result} ${currentVal}` : result;
				}, '');
			}

			let replyContent;
			switch (result) {
				case 0:
					replyContent = '[Fail]Todolist option is essential';
					break;
				case 1:
					replyContent = 'Complete Todo';
					break;
				case 2:
					replyContent = '[Fail]User information is not existed';
					break;
				case 3:
					replyContent = `[Fail]Update Failed...(Index : ${notUpdatedTodo} fail)`;
					break;
				default:
					replyContent = '[Fail]Error EnrollTodo';
			}

			await interaction.reply({ content: replyContent });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
