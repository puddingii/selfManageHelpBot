import React, { Component, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { LoginBox, SignUpBox } from 'views/Account'
import { Route, Switch } from 'react-router'

const LoginLayout = () => {
	useEffect(() => {
		document.body.style.backgroundColor = 'rgba(203, 203, 210, 0.15)'
	}, [])
	return (
		<Container>
			<Switch>
				<Route path="/:lang/login" component={LoginBox} />
				<Route path="/:lang/signup" component={SignUpBox} />
			</Switch>
		</Container>
	)
}

export default LoginLayout
