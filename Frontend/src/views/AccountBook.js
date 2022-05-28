import React, { useEffect, useMemo, useState } from 'react'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

// react-bootstrap components
import { Dropdown, Nav, Container, Tabs, Tab } from 'react-bootstrap'
import { increment, fetchUserById } from 'store/reducer/user'
import { getAccountBookList } from 'store/reducer/accountBook'

import Summary from 'components/AccountBook/AccountBookSummary'
import Detail from 'components/AccountBook/AccountBookDetail'
import Calendar from 'components/AccountBook/AccountBookCalendar'

function AccountBook({ onBtnClick, getAccountList, userInfo, accountInfo }) {
	const [duration, setDuration] = useState(7)

	return (
		<>
			<Container fluid>
				<Tabs defaultActiveKey="summary" className="mb-3">
					<Tab eventKey="summary" title="요약">
						<Summary />
					</Tab>
					<Tab eventKey="detail" title="자세히 보기">
						<Detail />
					</Tab>
					<Tab eventKey="calendar" title="캘린더">
						<Calendar />
					</Tab>
				</Tabs>
				<Dropdown as={Nav.Item}>
					<Dropdown.Toggle
						as={Nav.Link}
						data-toggle="dropdown"
						id="dropdown-67443507"
						variant="default"
						className="m-0"
					>
						<i className="nc-icon nc-planet"></i>
						<span className="notification">5</span>
						<span className="d-lg-none ml-1">Notification</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							일간
						</Dropdown.Item>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							주간
						</Dropdown.Item>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							월간
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</>
	)
}

const mapStateToProps = state => {
	return { userInfo: state.user, accountInfo: state.accountBook }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getAccountList: ({ userId, startDate, endDate }) =>
			dispatch(getAccountBookList({ userId, startDate, endDate })),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBook)
