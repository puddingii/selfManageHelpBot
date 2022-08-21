import React, { Component, useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import PropTypes from 'prop-types'

const paginationOption = {
	prePageText: '<',
	nextPageText: '>',
	sizePerPageList: [
		{
			value: 5,
		},
	],
}

const _TableModal = ({
	keyField,
	size,
	columns,
	tableData,
	isShow,
	title,
	handleClose,
	nonExpandable,
	extandRowKey,
	data,
}) => {
	return (
		<>
			<Modal show={isShow} onHide={handleClose} centered size={size}>
				<Modal.Header closeButton>
					<Modal.Title className="my-1">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<BootstrapTable
							bordered
							hover
							striped
							classes={`table-hover`}
							keyField={keyField}
							data={tableData(data)}
							columns={columns}
							pagination={paginationFactory(paginationOption)}
							expandRow={{
								renderer: row => <div className="extand-row">{row[extandRowKey]}</div>,
								onlyOneExpanding: true,
								nonExpandable: nonExpandable(tableData(data)) ?? [],
							}}
						/>
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

_TableModal.propTypes = {
	keyField: PropTypes.string.isRequired,
	size: PropTypes.string,
	columns: PropTypes.array,
	tableData: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	title: PropTypes.string,
	handleClose: PropTypes.func.isRequired,
	nonExpandable: PropTypes.func,
	extandRowKey: PropTypes.string,
	data: PropTypes.object.isRequired,
}

export const TableModal = React.memo(_TableModal)
