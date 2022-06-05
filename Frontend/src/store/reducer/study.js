import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * @type {import('../../interface/store/study').StudyState}
 */
const initialState = {
	week: {},
	month: {},
}

//@ts-check

/**
 * @param {import('../../interface/store/study').StudyFetchParam} param
 * @returns {import('../../interface/store/study').WeekData}
 */
const studyTimeByDate = async (param, thunkAPI) => {
	const res = await axios.post('http://localhost:8080/api/study/time', param, {
		headers: {
			'Referrer-Policy': 'no-referrer-when-downgrade',
		},
	})
	return res.data
}

export const fetchStudyWeekTimeByDate = createAsyncThunk(
	'study/fetchStudyWeekTimeByDate',
	studyTimeByDate,
)

export const studySlice = createSlice({
	name: 'study',
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchStudyWeekTimeByDate.fulfilled, (state, action) => {
			state.week = action.payload
		})
	},
})

export default studySlice.reducer
