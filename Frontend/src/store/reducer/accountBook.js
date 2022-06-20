import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getRepeatCnt } from '../../util/dayUtil'
import _ from 'lodash'

/**
 * accountList를 참고하여 summary 반환
 * @param {import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo} accountList 가계부 리스트
 * @param {{startDate: string, endDate: string}} dateInfo
 */
export const calcSummary = (accountList, dateInfo) => {
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
				accountInfo.date,
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
				summary.notFixedOutcome += accountInfo.amount
			}
		}
	})

	return summary
}

/** 일정 기간 내의 가계부 정보 가져오기 */
export const getAccountBookList = createAsyncThunk(
	'accountBook/getAccountBookList',
	/**
	 * @param {{userId: string, startDate: string, endDate: string}} params
	 * @returns {import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo[]}
	 */
	async params => {
		console.log(`${process.env.REACT_APP_BACKEND_DOMAIN}/account-book/list`)
		const { data: notFixedList } = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/account-book/list`,
			method: 'get',
			params,
		})

		const { data: fixedList } = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/account-book/fixedList`,
			method: 'get',
			params: { userId: params.userId },
		})

		let data = notFixedList.filter(notFixedInfo => !notFixedInfo.isFixed)
		data = data.concat(fixedList)

		console.log(data)

		return data
	},
)

/** 가계부 작성 */
export const insertAccountBook = createAsyncThunk(
	'accountBook/insertAccountBook',
	/**
	 * @param {import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo} data
	 * @returns {{ msg: string, code: string }}
	 */
	async data => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/account-book`,
			method: 'post',
			data,
		})
		return response.data
	},
)

/** 가계부 삭제 */
export const deleteAccountBook = createAsyncThunk(
	'accountBook/deleteAccountBook',
	/**
	 * @param {{ userId: string, accountId: string }} data
	 * @returns {{ msg: string, code: string, accountId: number }}
	 */
	async data => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/account-book`,
			method: 'delete',
			data,
		})

		return { ...response.data, accountId: data.accountId }
	},
)

/** 가계부 수정 */
export const updateAccountBook = createAsyncThunk(
	'accountBook/updateAccountBook',
	/**
	 * @param {import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo} data
	 * @returns {{ msg: string, code: string, updatedData: import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo }}
	 */
	async data => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/account-book`,
			method: 'patch',
			data,
		})

		return { ...response.data, updatedData: data }
	},
)

export const accountBookSlice = createSlice({
	name: 'accountBook',
	initialState: {
		value: 0,
		/** @type {import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo[]} 가계부 리스트 */
		accountList: [],
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
				state.accountList = payload
				console.log('성공함', payload)
			})
			.addCase(getAccountBookList.rejected, (state, action) => {
				state.isAjaxSucceed = false
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
				console.log('실패함', action.error)
			})
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
		/** deleteAccountBook */
		builder
			.addCase(deleteAccountBook.fulfilled, (state, action) => {
				const { code, msg, accountId } = action.payload

				if (code === 1) {
					state.accountList = state.accountList.filter(account => {
						return account.accountId !== accountId
					})
				}

				state.isAjaxSucceed = code !== 1
				state.ajaxMsg = msg
			})
			.addCase(deleteAccountBook.rejected, (state, action) => {
				state.isAjaxSucceed = false
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
		/** updateAccountBook */
		builder
			.addCase(updateAccountBook.fulfilled, (state, action) => {
				const { code, msg, updatedData } = action.payload

				if (code === 1) {
					const accountIdx = state.accountList.findIndex(
						account => updatedData.accountId === account.accountId,
					)
					if (accountIdx !== -1) {
						state.accountList[accountIdx] = updatedData
					}
				}

				state.isAjaxSucceed = code !== 1
				state.ajaxMsg = msg
			})
			.addCase(updateAccountBook.rejected, (state, action) => {
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
