const dayjs = require('dayjs');

module.exports = class Study {
	static instance;

	/** @type {import('../interface/Study').Study.StudyInfo} */
	studyInfo = {};

	/** Singleton */
	constructor() {
		if (Study.instance) {
			// eslint-disable-next-line no-constructor-return
			return Study.instance;
		}
		Study.instance = this;
	}

	/**
	 * Add comment when you are studying. Comment is about study information.
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @param {{ title: String, content: String, isSecret: Boolean }} comment
	 * @returns {Number} 1 - success,  2 - channel is different,  3 - study status is false
	 */
	addComment(userInfo, comment) {
		const { userId, channelId } = userInfo;
		if (
			this.studyInfo[userId]?.isStudying &&
			this.studyInfo[userId].channelId === channelId
		) {
			this.studyInfo[userId].commentList.push({ ...comment, date: `${dayjs()}` });
			return 1;
		}
		return this.studyInfo[userId]?.isStudying ? 2 : 3;
	}

	/**
	 * Stop studying and return my study information(start time, end time, comment etc...)
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @returns {import('../interface/Study').Study.endStudyReturns} Object - success ,2 - channel is different,  3 - study status is false
	 */
	endStudy(userInfo) {
		const { userId, channelId } = userInfo;
		if (this.studyInfo[userId].channelId !== channelId) {
			return 2;
		}
		if (this.studyInfo[userId]?.isStudying) {
			this.studyInfo[userId].isStudying = false;
			return { ...this.studyInfo[userId], endDate: `${dayjs()}` };
		}
		return 3;
	}

	/**
	 * Study start. This command cannot be used simultaneously with other channels.
	 * EX - (channel1 - startstudy >> channel2 - startstudy) : impossible
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @returns {Number} 0 - already studying(failed),  1 - success
	 */
	startStudy(userInfo) {
		const { userId, channelId } = userInfo;
		if (this.studyInfo[userId]?.isStudying) {
			return 0;
		}
		this.studyInfo[userId] = {
			channelId,
			startDate: `${dayjs()}`,
			commentList: [],
			isStudying: true,
		};
		return 1;
	}

	/**
	 * Stop studying.
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @returns {Number} 1 - success,  2 - channel is different,  3 - study status is false
	 */
	stopStudy(userInfo) {
		const { userId, channelId } = userInfo;
		if (this.studyInfo[userId].channelId !== channelId) {
			return 2;
		}
		if (this.studyInfo[userId]?.isStudying) {
			this.studyInfo[userId].isStudying = false;
			return 1;
		}
		return 3;
	}
};
