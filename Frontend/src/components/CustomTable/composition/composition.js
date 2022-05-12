import React from 'react'

import { Dropdown } from 'react-bootstrap'

const customTotal = (from, to, size) => (
	<span>
		Page: {from}-{to} Total: {size}
	</span>
)

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

const sizePerPageList = [
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
]

export { customTotal, sizePerPageRenderer, sizePerPageList }
