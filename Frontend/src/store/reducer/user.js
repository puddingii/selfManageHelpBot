import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk('user/login', async (param, thunkAPI) => {
	let response = null
	try {
		response = await axios.post(
			`${process.env.REACT_APP_BACKEND_DOMAIN}/user/login`,
			param,
		)
	} catch (e) {
		return Promise.reject(e.response.status)
	}
	return response
})

export const userIdCheck = createAsyncThunk(
	'user/USER_ID_CHECK',
	async (param, thunkAPI) => {
		let response = null
		try {
			const url = new URL(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/checkUserId`)
			for (const [key, value] of Object.entries(param)) {
				url.searchParams.set(key, value)
			}
			response = await axios.get(url.href, param)
		} catch (e) {
			return Promise.reject(e.response.status)
		}
		return response
	},
)

export const join = createAsyncThunk('user/JOIN', async (param, thunkAPI) => {
	let response = null
	try {
		response = await axios.post(
			`${process.env.REACT_APP_BACKEND_DOMAIN}/user/login`,
			param,
		)
	} catch (e) {
		return Promise.reject(e.response.status)
	}
	return response
})

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		login: {
			success: false,
			msg: '',
		},
		join: {},
	},
	reducers: {
		loginInit: state => {
			state.login = {}
		},
	},
	extraReducers: builder => {
		builder.addDefaultCase((state, action) => {})
	},
})

export const { loginInit } = userSlice.actions
export default userSlice.reducer
