import React, { useState } from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Button, Col, Dropdown, Form, Modal, Row, Card, Nav } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

/** @param {import('../../interface/Component').ComponentOptions.TableBox} */
function TableBox({ title, description, columns, tableData }) {
	const [show, setShow] = useState(false)
	const [currentRow, setCurrentRow] = useState({})

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			setCurrentRow(row)
			handleShow()
		},
	}

	const handleSubmit = e => {
		e.preventDefault()
		console.log('df', e)
	}

	const paginationOption = {
		prePageText: '<',
		nextPageText: '>',
		hidePageListOnlyOnePage: true,
		showTotal: true,
		paginationTotalRenderer: (from, to, size) => (
			<span>
				Page: {from}-{to} Total: {size}
			</span>
		),
		sizePerPageList: [
			{
				text: '5',
				value: 5,
			},
			{
				text: '10',
				value: 10,
			},
			{
				text: '20',
				value: 20,
			},
		],
		sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
			<Dropdown>
				<Dropdown.Toggle
					aria-expanded={false}
					aria-haspopup={true}
					data-toggle="dropdown"
					id="navbarDropdownMenuLink"
					variant="default"
					className="m-0"
				>
					<span className="no-icon">{currSizePerPage}</span>
				</Dropdown.Toggle>
				<Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
					{options.map(option => (
						<Dropdown.Item
							href="#pablo"
							key={option.page}
							onClick={() => onSizePerPageChange(option.page)}
						>
							{option.page}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		),
	}

	return (
		<Card className="strpied-tabled-with-hover">
			<Card.Header>
				<Card.Title as="h4">{title}</Card.Title>
				<p className="card-category">{description}</p>
			</Card.Header>
			<Card.Body className="table-full-width table-responsive px-0">
				<BSTable
					classes="table-hover table-striped"
					keyField="accountId"
					data={tableData}
					columns={columns}
					bordered={false}
					pagination={paginationFactory(paginationOption)}
					rowEvents={rowEvents}
					selectRow={{
						mode: 'checkbox',
						onSelect: (row, isSelected, rowIndex) => {
							console.log(row, isSelected, rowIndex)
						},
					}}
				/>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>가계부 수정</Modal.Title>
					</Modal.Header>
					<Form noValidate onSubmit={handleSubmit}>
						<Modal.Body>
							<Form.Group as={Row} controlId="amount">
								<Form.Label column sm={3}>
									금액
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="number"
										placeholder="Amount"
										defaultValue={currentRow.amount}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="content">
								<Form.Label column sm={3}>
									내용
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="text"
										placeholder="출처"
										defaultValue={currentRow.content}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="content">
								<Form.Label column sm={3}>
									카테고리
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="text"
										placeholder="취미, 식사 등..."
										defaultValue={currentRow.category}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="content">
								<Form.Label column sm={3}>
									날짜
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="text" defaultValue={currentRow.amount} readOnly />
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="formGridCheckbox">
								<Form.Label column sm={3}>
									고정지출
								</Form.Label>
								<Col sm={1}>
									<Form.Control type="checkbox" defaultChecked={currentRow.isFixed} />
								</Col>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								닫기
							</Button>
							<div>
								<Button variant="danger" style={{ marginRight: '10px' }} type="">
									삭제하기
								</Button>
								<Button variant="primary" type="submit">
									수정하기
								</Button>
							</div>
						</Modal.Footer>
					</Form>
				</Modal>
			</Card.Body>
		</Card>
	)
}

TableBox.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	columns: PropTypes.array.isRequired,
	tableData: PropTypes.array.isRequired,
}

export default React.memo(TableBox)
