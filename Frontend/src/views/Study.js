import { CardView } from 'components/CardView'
import React, { Component } from 'react'
import { Col, Container, Row, Card, Table } from 'react-bootstrap'
import ChartistGraph from 'react-chartist'
import Chart from 'react-apexcharts'
import { LineGraph } from '../components/Graph/LineGraph'

const Study = () => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<FrequencyGraph />
				</Col>
			</Row>
			<Row>
				<Col>
					<StudyTable />
				</Col>
			</Row>
			<Row>
				<Col md="8">
					{/* <Graph1 /> */}
					{<LineGraph dateOptions={{}} action={() => {}} payload={{}} />}
				</Col>
				<Col md="4">
					<Graph2 />
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

const Graph2 = () => {
	return (
		<CardView title="Email Statistics" subTitle="Last Campaign Performance">
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
		</CardView>
	)
}

const FrequencyGraph = () => {
	const generateData = () => [
		{
			x: 'W1',
			y: 22,
		},
		{
			x: 'W2',
			y: 29,
		},
		{
			x: 'W3',
			y: 13,
		},
		{
			x: 'W4',
			y: 32,
		},
	]
	const options = {
		chart: {
			height: 350,
			type: 'heatmap',
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#008FFB'],
		title: {
			text: 'HeatMap Chart (Single color)',
		},
	}
	const series = [
		{
			name: 'Metric1',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric2',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric3',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric4',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric5',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric6',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric7',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric8',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
		{
			name: 'Metric9',
			data: generateData(18, {
				min: 0,
				max: 90,
			}),
		},
	]

	return (
		<CardView>
			<Chart
				options={{ ...options, ...series }}
				series={series}
				type="heatmap"
				height={350}
			/>
		</CardView>
	)
}

export { Study }
