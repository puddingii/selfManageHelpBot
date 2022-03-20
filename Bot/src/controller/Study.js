const dayjs = require('dayjs');

module.exports = class Study {
	static studyInfo = {};

	/**
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @param {String} serverId
	 */
	static startStudy(userInfo, serverId) {
		this.studyInfo[serverId] = {
			userId: userInfo.userId,
			sTime: `${dayjs()}`,
			commentList: [],
			isStudying: true,
		};
	}

	/**
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 */
	static endStudy(userInfo) {
		const { isStudying, sTime, commentList } = this.studyInfo[userInfo.userId];
		if (isStudying) {
			console.log({
				userId: userInfo.userId,
				sTime,
				eTime: `${dayjs()}`,
				commentList,
			});
		}
	}

	static init() {
		this.studyInfo = { asdf: 123123 };
	}
};
