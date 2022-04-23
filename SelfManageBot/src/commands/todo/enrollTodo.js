const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	cradle: { UserModel, TodoModel, logger },
} = require('../../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enrolltodo')
		.setDescription('할일 등록하기')
		.addStringOption(option =>
			option.setName('content').setDescription('내용').setRequired(true),
		),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const content = interaction.options.getString('content');
			let result = 0;

			/** DB Info */
			const user = await UserModel.findByUserId(userId);
			if (!user) {
				result = 2;
			}

			if (content && result === 0) {
				const newTodo = await TodoModel.createTodo({ content, owner: user });
				result = await UserModel.addTodo(userId, newTodo);
			}
			let replyContent;

			switch (result) {
				case 0:
					replyContent = '[Fail]Content option is essential';
					break;
				case 1:
					replyContent = 'Enroll Todo';
					break;
				case 2:
					replyContent = '[Fail]User information is not existed';
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
