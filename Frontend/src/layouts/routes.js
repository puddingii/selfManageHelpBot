import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from 'util/authenticate'

const LoginRequiredRoute = ({ path, component: Component }) => {
	return (
		<Route
			path={path}
			render={props => {
				if (isAuthenticated()) {
					return <Component {...props} />
				} else {
					return <Redirect to="/account/login" />
				}
			}}
		/>
	)
}

const NonLoginRequiredRoute = ({ path, component: Component }) => {
	return (
		<Route
			path={path}
			render={props => {
				if (isAuthenticated()) {
					return <Redirect to="/" />
				} else {
					return <Component {...props} />
				}
			}}
		/>
	)
}

export { LoginRequiredRoute, NonLoginRequiredRoute }
