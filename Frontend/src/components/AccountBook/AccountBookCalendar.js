import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

// react-bootstrap components
import { Dropdown, Nav, Container, Row, Col } from 'react-bootstrap'
import { increment, fetchUserById } from 'store/reducer/user'
import { getAccountBookList } from 'store/reducer/accountBook'
import { AccountBookModal } from '../Modal/Modal'

function AccountBookDetail({ onBtnClick, getAccountList, userInfo, accountInfo }) {
	const [duration, setDuration] = useState(7)
	useEffect(() => {
		console.log('hi')
		getAccountList({
			userId: userInfo.userId,
			startDate: dayjs().subtract(duration, 'day').format('YYYY-MM-DD'),
			endDate: dayjs().format('YYYY-MM-DD'),
		})
	}, [])

	const onClickDurationBtn = () => {}

	/** 데이터 초기화 */
	const tableData = accountInfo.accountList
	const accountBookColumns = [
		{
			dataField: 'accountId',
			text: 'No',
			headerClasses: 'border-0',
			headerStyle: { width: '50px' },
		},
		{
			dataField: 'content',
			text: '내용',
			headerClasses: 'border-0',
		},
		{
			dataField: 'amount',
			text: '금액',
			headerClasses: 'border-0',
		},
		{
			dataField: 'category',
			text: '카테고리',
			headerClasses: 'border-0',
		},
		{
			dataField: 'date',
			text: '날짜',
			headerClasses: 'border-0',
		},
		{
			dataField: 'isFixed',
			text: '고정지출',
			headerClasses: 'border-0',
		},
	]

	return (
		<>
			<Container fluid>
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
				<Row>
					<Col></Col>
				</Row>
				<Row>
					<Col>
						<AccountBookModal />
					</Col>
				</Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountBookDetail)
