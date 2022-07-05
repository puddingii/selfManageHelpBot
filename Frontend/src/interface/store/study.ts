export {}

export interface StudyFetchParam {
	userId: string
	startDate: string
	count: number
}

export interface StudyState {
	week: WeekData
	month: {}
	recentWeek: StudyRecentWeekData
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
