import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {
	customTotal,
	sizePerPageRenderer,
	sizePerPageList,
} from './composition/composition'

function AccountTable({ columns, tableData }) {
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

	const paginationOption = {
		prePageText: '<',
		nextPageText: '>',
		hidePageListOnlyOnePage: true,
		showTotal: true,
		paginationTotalRenderer: customTotal,
		sizePerPageList,
		sizePerPageRenderer,
	}
	return (
		<>
			<BSTable
				classes="table-hover table-striped"
				keyField="id"
				data={tableData}
				columns={columns}
				bordered={false}
				pagination={paginationFactory(paginationOption)}
				rowEvents={rowEvents}
			/>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>가계부 수정</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} controlId="amount">
							<Form.Label column sm={3}>
								금액
							</Form.Label>
							<Col sm={9}>
								<Form.Control type="number" placeholder="Amount" />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="content">
							<Form.Label column sm={3}>
								내용
							</Form.Label>
							<Col sm={9}>
								<Form.Control type="text" placeholder="출처" />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="content">
							<Form.Label column sm={3}>
								카테고리
							</Form.Label>
							<Col sm={9}>
								<Form.Control type="text" placeholder="취미, 식사 등..." />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="content">
							<Form.Label column sm={3}>
								날짜
							</Form.Label>
							<Col sm={6}>
								<Form.Control type="text" readOnly />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formGridCheckbox">
							<Form.Label column sm={3}>
								고정지출
							</Form.Label>
							<Col sm={1}>
								<Form.Control type="checkbox" />
							</Col>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						닫기
					</Button>
					<Button variant="primary" onClick={handleClose}>
						수정하기
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

AccountTable.propTypes = {
	columns: PropTypes.array.isRequired,
	tableData: PropTypes.array.isRequired,
}

export default AccountTable
