import React, { Children, Component } from 'react'
import { faAddressCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { LoginModal } from './Component'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

const USER_ID_ERROR = '아이디는 6자 이상 12자 이하의 영어 및 숫자만 가능합니다.'
const PASSWORD_ERROR = '비밀번호는 6자 이상 30자 이하의 A-z0-9!@^()&*-_=+만 가능합니다.'
const NICKNAME_ERROR = '닉네임은 2자 이상 10자 이하의 한글,숫자,영어만 가능합니다.'
const DISCORD_ID_ERROR = '디스코드 ID는 18자의 숫자만 가능합니다.'

export const LoginBox = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()
	console.log(location.pathname)
	return (
		<LoginModal.Frame isShow={true}>
			<LoginModal.Header title={'Sign In'} />
			<LoginModal.Body>
				<LoginModal.Control
					icon={faUser}
					isInvalid={errors.userId}
					placeholder={'UserID'}
					error={USER_ID_ERROR}
					register={register('userId', { required: true, pattern: /^[A-z0-9]{6,12}$/ })}
				/>
				<LoginModal.Control
					icon={faLock}
					isInvalid={errors.passwd}
					placeholder={'Password'}
					error={PASSWORD_ERROR}
					type={'password'}
					register={register('passwd', {
						required: true,
						pattern: /^[A-z0-9!@^()&*\-_=+]{6,30}$/,
					})}
				/>
				<LoginModal.Button
					text="Sign In"
					handleClick={handleSubmit(data => {
						console.log(data)
					})}
				/>
				<p
					style={{
						textAlign: 'center',
						paddingTop: '5px',
						fontSize: '13px',
					}}
				>
					<a href="#" style={{ color: '#19aa8d', textDecoration: 'none' }}>
						Forgot Password?
					</a>
				</p>
			</LoginModal.Body>
			<LoginModal.Footer>
				Don't have an account?
				<Link to={'/account/signup'} style={{ color: '#19aa8d', textDecoration: 'none' }}>
					Create one
				</Link>
			</LoginModal.Footer>
		</LoginModal.Frame>
	)
}

export const SignUpBox = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()
	return (
		<LoginModal.Frame isShow={true}>
			<LoginModal.Header title={'Sign Up'} />
			<LoginModal.Body>
				<LoginModal.Control
					icon={faUser}
					isInvalid={errors.userId}
					placeholder={'UserID'}
					error={USER_ID_ERROR}
					register={register('userId', { required: true, pattern: /^[A-z0-9]{6,12}$/ })}
				/>
				<LoginModal.Control
					icon={faAddressCard}
					isInvalid={errors.nickname}
					placeholder={'Nickname'}
					error={NICKNAME_ERROR}
					register={register('nickname', {
						required: true,
						pattern: /^[A-z0-9가-힣]{2,10}$/,
					})}
				/>
				<LoginModal.Control
					icon={faLock}
					isInvalid={errors.passwd}
					placeholder={'Password'}
					error={PASSWORD_ERROR}
					type={'password'}
					register={register('passwd', {
						required: true,
						pattern: /^[A-z0-9!@^()&*\-_=+]{6,30}$/,
					})}
				/>
				<LoginModal.Control
					icon={faDiscord}
					isInvalid={errors.discordId}
					placeholder={'Discord ID (Optional)'}
					error={DISCORD_ID_ERROR}
					register={register('discordId', {
						pattern: /^[0-9]{18}$/,
					})}
				/>
				<LoginModal.Button
					text="Sign Up"
					handleClick={handleSubmit(data => {
						console.log(data)
					})}
				/>
			</LoginModal.Body>
			<LoginModal.Footer>
				Already have an account?
				<Link to={'/account/login'} style={{ color: '#19aa8d', textDecoration: 'none' }}>
					Login
				</Link>
			</LoginModal.Footer>
		</LoginModal.Frame>
	)
}
