import axios from 'axios'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import API from '../../../utils/api'
import styles from '../../../styles/components/ExhibitionCard/ExhibitionCardCreate.module.scss'

const ArtistCheckbox = memo(({ artist, isChecked, onChange }) => (
	<div className={styles.checkArtistItem}>
		<input
			type='checkbox'
			id={`artist-${artist.id}`}
			name='artists'
			value={artist.id}
			checked={isChecked}
			onChange={onChange}
			className={styles.formSelect}
		/>
		<label htmlFor={`artist-${artist.id}`} className={styles.checkboxLabel}>
			{artist.name || artist.title || artist.email}
		</label>
	</div>
))

function ExhibitionForm() {
	const [formData, setFormData] = useState({
		title_en: '',
		title_uk: '',
		description_en: '',
		description_uk: '',
		startDate: '',
		endDate: '',
		time: '',
		location_en: '',
		location_uk: '',
		artists: [],
		images: [],
	})
	const [artists, setArtists] = useState([]) // All available artists
	const [errors, setErrors] = useState([])
	const [serverMessage, setServerMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { user, logout } = useAuth()

	console.log('CurrentUser:', user)

	useEffect(() => {
		// Fetch artists to populate the checkboxes
		const fetchArtists = async () => {
			try {
				const response = await axios.get('/api/users/creators', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				console.log('Artists data:', response.data.creators)
				setArtists(response.data.creators)
			} catch (error) {
				console.error('Error fetching artists:', error)
				setErrors(prevErrors => [...prevErrors, 'Failed to load artists.'])
				setArtists([])
			}
		}

		fetchArtists()
	}, [])

	const handleInputChange = useCallback(e => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}, [])

	const handleArtistSelection = useCallback(e => {
		const artistId = parseInt(e.target.value, 10)
		if (e.target.checked) {
			setFormData(prevState => ({
				...prevState,
				artists: [...prevState.artists, artistId],
			}))
		} else {
			setFormData(prevState => ({
				...prevState,
				artists: prevState.artists.filter(id => id !== artistId),
			}))
		}
	}, [])

	const handleImageChange = useCallback(e => {
		setFormData(prevState => ({
			...prevState,
			images: [...e.target.files],
		}))
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setErrors([])
		setServerMessage('')
		setIsSubmitting(true)

		// Destructure formData for easier access
		const {
			title_en,
			title_uk,
			description_en,
			description_uk,
			startDate,
			endDate,
			time,
			location_en,
			location_uk,
			artists: selectedArtists,
			images,
		} = formData

		// Form validation
		if (
			!title_en ||
			!title_uk ||
			!description_en ||
			!description_uk ||
			!startDate ||
			!endDate ||
			!time ||
			!location_en ||
			!location_uk
		) {
			setErrors(['All fields are required.'])
			setIsSubmitting(false)
			return
		}

		if (selectedArtists.length === 0) {
			setErrors(['Please select at least one artist.'])
			setIsSubmitting(false)
			return
		}

		// Prepare form data
		const submissionData = new FormData()

		// Append multilingual title
		submissionData.append('title_en', title_en)
		submissionData.append('title_uk', title_uk)

		// Append multilingual description
		submissionData.append('description_en', description_en)
		submissionData.append('description_uk', description_uk)

		// Append multilingual location
		submissionData.append('location_en', location_en)
		submissionData.append('location_uk', location_uk)

		// Append dates and time
		submissionData.append('startDate', startDate)
		submissionData.append('endDate', endDate)
		submissionData.append('time', time)

		// Append selected artists
		selectedArtists.forEach(artistId => {
			submissionData.append('artistIds', artistId)
		})

		// Append images
		images.forEach(image => {
			submissionData.append('exhibitionImages', image)
		})

		// Debug: Log FormData entries
		for (let pair of submissionData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`)
		}

		try {
			const response = await API.post('/exhibitions', submissionData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			console.log('Exhibition created:', response.data)
			setServerMessage('Exhibition created successfully!')
			// Redirect to the exhibition details page
			navigate(`/Exhibitions/${response.data.exhibition.id}`)
		} catch (error) {
			console.error('Error creating exhibition:', error.response)
			if (error.response && error.response.data && error.response.data.errors) {
				setErrors(error.response.data.errors.map(err => err.msg))
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setErrors([error.response.data.message])
			} else {
				setErrors(['An error occurred while creating the exhibition.'])
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	const handleProductCartCreateClick = () => {
		navigate('/ProductCardCreate')
	}

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleExhibitionCardCreateClick = () => {
		navigate('/ExhibitionCardCreate')
	}

	const handleExhibitionListClick = () => {
		navigate('/Exhibitions')
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
					onClick={handleProfilePageClick}
				>
					{t('Профіль')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
				</button>
				<button className={styles.profileAction} onClick={handlePostsClick}>
					{t('Публікації')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleProductCartCreateClick}
				>
					{t('Додати картину')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handlePaintingCardListClick}
				>
					{t('Переглянути вироби/картини')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionCardCreateClick}
				>
					{t('Додати виставку')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionListClick}
				>
					{t('Переглянути виставки')}
				</button>
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.exhibitionFormContainer}>
				<h2 className={styles.formTitle}>{t('Створити виставку')}</h2>
				{errors.length > 0 && (
					<div className={styles.errorMessages}>
						<ul className={styles.errorList}>
							{errors.map((err, index) => (
								<li key={index} className={styles.errorItem}>
									{err}
								</li>
							))}
						</ul>
					</div>
				)}
				{serverMessage && (
					<div className={styles.successMessage}>{serverMessage}</div>
				)}
				<form
					onSubmit={handleSubmit}
					encType='multipart/form-data'
					className={styles.exhibitionForm}
				>
					<div className={styles.modalTextWrapper}>
						<div className={styles.modalFieldUk}>

							{/* Title in Ukrainian */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Назва виставки українською')}
								</label>
								<input
									type='text'
									name='title_uk'
									value={formData.title_uk}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Description in Ukrainian */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Опис виставки українською')}
								</label>
								<textarea
									name='description_uk'
									value={formData.description_uk}
									onChange={handleInputChange}
									required
									className={styles.formTextarea}
								></textarea>
							</div>

							{/* Location in Ukrainian */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Місце проведення українською')}
								</label>
								<input
									type='text'
									name='location_uk'
									value={formData.location_uk}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Start Date */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Дата початку')}</label>
								<input
									type='date'
									name='startDate'
									value={formData.startDate}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Start time */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Час початку')}</label>
								<input
									type='text'
									name='time'
									value={formData.time}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>
						</div>

						<div className={styles.modalFieldEn}>
							{/* Title in English */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Назва виставки англійською')}</label>
								<input
									type='text'
									name='title_en'
									value={formData.title_en}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* Description in English */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Опис виставки англійською')}
								</label>
								<textarea
									name='description_en'
									value={formData.description_en}
									onChange={handleInputChange}
									required
									className={styles.formTextarea}
								></textarea>
							</div>

							{/* Location in English */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>
									{t('Місце проведення англійською')}
								</label>
								<input
									type='text'
									name='location_en'
									value={formData.location_en}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>
							{/* End Date */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Дата завершення')}</label>
								<input
									type='date'
									name='endDate'
									value={formData.endDate}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>

							{/* End time */}
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>{t('Час завершення')}</label>
								<input
									type='text'
									name='time'
									value={formData.time}
									onChange={handleInputChange}
									required
									className={styles.formInput}
								/>
							</div>
						</div>
					</div>

					{/* Artists (Checkboxes) */}
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>{t('Митці')}:</label>
						<div className={styles.checkArtistWrapper}>
							{artists.map(artist => (
								<ArtistCheckbox
									key={artist.id}
									artist={artist}
									isChecked={formData.artists.includes(artist.id)}
									onChange={handleArtistSelection}
								/>
							))}
						</div>
					</div>

					{/* Images */}
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>{t('Додати зображення')}</label>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageChange}
							className={styles.formFileInput}
						/>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className={styles.submitButton}
						disabled={isSubmitting}
					>
						{isSubmitting ? t('Створюється...') : t('Створити виставку')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default ExhibitionForm
