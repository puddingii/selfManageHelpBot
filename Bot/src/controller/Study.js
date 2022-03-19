const dayjs = require('dayjs');

module.exports = class Study {
	static studyInfo = {};

	/**
	 * @param {import('../interface/Study').Study.studyUserInfo} studyUserInfo
	 */
	static startStudy(studyUserInfo, serverId) {
		// FIXME 아이디 검증 필요.
		this.studyInfo[serverId] = {
			userId: studyUserInfo.userId,
			sTime: `${dayjs()}`,
			commentList: [],
			isStudying: true,
		};
	}

	/**
	 * @param {import('../interface/Study').Study.studyUserInfo} studyUserInfo
	 */
	static endStudy(studyUserInfo) {
		const { isStudying, sTime, commentList } = this.studyInfo[studyUserInfo.userId];
		if (isStudying) {
			console.log({
				userId: studyUserInfo.userId,
				sTime,
				eTime: `${dayjs()}`,
				commentList,
			});
		}
	}

	constructor() {
		console.log();
	}
};
