import { configureStore } from '@reduxjs/toolkit'
import user from './store/reducer/user'
import accountBook from './store/reducer/accountBook'
import study from './store/reducer/study'
import todo from './store/reducer/todo'

export default function configureAppStore(preloadedState = {}) {
	const store = configureStore({
		reducer: {
			user,
			accountBook,
			study,
			todo,
		},
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	})

	return store
}
