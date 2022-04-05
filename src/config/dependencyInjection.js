require('regenerator-runtime');
const { createContainer, asValue } = require('awilix');
const logger = require('./logger');
const User = require('../model/User');
const Study = require('../model/Study');
const Channel = require('../model/Channel');
const Todo = require('../model/Todo');
const ChannelUserGoal = require('../model/ChannelUserGoal');

const container = createContainer();

container.register({
	logger: asValue(logger),
	UserModel: asValue(User),
	StudyModel: asValue(Study),
	ChannelModel: asValue(Channel),
	TodoModel: asValue(Todo),
	ChannelUserGoalModel: asValue(ChannelUserGoal),
});

module.exports = container;
