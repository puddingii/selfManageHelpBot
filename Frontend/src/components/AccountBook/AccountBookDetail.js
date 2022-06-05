import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import { ko } from 'date-fns/esm/locale'
import styled from 'styled-components'
import _ from 'lodash'

// react-bootstrap components
import { Row, Col } from 'react-bootstrap'
import TableBox from 'components/Box/TableBox'
import {
	getAccountBookList,
	updateAccountBook,
	deleteAccountBook,
} from 'store/reducer/accountBook'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-datepicker/dist/react-datepicker.css'
import { setComma } from 'util/common'

// style
const CustomDatePicker = styled(DatePicker)`
	width: 190px;
`

const CenterCol = styled(Col)`
	float: none;
	margin: 0 auto;
`

// component
function AccountBookDetail() {
	const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day').toDate())
	const [endDate, setEndDate] = useState(dayjs().toDate())

	// Redux Init
	const accountInfo = useSelector(state => state.accountBook)
	// computed 속성
	const { fixedList, notFixedList } = useSelector(state => {
		const list = _.cloneDeep(state.accountBook.accountList)
		return list.reduce(
			(acc, cur) => {
				const curData = _.cloneDeep(cur)
				curData.date = dayjs(curData.date).format('YYYY-MM-DD')
				if (curData.isFixed) {
					acc.fixedList.push(curData)
				} else {
					acc.notFixedList.push(curData)
				}
				return acc
			},
			{ fixedList: [], notFixedList: [] },
		)
	})
	const userInfo = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			getAccountBookList({
				userId: userInfo.userId,
				startDate: dayjs(startDate).format('YYYY-MM-DD'),
				endDate: dayjs(endDate).format('YYYY-MM-DD'),
			}),
		)
	}, [startDate, endDate])

	const defaultColumns = [
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
			formatter: cell => {
				return <span>{`${setComma(cell)}원`}</span>
			},
		},
		{
			dataField: 'category',
			text: '카테고리',
			headerClasses: 'border-0',
		},
	]

	const notFixedColumns = _.cloneDeep(defaultColumns)
	notFixedColumns.push({
		dataField: 'date',
		text: '날짜',
		headerClasses: 'border-0',
	})

	const fixedColumns = _.cloneDeep(defaultColumns)
	fixedColumns.push(
		{
			dataField: 'date',
			text: '날짜',
			headerClasses: 'border-0',
		},
		{
			dataField: 'fixedDuration',
			text: '주기',
			headerClasses: 'border-0',
		},
	)

	const onClickTableUpdate = () => {
		console.log('update!')
	}

	const onClickTableDelete = async accountId => {
		const result = dispatch(deleteAccountBook({ userId: userInfo.userId, accountId }))
		return result
	}

	return (
		<>
			<Row>
				<CenterCol md="3">
					<CustomDatePicker
						dateFormat="yyyy-MM-dd"
						locale={ko}
						selected={startDate}
						startDate={startDate}
						endDate={endDate}
						onChange={update => {
							setStartDate(update)
						}}
						selectsStart
					/>
					<CustomDatePicker
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
					/>
				</CenterCol>
			</Row>
			<Row>
				<Col>
					<TableBox
						columnId="accountId"
						title="변동 수입/지출"
						description="고치거나 삭제할 내역이 있다면 해당 부분을 클릭하세요!"
						tableData={notFixedList}
						columns={notFixedColumns}
						onClickUpdate={onClickTableUpdate}
						onClickDelete={onClickTableDelete}
					></TableBox>
				</Col>
			</Row>
			<Row>
				<Col>
					<TableBox
						columnId="accountId"
						title="고정 수입/지출"
						description="고치거나 삭제할 내역이 있다면 해당 부분을 클릭하세요!"
						tableData={fixedList}
						columns={fixedColumns}
						onClickUpdate={onClickTableUpdate}
						onClickDelete={onClickTableDelete}
					></TableBox>
				</Col>
			</Row>
		</>
	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getAccountList: param => dispatch(getAccountBookList(param)),
		updateAccount: param => dispatch(updateAccountBook(param)),
		deleteAccount: param => dispatch(deleteAccountBook(param)),
	}
}

export default AccountBookDetail
