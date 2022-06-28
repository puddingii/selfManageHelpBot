import dayjs from 'dayjs'

export const formatDurationType = duration => {
	return duration.slice(-2) === 'md'
		? `매달 ${parseInt(duration.slice(0, -2), 10)}일`
		: `${convertDurationToDay(duration)}일 마다`
}

/**
 * month, year, week 등을 day로 계산
 * @param {string} duration 기간
 * @returns {number} day로 계산된 숫자 -1인 경우 duration에 이상한 값이 들어갔을 경우
 * @example
 * convertDurationToDay('3w') // 21
 * convertDurationToDay('1m') // 30
 * convertDurationToDay('1y') // 365
 */
export const convertDurationToDay = duration => {
	const type = duration.slice(-1)
	const cnt = parseInt(duration.slice(0, -1), 10)

	if (typeof cnt !== 'number' || duration.slice(-2) === 'md') return -1
	switch (type) {
		case 'w':
			return cnt * 7
		case 'm':
			return cnt * 30
		case 'y':
			return cnt * 365
		case 'd':
			return cnt
		default:
			return -1
	}
}

/**
 * 해당 기간동안 몇번이나 반복하는지?
 * (((시작날짜 - 등록된 날짜) % 주기 + (끝 날짜 - 시작 날짜의 일)) / 주기
 * @param {{ startDate: string, endDate: string, curDate: string, duration: string }} dateInfo
 * @returns {number} startDate기준으로 해당 기간동안 몇번인지
 * @example
 * getRepeatCnt('2022-03-01', '2022-03-05', '1w') // 1
 * getRepeatCnt('2022-03-01', '2022-03-11', '1w') // 2
 */
export const getRepeatCnt = ({ startDate, endDate, curDate, duration }) => {
	if (dayjs(endDate).diff(curDate) < 0) return 0
	curDate = dayjs(curDate)
	const convertedDuration = convertDurationToDay(duration)
	let cnt = 0

	// 매달마다 특정날짜인 경우
	if (convertedDuration === -1) {
		let chkDate = dayjs(curDate).set('date', parseInt(duration.slice(0, -2), 10))
		if (chkDate.diff(startDate, 'd') < 0) {
			chkDate = chkDate.set('M', dayjs(startDate).month())
		}

		while (chkDate.diff(dayjs(endDate), 'd') <= 0) {
			cnt++
			chkDate = chkDate.add(1, 'M')
		}

		return cnt
	}

	let diff = dayjs(startDate).diff(curDate, 'd')
	if (diff <= 0 && dayjs(endDate).diff(curDate, 'd') >= 0) {
		cnt = 1
		startDate = curDate
	}
	let diff2 = dayjs(endDate).diff(startDate, 'd') + 1

	diff = diff < 0 ? 0 : diff
	diff2 = diff2 < 0 ? 0 : diff2

	return Math.floor(((diff % convertedDuration) + diff2) / convertedDuration) + cnt
}
