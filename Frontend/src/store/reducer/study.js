import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//@ts-check

/**
 * @param {{startDate: String, count:Number}} param
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
	initialState: {
		week: {},
		month: {},
		average: {},
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchStudyWeekTimeByDate.fulfilled, (state, action) => {
			state.week = action.payload
		})
	},
})

export default studySlice.reducer
