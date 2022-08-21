import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import { ko } from 'date-fns/esm/locale'
import styled, { createGlobalStyle } from 'styled-components'
import _ from 'lodash'

// react-bootstrap components
import { Row, Col } from 'react-bootstrap'
import { CommonModalTableBox } from 'components/Box/TableBox'
import {
	getAccountBookList,
	updateAccountBook,
	deleteAccountBook,
} from 'store/reducer/accountBook'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-datepicker/dist/react-datepicker.css'
import { setComma } from 'util/common'
import { formatDurationType } from 'util/dayUtil'
import { getLoginId } from 'util/authenticate'

// component
function AccountBookDetail() {
	const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day').toDate())
	const [endDate, setEndDate] = useState(dayjs().toDate())
	const [userId] = useState(getLoginId())
	const isAjaxSucceed = useSelector(state => state.accountBook.isAjaxSucceed)

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

				if (curData.fixedDuration) {
					curData.fixedDuration = formatDurationType(curData.fixedDuration)
				}
				return acc
			},
			{ fixedList: [], notFixedList: [] },
		)
	})
	const dispatch = useDispatch()

	// Modal Props
	const defaultModalProps = {
		title: '수입/지출 내역수정',
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
		],
		hiddenFields: [
			{ type: 'hidden', value: '', name: 'accountId' },
			{ type: 'hidden', value: '', name: 'isFixed' },
		],
		buttons: {
			customs: [
				{
					text: '삭제',
					handleClick: async (event, formData) => {
						const res = await dispatch(
							deleteAccountBook({ userId, accountId: formData.accountId }),
						).unwrap()
						return !!res.code
					},
				},
			],
			submit: {
				use: true,
				text: '수정',
				callback: async data => {
					const param = {
						userId,
						...data,
					}
					if (data.durationType) {
						param.fixedDuration = `${data.durationCnt}${data.durationType}`
					}
					const res = await dispatch(updateAccountBook(param)).unwrap()
					return !!res.code
				},
			},
			reset: {
				use: true,
				text: '초기화',
			},
		},
	}

	const notFixedModalProps = _.cloneDeep(defaultModalProps)
	notFixedModalProps.fields.push({
		label: '날짜',
		placeholder: '날짜',
		value: '',
		type: 'date',
		name: 'date',
	})

	const fixedModalProps = _.cloneDeep(defaultModalProps)
	fixedModalProps.fields.push(
		{
			label: '시작날짜',
			placeholder: '시작날짜',
			value: '',
			type: 'date',
			name: 'date',
		},
		{
			label: '주기숫자',
			type: 'text',
			name: 'durationCnt',
			value: '',
			required: true,
			pattern: /^[-]?[0-9]+$/,
			errormessage: '숫자만 입력 가능합니다.',
		},
		{
			label: '주기타입',
			type: 'select',
			name: 'durationType',
			options: [
				{ value: 'md', text: '특정날짜(ex-매달23일에)' },
				{ value: 'd', text: '일' },
				{ value: 'w', text: '주(7일)' },
				{ value: 'm', text: '달(30일)' },
				{ value: 'y', text: '년(365일)' },
			],
		},
	)

	useEffect(() => {
		dispatch(
			getAccountBookList({
				userId,
				startDate: dayjs(startDate).format('YYYY-MM-DD'),
				endDate: dayjs(endDate).format('YYYY-MM-DD'),
			}),
		)
	}, [startDate, endDate])

	// Child Component Props Settings
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
			text: '시작날짜',
			headerClasses: 'border-0',
		},
		{
			dataField: 'fixedDuration',
			text: '주기',
			headerClasses: 'border-0',
		},
	)

	return (
		<>
			<Row>
				<Col className="text-center mb-3">
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
					<h4 className="d-inline-block my-0 mx-1" style={{ lineHeight: 0 }}>
						~
					</h4>
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
				</Col>
			</Row>
			<Row>
				<Col>
					<CommonModalTableBox
						columnId="accountId"
						title="변동 수입/지출"
						description="고치거나 삭제할 내역이 있다면 해당 부분을 클릭하세요!"
						tableData={notFixedList}
						columns={notFixedColumns}
						modalProps={notFixedModalProps}
						isAjaxSucceed={isAjaxSucceed}
					></CommonModalTableBox>
				</Col>
			</Row>
			<Row>
				<Col>
					<CommonModalTableBox
						columnId="accountId"
						title="고정 수입/지출"
						description="고치거나 삭제할 내역이 있다면 해당 부분을 클릭하세요!"
						tableData={fixedList}
						columns={fixedColumns}
						modalProps={fixedModalProps}
					></CommonModalTableBox>
				</Col>
			</Row>
		</>
	)
}

export default AccountBookDetail
