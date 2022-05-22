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
		discordId: string;
		channelId: string;
	};
	export type endStudyReturns =
		| {
				channelId: String;
				startDate: String;
				endDate: String;
				commentList: Array<String>;
				isStudying: Boolean;
		  }
		| Number;
}
