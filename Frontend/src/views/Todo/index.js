import React, { useRef, useState } from 'react'
import styled from 'styled-components'

// react-bootstrap components
import {
	Button,
	Card,
	Container,
	Form,
	InputGroup,
	Row,
	Col,
	FormCheck,
} from 'react-bootstrap'

const CustomCard = styled(Card)`
	margin-bottom: 10px;
`

const Todo = () => {
	const [list, setList] = useState([])
	const [completeList, setCompleteList] = useState([])
	const inputRef = useRef()

	const swapTodo = (type, idx) => {
		if (type === 'complete') {
			const text = completeList.splice(idx, 1)
			setCompleteList([...completeList])
			setList([...list, text])
		} else {
			const text = list.splice(idx, 1)
			setList([...list])
			setCompleteList([...completeList, text])
		}
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<InputGroup size="lg" className="mb-3">
							<Form.Control
								ref={inputRef}
								onKeyDown={e => {
									console.log(e)
									if (e.key === 'Enter') {
										setList([...list, inputRef.current.value])
										inputRef.current.value = ''
									}
								}}
								placeholder="Todo List"
								aria-label="Todo List"
								aria-describedby="basic-addon2"
							/>
							<Button
								onClick={() => {
									setList([...list, inputRef.current.value])
									inputRef.current.value = ''
								}}
								variant="outline-secondary"
								id="button-addon2"
							>
								추가하기!
							</Button>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<h3>해야하는 일</h3>
						{list.map((text, idx) => (
							<CustomCard key={idx}>
								<Card.Body>
									<Form.Check.Input
										onChange={e => {
											e.preventDefault()
											swapTodo('', idx)
										}}
									></Form.Check.Input>
									{text}&nbsp;
									<i
										onClick={() => {
											list.splice(idx, 1)
											setList([...list])
										}}
										className="fas fa-trash fa-xs"
									></i>
								</Card.Body>
							</CustomCard>
						))}
					</Col>
					<Col md="6">
						<h3>완료</h3>
						{completeList.map((text, idx) => (
							<CustomCard key={idx} border="info" backgroundcolor="grey">
								<Card.Body>
									<Form.Check.Input
										defaultChecked={true}
										onClick={e => {
											e.preventDefault()
											swapTodo('complete', idx)
										}}
									></Form.Check.Input>
									{text}&nbsp;
									<i
										onClick={() => {
											completeList.splice(idx, 1)
											setList([...completeList])
										}}
										className="fas fa-trash fa-xs"
									></i>
								</Card.Body>
							</CustomCard>
						))}
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Todo
