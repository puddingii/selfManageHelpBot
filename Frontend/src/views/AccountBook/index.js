import React, { useEffect, useMemo, useState } from 'react'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

// react-bootstrap components
import { Dropdown, Nav, Container, Tabs, Tab } from 'react-bootstrap'
import { increment, fetchUserById } from 'store/reducer/user'
import { getAccountBookList } from 'store/reducer/accountBook'

import Summary from 'views/AccountBook/AccountBookSummary'
import Detail from 'views/AccountBook/AccountBookDetail'
import Calendar from 'views/AccountBook/AccountBookCalendar'

function AccountBook() {
	const [tabType, setTabType] = useState('summary')
	const getDynamicComponent = tab => {
		if (tab === tabType) {
			switch (tabType) {
				case 'summary':
					return <Summary />
				case 'detail':
					return <Detail />
				case 'calendar':
					return <Calendar />
				default:
			}
		}
	}
	return (
		<>
			<Container fluid>
				<Tabs
					defaultActiveKey={tabType}
					onSelect={type => setTabType(type)}
					className="mb-3"
				>
					<Tab eventKey="summary" title="요약">
						{getDynamicComponent('summary')}
					</Tab>
					<Tab eventKey="detail" title="자세히 보기">
						{getDynamicComponent('detail')}
					</Tab>
					<Tab eventKey="calendar" title="캘린더">
						{getDynamicComponent('calendar')}
					</Tab>
				</Tabs>
			</Container>
		</>
	)
}

export default AccountBook
