import React, { useState } from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Button, Col, Dropdown, Form, Modal, Row, Card, Nav } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CommonModal } from '../Modal/Modal'
import _ from 'lodash'

/** 테이블 페이지네이션 옵션 */
const paginationOption = {
	prePageText: '<',
	nextPageText: '>',
	hidePageListOnlyOnePage: true,
	showTotal: true,
	/** Page 정보 UI */
	paginationTotalRenderer: (from, to, size) => (
		<span>
			Page: {from}-{to} Total: {size}
		</span>
	),
	/** Page 단위 */
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
	/** Page 단위를 바꿀 수 있는 드랍다운 리스트 */
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

/** @param {import('../../interface/Component').ComponentOptions.TableBox} */
const TableBox = ({ columnId, title, description, columns, tableData, modalProps }) => {
	const [isModalShow, setModalShow] = useState(false)
	const [currentRow, setCurrentRow] = useState({})

	const handleShow = () => {
		setModalShow(true)
	}
	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			setCurrentRow(row)
			handleShow()
		},
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
					keyField={columnId}
					data={tableData}
					columns={columns}
					bordered={false}
					pagination={paginationFactory(paginationOption)}
					rowEvents={rowEvents}
					selectRow={{
						mode: 'checkbox',
						onSelect: (row, isSelected, rowIndex) => {
							// console.log(row, isSelected, rowIndex)
						},
					}}
				/>
				<CommonModal
					{...modalProps}
					fieldValues={currentRow}
					isShow={isModalShow}
					handleClose={() => {
						setModalShow(false)
					}}
				/>
			</Card.Body>
		</Card>
	)
}

TableBox.propTypes = {
	columnId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	columns: PropTypes.array.isRequired,
	tableData: PropTypes.array.isRequired,
}

export default React.memo(TableBox)
