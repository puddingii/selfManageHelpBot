import React, { Component } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// https://stackoverflow.com/questions/42733986/react-how-to-wait-and-fade-out

const ModalFrame = props => {
	return (
		<div
			id="myModal"
			className={`modal fade ${props.isShow ? 'show' : ''}`}
			aria-modal="true"
			data-backdrop="static"
			role="dialog"
			style={{ display: 'block' }}
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

const ModalHeader = styled(Modal.Header)`
	border-bottom: none;
	position: relative;
	justify-content: center;
`

const ModalTitle = styled(Modal.Title)`
	color: #636363;
	text-align: center;
	font-size: 26px;
	margin-top: 0;
	margin-bottom: 0;
	line-height: 1.5;
`
const ModalFooter = styled(Modal.Footer)`
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
`

const FormControl = styled(Form.Control)`
	min-height: 38px;
	padding-left: 1.4rem;
	box-shadow: none !important;
	border-width: 0 0 1px 0;
	border-radius: 0;
	::placeholder {
		color: #999;
	}
	&:focus {
		border: 0;
		border-bottom: 1px solid #aaaaaa;
		outline: 0 !important;
		color: #333333;
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
	line-height: 1.5;
	&:hover {
		background: #179b81;
		color: white;
	}
	&:focus {
		color: white;
		border-color: white;
	}
`
const LoginModal = () => null
LoginModal.Frame = ModalFrame
LoginModal.Header = ({ title }) => {
	return (
		<ModalHeader>
			<ModalTitle>{title}</ModalTitle>
		</ModalHeader>
	)
}
LoginModal.Body = ({ children }) => {
	return (
		<Modal.Body>
			<Form>{children}</Form>
		</Modal.Body>
	)
}
LoginModal.Footer = ModalFooter
LoginModal.Control = ({
	icon,
	isInvalid,
	placeholder,
	error,
	register,
	type = 'text',
	onFocus,
}) => {
	return (
		<FormGroup>
			<InputGroup>
				<FieldIcon>
					<FontAwesomeIcon
						icon={icon}
						className="position-absolute"
						style={{ top: '10px', zIndex: 99 }}
					/>
				</FieldIcon>
				<FormControl
					isInvalid={isInvalid}
					placeholder={placeholder}
					type={type}
					onFocus={onFocus}
					{...register}
				/>
				<Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
			</InputGroup>
		</FormGroup>
	)
}
LoginModal.Button = ({ text, handleClick }) => {
	return (
		<FormGroup>
			<FilledButton size="lg" className="btn-block" onClick={handleClick}>
				{text}
			</FilledButton>
		</FormGroup>
	)
}
LoginModal.Header.displayName = 'LoginModal.Header'
LoginModal.Body.displayName = 'LoginModal.Body'
LoginModal.Control.displayName = 'LoginModal.Control'
LoginModal.Button.displayName = 'LoginModal.Button'

export { LoginModal }
