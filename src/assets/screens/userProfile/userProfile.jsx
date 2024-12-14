import { getFormattedDate } from '@/utils/helper'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import API from '../../../utils/api.js'
import ImageEditor from '../../components/Blocks/ImageEditor.jsx'
import TextEditor from '../../components/Blocks/TextEditor.jsx'
import styles from '/src/styles/components/UserProfile/userProfile.module.scss'
import TextAreaEditor from '../../components/Blocks/TextAreaEditor.jsx'

const UserProfile = () => {
	const { user, updateUser, loading, error } = useAuth() // Access user and logout from context

	const [email, setEmail] = useState('')
	const [regDate, setRegDate] = useState('')
	const [serverMessage, setServerMessage] = useState('')
	const [title, setTitle] = useState('')
	const [bio, setBio] = useState('')
	const [profileImage, setProfileImage] = useState(null) // Can hold File object or URL
	const [editMode, setEditMode] = useState(false)
	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) return

		if (user) {
			console.log('User is logged in:', user)
			setEmail(user.email || '')
			setRegDate(getFormattedDate(user.createdAt))
			setTitle(user.title || '')
			setBio(user.bio || '')
			setProfileImage(user.images || null)
		} else {
			if (error) {
				setServerMessage('No valid session found. Please login.')
			}
			navigate('/login') // Redirect to login page
		}
		console.log('UserProfile rendering for user:', user)
	}, [user, loading, error, navigate])

	const toggleEditMode = () => {
		setEditMode(!editMode)
		setServerMessage('')
	}

	const handleUpdateProfile = async (e) => {
		e.preventDefault()
		setServerMessage('')

		const formData = new FormData()
		formData.append('title', title)
		formData.append('bio', bio)
		if (profileImage instanceof File) {
			formData.append('profileImage', profileImage)
		}

		try {
			const response = await API.put('/auth/me', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			if (response.status === 200) {
				const { user: updatedUserProfile, message } = response.data
				setServerMessage(t(message))
				setEditMode(false)
				updateUser(updatedUserProfile)
				closeModal() // Закрываем модальное окно после успешного обновления
			}
		} catch (error) {
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.message || 'Update failed')
			} else {
				setServerMessage('An error occurred during profile update ')
			}
		}
	}

	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<ProfilePageContainer>
			<h2>{t('Інформація профілю')}</h2>
			<div className={styles.profileDetails}>
				<div className={styles.profileInformationContainer}>
					<div className={styles.profileAvatarWrapper}>
						<div className={styles.profileAvatar}>
							{profileImage && (
								<img
									src={
										profileImage instanceof File
											? URL.createObjectURL(profileImage)
											: profileImage.startsWith('http') ||
												  profileImage.startsWith(
														'/uploads/profileImages',
												  )
												? `${profileImage}`
												: profileImage
									}
									alt="Profile"
									className={styles.profileImage}
								/>
							)}
						</div>
					</div>

					<div className={styles.profileTextWrapper}>
						{title && (
							<p>
								<strong>{t('П.І.Б.')}:&#8194;</strong>
								{title}
							</p>
						)}

						{bio && (
							<p>
								<strong>{t('Про себе')}:&#8194;</strong> {bio}
							</p>
						)}

						<p>
							<strong>E-Mail:&#8194;</strong>
							{email}
						</p>
						<p>
							<strong>{t('Дата реєстрації')}:&#8194;</strong>
							{regDate}
						</p>

						{serverMessage && (
							<p className={styles.ErrorMessage}>
								{serverMessage}
							</p>
						)}

						<div className={styles.editButtonWrapper}>
							<button
								onClick={() => {
									toggleEditMode()
									openModal()
								}}
								className="button button-default"
							>
								{editMode ? t('Скасувати') : t('Редагувати')}
							</button>
						</div>
					</div>
				</div>

				<div className="App">
					{isOpen && (
						<div className="modal-overlay">
							<div className="modal-content">
								{editMode && (
									<form
										className={styles.editProfileForm}
										onSubmit={handleUpdateProfile}
									>
										<div
											className={styles.modalTitleWrapper}
										>
											<h3 className={styles.modalTitle}>
												{t('Редагування профілю')}
											</h3>

											<div
												className={
													styles.closeButtonWrapper
												}
											>
												<button
													onClick={() => {
														toggleEditMode()
														closeModal()
													}}
													className="button"
												>
													<span
														className={styles.close}
													>
														&times;
													</span>
												</button>
											</div>
										</div>

										<div
											className={
												styles.profileModalNameWrapper
											}
										>
											<TextEditor
												name="title"
												value={title}
												label={t('П.І.Б.')}
												onChange={({ value }) =>
													setTitle(value)
												}
												maxLength={191}
											/>
										</div>

										<div
											className={
												styles.profileModalBioWrapper
											}
										>
											<TextAreaEditor label={t('Про себе')}
												placeholder="Bio"
												name='bio' value={bio}
												maxLength={500} required onChange={({ value }) => setBio(value) } />
										</div>

										<div
											className={
												styles.profileModalImageDownloadWrapper
											}
										>
											<ImageEditor
												label={t('Додати зображення')}
												required
												name="images"
												value={profileImage}
												onChange={({ value }) =>
													setProfileImage(value[0])
												}
											/>
										</div>

										<button
											className={styles.submitButton}
											type="submit"
										>
											{t('Оновити профіль')}
										</button>
									</form>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</ProfilePageContainer>
	)
}

export default UserProfile
