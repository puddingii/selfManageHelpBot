import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// react-bootstrap components
import { Button, Card, Container, Form, InputGroup, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getTodoList } from 'store/reducer/todo'
import { getLoginId } from 'util/authenticate'

const CustomCard = styled(Card)`
	margin-bottom: 10px;
`

const TodoControlBtn = styled('i')`
	cursor: pointer;
`

const Todo = () => {
	const [list, setList] = useState([])
	const [userId] = useState(getLoginId())
	const [completeList, setCompleteList] = useState([])
	const inputRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		// dispatch(getTodoList({ userId }))
	}, [])
	/** 이번달 요약본 */
	const { doingList, completedList } = useSelector(state => {
		return state.todo.todoList.reduce(
			(acc, cur) => {
				if (cur.isCompleted) {
					acc.compList.push(cur)
				} else {
					acc.doingList.push(cur)
				}
				return acc
			},
			{ doingList: [], compList: [] },
		)
	})

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
									if (e.key === 'Enter' && inputRef.current.value) {
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
									if (!inputRef.current.value) return
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
									<div className="row justify-content-between">
										<div className="col-10">{text}</div>
										<div style={{ paddingRight: '0px' }} className="col-2">
											<TodoControlBtn
												className="fas fa-check"
												onClick={() => swapTodo('', idx)}
											></TodoControlBtn>
											<TodoControlBtn
												className="fas fa-times"
												onClick={() => {
													list.splice(idx, 1)
													setList([...list])
												}}
											></TodoControlBtn>
										</div>
									</div>
								</Card.Body>
							</CustomCard>
						))}
					</Col>
					<Col md="6">
						<h3>완료</h3>
						{completeList.map((text, idx) => (
							<CustomCard key={idx} border="info">
								<Card.Body>
									<div className="row justify-content-between">
										<div className="col-10">{text}</div>
										<div style={{ paddingRight: '0px' }} className="col-2">
											<TodoControlBtn
												className="fas fa-minus"
												onClick={() => swapTodo('complete', idx)}
											></TodoControlBtn>
											<TodoControlBtn
												className="fas fa-times"
												onClick={() => {
													completeList.splice(idx, 1)
													setCompleteList([...completeList])
												}}
											></TodoControlBtn>
										</div>
									</div>
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
