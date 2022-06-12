import React, { useState } from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Button, Col, Dropdown, Form, Modal, Row, Card, Nav } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CommonModal, modalprops } from '../Modal/Modal'

/** @param {import('../../interface/Component').ComponentOptions.TableBox} */
function TableBox({
	columnId,
	title,
	description,
	columns,
	tableData,
	onClickUpdate,
	succUpdate,
	failUpdate,
	onClickDelete,
	succDelete,
	failDelete,
	modalProps,
}) {
	const [isModalShow, setModalShow] = useState(false)
	const [currentRow, setCurrentRow] = useState({})

	const handleClose = () => setModalShow(false)
	const handleShow = () => setModalShow(true)

	const onDeleteBtn = id => {
		Swal.fire({
			title: '정말 삭제하시겠습니까?',
			showCancelButton: true,
			confirmButtonColor: 'red',
			cancelButtonColor: 'grey',
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
			preConfirm: async () => {
				try {
					const result = await onClickDelete(id)
					return result
				} catch (error) {
					Swal.showValidationMessage(`Request failed: ${error}`)
				}
			},
		}).then(result => {
			const {
				isConfirmed,
				isDenied,
				value: {
					payload: { msg, code },
				},
			} = result
			if (isConfirmed) {
				if (code === '1') {
					Swal.fire('삭제되었습니다!', '', 'success')
					succUpdate && succUpdate()
				} else {
					Swal.fire(`삭제오류: ${msg}`)
					failUpdate && failUpdate()
				}
			} else if (isDenied) {
				Swal.fire('에러발생')
			}
		})
	}

	const getFormControlType = type => {
		switch (type) {
			case 'number':
				return type
			case 'boolean':
				return 'checkbox'
			case 'string':
				return 'text'
			default:
				return
		}
	}

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			setCurrentRow(row)
			console.log(row)
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
					keyField={columnId}
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
	onClickUpdate: PropTypes.func.isRequired,
	succUpdate: PropTypes.func,
	failUpdate: PropTypes.func,
	onClickDelete: PropTypes.func.isRequired,
	succDelete: PropTypes.func,
	failDelete: PropTypes.func,
}

export default React.memo(TableBox)
