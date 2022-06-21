import React, { Children, Component } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

// https://stackoverflow.com/questions/42733986/react-how-to-wait-and-fade-out
export const LoginModal = () => {
	return (
		<LoginModal.Frame className={'modal-content'} show={true}>
			<LoginModal.Header>
				<LoginModal.Title>Sign In</LoginModal.Title>
			</LoginModal.Header>
			<Modal.Body>
				<Form>
					<FormGroup>
						<InputGroup>
							<FieldIcon>
								<FontAwesomeIcon
									icon={faUser}
									className="position-relative"
									style={{ top: '6px' }}
								/>
							</FieldIcon>
							<FormControl placeholder="Username" />
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<InputGroup>
							<FieldIcon>
								<FontAwesomeIcon
									icon={faLock}
									className="position-relative"
									style={{ top: '6px' }}
								/>
							</FieldIcon>
							<FormControl placeholder="Password" />
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<FilledButton size="lg" className="btn-block">
							Sign In
						</FilledButton>
					</FormGroup>
					<p
						style={{
							textAlign: 'center',
							paddingTop: '5px',
							fontSize: '13px',
						}}
					>
						<a href="#" style={{ color: '#19aa8d', textDecoration: 'none' }}>
							Forgot Password?
						</a>
					</p>
				</Form>
			</Modal.Body>
			<LoginModal.Footer>
				Don't have an account?
				<a href="#" style={{ color: '#19aa8d', textDecoration: 'none' }}>
					Create one
				</a>
			</LoginModal.Footer>
		</LoginModal.Frame>
	)
}

// const modalFrame = styled(Modal)`
// 	color: #999;
// 	border-radius: 1px;
// 	margin-bottom: 15px;
// 	background: #fff;
// 	border: 1px solid #f3f3f3;
// 	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
// 	padding: 25px;
// `

const modalFrame = props => {
	return (
		<div
			id="myModal"
			className="modal fade show"
			aria-modal="true"
			data-backdrop="static"
			role="dialog"
			style={{ display: 'block', background: 'rgba(203, 203, 210, 0.15)' }}
		>
			<div className="modal-dialog modal-dialog-centered modal-login">
				<div
					className="modal-content"
					style={{
						color: '#999',
						borderRadius: '1px',
						marginBottom: '15px',
						background: '#fff',
						border: '1px solid #f3f3f3',
						boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
						padding: '25px',
					}}
				>
					{props.children}
				</div>
			</div>
		</div>
	)
}

const ModalFrame = styled.div`
	color: #999;
	border-radius: 1px;
	margin-bottom: 15px;
	background: #fff;
	border: 1px solid #f3f3f3;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	padding: 25px;
`

const header = styled(Modal.Header)`
	border-bottom: none;
	position: relative;
	justify-content: center;
`

const title = styled(Modal.Title)`
	color: #636363;
	text-align: center;
	font-size: 26px;
	margin-top: 0;
	margin-bottom: 0;
	line-height: 1.5;
`
const footer = styled(Modal.Footer)`
	color: #999;
	border-color: #dee4e7;
	text-align: center;
	margin: 0 -25px -25px;
	font-size: 13px;
	justify-content: center;
`

const FormGroup = styled(Form.Group)`
	margin-bottom: 20px;
`

const FieldIcon = styled.span`
	max-width: 42px;
	text-align: center;
	background: none;
	border-bottom: 1px solid #ced4da;
	padding-right: 5px;
	border-radius: 0;
`

const FormControl = styled(Form.Control)`
	min-height: 38px;
	padding-left: 5px;
	box-shadow: none !important;
	border-width: 0 0 1px 0;
	border-radius: 0;
	::placeholder {
		color: #999;
	}
`

const FilledButton = styled(Button)`
	font-size: 16px;
	font-weight: bold;
	background: #19aa8d !important;
	border-radius: 3px;
	border: none;
	min-width: 140px;
	color: white;
	padding: 0.5rem 1rem;
	/* font-size: 1.25rem; */
	line-height: 1.5;
	/* border-radius: 0.3rem; */
	&:hover {
		background: #179b81;
		color: white;
	}
`

LoginModal.Frame = modalFrame
LoginModal.Header = header
LoginModal.Title = title
LoginModal.Footer = footer
