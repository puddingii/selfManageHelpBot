import { DateRange } from 'react-big-calendar'

export interface StudyFetchParam {
	userId: string
	startDate: string
	count: number
}

export interface StudyState {
	week: WeekData
	month: {}
	recentWeek: StudyRecentWeekData
	list: Array<StudyDetail>
}

export interface WeekData {
	list: Array<{ date: Date; time: Number }>
	average: Number
}

type DayOfWeekKor = '월' | '화' | '수' | '목' | '금' | '토' | '일'
export interface StudyRecentWeekData {
	dayLabel: Array<DayOfWeekKor>
	data: Array<Record<string, number>> /* <날짜:string, 시간(분단위):number> */
}

export interface StudyDetail {
	id: {
		date: Date
		timestamp: number
	}
	title: string
	commentList: Array<StudyComment>
	startDate: Date
	endDate: Date
}

export interface StudyComment {
	title: string
	content: string
	date: Date
	isSecret: boolean
}
