import React from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Card, Dropdown, Nav } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

/** @param {import('../../interface/Component').ComponentOptions.TableBox} */
function TableBox({ title, description, columns, tableData }) {
	const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
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
				<div className="divider"></div>
				<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
					All
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
	const paginationOption = {
		firstPageText: 'First',
		prePageText: 'Back',
		nextPageText: 'Next',
		lastPageText: 'Last',
		hidePageListOnlyOnePage: true,
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
		sizePerPageRenderer,
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
					keyField="id"
					data={tableData}
					columns={columns}
					bordered={false}
					pagination={paginationFactory(paginationOption)}
				/>
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

export default TableBox
