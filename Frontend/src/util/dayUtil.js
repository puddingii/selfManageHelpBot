import dayjs from 'dayjs'

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

	if (typeof cnt !== 'number') return -1

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
 * 해당 기간동안 몇번이나 반복하는지 startDate를 포함하기 때문에 1이 기본값으로 리턴함
 * 1 + 반복횟수
 * @param {string} startDate 시작 날짜
 * @param {string} endDate 끝 날짜
 * @param {string} duration 반복 날짜
 * @returns {number} startDate기준으로 해당 기간동안 몇번인지
 * @example
 * getRepeatCnt('2022-03-01', '2022-03-05', '1w') // 1
 * getRepeatCnt('2022-03-01', '2022-03-11', '1w') // 2
 */
export const getRepeatCnt = (startDate, endDate, duration) => {
	const diff = dayjs(startDate).diff(endDate, 'd')
	return diff / convertDurationToDay(duration) + 1
}
