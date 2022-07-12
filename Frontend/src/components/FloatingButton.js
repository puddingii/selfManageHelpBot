import React, { Component, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

const ButtonWrapper = styled.div`
	box-sizing: border-box;
	margin: 25px;
	position: fixed;
	white-space: nowrap;
	z-index: 9998;
	padding-left: 0;
	list-style: none;
`

const InnerButton = styled.button`
	height: 56px;
	width: 56px;
	z-index: 9999;
	background-color: #666;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;
	border: none;
	border-radius: 50%;
	box-shadow: 0 0 4px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 28%);
	cursor: pointer;
	outline: none;
	padding: 0;
	-webkit-user-drag: none;
	font-weight: 500;
	color: #f1f1f1;
	font-size: 30px;

	background-color: #e74c3c;
`

const ButtonMark = styled.span`
	transition: all 0.4s ease;

	${props =>
		props.toggle &&
		css`
			transform: rotate(225deg);
		`}
	${props =>
		props.toggle &&
		css`
			transform: rotate(135deg);
		`}
`
const Toggle = styled.input`
	display: 'none';
`

const FloatingButton = () => {
	const [toggled, setToggled] = useState(false)
	const wrapperRef = useRef()

	// 디버깅용
	useEffect(() => {
		console.log(toggled)
	}, [toggled])

	useEffect(() => {
		const scrollWidth =
			document.querySelector('.main-panel').offsetWidth -
			document.querySelector('.main-panel').clientWidth
		wrapperRef.current.style.bottom = '30px'
		wrapperRef.current.style.right = `${30 + scrollWidth}px`
	}, [])

	return (
		<ButtonWrapper ref={wrapperRef}>
			<InnerButton
				onClick={() => {
					setToggled(!toggled)
				}}
			>
				<ButtonMark toggle={toggled}>+</ButtonMark>
			</InnerButton>
		</ButtonWrapper>
	)
}

export default FloatingButton
