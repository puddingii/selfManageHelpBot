import React, { Component } from 'react'
import moment from 'moment'
import recur from 'moment-recur'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { CardView } from 'components/CardView'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import study, { fetchStudyWeekTimeByDate } from '../../store/reducer/study'

const LineGraph = () => {
	const dispatch = useDispatch()
	// const LineGraph = ({ data, options }) => {
	const getDateSet = dateOptions => {
		const { type, startDate } = dateOptions
		let dateSet = []
		let label = []
		if (type === 'month') {
			const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')
			const labelLength = Number(endDate.split('-')[2])
			label = Array(labelLength).fill('')
			dateSet = moment().recur(startDate, endDate).every(4).days().all('L')
			for (const date of dateSet) {
				const idx = Number(date.split('-')[2]) - 1
				label[idx] = date
			}
		} else {
			label = dateSet = moment()
				.recur(startDate, moment().day(7).format('YYYY-MM-DD'))
				.every(1)
				.days()
				.all('L')
		}

		return label
	}
	const dateOptions = {
		type: '', // weeks or months      -> recur parameter unit 1 or 4
		unitType: '', // won or minuets
		startDate: '', //YYYY-MM-DD
	}

	// 액션함수
	const action = {}

	const payload = {}

	// 타이틀
	const title = ''
	const subTitle = ''

	const fetchOptions = {
		url: '',
		params: {}, // dateOptions에서 가져옴
	}

	const [state, setState] = useState(null)
	const weekData = useSelector(({ study }) => study.week)

	useEffect(async () => {
		dispatch(fetchStudyWeekTimeByDate({ startDate: '2022-05-01', count: 3 })).unwrap()
	}, [])

	useEffect(() => {
		if (Object.keys(weekData).length > 0) {
			const [date, time] = [
				weekData.list.map(e => e.date),
				weekData.list.map(e => e.time),
			]
			setState({
				series: [
					{
						name: dateOptions.unitType,
						data: time,
					},
				],
				options: {
					chart: {
						height: 350,
						type: 'line',
						id: 'areachart-2',
						zoom: {
							enabled: false,
						},
					},
					annotations: {
						yaxis: [
							{
								y: 30,
								borderColor: '#00E396',
								label: {
									borderColor: '#00E396',
									style: {
										color: '#fff',
										background: '#00E396',
									},
									text: 'average',
								},
							},
						],
					},
					dataLabels: {
						enabled: false,
					},
					stroke: {
						curve: 'straight',
					},
					grid: {
						padding: {
							right: 30,
							left: 20,
						},
					},
					labels: getDateSet(dateOptions),
					xaxis: {
						type: 'string',
					},
				},
			})
		}
	}, [weekData])

	return (
		<CardView title={title} subTitle={subTitle}>
			{state && (
				<Chart options={state.options} series={state.series} type="line" height={350} />
			)}
		</CardView>
	)
}

const StudyLineGraph = props => {
	const data = useSelector(({ study }) => study.week)
	return <LineGraph props={{ ...props, data }} />
}

export { LineGraph }
