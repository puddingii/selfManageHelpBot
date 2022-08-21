import { CardView } from 'components/CardView'
import React, { Component, useEffect, useState } from 'react'
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import Chart from 'react-apexcharts'
import { StudyWeekGraph } from '../components/Graph/LineGraph'
import study, {
	fetchStudyWeekTimeByDate,
	fetchStudyWeekTime,
	fetchStudyDetailList,
} from 'store/reducer/study'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { CustomModalTableBox } from 'components/Box/TableBox'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import dayjs from 'dayjs'
import { TableModal } from 'components/Modal/TableModal'

const Study = () => {
	const dispatch = useDispatch()
	useEffect(async () => {
		await dispatch(fetchStudyWeekTime({ week: 8 })).unwrap()
	}, [])

	return (
		<Container fluid>
			<Row>
				<Col>
					<FrequencyGraph title={'최근 2달간 공부 시간'} />
				</Col>
			</Row>
			<Row>
				<Col>
					<StudyTable title="공부 상세 내역" />
				</Col>
			</Row>
			<Row>
				<Col md="8">
					<StudyWeekGraph
						dateOptions={{ unitType: 'minutes', startDate: '2022-05-25' }}
						action={fetchStudyWeekTimeByDate}
						title={`이번주 공부 시간(분)`}
					/>
				</Col>
				<Col md="4">
					<PieGraph title={'최근 4주간 일 평균 공부시간'} />
				</Col>
			</Row>
		</Container>
	)
}

const StudyTable = props => {
	const columns = [
		{
			dataField: 'title',
			text: '제목',
			headerClasses: 'border-0',
		},
		{
			dataField: 'startDate',
			text: '시작시간',
			headerClasses: 'border-0',
			formatter: date => {
				return <span>{`${dayjs(date).format('YYYY년MM월DD일 H시m분')}`}</span>
			},
			headerStyle: { width: '250px' },
			classes: 'text-center',
		},
		{
			dataField: 'endDate',
			text: '끝시간',
			headerClasses: 'border-0',
			formatter: date => {
				return <span>{`${dayjs(date).format('YYYY년MM월DD일 H시m분')}`}</span>
			},
			headerStyle: { width: '250px' },
			classes: 'text-center',
		},
		{
			dataField: 'commentList',
			text: '메모',
			headerClasses: 'border-0',
			formatter: list => {
				return <span>{`${list.length ?? 0}개`}</span>
			},
			headerStyle: { width: '100px' },
			cllasses: 'text-center',
		},
	]

	const tableData = useSelector(({ study }) => study.list)
	const modalHandler = row => {
		return !!(row.commentList?.length > 0)
	}
	const rowToModalProp = row => ({
		keyField: 'date',
		title: '공부 상세 내역',
		columns: [
			{
				dataField: 'title',
				text: '제목',
			},
			{
				dataField: 'date',
				text: '날짜',
				formatter: date => (
					<span>
						{dayjs(date).format('YYYY년MM월DD일')}
						<br />
						{dayjs(date).format('HH시mm분ss초')}
					</span>
				),
				headerStyle: { width: '150px' },
			},
		],
		tableData: row => row?.commentList ?? [],
		nonExpandable: row => row?.filter(data => !data.content).map(data => data.date) ?? [],
		extandRowKey: 'content',
		size: 'lg',
	})

	return (
		<CustomModalTableBox
			columnId="endDate"
			title={props.title}
			tableData={tableData}
			columns={columns}
			isAjaxSucceed=""
			datepicker={<TableDatePicker />}
			ModalComponent={TableModal}
			modalHandler={modalHandler}
			rowToModalProp={rowToModalProp}
		/>
	)
}

const TableDatePicker = () => {
	const dispatch = useDispatch()
	const [startDate, setStartDate] = useState(dayjs().add(-14, 'day').toDate())
	const [endDate, setEndDate] = useState(dayjs().toDate())
	const [nowDate, setNowdate] = useState(dayjs().add(1, 'day').date())

	useEffect(() => {
		dispatch(
			fetchStudyDetailList({
				startDate: dayjs(startDate).format('YYYY-MM-DD'),
				endDate: dayjs(endDate).format('YYYY-MM-DD'),
			}),
		).unwrap()
	}, [startDate, endDate])

	return (
		<div className="d-flex justify-content-center">
			<DatePicker
				dateFormat="yyyy-MM-dd"
				locale={ko}
				selected={startDate}
				startDate={startDate}
				endDate={endDate}
				onChange={update => {
					setStartDate(update)
				}}
				selectsStart
				wrapperClassName={'custom-date-picker-wrapper'}
				className="form-control"
			/>
			<h4 className="d-inline-block my-0 mx-1">~</h4>
			<DatePicker
				dateFormat="yyyy-MM-dd"
				locale={ko}
				selected={endDate}
				startDate={startDate}
				endDate={endDate}
				minDate={startDate}
				onChange={update => {
					setEndDate(update)
				}}
				selectsEnd
				wrapperClassName={'custom-date-picker-wrapper'}
				className="form-control"
			/>
		</div>
	)
}

const PieGraph = ({ title }) => {
	// 일주일 공부 데이터를 월화수목금토일 나눠서 보여줌
	const { recentWeek: studyRecentWeek } = useSelector(state => state.study)
	const [studyWeek, setStudyRecent] = useState(null)

	const getAverageData = () => {
		const data = studyRecentWeek.data.slice(-4)
		const len = data.length
		const sumOfDay = data.reduce(
			(prev, cur) => Object.values(cur).map((time, i) => Number(prev[i]) + Number(time)),
			[0, 0, 0, 0, 0, 0, 0],
		)
		return sumOfDay.map(sum => sum / len)
	}

	const getStudyRecent = () => {
		const { dayLabel } = studyRecentWeek
		const averageTimes = getAverageData()
		const mondayIndex = dayLabel.findIndex(el => el === '월')
		return {
			data: [...averageTimes.slice(mondayIndex), ...averageTimes.slice(0, mondayIndex)],
			label: [...dayLabel.slice(mondayIndex), ...dayLabel.slice(0, mondayIndex)],
		}
	}

	useEffect(() => {
		if (!_.isEmpty(studyRecentWeek?.data)) {
			setStudyRecent(getStudyRecent())
		}
	}, [studyRecentWeek])

	useEffect(() => {
		if (!_.isEmpty(studyRecentWeek?.data)) {
			setStudyRecent(getStudyRecent())
		}
	}, [])

	const options = {
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
	}

	return (
		studyWeek && (
			<CardView title={title}>
				<Chart
					options={{ ...options, labels: studyWeek.label }}
					series={studyWeek.data}
					type="pie"
					height={350}
				/>
			</CardView>
		)
	)
}

const FrequencyGraph = props => {
	const { recentWeek: studyRecentWeek } = useSelector(state => state.study)
	const [studyWeek, setStudyRecent] = useState(null)
	const [date, setDate] = useState(null)

	const options = {
		chart: {
			height: 350,
			type: 'heatmap',
			toolbar: { show: false },
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#F9C80E'],
		tooltip: {
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				return `<div class="arrow_box p-2">
						<span>
							${date[seriesIndex][dataPointIndex]} : <b>${series[seriesIndex][dataPointIndex]}</b>
						</span>
					</div>`
			},
		},
	}

	useEffect(() => {
		if (!_.isEmpty(studyRecentWeek)) {
			const { dayLabel } = studyRecentWeek

			setStudyRecent(
				studyRecentWeek.data.map((week, i) => {
					return {
						name: `${i + 1}주 전`,
						data: Object.keys(week).map((date, i) => ({
							x: dayLabel[i],
							y: week[date],
						})),
					}
				}),
			)
			setDate(studyRecentWeek.data.map(week => Object.keys(week)).reverse())
		}
	}, [studyRecentWeek])

	return (
		studyWeek && (
			<CardView title={props.title}>
				<Chart options={{ ...options }} series={studyWeek} type="heatmap" height={350} />
			</CardView>
		)
	)
}

export { Study }
