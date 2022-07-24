import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

/** 일정 기간 내의 가계부 정보 가져오기 */
export const getTodoList = createAsyncThunk(
	'todo/getTodoList',
	/**
	 * @param {{userId: string}} params
	 */
	async params => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/todo`,
			method: 'get',
			params,
		})

		return response.data
	},
)

/** 가계부 작성 */
export const insertTodo = createAsyncThunk(
	'todo/insertTodo',
	/**
	 * @param {{content: string, userId: string}} data
	 */
	async data => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/todo`,
			method: 'post',
			data,
		})
		return response.data
	},
)

/** 가계부 삭제 */
export const deleteTodo = createAsyncThunk(
	'todo/deleteTodo',
	/**
	 * @param {{ userId: string, todoId: string }} params
	 */
	async params => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/todo`,
			method: 'delete',
			params,
		})

		return { ...response.data, todoId: params.todoId }
	},
)

/** 가계부 수정 */
export const updateTodo = createAsyncThunk(
	'todo/updateTodo',
	/**
	 * @param {{ userId: string, todoId: string }} params
	 */
	async params => {
		const response = await axios({
			url: `${process.env.REACT_APP_BACKEND_DOMAIN}/todo/complete`,
			method: 'get',
			params,
		})

		return { ...response.data, todoId: params.todoId }
	},
)

export const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		todoList: [],
		isAjaxSucceed: 'fulfilled',
		ajaxMsg: '',
	},
	extraReducers: builder => {
		/** getTodoList */
		builder
			.addCase(getTodoList.pending, state => {
				state.isAjaxSucceed = 'pending'
			})
			.addCase(getTodoList.fulfilled, (state, action) => {
				const { payload } = action

				state.todoList = payload
				state.isAjaxSucceed = 'fulfilled'
			})
			.addCase(getTodoList.rejected, (state, action) => {
				state.isAjaxSucceed = 'reject'
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
		/** insertTodo */
		builder
			.addCase(insertTodo.fulfilled, (state, action) => {
				const {
					payload: { todoId },
				} = action
				if (todoId) {
					state.todoList.push(action.payload)
				}
				state.isAjaxSucceed = !!todoId
			})
			.addCase(insertTodo.rejected, (state, action) => {
				state.isAjaxSucceed = 'reject'
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
		/** deleteTodo */
		builder
			.addCase(deleteTodo.fulfilled, (state, action) => {
				const { code, msg, todoId } = action.payload

				if (code === 1) {
					state.todoList = state.todoList.filter(todo => {
						return todo.todoId !== todoId
					})
				}

				state.isAjaxSucceed = code !== 1
				state.ajaxMsg = msg
			})
			.addCase(deleteTodo.rejected, (state, action) => {
				state.isAjaxSucceed = false
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
		/** updateTodo */
		builder
			.addCase(updateTodo.fulfilled, (state, action) => {
				const { code, msg, todoId } = action.payload

				if (code === 1) {
					const todoIdx = state.todoList.findIndex(todo => todoId === todo.todoId)
					if (todoIdx !== -1) {
						state.todoList[todoIdx].isCompleted = !state.todoList[todoIdx].isCompleted
					}
				}

				state.isAjaxSucceed = code !== 1
				state.ajaxMsg = msg
			})
			.addCase(updateTodo.rejected, (state, action) => {
				state.isAjaxSucceed = false
				state.ajaxMsg = '인터넷이나 서버가 불안정합니다...'
			})
			.addDefaultCase((state, action) => {
				state.isAjaxSucceed = true
			})
	},
})

export default todoSlice.reducer
