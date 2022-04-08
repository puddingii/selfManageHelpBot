/** Dependency Injection File Bot */
declare namespace DIFB {
	interface Config {
		logger: typeof import('../config/logger');
		util: typeof import('../config/util');
	}

	interface Models {
		UserModel: typeof import('../model/User');
		ChannelModel: typeof import('../model/Channel');
		StudyModel: typeof import('../model/Study');
		TodoModel: typeof import('../model/Todo');
		ChannelUserGoalModel: typeof import('../model/ChannelUserGoal');
		AccountBookModel: typeof import('../model/AccountBook');
	}

	interface Controllers {}

	export interface FilesDI extends Config, Models, Controllers {}
}
