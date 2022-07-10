import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getRepeatCnt } from '../../util/dayUtil'
import _ from 'lodash'

/**
 * 가계부 데이터 정보
 * @typedef {import('../../interface/Store').ifStore.AccountBookAjax.AccountInfo} AccountDataType
 * @typedef {import('../../interface/Store').ifStore.AccountBookAjax.CreateNewAccountInfo} CreateNewAccountInfo
 */

/**
 * accountList를 참고하여 summary 반환
 * @param {AccountDataType[]} accountList 가계부 리스트
 * @param {{startDate: string, endDate: string}} dateInfo
 */
export const calcSummaryType = (accountList, dateInfo) => {
	const summary = {
		income: {},
		outcome: {},
	}
	accountList.forEach(accountInfo => {
		const repeatCnt = accountInfo.isFixed
			? getRepeatCnt({
					curDate: accountInfo.date,
					startDate: dateInfo.startDate,
					endDate: dateInfo.endDate,
					duration: accountInfo.fixedDuration,
			  })
			: 1
		const comeType = accountInfo.amount > 0 ? 'income' : 'outcome'
		summary[comeType][accountInfo.category] = summary[comeType][accountInfo.category]
			? summary[comeType][accountInfo.category] + repeatCnt * Math.abs(accountInfo.amount)
			: repeatCnt * Math.abs(accountInfo.amount)
	})
	return summary
}

/**
 * accountList를 참고하여 summary 반환
 * @param {AccountDataType[]} accountList 가계부 리스트
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
		/** 고정 금액 */
		if (accountInfo.isFixed) {
			const repeatCnt = getRepeatCnt({
				curDate: accountInfo.date,
				startDate: dateInfo.startDate,
				endDate: dateInfo.endDate,
				duration: accountInfo.fixedDuration,
			})
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
	 * @returns {AccountDataType[]}
	 */
	async params => {
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

		return data
	},
)

/** 가계부 작성 */
export const insertAccountBook = createAsyncThunk(
	'accountBook/insertAccountBook',
	/**
	 * @param {CreateNewAccountInfo} data
	 * @returns {{ msg: string, code: string, accountId: number, accountInfo: CreateNewAccountInfo }}
	 */
	async data => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/account-book`,
			method: 'post',
			data,
		})
		return { ...response.data, accountInfo: data }
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
	 * @param {AccountDataType} data
	 * @returns {{ msg: string, code: string, updatedData: AccountDataType }}
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
		/** @type {AccountDataType[]} 가계부 리스트 */
		accountList: [],
		isAjaxSucceed: 'fulfilled',
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
			.addCase(getAccountBookList.pending, state => {
				state.isAjaxSucceed = 'pending'
			})
			.addCase(getAccountBookList.fulfilled, (state, action) => {
				const { payload } = action
				payload.forEach(account => {
					if (account.fixedDuration) {
						const sliceCnt = account.fixedDuration.slice(-2) === 'md' ? -2 : -1
						account.durationType = account.fixedDuration.slice(sliceCnt)
						account.durationCnt = parseInt(account.fixedDuration.slice(0, sliceCnt), 10)
					}
				})
				state.accountList = payload
				state.isAjaxSucceed = 'fulfilled'
			})
			.addCase(getAccountBookList.rejected, (state, action) => {
				state.isAjaxSucceed = 'reject'
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
		/** insertAccountBook */
		builder
			.addCase(insertAccountBook.fulfilled, (state, action) => {
				const { code, msg, accountId, accountInfo } = action.payload
				if (code === 1) {
					if (accountInfo.userId) delete accountInfo.userId
					state.accountList.push({ accountId, ...accountInfo })
				}
				state.isAjaxSucceed = code === 1
				state.ajaxMsg = msg
			})
			.addCase(insertAccountBook.rejected, (state, action) => {
				state.isAjaxSucceed = 'reject'
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
