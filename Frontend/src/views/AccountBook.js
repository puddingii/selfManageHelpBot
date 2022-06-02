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
