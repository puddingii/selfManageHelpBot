import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getRepeatCnt } from '../../util/dayUtil'

/**
 * accountList를 참고하여 summary 반환
 * @param {import('../../interface/Store').ifStore.AccountBookAjaxResult.AccountBook} accountList 가계부 리스트
 * @param {{startDate: string, endDate: string}} dateInfo
 */
const calcSummary = (accountList, dateInfo) => {
	const summary = {
		fixedIncome: 0,
		notFixedIncome: 0,
		fixedOutcome: 0,
		notFixedOutcome: 0,
	}
	accountList.forEach(accountInfo => {
		if (accountInfo.isFixed) {
			/** 고정 금액 */
			const repeatCnt = getRepeatCnt(
				dateInfo.startDate,
				dateInfo.endDate,
				accountInfo.fixedDuration,
			)
			if (accountInfo.amount > 0) {
				/** 수입 */
				summary.fixedIncome += accountInfo.amount * repeatCnt
			} else {
				/** 지출 */
				summary.fixedOutcome += accountInfo.amount * repeatCnt
			}
		} else {
			/** 변동 금액 */
			if (accountInfo.amount > 0) {
				/** 수입 */
				summary.notFixedIncome += accountInfo.amount
			} else {
				/** 지출 */
				summary.fixedOutcome += accountInfo.amount
			}
		}
	})

	return summary
}

/** 일정 기간 내의 가계부 정보 가져오기 */
export const getAccountBookList = createAsyncThunk(
	'accountBook/getAccountBookList',
	async (param, thunkAPI) => {
		let { data } = await axios('https://api.bithumb.com/api/account-book/get-list', {
			userId: '',
			...param,
		})
		if (data.length > 0) {
			data = data.map(info => {
				const isFixed = info.isFixed === 'true'
				return { ...info, isFixed }
			})
		}

		return data
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
		/** @type {import('../../interface/Store').ifStore.AccountBookAjaxResult.AccountBook} 가계부 리스트 */
		accountList: [],
		summaryValues: {
			fixedIncome: 0,
			notFixedIncome: 0,
			fixedOutcome: 0,
			notFixedOutcome: 0,
		},
		isAjaxSucceed: true,
		ajaxMsg: '',
	},
	reducers: {
		increment: state => {
			state.value += 1
		},
	},
	extraReducers: builder => {
		/** getAccountBookList */
		builder
			.addCase(getAccountBookList.fulfilled, (state, action) => {
				const {
					payload,
					meta: {
						arg: { startDate, endDate },
					},
				} = action
				state.accountList = action.payload
				state.summaryValues = calcSummary(state.accountList, { startDate, endDate })
			})
			.addCase(getAccountBookList.rejected, (state, action) => {
				state.isAjaxSucceed = false
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
			.addDefaultCase((state, action) => {
				state.isAjaxSucceed = true
				state.accountList = []
			}),
			/** insertAccountBook */
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
			/** deleteAccountBook */
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
