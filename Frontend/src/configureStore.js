import { configureStore } from '@reduxjs/toolkit'
import user from './store/reducer/user'

export default function configureAppStore(preloadedState = {}) {
	const store = configureStore({
		reducer: {
			user,
		},
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState,
	})

	return store
}
