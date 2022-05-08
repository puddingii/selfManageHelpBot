import React, { Component } from 'react'
import moment from 'moment'
import recur from 'moment-recur'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { CardView } from 'components/CardView'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const dateOptions = {
	type: '', // week or month      -> recur parameter unit 1 or 4
	unitType: '', // won or minutes
	startDate: '', //YYYY-MM-DD
}

const LineGraph = ({ data, dateOptions, action, title, subTitle = null }) => {
	const dispatch = useDispatch()

	const getDateSet = () => {
		const { type, startDate } = dateOptions
		let label = []
		const endDate =
			type === 'month'
				? moment(startDate).endOf('month').format('YYYY-MM-DD')
				: moment().day(7).format('YYYY-MM-DD')
		label = moment()
			.recur(startDate, endDate)
			.every(1)
			.days()
			.all('L')
			.map(e => {
				const [M, D, Y] = e.split('/')
				return `${Y}-${M}-${D}`
			})

		return label
	}

	const getPayload = () => {
		const { type, startDate } = dateOptions
		const payload = { startDate }
		if (type === 'month') {
			payload.count = parseInt(moment(startDate).endOf('month').format('DD'))
		} else {
			payload.count = 7
		}
		return payload
	}

	const [state, setState] = useState(null)

	useEffect(async () => {
		dispatch(action(getPayload())).unwrap()
	}, [])

	useEffect(() => {
		if (data && Object.keys(data).length > 0) {
			const [date, time] = [data.list.map(e => e.date), data.list.map(e => e.time)]
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
								y: data.average,
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
					labels: getDateSet(),
					xaxis: {
						type: 'string',
						labels: {
							rotate: 0,
							hideOverlappingLabels: true,
						},
					},
					yaxis: {
						title: {
							text: dateOptions.unitType,
						},
					},
				},
			})
		}
	}, [data])

	return (
		<CardView title={title} subTitle={subTitle}>
			{state && (
				<Chart options={state.options} series={state.series} type="line" height={350} />
			)}
		</CardView>
	)
}

const StudyWeekGraph = props => {
	const data = useSelector(({ study }) => study.week)
	props.dateOptions.type = 'week'
	return <LineGraph {...props} data={data} />
}

export { StudyWeekGraph }
