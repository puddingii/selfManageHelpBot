import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { LoginModal } from 'views/Account/Component'

const LoginLayout = () => {
	// const getRoutes = routes => {
	// 	return routes.map((prop, key) => {
	// 		switch (prop.layout) {
	// 			case '/study': {
	// 				return (
	// 					<Route
	// 						path={prop.layout + prop.path}
	// 						render={props => <prop.component {...props} />}
	// 						key={key}
	// 					/>
	// 				)
	// 			}
	// 			default:
	// 				return null
	// 		}
	// 	})
	// }
	// React.useEffect(() => {
	// 	document.documentElement.scrollTop = 0
	// 	document.scrollingElement.scrollTop = 0
	// 	mainPanel.current.scrollTop = 0
	// 	if (
	// 		window.innerWidth < 993 &&
	// 		document.documentElement.className.indexOf('nav-open') !== -1
	// 	) {
	// 		document.documentElement.classList.toggle('nav-open')
	// 		var element = document.getElementById('bodyClick')
	// 		element.parentNode.removeChild(element)
	// 	}
	// }, [location])
	return (
		<Container>
			<LoginModal></LoginModal>
			{/* <div
				id="myModal"
				className="modal fade show"
				aria-modal="true"
				style={{ display: 'block', background: 'rgba(203, 203, 210, 0.15)' }}
				data-backdrop="static"
				role="dialog"
			>
				<div className="modal-dialog modal-dialog-centered modal-login">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Sign In</h4>
						</div>
						<div className="modal-body">
							<form action="/examples/actions/confirmation.php" method="post" noValidate>
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon is-invalid">
											<i className="fa fa-user" aria-hidden="true"></i>
										</span>
										<input
											type="text"
											className="form-control is-invalid"
											name="username"
											placeholder="Username"
											required="required"
											aria-describedby="validationServer03Feedback"
										/>
										<div id="validationServer03Feedback" className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon">
											<i className="fa fa-lock" aria-hidden="true"></i>
										</span>
										<input
											type="text"
											className="form-control"
											name="password"
											placeholder="Password"
											required="required"
										/>
									</div>
								</div>
								<div className="form-group">
									<button type="submit" className="btn btn-primary btn-block btn-lg">
										Sign In
									</button>
								</div>
								<p className="hint-text">
									<a href="#">Forgot Password?</a>
								</p>
							</form>
						</div>
						<div className="modal-footer">
							Don't have an account? <a href="#">Create one</a>
						</div>
					</div>
				</div>
			</div> */}
		</Container>
	)
}

export default LoginLayout
