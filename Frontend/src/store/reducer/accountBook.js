import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

/** 일정 기간 내의 가계부 정보 가져오기 */
export const getAccountBookList = createAsyncThunk(
	'accountBook/getAccountBookList',
	async (param, thunkAPI) => {
		const response = await axios('https://api.bithumb.com/api/account-book/get-list', {
			userId: '',
			...param,
		})
		return response.data
	},
)

/** 가게부 작성 */
export const insertAccountBook = createAsyncThunk(
	'accountBook/insertAccountBook',
	async (param, thunkAPI) => {
		const response = await axios('https://api.bithumb.com/api/account-book/insert', {
			userId: '',
			...param,
		})
		return response.data
	},
)

/** 가게부 삭제 */
export const deleteAccountBook = createAsyncThunk(
	'accountBook/deleteAccountBook',
	async (param, thunkAPI) => {
		const response = await axios('https://api.bithumb.com/api/account-book/delete', {
			userId: '',
			...param,
		})
		return response.data
	},
)

export const accountBookSlice = createSlice({
	name: 'accountBook',
	initialState: {
		value: 0,
		accountList: [],
		summaryValues: [],
		isAjaxSucceed: true,
		ajaxMsg: '',
	},
	reducers: {
		increment: state => {
			state.value += 1
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getAccountBookList.fulfilled, (state, action) => {
				state.accountList = action.payload
			})
			.addCase(getAccountBookList.rejected, (state, action) => {
				state.isAjaxSucceed = false
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
			.addDefaultCase((state, action) => {
				state.isAjaxSucceed = true
				state.accountList = []
			}),
			builder
				.addCase(insertAccountBook.fulfilled, (state, action) => {
					const { code, msg } = action.payload

					state.isAjaxSucceed = code !== 1
					state.ajaxMsg = msg
				})
				.addCase(insertAccountBook.rejected, (state, action) => {
					state.isAjaxSucceed = false
					state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
				})
				.addDefaultCase((state, action) => {
					state.isAjaxSucceed = true
				}),
			builder
				.addCase(deleteAccountBook.fulfilled, (state, action) => {
					const { code, msg } = action.payload

					state.isAjaxSucceed = code !== 1
					state.ajaxMsg = msg
				})
				.addCase(deleteAccountBook.rejected, (state, action) => {
					state.isAjaxSucceed = false
					state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
				})
				.addDefaultCase((state, action) => {
					state.isAjaxSucceed = true
				})
	},
})

export const { increment } = accountBookSlice.actions
export default accountBookSlice.reducer
