require('regenerator-runtime');
const { createContainer, asValue } = require('awilix');
const logger = require('./logger');
const util = require('./util');
const AccountBook = require('../model/AccountBook');
const User = require('../model/User');
const Study = require('../model/Study');
const Channel = require('../model/Channel');
const Todo = require('../model/Todo');
const ChannelUserGoal = require('../model/ChannelUserGoal');

const container = createContainer();

container.register({
	util: asValue(util),
	logger: asValue(logger),
	AccountBookModel: asValue(AccountBook),
	UserModel: asValue(User),
	StudyModel: asValue(Study),
	ChannelModel: asValue(Channel),
	TodoModel: asValue(Todo),
	ChannelUserGoalModel: asValue(ChannelUserGoal),
});

module.exports = container;
