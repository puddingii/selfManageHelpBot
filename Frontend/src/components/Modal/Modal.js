import React, { useRef, useState, useLayoutEffect, useEffect, forwardRef } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Row, Col, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

/**
 *
 * @param {import('../../../src/interface/Component').ComponentOptions.Modal} props
 * @returns {Component}
 */
export const AccountBookModal = props => {
	return <CommonModal {...props} />
}

/**
 *
 * @param {import('../../../src/interface/Component').ComponentOptions.Modal} props
 * @returns {Component}
 */
const CommonModal = ({ title, fields, buttons }) => {
	console.log(title, fields, buttons)
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

	useEffect(() => {
		console.log('ah')
		console.log(title, fields, buttons)
	}, [title, fields, buttons])

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="my-1">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Form onSubmit={() => false}>
							{fields &&
								fields.map((fieldOptions, i) => (
									<Field key={i} {...fieldOptions} errors={errors} register={register} />
								))}
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					{buttons?.customs &&
						buttons.customs.map((button, i) => {
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
					{buttons?.submit.use && (
						<Button
							variant="secondary"
							className={`btn-fill ${buttons.submit.className}`}
							onClick={handleSubmit(onSubmit)}
						>
							{buttons.submit.text ? buttons.submit.text : 'Submit'}
						</Button>
					)}
					{buttons?.reset.use && (
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

const Field = props => {
	const elementId = props.id ? props.id : `${new Date().getTime()}`
	const labelRef = useRef()
	const inputRef = useRef()
	useEffect(() => {
		console.log(inputRef.current.clientHeight)
		labelRef.current.style.lineHeight = inputRef.current.clientHeight + 'px'
	}, [])
	return (
		<Row className="my-2">
			<Col className="col-3">
				<Form.Label
					ref={labelRef}
					htmlFor={elementId}
					style={{
						marginBottom: 0,
					}}
				>
					{props.label}
					{props.required && <RequiredSpan />}
				</Form.Label>
			</Col>
			<Col className="col-9">
				<FieldInput {...props} isInvalid={props.errors[props.name]} ref={inputRef} />
				{props.errors[props.name] && (
					<Form.Control.Feedback type="invalid">
						{props.errormessage}
					</Form.Control.Feedback>
				)}
			</Col>
		</Row>
	)
}

const FieldInput = forwardRef((props, ref) => {
	switch (props.type) {
		case 'text':
		case 'password':
			return (
				<Form.Control
					id={props.elementId}
					type={props.type}
					placeholder={props.placeholder}
					{...props.register(props.name, {
						required: props.required,
						value: props.value,
						setValueAs: v => v.trim(),
					})}
					ref={ref}
				/>
			)
		case 'checkbox':
			return (
				<Form.Check.Input
					id={props.elementId}
					type="checkbox"
					{...props.register(props.name, {
						value: props.value,
					})}
					disabled={props.disabled}
					ref={ref}
				></Form.Check.Input>
			)
		case 'select':
			return (
				<Form.Control
					id={props.elementId}
					as="select"
					{...props.register(props.name, {
						value: props.value,
					})}
					disabled={props.disabled}
					ref={ref}
				>
					{props.options &&
						props.options.map(option => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
						))}
				</Form.Control>
			)
	}
	return null
})
FieldInput.displayName = 'FieldInput'

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

export const modalprops = {
	title: 'Modal test~',
	fields: [
		{
			label: 'ID',
			placeholder: '유저아이디',
			value: '',
			type: 'text',
			readonly: true,
			name: 'userId',
			required: true,
			pattern: '',
			validate: () => {},
			errormessage: '아이디가 이상합니다',
		},
		{
			label: '비밀번호',
			placeholder: '비번',
			value: '',
			type: 'password',
			name: 'passwd',
			required: true,
			errormessage: '비밀번호가 이상합니다',
		},
		{
			label: '이름',
			placeholder: '유저이름',
			value: '롸',
			type: 'select',
			readonly: true,
			name: 'userId2',
			pattern: '',
			validate: () => {},
			options: [
				{ val: 1, text: '가' },
				{ val: 2, text: '나' },
				{ val: 3, text: '다' },
			],
		},
	],
	buttons: {
		submit: {
			use: true,
			text: '수정',
		},
		reset: {
			use: true,
			text: '초기화',
		},
	},
}

//버튼종류: submit, reset, custom
// submit: text, 사용여부, className
// reset: text, 사용여부, className
// customs: [{text, className, clickEvent}]
// 위치 submit reset | customs 이런식으로
// | submit reset customs
// submit | customs reset

// modal title
