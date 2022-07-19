import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// react-bootstrap components
import { Button, Card, Container, Form, InputGroup, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, getTodoList, insertTodo, updateTodo } from 'store/reducer/todo'
import { getLoginId } from 'util/authenticate'

const CustomCard = styled(Card)`
	margin-bottom: 10px;
`

const TodoControlBtn = styled('i')`
	cursor: pointer;
`

const Todo = () => {
	const [userId] = useState(getLoginId())
	const inputRef = useRef()
	const [isInvalid, setIsInvalid] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTodoList({ userId }))
	}, [])
	/** 이번달 요약본 */
	const { doingList, completedList } = useSelector(state => {
		return state.todo.todoList.reduce(
			(acc, cur) => {
				if (cur.isCompleted) {
					acc.completedList.push(cur)
				} else {
					acc.doingList.push(cur)
				}
				return acc
			},
			{ doingList: [], completedList: [] },
		)
	})
	const onSubmitTodo = () => {
		if (!inputRef.current.value || inputRef.current.value.length < 5) {
			setIsInvalid(true)
			return
		}
		dispatch(insertTodo({ userId, content: inputRef.current.value }))
		inputRef.current.value = ''
		setIsInvalid(false)
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col>
						<InputGroup hasValidation size="lg" className="mb-3">
							<Form.Control
								ref={inputRef}
								isInvalid={isInvalid}
								onKeyPress={e => {
									if (e.key === 'Enter') {
										onSubmitTodo()
									}
								}}
								placeholder="Todo"
								aria-label="Todo List"
								aria-describedby="basic-addon2"
							/>
							<Button
								onClick={() => onSubmitTodo()}
								variant="outline-secondary"
								id="button-addon2"
							>
								추가하기!
							</Button>
							<Form.Control.Feedback type="invalid">
								5글자 이상 입력해주세요!
							</Form.Control.Feedback>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<h3>해야하는 일</h3>
						{doingList.map((todo, idx) => (
							<CustomCard key={idx}>
								<Card.Body>
									<div className="row justify-content-between">
										<div className="col-10">{todo.content}</div>
										<div style={{ paddingRight: '0px' }} className="col-2">
											<TodoControlBtn
												className="fas fa-check"
												onClick={() =>
													dispatch(updateTodo({ userId, todoId: todo.todoId }))
												}
											></TodoControlBtn>
											<TodoControlBtn
												className="fas fa-times"
												onClick={() =>
													dispatch(deleteTodo({ userId, todoId: todo.todoId }))
												}
											></TodoControlBtn>
										</div>
									</div>
								</Card.Body>
							</CustomCard>
						))}
					</Col>
					<Col md="6">
						<h3>완료</h3>
						{completedList.map((todo, idx) => (
							<CustomCard key={idx} border="info">
								<Card.Body>
									<div className="row justify-content-between">
										<div className="col-10">{todo.content}</div>
										<div style={{ paddingRight: '0px' }} className="col-2">
											<TodoControlBtn
												className="fas fa-minus"
												onClick={() =>
													dispatch(updateTodo({ userId, todoId: todo.todoId }))
												}
											></TodoControlBtn>
											<TodoControlBtn
												className="fas fa-times"
												onClick={() =>
													dispatch(deleteTodo({ userId, todoId: todo.todoId }))
												}
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
