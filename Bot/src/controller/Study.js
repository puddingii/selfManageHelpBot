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
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @param {{ title: String, content: String, isSecret: Boolean }} comment
	 * @returns {number} 1 - success,  2 - channel is different,  3 - study status is false
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

	checkStudyInfo() {
		console.log(this.studyInfo);
	}

	/**
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @returns {Boolean | {userId: String, sTime: String, eTime:String, commentList: Array<String>, isStudying: Boolean}} if study status is false, this function will return false
	 */
	endStudy(userInfo) {
		const { userId, channelId } = userInfo;
		if (
			this.studyInfo[userId]?.isStudying &&
			this.studyInfo[userId].channelId === channelId
		) {
			this.studyInfo[userId].isStudying = false;
			return { ...this.studyInfo[userId], eTime: `${dayjs()}` };
		}
		return false;
	}

	/**
	 * Study start. This command cannot be used simultaneously with other channels.
	 * EX - (channel1 - startstudy >> channel2 - startstudy) : impossible
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @returns {number} 0 - already studying(failed),  1 - success
	 */
	startStudy(userInfo) {
		const { userId, channelId } = userInfo;
		if (this.studyInfo[userId]?.isStudying) {
			return 0;
		}
		this.studyInfo[userId] = {
			channelId,
			sTime: `${dayjs()}`,
			commentList: [],
			isStudying: true,
		};
		return 1;
	}
};
