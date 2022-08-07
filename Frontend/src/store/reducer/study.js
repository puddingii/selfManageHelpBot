import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * @type {import('../../interface/store/study').StudyState}
 */
const initialState = {
	week: {},
	month: {},
	recentWeek: {},
	list: [],
}

//@ts-check

const studyTimeByDate = async (param, thunkAPI) => {
	const res = await axios.post(
		`${process.env.REACT_APP_BACKEND_DOMAIN}/api/study/time`,
		param,
		{
			headers: {
				'Referrer-Policy': 'no-referrer-when-downgrade',
			},
		},
	)
	return res.data
}

export const fetchStudyWeekTimeByDate = createAsyncThunk(
	'study/fetchStudyWeekTimeByDate',
	/**
	 * @param {import('../../interface/store/study').StudyFetchParam} param
	 * @returns {import('../../interface/store/study').WeekData}
	 */
	async (param, thunkAPI) => {
		const res = await axios.post(
			`${process.env.REACT_APP_BACKEND_DOMAIN}/study/time`,
			{ ...param, userId: 'gun4930' },
			{
				headers: {
					'Referrer-Policy': 'no-referrer-when-downgrade',
				},
			},
		)
		return res.data
	},
)

export const fetchStudyWeekTime = createAsyncThunk(
	'study/STUDY_WEEK_TIME',
	/**
	 * @param {{week:number}} param
	 * @returns {import('../../interface/store/study').StudyRecentWeekData}
	 */
	async (param, thunkAPI) => {
		const res = await axios.post(
			`${process.env.REACT_APP_BACKEND_DOMAIN}/study/weeks/${param.week}`,
			{ userId: 'gun4930' },
		)
		return res.data
	},
)

export const fetchStudyDetailList = createAsyncThunk(
	'study/STUDY_DETAIL_LIST',
	/**
	 * @param {{startDate:Date, endDate:Date}} param
	 * @returns {import('../../interface/store/study').StudyDetail}
	 */
	async (param, thunkAPI) => {
		const host = 'http://localhost:8080/api/study/list'
		const url = new URL(host)
		url.searchParams.set('userId', 'test123456')
		url.searchParams.set('startDate', param.startDate)
		url.searchParams.set('endDate', param.endDate)
		const res = await axios.get(url.href)
		return res.data
	},
)

export const studySlice = createSlice({
	name: 'study',
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchStudyWeekTimeByDate.fulfilled, (state, action) => {
				state.week = action.payload
			})
			.addCase(fetchStudyWeekTime.fulfilled, (state, action) => {
				state.recentWeek = action.payload
			})
			.addCase(fetchStudyDetailList.fulfilled, (state, action) => {
				state.list = action.payload
			})
	},
})

export default studySlice.reducer
