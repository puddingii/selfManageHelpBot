import React, { useEffect, useMemo, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
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
import { modalprops } from 'components/Modal/Modal'

const CustomDatePicker = styled(DatePicker)`
	width: 190px;
`

const CenterCol = styled(Col)`
	float: none;
	margin: 0 auto;
`

function AccountBookDetail({
	getAccountList,
	userInfo,
	accountInfo,
	updateAccount,
	deleteAccount,
}) {
	const dispatch = useDispatch()
	const [dateRange, setDateRange] = useState([null, null])
	const [startDate, endDate] = dateRange

	useEffect(() => {
		getAccountList({
			userId: userInfo.userId,
			startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
			endDate: dayjs().format('YYYY-MM-DD'),
		})

		notFixedModalProps.buttons.submit.callback = async data => {
			const res = await dispatch(
				updateAccountBook({ ...data, userId: 'gun4930' }),
			).unwrap()
			return !!res.code
		}
	}, [])

	/** 데이터 초기화 */
	let tableData = accountInfo.accountList
	tableData = tableData.map(data => {
		let fixData = Object.assign({}, data)
		fixData.amount = `${setComma(fixData.amount)}원` // TODO 공용컴포넌트에서 타입 숫자 감지후 변환 생각해볼것
		fixData.date = dayjs(fixData.date).format('YYYY-MM-DD')
		return fixData
	})

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
		},
		{
			dataField: 'category',
			text: '카테고리',
			headerClasses: 'border-0',
		},
	]

	const notFixedColumns = _.clone(defaultColumns)
	notFixedColumns.push({
		dataField: 'date',
		text: '날짜',
		headerClasses: 'border-0',
	})

	const fixedColumns = _.clone(defaultColumns)
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
		const result = await deleteAccount({ userId: userInfo.userId, accountId })
		return result
	}

	return (
		<>
			<Row>
				<CenterCol md={3}>
					<CustomDatePicker
						dateFormat="yyyy-MM-dd"
						locale={ko}
						selectsRange={true}
						startDate={startDate}
						endDate={endDate}
						onChange={update => {
							setDateRange(update)
						}}
						selectedRange={`${dayjs()
							.subtract(7, 'day')
							.format('YYYY-MM-DD')} - ${dayjs().format('YYYY-MM-DD')}`}
					/>
				</CenterCol>
			</Row>
			<Row>
				<Col>
					<TableBox
						columnId="accountId"
						title="예?"
						description="Here is a subtitle for this table"
						tableData={tableData}
						columns={notFixedColumns}
						onClickUpdate={onClickTableUpdate}
						onClickDelete={onClickTableDelete}
						modalProps={notFixedModalProps}
					></TableBox>
				</Col>
			</Row>
			<Row>
				<Col>
					<TableBox
						columnId="accountId"
						title="예?"
						description="Here is a subtitle for this table"
						tableData={tableData}
						columns={fixedColumns}
						onClickUpdate={onClickTableUpdate}
						onClickDelete={onClickTableDelete}
						modalProps={modalprops}
					></TableBox>
				</Col>
			</Row>
		</>
	)
}

const mapStateToProps = state => {
	return { userInfo: state.user, accountInfo: state.accountBook }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getAccountList: param => dispatch(getAccountBookList(param)),
		updateAccount: param => dispatch(updateAccountBook(param)),
		deleteAccount: param => dispatch(deleteAccountBook(param)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBookDetail)

const notFixedModalProps = {
	title: '비고정지출 내역 수정',
	fields: [
		{
			label: '내용',
			placeholder: '내용',
			value: '',
			type: 'text',
			name: 'content',
		},
		{
			label: '금액',
			placeholder: '금액',
			value: '',
			type: 'text',
			name: 'amount',
			required: true,
			pattern: /^[-]?[0-9]+$/,
			errormessage: '숫자만 입력 가능합니다.',
		},
		{
			label: '카테고리',
			placeholder: '카테고리',
			value: '',
			type: 'text',
			name: 'category',
		},
		{
			label: '날짜',
			placeholder: '날짜',
			value: '',
			type: 'date',
			name: 'date',
		},
	],
	buttons: {
		customs: [{ text: '삭제', handleClick: () => {} }],
		submit: {
			use: true,
			text: '수정',
		},
		reset: {
			use: true,
			text: '초기화',
		},
	},
}
