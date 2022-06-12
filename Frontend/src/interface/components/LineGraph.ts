import { createAsyncThunk } from '@reduxjs/toolkit'
import { WeekData } from 'interface/store/study'

export interface DefaultLineGraph {
	dateOptions: DateOptions
	action: typeof createAsyncThunk
	title: String
	subTitle: String
}

export interface LineGraph extends DefaultLineGraph {
	data: WeekData
}

interface DateOptions {
	type: 'week' | 'month' // --> recur parameter unit 1 or 4
	unitType: 'won' | 'minutes'
	startDate: Date
}
