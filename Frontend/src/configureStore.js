import { configureStore } from '@reduxjs/toolkit'
import user from './store/reducer/user'
import accountBook from './store/reducer/accountBook'
import study from './store/reducer/study'

export default function configureAppStore(preloadedState = {}) {
	const store = configureStore({
		reducer: {
			user,
			accountBook,
			study,
		},
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState,
	})

	return store
}
