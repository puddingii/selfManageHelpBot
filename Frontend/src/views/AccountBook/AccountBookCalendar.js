import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import moment from 'moment'
import styled from 'styled-components'

import { calcSummary, getAccountBookList } from 'store/reducer/accountBook'
import { setComma } from 'util/common'

const TitleDiv = styled.div`
	display: flex;
`
const CustomSpinner = styled(Spinner)`
	margin-top: 30px;
	margin-bottom: 15px;
`

const AccountBookCalendar = () => {
	dayjs.locale('ko')
	const [startDate, setStartDate] = useState(dayjs().startOf('month'))
	const userInfo = useSelector(state => state.user)
	const isAjaxSucceed = useSelector(state => state.accountBook.isAjaxSucceed)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(
			getAccountBookList({
				userId: userInfo.userId,
				startDate: startDate.format('YYYY-MM-DD'),
				endDate: startDate.endOf('month').format('YYYY-MM-DD'),
			}),
		)
	}, [startDate])

	const myEventList = useSelector(state => {
		const list = _.cloneDeep(state.accountBook.accountList)

		let stDate = startDate
		const eventList = []
		for (let i = 0; i < dayjs().endOf('month').date(); i++) {
			const filteredList = list.filter(account => {
				return (
					account.isFixed ||
					dayjs(stDate).diff(dayjs(account.date).format('YYYY-MM-DD'), 'd') === 0 // 시간까지는 고려안하므로 format으로 시간요소 없앰
				)
			})
			const result = calcSummary(filteredList, {
				startDate: stDate.format('YYYY-MM-DD'),
				endDate: stDate.format('YYYY-MM-DD'),
			})

			const income = result.fixedIncome + result.notFixedIncome
			if (income !== 0)
				eventList.push({
					title: `${setComma(income)}원`,
					start: stDate.toDate(),
					end: stDate.toDate(),
				})

			const outcome = result.fixedOutcome + result.notFixedOutcome
			if (outcome !== 0)
				eventList.push({
					title: `${setComma(outcome)}원`,
					start: stDate.toDate(),
					end: stDate.toDate(),
				})
			stDate = stDate.add(1, 'd')
		}

		return eventList
	})

	const { defaultDate, formats } = useMemo(
		/** @returns {import('react-big-calendar').CalendarProps} */
		() => ({
			defaultDate: dayjs().toDate(),
			formats: {
				weekdayFormat: date => dayjs(date).format('ddd'),
				monthHeaderFormat: date => dayjs(date).format('YYYY년 MM월'),
			},
		}),
		[],
	)
	moment.locale('ko-KR')
	const localizer = momentLocalizer(moment)

	const eventPropGetter = useCallback(event => {
		const money = parseInt(event.title.replaceAll(',', '').replace('원', ''), 10)
		const color = money > 0 ? '#DBF5FC' : '#FFDADB'
		return {
			style: {
				backgroundColor: color,
				color: 'black',
			},
		}
	}, [])

	return (
		<>
			<Container fluid>
				<TitleDiv>
					<h4>수입/지출 캘린더</h4>
					{isAjaxSucceed === 'pending' ? (
						<CustomSpinner animation="border" variant="secondary" />
					) : null}
				</TitleDiv>
				<Row style={{ height: 600 }}>
					<Col>
						<Calendar
							localizer={localizer}
							defaultDate={defaultDate}
							views={['month']}
							events={myEventList}
							messages={{
								previous: '이전',
								next: '다음',
								today: '오늘',
							}}
							formats={formats}
							onNavigate={(newDate, view, action) => {
								switch (action) {
									case 'PREV':
										const prevDate = startDate.subtract(1, 'month')
										setStartDate(prevDate)
										break
									case 'NEXT':
										const nextDate = startDate.add(1, 'month')
										setStartDate(nextDate)
										break
									default:
										const curDate = dayjs().startOf('month')
										setStartDate(curDate)
								}
							}}
							eventPropGetter={eventPropGetter}
						></Calendar>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default AccountBookCalendar
