import React, { useRef, useEffect, forwardRef, Component } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Row, Col, Form } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

const paginationOption = {
	prePageText: '<',
	nextPageText: '>',
}

const _TableModal = ({ columns, tableData, isShow, title, handleClose }) => {
	return (
		<>
			<Modal show={isShow} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title className="my-1">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						{/* <BootstrapTable
							classes={`table-hover table-striped`}
							keyField={() => new Date()}
							data={[]}
							columns={[]}
							bordered={false}
							pagination={paginationFactory(paginationOption)}
							// rowEvents={rowEvents}
							selectRow={{
								mode: 'checkbox',
								onSelect: (row, isSelected, rowIndex) => {
									// console.log(row, isSelected, rowIndex)
								},
							}}
						/> */}
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" className="btn-fill" onClick={handleClose}>
						{'닫기'}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export const TableModal = React.memo(_TableModal)
