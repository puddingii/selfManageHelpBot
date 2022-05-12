import React from 'react'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'

// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Dropdown,
	Navbar,
	Nav,
	Table,
	Container,
	Row,
	Col,
	Form,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap'
import { increment, fetchUserById } from 'store/reducer/user'
import SummaryMiniBox from 'components/Box/SummaryMiniBox'
import TableBox from 'components/Box/TableBox'
import AccountTable from 'components/CustomTable/AccountTable'

function AccountBook({ onBtnClick }) {
	const columns = [
		{
			dataField: 'id',
			text: 'Product ID',
			headerClasses: 'border-0',
		},
		{
			dataField: 'name',
			text: 'Product Name',
			headerClasses: 'border-0',
		},
	]
	const tableData = [
		{ id: '1', name: 'Book 1' },
		{ id: '2', name: 'Book 2' },
		{ id: '3', name: 'Book 3' },
		{ id: '4', name: 'Book 4' },
		{ id: '5', name: 'Book 5' },
		{ id: '6', name: 'Book 6' },
		{ id: '7', name: 'Book 6' },
		{ id: '8', name: 'Book 6' },
		{ id: '9', name: 'Book 6' },
		{ id: '61', name: 'Book 6' },
		{ id: '62', name: 'Book 6' },
		{ id: '63', name: 'Book 6' },
		{ id: '64', name: 'Book 6' },
		{ id: '65', name: 'Book 6' },
		{ id: '66', name: 'Book 6' },
		{ id: '67', name: 'Book 6' },
		{ id: '68', name: 'Book 6' },
	]

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
							Notification 1
						</Dropdown.Item>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							Notification 2
						</Dropdown.Item>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							Notification 3
						</Dropdown.Item>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							Notification 4
						</Dropdown.Item>
						<Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
							Another notification
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
					<Col>
						<TableBox title="예?" description="Here is a subtitle for this table">
							<AccountTable tableData={tableData} columns={columns}></AccountTable>
						</TableBox>
					</Col>
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
				<Row>
					<Col md="6">
						<Card>
							<Card.Header>
								<Card.Title as="h4">2017 Sales</Card.Title>
								<p className="card-category">All products including Taxes</p>
							</Card.Header>
							<Card.Body>
								<div className="ct-chart" id="chartActivity">
									<ChartistGraph
										data={{
											labels: [
												'Jan',
												'Feb',
												'Mar',
												'Apr',
												'Mai',
												'Jun',
												'Jul',
												'Aug',
												'Sep',
												'Oct',
												'Nov',
												'Dec',
											],
											series: [
												[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
												[412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
											],
										}}
										type="Bar"
										options={{
											seriesBarDistance: 10,
											axisX: {
												showGrid: false,
											},
											height: '245px',
										}}
										responsiveOptions={[
											[
												'screen and (max-width: 640px)',
												{
													seriesBarDistance: 5,
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
									Tesla Model S <i className="fas fa-circle text-danger"></i>
									BMW 5 Series
								</div>
								<hr></hr>
								<div className="stats">
									<i className="fas fa-check"></i>
									Data information certified
								</div>
							</Card.Footer>
						</Card>
					</Col>
					<Col md="6">
						<Card className="card-tasks">
							<Card.Header>
								<Card.Title as="h4">Tasks</Card.Title>
								<p className="card-category">Backend development</p>
							</Card.Header>
							<Card.Body>
								<div className="table-full-width">
									<Table>
										<tbody>
											<tr>
												<td>
													<Form.Check className="mb-1 pl-0">
														<Form.Check.Label>
															<Form.Check.Input
																defaultValue=""
																type="checkbox"
															></Form.Check.Input>
															<span className="form-check-sign"></span>
														</Form.Check.Label>
													</Form.Check>
												</td>
												<td>
													Sign contract for "What are conference organizers afraid of?"
												</td>
												<td className="td-actions text-right">
													<OverlayTrigger
														overlay={
															<Tooltip id="tooltip-488980961">Edit Task..</Tooltip>
														}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="info"
														>
															<i className="fas fa-edit"></i>
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														overlay={<Tooltip id="tooltip-506045838">Remove..</Tooltip>}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="danger"
														>
															<i className="fas fa-times"></i>
														</Button>
													</OverlayTrigger>
												</td>
											</tr>
											<tr>
												<td>
													<Form.Check className="mb-1 pl-0">
														<Form.Check.Label>
															<Form.Check.Input
																defaultChecked
																defaultValue=""
																type="checkbox"
															></Form.Check.Input>
															<span className="form-check-sign"></span>
														</Form.Check.Label>
													</Form.Check>
												</td>
												<td>
													Lines From Great Russian Literature? Or E-mails From My Boss?
												</td>
												<td className="td-actions text-right">
													<OverlayTrigger
														overlay={
															<Tooltip id="tooltip-537440761">Edit Task..</Tooltip>
														}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="info"
														>
															<i className="fas fa-edit"></i>
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														overlay={<Tooltip id="tooltip-21130535">Remove..</Tooltip>}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="danger"
														>
															<i className="fas fa-times"></i>
														</Button>
													</OverlayTrigger>
												</td>
											</tr>
											<tr>
												<td>
													<Form.Check className="mb-1 pl-0">
														<Form.Check.Label>
															<Form.Check.Input
																defaultChecked
																defaultValue=""
																type="checkbox"
															></Form.Check.Input>
															<span className="form-check-sign"></span>
														</Form.Check.Label>
													</Form.Check>
												</td>
												<td>
													Flooded: One year later, assessing what was lost and what was
													found when a ravaging rain swept through metro Detroit
												</td>
												<td className="td-actions text-right">
													<OverlayTrigger
														overlay={
															<Tooltip id="tooltip-577232198">Edit Task..</Tooltip>
														}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="info"
														>
															<i className="fas fa-edit"></i>
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														overlay={<Tooltip id="tooltip-773861645">Remove..</Tooltip>}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="danger"
														>
															<i className="fas fa-times"></i>
														</Button>
													</OverlayTrigger>
												</td>
											</tr>
											<tr>
												<td>
													<Form.Check className="mb-1 pl-0">
														<Form.Check.Label>
															<Form.Check.Input
																defaultChecked
																type="checkbox"
															></Form.Check.Input>
															<span className="form-check-sign"></span>
														</Form.Check.Label>
													</Form.Check>
												</td>
												<td>Create 4 Invisible User Experiences you Never Knew About</td>
												<td className="td-actions text-right">
													<OverlayTrigger
														overlay={
															<Tooltip id="tooltip-422471719">Edit Task..</Tooltip>
														}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="info"
														>
															<i className="fas fa-edit"></i>
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														overlay={<Tooltip id="tooltip-829164576">Remove..</Tooltip>}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="danger"
														>
															<i className="fas fa-times"></i>
														</Button>
													</OverlayTrigger>
												</td>
											</tr>
											<tr>
												<td>
													<Form.Check className="mb-1 pl-0">
														<Form.Check.Label>
															<Form.Check.Input
																defaultValue=""
																type="checkbox"
															></Form.Check.Input>
															<span className="form-check-sign"></span>
														</Form.Check.Label>
													</Form.Check>
												</td>
												<td>Read "Following makes Medium better"</td>
												<td className="td-actions text-right">
													<OverlayTrigger
														overlay={
															<Tooltip id="tooltip-160575228">Edit Task..</Tooltip>
														}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="info"
														>
															<i className="fas fa-edit"></i>
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														overlay={<Tooltip id="tooltip-922981635">Remove..</Tooltip>}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="danger"
														>
															<i className="fas fa-times"></i>
														</Button>
													</OverlayTrigger>
												</td>
											</tr>
											<tr>
												<td>
													<Form.Check className="mb-1 pl-0">
														<Form.Check.Label>
															<Form.Check.Input
																defaultValue=""
																disabled
																type="checkbox"
															></Form.Check.Input>
															<span className="form-check-sign"></span>
														</Form.Check.Label>
													</Form.Check>
												</td>
												<td>Unfollow 5 enemies from twitter</td>
												<td className="td-actions text-right">
													<OverlayTrigger
														overlay={
															<Tooltip id="tooltip-938342127">Edit Task..</Tooltip>
														}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="info"
														>
															<i className="fas fa-edit"></i>
														</Button>
													</OverlayTrigger>
													<OverlayTrigger
														overlay={<Tooltip id="tooltip-119603706">Remove..</Tooltip>}
													>
														<Button
															className="btn-simple btn-link p-1"
															type="button"
															variant="danger"
														>
															<i className="fas fa-times"></i>
														</Button>
													</OverlayTrigger>
												</td>
											</tr>
										</tbody>
									</Table>
								</div>
							</Card.Body>
							<Card.Footer>
								<hr></hr>
								<div className="stats">
									<i className="now-ui-icons loader_refresh spin"></i>
									Updated 3 minutes ago
								</div>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onBtnClick: () => dispatch(fetchUserById()),
	}
}

export default connect(null, mapDispatchToProps)(AccountBook)
