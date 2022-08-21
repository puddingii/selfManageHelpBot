import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Dropdown, Card, Nav, Spinner } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
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
const TableBox = ({
	columnId,
	title,
	description,
	columns,
	tableData,
	isAjaxSucceed,
	datepicker,
	rowEvents,
	modalComponent,
}) => {
	return (
		<Card className="strpied-tabled-with-hover">
			<Card.Header>
				<Card.Title as="h4">
					{title}
					{isAjaxSucceed === 'pending' ? (
						<Spinner animation="border" variant="secondary" />
					) : null}
				</Card.Title>
				<p className="card-category">{description}</p>
			</Card.Header>
			<Card.Body className="table-full-width table-responsive px-0">
				{datepicker && datepicker}
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
						onSelect: (row, isSelected, rowIndex) => {},
					}}
				/>
				{modalComponent && modalComponent}
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
	isAjaxSucceed: PropTypes.string,
	datepicker: PropTypes.any,
	rowEvents: PropTypes.object,
	modalComponent: PropTypes.any,
}

const _CommonModalTableBox = props => {
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

	const Modal = (
		<CommonModal
			{...props.modalProps}
			fieldValues={currentRow}
			isShow={isModalShow}
			handleClose={() => {
				setModalShow(false)
			}}
		/>
	)
	return <TableBox {...props} rowEvents={rowEvents} modalComponent={Modal} />
}

_CommonModalTableBox.propTypes = {
	columnId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	columns: PropTypes.array.isRequired,
	tableData: PropTypes.func.isRequired,
	isAjaxSucceed: PropTypes.string,
	datepicker: PropTypes.any,
	modalProps: PropTypes.any,
}

const _CustomModalTableBox = ({
	ModalComponent,
	modalHandler,
	rowToModalProp,
	...props
}) => {
	const [isModalShow, setModalShow] = useState(false)
	const [currentRow, setCurrentRow] = useState({})
	const [modalProps, setModalProps] = useState(rowToModalProp())

	const handleShow = row => {
		setModalShow(modalHandler(row)) // 클릭한 row가 특정한 조건일때만 모달 열기
	}
	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			setCurrentRow(row)
			handleShow(row)
		},
	}

	useEffect(() => {
		setModalProps(rowToModalProp(currentRow))
	}, [currentRow])

	const Modal = (
		<ModalComponent
			{...modalProps}
			isShow={isModalShow}
			handleClose={() => {
				setModalShow(false)
			}}
			data={currentRow}
		/>
	)
	return <TableBox {...props} rowEvents={rowEvents} modalComponent={Modal} />
}
_CustomModalTableBox.propTypes = {
	columnId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	columns: PropTypes.array.isRequired,
	tableData: PropTypes.array.isRequired,
	isAjaxSucceed: PropTypes.string,
	datepicker: PropTypes.any,
	ModalComponent: PropTypes.any.isRequired,
	modalHandler: PropTypes.func.isRequired,
	rowToModalProp: PropTypes.func.isRequired,
}

export const CommonModalTableBox = React.memo(_CommonModalTableBox)
export const CustomModalTableBox = React.memo(_CustomModalTableBox)
