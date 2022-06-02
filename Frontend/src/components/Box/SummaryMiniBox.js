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
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { setComma } from 'util/common'

const ClickableIcon = styled.i`
	cursor: pointer;
`

const CustomInput = styled.input`
	margin-right: 8px;
`

/** @param {import('../../interface/Component').ComponentOptions.SummaryMiniBox} */
function SummaryMiniBox({ title, value, mainIconOption, subIconOption }) {
	const getBtn = (type, isMain) => {
		const option = isMain ? mainIconOption : subIconOption
		switch (type) {
			case 'icon':
				return !option.onClick ? (
					<i
						onClick={option.onClick}
						className={`nc-icon ${option.class} ${isMain ? '' : 'mr-1'}`}
					/>
				) : (
					<ClickableIcon
						onClick={option.onClick}
						className={`nc-icon ${option.class} ${isMain ? '' : 'mr-1'}`}
					/>
				)
			case 'button':
				return <button onClick={option.onClick}>{option.name}</button>
			case 'checkbox':
				return (
					<CustomInput
						defaultChecked={option.value}
						type="checkbox"
						onChange={option.onClick}
					/>
				)
			default:
				return
		}
	}

	return (
		<Card className="card-stats">
			<Card.Body>
				<Row>
					<Col xs="4">
						<div className="icon-big text-center icon-warning">
							{getBtn(mainIconOption.type, true)}
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
				<div className="stats">
					{getBtn(subIconOption.type, false)}
					{subIconOption.type !== 'button' ? subIconOption.name : ''}
				</div>
			</Card.Footer>
		</Card>
	)
}

SummaryMiniBox.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	mainIconOption: PropTypes.shape({
		type: PropTypes.string.isRequired,
		class: PropTypes.string,
		name: PropTypes.string,
		value: PropTypes.any,
		onClick: PropTypes.func,
	}).isRequired,
	subIconOption: PropTypes.shape({
		type: PropTypes.string.isRequired,
		class: PropTypes.string,
		name: PropTypes.string,
		onClick: PropTypes.func,
	}),
}

export default SummaryMiniBox
