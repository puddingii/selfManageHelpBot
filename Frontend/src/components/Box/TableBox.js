import React from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import { Card, Dropdown, Nav } from 'react-bootstrap'
import BSTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

/** @param {import('../../interface/Component').ComponentOptions.TableBox} */
function TableBox({ title, description, children }) {
	return (
		<Card className="strpied-tabled-with-hover">
			<Card.Header>
				<Card.Title as="h4">{title}</Card.Title>
				<p className="card-category">{description}</p>
			</Card.Header>
			<Card.Body className="table-full-width table-responsive px-0">{children}</Card.Body>
		</Card>
	)
}

TableBox.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
}

export default TableBox
