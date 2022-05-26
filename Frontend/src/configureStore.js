import { configureStore } from '@reduxjs/toolkit'
import user from './store/reducer/user'
import accountBook from './store/reducer/accountBook'

export default function configureAppStore(preloadedState = {}) {
	const store = configureStore({
		reducer: {
			user,
			accountBook,
		},
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState,
	})

	return store
}
