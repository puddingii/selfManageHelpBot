import React, { useRef, useState, useLayoutEffect } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Row, Col, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

/**
 *
 * @param {import('../../../src/interface/Component').ComponentOptions.Modal} props
 * @returns {Component}
 */
export const AccountBookModal = props => {
	return <CommonModal />
}

/**
 *
 * @param {import('../../../src/interface/Component').ComponentOptions.Modal} props
 * @returns {Component}
 */
const CommonModal = ({ title, fields, buttons }) => {
	const [show, setShow] = useState(true)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm()

	const onSubmit = data => {
		console.log(data)
	}
	const elementIdPrefix = new Date().getTime()
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="my-1">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Form onSubmit={() => false}>
							{inputs.map((e, i) => {
								const elementId = e.id ? e.id : `${elementIdPrefix}-${i}`
								const labelRef = useRef()
								const inputRef = useRef()
								useLayoutEffect(() => {
									labelRef.current.style.lineHeight = inputRef.current.clientHeight + 'px'
								}, [])
								return (
									<Row key={i} className="my-2">
										<Col className="col-3">
											<Form.Label
												ref={labelRef}
												htmlFor={elementId}
												style={{
													marginBottom: 0,
												}}
											>
												{e.label}
												{e.required && <RequiredSpan />}
											</Form.Label>
										</Col>
										<Col className="col-9">
											<Form.Control
												id={elementId}
												type={e.type}
												placeholder={e.placeholder}
												{...register(e.name, {
													required: e.required,
													value: e.value,
													setValueAs: v => v.trim(),
												})}
												isInvalid={true}
												ref={inputRef}
											/>
											{errors[e.name] && (
												<Form.Control.Feedback type="invalid">
													{e.errormessage}
												</Form.Control.Feedback>
											)}
										</Col>
									</Row>
								)
							})}
							{/* 여러가지 input 테스트 */}
							<Row className="my-2">
								<Col className="col-3">
									<Form.Label
										style={{
											// lineHeight: ref.current?.clientHeight + 'px',
											marginBottom: 0,
										}}
									>
										{'select'}
									</Form.Label>
								</Col>
								<Col className="col-9">
									<Form.Control as="select">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Form.Control>
									<Form.Control.Feedback type="invalid">{'셀렉트'}</Form.Control.Feedback>
								</Col>
							</Row>
							<Row className="my-2">
								<Col className="col-3">
									<Form.Label
										style={{
											// lineHeight: ref.current?.clientHeight + 'px',
											marginBottom: 0,
										}}
									>
										{'check'}
										<RequiredSpan />
									</Form.Label>
								</Col>
								<Col className="col-9 text-center">
									<Form.Check.Input
										type="checkbox"
										{...register('bool', {
											value: true,
										})}
										disabled
									></Form.Check.Input>
									<Form.Control.Feedback type="invalid">{'췍'}</Form.Control.Feedback>
								</Col>
							</Row>
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					{buttons.customs.map((button, i) => {
						return (
							<Button
								key={i}
								variant="secondary"
								className="btn-fill"
								onClick={button.handleClick}
							>
								{button.text}
							</Button>
						)
					})}
					{buttons.submit.use && (
						<Button
							variant="secondary"
							className={`btn-fill ${buttons.submit.className}`}
							onClick={handleSubmit(onSubmit)}
						>
							{buttons.submit.text ? buttons.submit.text : 'Submit'}
						</Button>
					)}
					{buttons.reset.use && (
						<Button
							variant="secondary"
							className={`btn-fill ${buttons.reset.className}`}
							onClick={() => {
								reset({ keepDefaultValues: true })
							}}
						>
							{buttons.reset.text ? buttons.reset.text : 'Reset'}
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	)
}

const Field = () => {}

const RequiredSpan = () => {
	return <span className="text-danger align-middle">*</span>
}

const inputs = [
	{
		label: 'ID',
		placeholder: '유저아이디',
		value: '',
		type: 'text',
		readonly: true,
		name: 'userId',
		pattern: '',
		validate: () => {},
		errormessage: '',
	},
	{
		label: '비밀번호',
		placeholder: '비번',
		value: '',
		type: 'password',
		name: 'passwd',
		required: true,
	},
	{
		label: 'ID',
		placeholder: '유저아이디',
		value: '',
		type: 'select',
		readonly: true,
		name: 'userId2',
		pattern: '',
		validate: () => {},
		errormessage: '',
		options: [{ val: '', text: '' }],
	},
]

const buttons = [
	{
		text: 'button1',
		onClick: () => {
			console.log('click!click!click!click!click!')
		},
	},
	{
		text: 'button2',
		onClick: () => {
			console.log('click!click!click!click!click!2')
		},
	},
]
//버튼종류: submit, reset, custom
// submit: text, 사용여부, className
// reset: text, 사용여부, className
// customs: [{text, className, clickEvent}]
// 위치 submit reset | customs 이런식으로
// | submit reset customs
// submit | customs reset

// modal title
