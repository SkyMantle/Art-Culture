import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import styles from '../../../styles/components/VerificationPage/LoginPage.module.scss'
import API from '../../../utils/api.js'

const Login = () => {
	const [loginDetails, setLoginDetails] = useState({ email: '', password: '' }) // Descriptive names
	const [serverMessage, setServerMessage] = useState('')
	const navigate = useNavigate()
	const { login } = useAuth() // Access login function from context

	const handleChange = e => {
		const { name, value } = e.target
		setLoginDetails(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		try {
			const response = await API.post(
				'/auth/login',
				{
					email: loginDetails.email,
					password: loginDetails.password,
				},
				console.log('loginDetails.email, loginDetails.password')
			)

			if (response.status === 200) {
				const { token, user } = response.data // Assuming API returns user data
				login(user, token) // Update AuthContext
				navigate('/profile') // Redirect to profile
				console.log('token', token)
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.error || 'Login Failed')
			} else {
				setServerMessage('An error occurred during login.')
			}
		}
	}

	const handleSignUPLinkClick = () => {
		navigate('/SignUP')
	}

	return (
		<div className={styles.LoginContainer}>
			<header className={styles.LoginWrapper}>
				<h2>Login</h2>
				{/* Render serverMessage here */}
				{serverMessage && (
					<p className={styles.ErrorMessage}>{serverMessage}</p>
				)}
				<form className={styles.LoginForm} onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={loginDetails.email}
						onChange={handleChange}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={loginDetails.password}
						onChange={handleChange}
						required
					/>
					<button type='submit'>Увійти</button>
				</form>
				<p
					className={styles.SignUp}
					style={{
						cursor: 'pointer',
					}}
					onClick={handleSignUPLinkClick}
				>
					Зареєструватись
				</p>
			</header>
		</div>
	)
}

export default Login
