import React, { useState } from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Button, Col, Dropdown, Form, Modal, Row, Card, Nav } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

/**
 * @param {string} type
 * type에 맞는 bootstrap 값 리턴
 */
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

const getTypeText = type => {
	switch (type) {
		case 'del':
			return '삭제'
		case 'upd':
			return '변경'
		default:
			return '취소'
	}
}

/** @param {import('../../interface/Component').ComponentOptions.TableBox} */
const TableBox = ({
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
}) => {
	const [isModalShow, setModalShow] = useState(false)
	const [currentRow, setCurrentRow] = useState({})

	const onClose = () => {
		setModalShow(false)
	}
	const handleShow = () => {
		setModalShow(true)
	}

	const onBtn = (param, type) => {
		Swal.fire({
			title: `정말 ${getTypeText(type)}하시겠습니까?`,
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'grey',
			confirmButtonText: '확인',
			cancelButtonText: '취소',
			preConfirm: async () => {
				try {
					let result
					switch (type) {
						case 'del':
							result = await onClickDelete(param)
							break
						case 'upd':
							result = await onClickUpdate(param)
							break
						default:
							throw new Error('[TableBox]Button Type Error')
					}
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
				if (code === 1) {
					Swal.fire(`${getTypeText(type)}되었습니다!`, '', 'success')
					switch (type) {
						case 'del':
							succDelete && succDelete()
							break
						case 'upd':
							succUpdate && succUpdate()
							break
						default:
					}
					onClose()
				} else {
					Swal.fire(`${getTypeText(type)}오류: ${msg}`)
					switch (type) {
						case 'del':
							failDelete && failDelete()
							break
						case 'upd':
							failUpdate && failUpdate()
							break
						default:
					}
				}
			} else if (isDenied) {
				Swal.fire('[TableBox]Btn Action Denied Error')
			}
		})
	}

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

				<Modal show={isModalShow} onHide={onClose}>
					<Modal.Header closeButton>
						<Modal.Title>가계부 수정</Modal.Title>
					</Modal.Header>
					<Form noValidate onSubmit={handleSubmit}>
						<Modal.Body>
							{columns.map((column, idx) => {
								if (column.dataField === columnId) return
								return (
									<Form.Group as={Row} key={idx} controlId={column.dataField}>
										<Form.Label column sm={3}>
											{column.text}
										</Form.Label>
										<Col sm={currentRow[column.dataField] === 'checkbox' ? 2 : 9}>
											<Form.Control
												type={getFormControlType(typeof currentRow[column.dataField])}
												defaultValue={currentRow[column.dataField]}
												defaultChecked={currentRow[column.dataField]}
											/>
										</Col>
									</Form.Group>
								)
							})}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={onClose}>
								닫기
							</Button>
							<div>
								<Button
									variant="danger"
									style={{ marginRight: '10px' }}
									onClick={() => {
										onBtn(currentRow[columnId], 'del')
									}}
								>
									삭제하기
								</Button>
								<Button
									variant="primary"
									onClick={() => {
										onBtn(currentRow, 'upd')
									}}
								>
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
