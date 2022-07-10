import React, { useState } from 'react'
import styled from 'styled-components'

// react-bootstrap components
import { Button, Dropdown, Nav, Container, Tabs, Tab } from 'react-bootstrap'
import { insertAccountBook } from 'store/reducer/accountBook'

import Summary from 'views/AccountBook/AccountBookSummary'
import Detail from 'views/AccountBook/AccountBookDetail'
import Calendar from 'views/AccountBook/AccountBookCalendar'
import { CommonModal } from 'components/Modal/Modal'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

const CreateAccountButton = styled(Button)`
	position: fixed;
	bottom: 80px;
	right: 30px;
	z-index: 999;

	width: 90px;
	height: 90px;
	border-radius: 40%;
	font-weight: bold;
`

const AccountBook = () => {
	const dispatch = useDispatch()
	const [tabType, setTabType] = useState('summary')
	const [isModalShow, setModalShow] = useState(false)
	const getDynamicComponent = tab => {
		if (tab === tabType) {
			switch (tabType) {
				case 'summary':
					return <Summary />
				case 'detail':
					return <Detail />
				case 'calendar':
					return <Calendar />
				default:
			}
		}
	}

	const modalProps = {
		title: '수입/지출 내역작성',
		fields: [
			{
				label: '내용',
				placeholder: '내용',
				value: '',
				required: true,
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
				required: true,
				name: 'category',
			},
			{
				label: '고정지출',
				value: false,
				type: 'checkbox',
				name: 'isFixed',
			},
			{
				label: '등록날짜',
				placeholder: '등록날짜',
				value: '',
				type: 'date',
				name: 'date',
			},
			{
				label: '주기숫자',
				placeholder: '고정지출인 경우 적어주세요',
				type: 'text',
				name: 'durationCnt',
				value: '',
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
		],
		fieldValues: {
			content: '',
			amount: 0,
			category: '',
			isFixed: false,
			date: dayjs().format('YYYY-MM-DD'),
			durationCnt: '',
			durationType: 'md',
		},
		buttons: {
			submit: {
				use: true,
				text: '저장',
				callback: async data => {
					const { amount, category, content, isFixed, durationCnt, durationType, date } =
						data
					const param = {
						userId: 'gun4930',
						amount: parseInt(amount, 10),
						category,
						content,
						isFixed,
						fixedDuration: `${durationCnt ? durationCnt : 1}${durationType}`,
						date,
					}
					if (amount === 0) {
						Swal.fire({
							icon: 'error',
							titleText: '경고!',
							text: '금액을 제대로 입력해주세요! 0원 입력 불가능',
						})
						return
					}
					setModalShow(false)

					const res = await dispatch(insertAccountBook(param)).unwrap()
					if (!!res.code)
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: '가계부 기록완료!',
							showConfirmButton: false,
							timer: 1500,
						})
				},
			},
			reset: {
				use: true,
				text: '초기화',
			},
		},
	}

	return (
		<>
			<Container fluid>
				<CreateAccountButton variant="success" onClick={() => setModalShow(true)}>
					가계부 작성
				</CreateAccountButton>
				<Tabs
					defaultActiveKey={tabType}
					onSelect={type => setTabType(type)}
					className="mb-3"
				>
					<Tab eventKey="summary" title="요약">
						{getDynamicComponent('summary')}
					</Tab>
					<Tab eventKey="detail" title="자세히 보기">
						{getDynamicComponent('detail')}
					</Tab>
					<Tab eventKey="calendar" title="캘린더">
						{getDynamicComponent('calendar')}
					</Tab>
				</Tabs>
				<CommonModal
					{...modalProps}
					isShow={isModalShow}
					handleClose={() => {
						setModalShow(false)
					}}
				/>
			</Container>
		</>
	)
}

export default AccountBook
