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
		const { discordId, channelId } = userInfo;
		if (
			this.studyInfo[discordId]?.isStudying &&
			this.studyInfo[discordId].channelId === channelId
		) {
			this.studyInfo[discordId].commentList.push({ ...comment, date: `${dayjs()}` });
			return 1;
		}
		return this.studyInfo[discordId]?.isStudying ? 2 : 3;
	}

	/**
	 * Stop studying and return my study information(start time, end time, comment etc...)
	 * @param {import('../interface/Study').Study.userInfo} userInfo
	 * @returns {import('../interface/Study').Study.endStudyReturns} Object - success ,2 - channel is different,  3 - study status is false
	 */
	endStudy(userInfo) {
		const { discordId, channelId } = userInfo;
		if (this.studyInfo[discordId].channelId !== channelId) {
			return 2;
		}
		if (this.studyInfo[discordId]?.isStudying) {
			this.studyInfo[discordId].isStudying = false;
			return { ...this.studyInfo[discordId], endDate: `${dayjs()}` };
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
		const { discordId, channelId } = userInfo;
		if (this.studyInfo[discordId]?.isStudying) {
			return 0;
		}
		this.studyInfo[discordId] = {
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
		const { discordId, channelId } = userInfo;
		if (this.studyInfo[discordId].channelId !== channelId) {
			return 2;
		}
		if (this.studyInfo[discordId]?.isStudying) {
			this.studyInfo[discordId].isStudying = false;
			return 1;
		}
		return 3;
	}
};
