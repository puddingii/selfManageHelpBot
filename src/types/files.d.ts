/** Dependency Injection File Bot */
declare namespace DIFB {
	interface Config {
		logger: typeof import('../config/logger');
	}

	interface Models {
		UserModel: typeof import('../model/User');
		ChannelModel: typeof import('../model/Channel');
		StudyModel: typeof import('../model/Study');
		TodoModel: import('../model/Todo');
		ChannelUserGoalModel: import('../model/ChannelUserGoal');
	}

	interface Controllers {}

	export interface FilesDI extends Config, Models, Controllers {}
}
