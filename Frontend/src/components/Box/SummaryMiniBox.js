/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'

/** @param {import('../../interface/Component').ComponentOptions.SummaryMiniBox} */
function SummaryMiniBox({
	title,
	value,
	onBtnClick,
	btnName,
	mainIconOption,
	subIconOption,
}) {
	return (
		<Card className="card-stats">
			<Card.Body>
				<Row>
					<Col xs="4">
						<div className="icon-big text-center icon-warning">
							<i className={`nc-icon ${mainIconOption.type} ${mainIconOption.color}`}></i>
						</div>
					</Col>
					<Col xs="8">
						<div className="numbers">
							<p className="card-category">{title}</p>
							<Card.Title as="h4">{value}</Card.Title>
						</div>
					</Col>
				</Row>
			</Card.Body>
			<Card.Footer>
				<hr></hr>
				<div className="stats" onClick={onBtnClick}>
					<i className={`${subIconOption.type} mr-1`}></i>
					{btnName}
				</div>
			</Card.Footer>
		</Card>
	)
}

SummaryMiniBox.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onBtnClick: PropTypes.func,
	btnName: PropTypes.string.isRequired,
	mainIconOption: PropTypes.shape({
		type: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
	}).isRequired,
	subIconOption: PropTypes.shape({
		type: PropTypes.string.isRequired,
	}).isRequired,
}

export default SummaryMiniBox
