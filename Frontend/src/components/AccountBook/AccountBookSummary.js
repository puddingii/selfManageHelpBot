import React, { useEffect, useMemo, useState } from 'react'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

// react-bootstrap components
import { Card, Dropdown, Nav, Container, Row, Col } from 'react-bootstrap'
import { increment, fetchUserById } from 'store/reducer/user'
import SummaryMiniBox from 'components/Box/SummaryMiniBox'
import { getAccountBookList } from 'store/reducer/accountBook'

function AccountBook({ onBtnClick, getAccountList, userInfo, accountInfo }) {
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

	const summaryBoxOptionList = [
		{
			title: '수입',
			value: '3,500',
			btnName: '고정수입 포함',
			mainIconOption: {
				type: 'fas fa-caret-up',
				color: 'text-success',
			},
			subIconOption: {
				type: 'fas fa-redo',
			},
			onBtnClick,
		},
		{
			title: '지출',
			value: '2,500',
			btnName: '고정지출 포함',
			mainIconOption: {
				type: 'fas fa-caret-down',
				color: 'text-danger',
			},
			subIconOption: {
				type: 'fas fa-redo fa-spin',
			},
		},
		{
			title: '합계',
			value: '2,500',
			btnName: '고정지출 포함',
			mainIconOption: {
				type: 'fas fa-chart-pie',
				color: 'text-warning',
			},
			subIconOption: {
				type: 'fas fa-redo fa-spin',
			},
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
					{summaryBoxOptionList.map(option => {
						return (
							<Col lg="4" sm="6" key={option.title}>
								<SummaryMiniBox
									title={option.title}
									value={option.value}
									onBtnClick={option.onBtnClick}
									btnName={option.btnName}
									mainIconOption={option.mainIconOption}
									subIconOption={option.subIconOption}
								></SummaryMiniBox>
							</Col>
						)
					})}
				</Row>
				<Row>
					<Col md="8">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Users Behavior</Card.Title>
								<p className="card-category">24 Hours performance</p>
							</Card.Header>
							<Card.Body>
								<div className="ct-chart" id="chartHours">
									<ChartistGraph
										data={{
											labels: [
												'9:00AM',
												'12:00AM',
												'3:00PM',
												'6:00PM',
												'9:00PM',
												'12:00PM',
												'3:00AM',
												'6:00AM',
											],
											series: [
												[287, 385, 490, 492, 554, 586, 698, 695],
												[67, 152, 143, 240, 287, 335, 435, 437],
												[23, 113, 67, 108, 190, 239, 307, 308],
											],
										}}
										type="Line"
										options={{
											low: 0,
											high: 800,
											showArea: false,
											height: '245px',
											axisX: {
												showGrid: false,
											},
											lineSmooth: true,
											showLine: true,
											showPoint: true,
											fullWidth: true,
											chartPadding: {
												right: 50,
											},
										}}
										responsiveOptions={[
											[
												'screen and (max-width: 640px)',
												{
													axisX: {
														labelInterpolationFnc: function (value) {
															return value[0]
														},
													},
												},
											],
										]}
									/>
								</div>
							</Card.Body>
							<Card.Footer>
								<div className="legend">
									<i className="fas fa-circle text-info"></i>
									Open <i className="fas fa-circle text-danger"></i>
									Click <i className="fas fa-circle text-warning"></i>
									Click Second Time
								</div>
								<hr></hr>
								<div className="stats">
									<i className="fas fa-history"></i>
									Updated 3 minutes ago
								</div>
							</Card.Footer>
						</Card>
					</Col>
					<Col md="4">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Email Statistics</Card.Title>
								<p className="card-category">Last Campaign Performance</p>
							</Card.Header>
							<Card.Body>
								<div className="ct-chart ct-perfect-fourth" id="chartPreferences">
									<ChartistGraph
										data={{
											labels: ['40%', '20%', '40%'],
											series: [40, 20, 40],
										}}
										type="Pie"
									/>
								</div>
								<div className="legend">
									<i className="fas fa-circle text-info"></i>
									Open <i className="fas fa-circle text-danger"></i>
									Bounce <i className="fas fa-circle text-warning"></i>
									Unsubscribe
								</div>
								<hr></hr>
								<div className="stats">
									<i className="far fa-clock"></i>
									Campaign sent 2 days ago
								</div>
							</Card.Body>
						</Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountBook)
