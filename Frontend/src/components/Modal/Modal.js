import React, {
	useRef,
	useState,
	useLayoutEffect,
	useEffect,
	forwardRef,
	Component,
	useImperativeHandle,
} from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Row, Col, Form } from 'react-bootstrap'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

/**
 *
 * @param {import('../../../src/interface/Component').ComponentOptions.Modal} props
 * @returns {Component}
 */
export const CommonModal = ({
	title,
	fields,
	hiddenFields,
	buttons,
	fieldValues,
	isShow,
	handleClose,
}) => {
	const methods = useForm()

	const onSubmit = async data => {
		const callback =
			typeof buttons.submit.callback === 'function'
				? buttons.submit.callback
				: async () => false
		if (await callback(data)) {
			handleClose()
		}
	}

	useEffect(() => {
		if (isShow) {
			methods.reset()
		}
	}, [isShow])

	return (
		<>
			<Modal show={isShow} onHide={handleClose}>
				<FormProvider {...methods}>
					<Modal.Header closeButton>
						<Modal.Title className="my-1">{title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Form onSubmit={() => false}>
								{fields &&
									fields.map((fieldOptions, i) => (
										<Field key={i} {...fieldOptions} fieldValues={fieldValues} />
									))}
								{hiddenFields &&
									hiddenFields.map((fieldOptions, i) => (
										<input
											key={i}
											type="hidden"
											{...methods.register(fieldOptions.name, {
												value: fieldValues[fieldOptions.name],
											})}
										/>
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
										onClick={e => {
											const formData = methods.watch()
											if (button.handleClick(e, formData)) {
												handleClose()
											}
										}}
									>
										{button.text}
									</Button>
								)
							})}
						{buttons?.submit.use && (
							<Button
								variant="secondary"
								className={`btn-fill ${buttons.submit.className}`}
								onClick={methods.handleSubmit(onSubmit)}
							>
								{buttons.submit.text ? buttons.submit.text : 'Submit'}
							</Button>
						)}
						{buttons?.reset.use && (
							<Button
								variant="secondary"
								className={`btn-fill ${buttons.reset.className}`}
								onClick={() => {
									methods.reset()
								}}
							>
								{buttons.reset.text ? buttons.reset.text : 'Reset'}
							</Button>
						)}
					</Modal.Footer>
				</FormProvider>
			</Modal>
		</>
	)
}

const Field = props => {
	const elementId = props.id ? props.id : `${new Date().getTime()}`
	const labelRef = useRef()
	const inputRef = useRef()
	useEffect(() => {
		labelRef.current.style.lineHeight = inputRef.current?.clientHeight + 'px'
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
			<Col className="col-9 text-center">
				<FieldInput {...props} ref={inputRef} />
			</Col>
		</Row>
	)
}

const FieldInput = forwardRef((props, inputRef) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const inputReg = register(props.name, {
		required: props.required,
		value: props.fieldValues[props.name] ?? props.value,
		pattern: props.pattern,
		// setValueAs: v => v.trim(),
	})
	const ref = el => {
		inputReg.ref(el)
		inputRef.current = el
	}

	let component = null
	switch (props.type) {
		case 'text':
		case 'password':
		case 'date':
			component = (
				<Form.Control
					id={props.elementId}
					type={props.type}
					placeholder={props.placeholder}
					isInvalid={errors[props.name]}
					{...inputReg}
					ref={ref}
				/>
			)
			break
		case 'checkbox':
			component = (
				<Form.Check.Input
					id={props.elementId}
					type="checkbox"
					disabled={props.disabled}
					isInvalid={errors[props.name]}
					{...inputReg}
					ref={ref}
					className="mx-0"
				></Form.Check.Input>
			)
			break
		case 'select':
			component = (
				<Form.Control
					as="select"
					id={props.elementId}
					disabled={props.disabled}
					isInvalid={errors[props.name]}
					{...inputReg}
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
	return (
		<>
			{component}
			{errors[props.name] && (
				<Form.Control.Feedback type="invalid">{props.errormessage}</Form.Control.Feedback>
			)}
		</>
	)
})
FieldInput.displayName = 'FieldInput'

const RequiredSpan = () => {
	return <span className="text-danger align-middle">*</span>
}

/* 테스트용 데이터 */
export const modalprops = {
	title: 'Modal test~',
	fields: [
		{
			label: 'ID',
			placeholder: '유저아이디',
			value: 'defaultId',
			type: 'text',
			readonly: true,
			name: 'userId',
			required: true,
			// pattern: '',
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
