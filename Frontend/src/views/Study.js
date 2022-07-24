import { CardView } from 'components/CardView'
import React, { Component, useEffect, useState } from 'react'
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import ChartistGraph from 'react-chartist'
import Chart from 'react-apexcharts'
import { StudyWeekGraph } from '../components/Graph/LineGraph'
import { fetchStudyWeekTimeByDate, fetchStudyWeekTime } from 'store/reducer/study'
import { useDispatch, useSelector } from 'react-redux'
import _, { sum } from 'lodash'

const Study = () => {
	const dispatch = useDispatch()
	useEffect(async () => {
		await dispatch(fetchStudyWeekTime({ week: 8 })).unwrap()
	}, [])
	return (
		<Container fluid>
			<Row>
				<Col>
					<FrequencyGraph title={'study time in recent weeks'} />
				</Col>
			</Row>
			<Row>
				<Col>
					<StudyTable />
				</Col>
			</Row>
			<Row>
				<Col md="8">
					<StudyWeekGraph
						dateOptions={{ unitType: 'minutes', startDate: '2022-05-25' }}
						action={fetchStudyWeekTimeByDate}
						title={`study time this week`}
					/>
				</Col>
				<Col md="4">
					<PieGraph title={'Average study time in last 4 weeks'} />
				</Col>
			</Row>
		</Container>
	)
}

const StudyTable = () => {
	return (
		<CardView
			title="Striped Table with Hover"
			subtitle="Here is a subtitle for this table"
		>
			<Table className="table-hover table-striped">
				<thead>
					<tr>
						<th className="border-0">ID</th>
						<th className="border-0">Name</th>
						<th className="border-0">Salary</th>
						<th className="border-0">Country</th>
						<th className="border-0">City</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Dakota Rice</td>
						<td>$36,738</td>
						<td>Niger</td>
						<td>Oud-Turnhout</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Minerva Hooper</td>
						<td>$23,789</td>
						<td>Curaçao</td>
						<td>Sinaai-Waas</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Sage Rodriguez</td>
						<td>$56,142</td>
						<td>Netherlands</td>
						<td>Baileux</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Philip Chaney</td>
						<td>$38,735</td>
						<td>Korea, South</td>
						<td>Overland Park</td>
					</tr>
					<tr>
						<td>5</td>
						<td>Doris Greene</td>
						<td>$63,542</td>
						<td>Malawi</td>
						<td>Feldkirchen in Kärnten</td>
					</tr>
					<tr>
						<td>6</td>
						<td>Mason Porter</td>
						<td>$78,615</td>
						<td>Chile</td>
						<td>Gloucester</td>
					</tr>
				</tbody>
			</Table>
		</CardView>
	)
}

const Graph1 = () => {
	return (
		<CardView title="Users Behavior" subTitle="24 Hours performance">
			<div className="ct-chart" id="chartHours">
				<ChartistGraph
					data={{
						labels: [
							'9:00AM',
							'12:00AM',
							'3:00PM',
							'6:00PM',
							'',
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
						plugins: [
							ChartistGraph.plugins.ctAverageLine({
								value: 6,
							}),
						],
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
		</CardView>
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

	console.log(studyWeek)
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
	const dispatch = useDispatch()

	const options = {
		chart: {
			height: 350,
			type: 'heatmap',
			toolbar: { enabled: false },
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
