export {}

export interface StudyFetchParam {
	userId: string
	startDate: string
	count: number
}

export interface StudyState {
	week: WeekData
	month: {}
}

export interface WeekData {
	list: Array<{ date: Date; time: Number }>
	average: Number
}
