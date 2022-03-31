const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {
	cradle: { UserModel, TodoModel, logger },
} = require('../config/dependencyInjection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mytodo')
		.setDescription('Show list that has not yet been completed.'),
	/** @param {import('discord.js').CommandInteraction} interaction */
	async execute(interaction) {
		try {
			/** Discord Info */
			const userId = interaction.user.id.toString();
			const embedBox = new MessageEmbed();
			embedBox
				.setColor('#0099ff')
				.setTitle('My Todo List')
				.setDescription('Not completed list')
				.addField('\u200B', '\u200B')
				.setTimestamp();
			let result = 1;

			/** DB Info */
			const userInfo = await UserModel.findByUserId(userId);
			let todoList;

			if (!userInfo) {
				result = 2;
			} else {
				todoList = await TodoModel.getAllData(userInfo);
				result = todoList.length > 0 ? 1 : 3;
			}

			switch (result) {
				case 1:
					todoList.forEach(todo => {
						embedBox.addField(`- ${todo.todoId}번 -`, todo.content);
					});
					break;
				case 2:
					embedBox.addField('User', 'User information is not found.', true);
					break;
				case 3:
					embedBox.addField('Todo', 'List is empty', true);
					break;
				default:
					embedBox.addField('Error', 'Error', true);
			}

			await interaction.reply({ embeds: [embedBox] });
		} catch (err) {
			logger.error(err);
			await interaction.reply({ content: `${err}` });
		}
	},
};
