import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

// react-bootstrap components
import { Card, Dropdown, Nav, Container, Row, Col } from 'react-bootstrap'
import SummaryMiniBox from 'components/Box/SummaryMiniBox'
import {
	calcSummary,
	calcSummaryType,
	getAccountBookList,
} from 'store/reducer/accountBook'
import { setComma } from 'util/common'

function AccountBook() {
	const userInfo = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [durationType, setDurationType] = useState('d')
	const [isFixedIncome, setIsFixedIncome] = useState(true)
	const [isFixedOutcome, setIsFixedOutcome] = useState(true)

	const durationInfo = {
		d: {
			cnt: 30,
			name: '일간',
		},
		w: {
			cnt: 12,
			name: '주간',
		},
		M: {
			cnt: 12,
			name: '월간',
		},
		y: {
			cnt: 3,
			name: '년간',
		},
	}

	const getStartDate = () => {
		const initStartDate = dayjs().subtract(durationInfo[durationType].cnt, durationType)
		return (durationType === 'M' ? initStartDate.set('date', 1) : initStartDate).format(
			'YYYY-MM-DD',
		)
	}
	const [startDate, setStartDate] = useState(getStartDate())
	useEffect(() => {
		setStartDate(getStartDate())
	}, [durationType])
	useEffect(() => {
		dispatch(
			getAccountBookList({
				userId: userInfo.userId,
				startDate,
				endDate: dayjs().format('YYYY-MM-DD'),
			}),
		)
	}, [])

	/** 이번달 요약본 */
	const { fixedOutcome, fixedIncome, notFixedIncome, notFixedOutcome } = useSelector(
		state => {
			const firstDay = dayjs().set('date', 1)
			let list = _.cloneDeep(state.accountBook.accountList)
			list = list.filter(account => {
				return (
					account.isFixed ||
					(dayjs(account.date).diff(firstDay, 'd') >= 0 &&
						dayjs().diff(account.date, 'd') >= 0)
				)
			})
			return calcSummary(list, {
				startDate: firstDay.format('YYYY-MM-DD'),
				endDate: dayjs().format('YYYY-MM-DD'),
			})
		},
	)

	const accountSum =
		(isFixedIncome ? fixedIncome + notFixedIncome : notFixedIncome) +
		(isFixedOutcome ? fixedOutcome + notFixedOutcome : notFixedOutcome)
	const summaryBoxOptionList = [
		{
			title: '수입',
			value: `${setComma(
				isFixedIncome ? fixedIncome + notFixedIncome : notFixedIncome,
			)}원`,
			mainIconOption: {
				type: 'icon',
				class: 'fas fa-caret-up text-success',
			},
			subIconOption: {
				type: 'checkbox',
				name: '고정수입 포함',
				value: true,
				onClick: () => {
					setIsFixedIncome(!isFixedIncome)
				},
			},
		},
		{
			title: '지출',
			value: `${setComma(
				isFixedOutcome ? fixedOutcome + notFixedOutcome : notFixedOutcome,
			)}원`,
			mainIconOption: {
				type: 'icon',
				class: 'fas fa-caret-down text-danger',
			},
			subIconOption: {
				type: 'checkbox',
				name: '고정지출 포함',
				value: true,
				onClick: e => {
					setIsFixedOutcome(e.target.checked)
				},
			},
		},
		{
			title: '합계',
			value: `${setComma(accountSum)}원`,
			mainIconOption: {
				type: 'icon',
				class: 'fas fa-chart-pie text-warning',
			},
			subIconOption: {
				type: 'icon',
				name: '지출/수입 합계',
				class: 'fas fa-check',
			},
		},
	]

	/** 차트 */
	const { incomeList, outcomeList, sumList, labelList, summaryTypeList } = useSelector(
		state => {
			const list = _.cloneDeep(state.accountBook.accountList)
			const incomeList = []
			const outcomeList = []
			const sumList = []
			const labelList = []

			let stDate =
				durationType !== 'M'
					? dayjs(_.cloneDeep(startDate)).add(1, 'd').format('YYYY-MM-DD')
					: _.cloneDeep(startDate)
			let stackSum = 0
			for (let i = 0; i < durationInfo[durationType].cnt; i++) {
				let endDate = dayjs(stDate)
					.add(1, durationType)
					.subtract(1, 'd')
					.format('YYYY-MM-DD')
				const filteredList = list.filter(account => {
					return (
						account.isFixed ||
						(dayjs(account.date).diff(stDate, 'd') >= 0 &&
							dayjs(endDate).diff(account.date, 'd') >= 0)
					)
				})
				const result = calcSummary(filteredList, {
					startDate: stDate,
					endDate,
				})

				incomeList.push(result.fixedIncome + result.notFixedIncome)
				outcomeList.push(Math.abs(result.fixedOutcome + result.notFixedOutcome))
				stackSum +=
					result.fixedIncome +
					result.notFixedIncome +
					result.fixedOutcome +
					result.notFixedOutcome
				sumList.push(stackSum)
				labelList.push(
					dayjs(durationType === 'd' ? stDate : endDate).format('YYYY.MM.DD'),
				)
				stDate = dayjs(stDate).add(1, durationType).format('YYYY-MM-DD')
			}
			const summaryTypeList = calcSummaryType(list, {
				startDate: _.cloneDeep(startDate),
				endDate: dayjs().format('YYYY-MM-DD'),
			})
			return { incomeList, outcomeList, sumList, labelList, summaryTypeList }
		},
	)

	/**
	 * 파이차트 Options
	 * @type {import('react-apexcharts').Props}
	 */
	const pieChartState = {
		options: {
			chart: {
				width: 380,
				type: 'pie',
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
			tooltip: {
				y: {
					formatter: value => setComma(value),
				},
			},
		},
	}

	/**
	 * 라인/컬럼 복합 차트 Options
	 * @type {import('react-apexcharts').Props}
	 */
	const complexChartState = {
		series: [
			{
				name: '수입',
				type: 'column',
				data: incomeList,
			},
			{
				name: '지출',
				type: 'column',
				data: outcomeList,
			},
			{
				name: '누적합계',
				type: 'line',
				data: sumList,
			},
		],
		options: {
			chart: {
				toolbar: {
					tools: {
						zoom: false,
						zoomin: false,
						zoomout: false,
						selection: false,
						reset: true,
						pan: false,
						download: true,
					},
				},
				zoom: false,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: [4, 4, 2],
			},
			labels: labelList,
			xaxis: {
				type: 'datetime',
				labels: {
					formatter: value => {
						const formattedValue = dayjs(value).format('YYYY.MM.DD')
						return durationType === 'd' ? formattedValue : `~${formattedValue}`
					},
				},
			},
			yaxis: [
				{
					showAlways: false,
					seriesName: '수입',
					title: {
						text: '수입/지출',
					},
					labels: {
						formatter: value => setComma(value),
					},
				},
				{
					showAlways: false,
					seriesName: '수입',
					show: false,
				},
				{
					showAlways: false,
					opposite: true,
					title: {
						text: '누적합계',
					},
					labels: {
						formatter: value => setComma(value),
					},
				},
			],
			tooltip: {
				y: {
					formatter: value => setComma(value),
				},
				shared: true,
				intersect: false,
			},
			legend: {
				horizontalAlign: 'left',
				offsetX: 40,
			},
		},
	}

	return (
		<>
			<Container fluid>
				<h4>수입/지출 분석(이번달)</h4>
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
				<Dropdown as={Nav.Item} onSelect={mode => setDurationType(mode)}>
					<Dropdown.Toggle
						as={Nav.Link}
						data-toggle="dropdown"
						id="dropdown-67443507"
						variant="default"
						className="m-0"
					>
						<i className="nc-icon nc-planet"></i>
						<span className="notification">{durationInfo[durationType].name}</span>
						<span className="d-lg-none ml-1">Notification</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{Object.keys(durationInfo).map(type => {
							return (
								<Dropdown.Item key={type} eventKey={type}>
									{durationInfo[type].name}
								</Dropdown.Item>
							)
						})}
					</Dropdown.Menu>
				</Dropdown>
				<Row>
					<Col>
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title as="h4">종합 내역 그래프</Card.Title>
							</Card.Header>
							<Card.Body className="table-full-width table-responsive px-1">
								<div className="ct-chart" id="chartHours">
									<Chart
										options={complexChartState.options}
										series={complexChartState.series}
										height={280}
									/>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<Card>
							<Card.Header>
								<Card.Title as="h4">수입</Card.Title>
								<p className="card-category">위의 그래프에 대한 수입 분포도</p>
							</Card.Header>
							<Card.Body>
								<div className="ct-chart ct-perfect-fourth" id="chartPreferences">
									<Chart
										options={Object.assign(_.cloneDeep(pieChartState.options), {
											labels: Object.keys(summaryTypeList.income),
										})}
										series={Object.values(summaryTypeList.income)}
										type="pie"
									></Chart>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col md="6">
						<Card>
							<Card.Header>
								<Card.Title as="h4">지출</Card.Title>
								<p className="card-category">위의 그래프에 대한 지출 분포도</p>
							</Card.Header>
							<Card.Body>
								<div className="ct-chart ct-perfect-fourth" id="chartPreferences">
									<Chart
										options={Object.assign(_.cloneDeep(pieChartState.options), {
											labels: Object.keys(summaryTypeList.outcome),
										})}
										series={Object.values(summaryTypeList.outcome)}
										type="pie"
									></Chart>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default AccountBook
