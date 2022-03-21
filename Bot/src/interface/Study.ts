export namespace Study {
	export type StudyInfo = {
		[key: string]: {
			channelId: String;
			sTime: String;
			commentList: Array<String>;
			isStudying: boolean;
		};
	};
	export type userInfo = {
		userId: string;
		channelId: string;
	};
}
