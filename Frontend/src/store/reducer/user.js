import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// https://api.bithumb.com/public/ticker/ALL

/**
 * 비동기 작업 예제코드
 */
export const fetchUserById = createAsyncThunk(
	'user/fetchByIdStatus',
	async (userId, thunkAPI) => {
		const response = await axios('https://api.bithumb.com/public/ticker/ALL')
		return response.data
	},
)

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		value: 0,
		temp: {},
	},
	reducers: {
		increment: state => {
			state.value += 1
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state.temp = action.payload
		})
	},
})

export const { increment } = userSlice.actions
export default userSlice.reducer
