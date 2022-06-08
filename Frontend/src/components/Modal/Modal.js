import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Dropdown, Nav, Row, Col, Form } from 'react-bootstrap'

//
const CommonModal = () => {
	const [show, setShow] = useState(true)
	const [formVals, setFormVal] = useState(
		inputs.reduce((prev, current) => ({ ...prev, [current.name]: '' }), {}),
	)
	const [formStatus, setFormStatus] = useState(
		inputs.reduce((prev, current) => ({ ...prev, [current.name]: false }), {}),
	)

	const handleInput = e => {
		setFormVal({ ...formVals, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		console.log('마')
		e.preventDefault()
	}

	const validation = () => {
		let result = true
		for (const name in formVals) {
			if (formVals[name] === 'test') {
				setFormStatus({ ...formStatus, [name]: true })
				result = false
			} else {
				setFormStatus({ ...formStatus, [name]: false })
			}
		}
		return result
	}

	const handleClose = () => setShow(false)
	const formRef = useRef()
	// const handleShow = () => setShow(true)
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<ModalBody handleInput={handleInput} handleSubmit={handleSubmit} ref={formRef} />
				<Modal.Footer>
					{buttons.map((e, i) => {
						return (
							<Button
								variant="secondary"
								className="btn-fill"
								onClick={el => {
									// formRef.current.submit()
									formRef.current.dispatchEvent(new Event('submit', { cancelable: true }))
									console.log(formRef.current)
									e.onClick()
									el.target.blur()
								}}
								key={i}
							>
								{e.text}
							</Button>
						)
					})}
				</Modal.Footer>
			</Modal>
		</>
	)
}

const ModalBody = forwardRef(({ handleInput, handleSubmit }, ref) => {
	const elementIdPrefix = new Date().getTime()
	return (
		<>
			<Container>
				<Form ref={ref} onSubmit={handleSubmit}>
					{inputs.map((e, i) => {
						const elementId = e.id ? e.id : `${elementIdPrefix}-${i}`
						const ref = useRef()
						return (
							<Row key={i} className="my-2">
								<Col className="col-3" ref={ref}>
									<Form.Label
										htmlFor={elementId}
										style={{
											lineHeight: ref.current?.clientHeight + 'px',
											marginBottom: 0,
										}}
									>
										{e.label}
									</Form.Label>
								</Col>
								<Col className="col-9">
									<Form.Control
										id={elementId}
										type={e.type}
										placeholder={e.placeholder}
										defaultValue={e.value}
										readOnly={e.readonly}
										onChange={handleInput}
										required={e.required}
									/>
								</Col>
							</Row>
						)
					})}
				</Form>
			</Container>
		</>
	)
})
ModalBody.displayName = 'ModalBody'

export const AccountBookModal = () => {
	return <CommonModal />
}

// body에 들어갈 애들
const inputs = [
	{
		label: 'ID',
		placeholder: '유저아이디',
		value: '',
		type: 'text',
		readonly: true,
		name: 'userId',
	},
	{
		label: 'ID',
		placeholder: '유저아이디',
		value: '',
		type: 'password',
		name: 'passwd',
		required: true,
	},
]

// footer에 들어갈 애들(hidden)
const hiddenInputs = {}

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

const onSubmit = e => {
	console.log(e.target)
}
