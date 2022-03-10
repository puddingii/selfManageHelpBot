const { createContainer, asClass, asValue } = require('awilix');
const path = require('path');
const logger = require('./logger');
const User = require('../model/User');
const Study = require('../model/Study');
const Channel = require('../model/Channel');
const Todo = require('../model/Todo');
const ChannelUserGoal = require('../model/ChannelUserGoal');

const container = createContainer();

container.register({
	logger: asValue(logger),
	User: asValue(User),
	Study: asValue(Study),
	Channel: asValue(Channel),
	Todo: asValue(Todo),
	ChannelUserGoal: asValue(ChannelUserGoal),
});

module.exports = container;
