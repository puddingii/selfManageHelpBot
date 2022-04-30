import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
		builder
			.addCase(fetchUserById.pending, (state, action) => {
				console.log('Data pending')
				state.temp = action.payload
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				console.log('Data fulfilled')
				state.temp = action.payload
			})
			.addCase(fetchUserById.rejected, (state, action) => {
				console.log('Data rejected')
				state.temp = action.payload
			})
			.addMatcher(
				action => {
					console.log(action)
					return true
				},
				(state, action) => {
					console.log('Matcher')
				},
			)
			.addDefaultCase((state, action) => {
				console.log('DefaultCase')
			})
	},
	// extraReducers: {

	// 	/** 데이터를 가져오기 전 */
	// 	[fetchUserById.pending]: (state, action) => {
	// 		console.log('Data pending')
	// 		state.temp = action.payload
	// 	},
	// 	/** Data를 성공적으로 가져왔을 경우 */
	// 	[fetchUserById.fulfilled]: (state, action) => {
	// 		console.log('Data fulfilled')
	// 		state.temp = action.payload
	// 	},
	// 	/** 데이터를 가져오는데 실패했을 경우 */
	// 	[fetchUserById.rejected]: (state, action) => {
	// 		console.log('Data rejected')
	// 		state.temp = action.payload
	// 	},
	// },
})

export const { increment } = userSlice.actions
export default userSlice.reducer
