import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

const CardView = ({ title, subTitle, children }) => {
	return (
		<Card className="strpied-tabled-with-hover">
			<Card.Header>
				<Card.Title as="h4">{title}</Card.Title>
				{subTitle && <p className="card-category">{subTitle}</p>}
			</Card.Header>
			<Card.Body className="table-full-width table-responsive px-1">{children}</Card.Body>
		</Card>
	)
}

export { CardView }
