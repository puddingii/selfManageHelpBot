import { createAsyncThunk } from '@reduxjs/toolkit'

export interface DefaultLineGraph {
	dateOptions: DateOptions
	action: typeof createAsyncThunk
	title: String
	subTitle: String
}

export interface LineGraph extends DefaultLineGraph {
	data: Data
}

interface DateOptions {
	type: 'week' | 'month' // --> recur parameter unit 1 or 4
	unitType: 'won' | 'minutes'
	startDate: Date
}

interface Data {
	list: Array<{ date: Date; time: Number }>
	average: Number
}
