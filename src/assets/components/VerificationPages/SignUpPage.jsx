import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import styles from '../../../styles/components/VerificationPage/SignUpPage.module.scss'
import API from '../../../utils/api.js'

const SignUp = () => {
	const [signUpDetails, setSignUpDetails] = useState({
		email: '',
		password: '',
		role: 'USER',
		title: '',
		bio: '',
		profileImage: null,
	})
	const [serverMessage, setServerMessage] = useState('')
	const { login } = useAuth() // Utilize login from AuthContext
	const [profileImage, setProfileImage] = useState(null)
	const navigate = useNavigate()

	const handleChange = e => {
		const { name, value, files } = e.target
		if (name === 'profileImage') {
			setSignUpDetails(prev => ({
				...prev,
				profileImage: files[0] || null,
			}))
		} else {
			setSignUpDetails(prev => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		console.log('signUpDetails before submission:', signUpDetails)

		const formData = new FormData()
		formData.append('email', signUpDetails.email)
		formData.append('password', signUpDetails.password)
		formData.append('role', signUpDetails.role)
		formData.append('title', signUpDetails.title)
		formData.append('bio', signUpDetails.bio)
		if (signUpDetails.profileImage) {
			formData.append('profileImage', signUpDetails.profileImage)
		}

		// Log formData entries for debugging
		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value)
		}

		try {
			const response = await API.post(
				'/auth/register',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
				console.log('signUpDetails', signUpDetails)
			)

			if (response.status === 201) {
				const { token, user } = response.data // Assuming API returns user data
				login(user, token) // Update AuthContext
				navigate('/profile') // Redirect to profile
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.error || 'Registration failed.')
			} else {
				setServerMessage('An error occurred during registration.')
			}
		}
	}

	return (
		<div className={styles.SignUpContainer}>
			<header className={styles.SignUpWrapper}>
				<h2>Sign Up</h2>
				{serverMessage && (
					<p className={styles.ErrorMessage}>{serverMessage}</p>
				)}
				<form className={styles.SignUpForm} onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={signUpDetails.email}
						onChange={handleChange}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={signUpDetails.password}
						onChange={handleChange}
						required
					/>
					<input
						type='text'
						placeholder='Title'
						name='title'
						value={signUpDetails.title}
						onChange={handleChange}
					/>
					<textarea
						placeholder='Bio'
						name='bio'
						value={signUpDetails.bio}
						onChange={handleChange}
					/>
					<input
						type='file'
						name='profileImage'
						accept='image/*'
						onChange={handleChange}
					/>
					<select
						name='role'
						value={signUpDetails.role}
						onChange={handleChange}
						className={styles.roleSelect}
					>
						<option value='USER'>User</option>

						<option value='MUSEUM'>Museum</option>
						<option value='CREATOR'>Creator</option>
						<option value='EDITOR'>Editor</option>
					</select>
					<button type='submit'>Sign Up</button>
				</form>
			</header>
		</div>
	)
}
export default SignUp
