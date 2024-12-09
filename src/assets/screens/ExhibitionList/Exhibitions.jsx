import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/screen/ExhibitionList/Exhibitions.module.scss'
import API from '/src/utils/api.js'
import Sidebar from '@components/Blocks/Sidebar'
import TextEditor from '@components/Blocks/TextEditor'
import TextAreaEditor from '@components/Blocks/TextAreaEditor'
import ImageEditor from '../../components/Blocks/ImageEditor'

function MuseumExhibitions() {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [exhibitions, setExhibitions] = useState([])
	const [loading, setLoading] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedExhibitionImages, setSelectedExhibitionImages] = useState([])
	const [editingExhibition, setEditingExhibition] = useState(null)
	const [artists, setArtists] = useState([])
	const [formData, setFormData] = useState({
		title_en: '',
		description_en: '',
		location_en: '',
		title_uk: '',
		description_uk: '',
		location_uk: '',
		startDate: '',
		endDate: '',
		time: '',
		artists: [],
		images: null,
	})
	const [message, setMessage] = useState('')
	const [formErrors, setFormErrors] = useState({})
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchExhibitions = async () => {
			try {
				const response = await API.get('/exhibitions/my-exhibitions', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					params: {
						page,
						limit: 12,
					},
				})
				setExhibitions(response.data.exhibitions)
				setTotalPages(response.data.totalPages)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching exhibitions:', error)
				setError('Failed to load exhibitions.')
				setLoading(false)
			}
		}

		fetchExhibitions()
	}, [page])
	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await API.get('/users/creators', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setArtists(response.data.creators)
			} catch (error) {
				console.error('Error fetching artists:', error)
				setFormErrors(prevErrors => [...prevErrors, 'Failed to load artists.'])
				setArtists([])
			}
		}
		fetchArtists()
	}, [])

	if (loading) {
		return <div>Loading exhibitions...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedExhibitionImages([])
	}

	const openEditModal = exhibition => {
		setEditingExhibition(exhibition)
		setFormData({
			title_en: exhibition.title_en || '',
			description_en: exhibition.description_en || '',
			location_en: exhibition.location_en || '',
			title_uk: exhibition.title_uk || '',
			description_uk: exhibition.description_uk || '',
			location_uk: exhibition.location_uk || '',
			images: exhibition.images || null,
			time: exhibition.time || '',
			startDate: exhibition.startDate
				? new Date(exhibition.startDate).toISOString().split('T')[0]
				: '',
			endDate: exhibition.endDate
				? new Date(exhibition.endDate).toISOString().split('T')[0]
				: '',
			artists: exhibition.exhibitionArtists
				? exhibition.exhibitionArtists.map(ea => ea.artist.id)
				: [],
		})
		setIsModalOpen(true)
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setEditingExhibition(null)
		setFormErrors({})
		setMessage('')
		setFormData({
			title_en: '',
			description_en: '',
			location_en: '',
			title_uk: '',
			description_uk: '',
			location_uk: '',
			startDate: '',
			endDate: '',
			time: '',
			artists: [],
			images: null,
		})
	}

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images' || name === 'exhibitionImages') {
			setFormData({ ...formData, images: files })
		} else if (name === 'artists') {
			// Handled in handleArtistSelection
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	const handleEditSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setFormErrors({})

		if (
			!formData.title_en ||
			!formData.description_en ||
			!formData.location_en ||
			!formData.title_uk ||
			!formData.description_uk ||
			!formData.location_uk ||
			formData.artists.length === 0 ||
			!formData.startDate ||
			!formData.endDate ||
			!formData.time
		) {
			setFormErrors({ form: 'Потрібно заповнити поля' })
			return
		}

		try {
			const exhibitionData = new FormData()
			exhibitionData.append('title_en', formData.title_en)
			exhibitionData.append('description_en', formData.description_en)
			exhibitionData.append('title_uk', formData.title_uk)
			exhibitionData.append('description_uk', formData.description_uk)
			exhibitionData.append('location_en', formData.location_en)
			exhibitionData.append('location_uk', formData.location_uk)
			exhibitionData.append('time', formData.time)
			exhibitionData.append('startDate', formData.startDate)
			exhibitionData.append('endDate', formData.endDate)

			// Append artistIds as a JSON string
			exhibitionData.append('artistIds', JSON.stringify(formData.artists))

			// Append images
			if (formData.images && formData.images.length > 0) {
				for (let i = 0; i < formData.images.length; i++) {
					exhibitionData.append('exhibitionImages', formData.images[i])
				}
			}

			// Log FormData entries
			console.log('FormData entries:')
			for (let pair of exhibitionData.entries()) {
				console.log(`${pair[0]}: ${pair[1]}`)
			}

			const response = await API.put(
				`/exhibitions/${editingExhibition.id}`,
				exhibitionData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			if (response.status === 200) {
				setMessage('Публікацію оновлено')

				setExhibitions(prevExhibitions =>
					prevExhibitions.map(exhibition =>
						exhibition.id === editingExhibition.id ? response.data : exhibition
					)
				)

				closeEditModal()
			}
			// ...rest of the code...
		} catch (error) {
			console.error('Error updating exhibition:', error)
			setMessage(
				error.response?.data?.error || 'Помилка при оновленні публікації'
			)
		}
	}

	const handleDeleteExhibition = async exhibitionId => {
		if (window.confirm(t('Ви впевнені, що хочете видалити цю публікацію?'))) {
			try {
				const response = await API.delete(`/exhibitions/${exhibitionId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				if (response.status === 200) {
					setExhibitions(
						exhibitions.filter(exhibition => exhibition.id !== exhibitionId)
					)
				}
			} catch (err) {
				console.error('Error deleting exhibition:', err)
				setError('Помилка при видаленні публікації')
			}
		}
	}

	const handleArtistSelection = e => {
		const artistId = parseInt(e.target.value, 12)
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
	}
	const textEditorOnChange = ({ name, value }) => {
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<div className={styles.profile}>
			<Sidebar />
			<div className={styles.exhibitionsContainer}>
				<h2>{t('Ваші виставки')}</h2>
				{exhibitions.length === 0 ? (
					<p>{t('Ви не створили жодної виставки')}</p>
				) : (
					<div className={styles.exhibitionList}>
						{exhibitions.map(exhibition => {
							const title =
								currentLanguage === 'en'
									? exhibition.title_en || exhibition.title_uk
									: exhibition.title_uk || exhibition.title_en

							const description =
								currentLanguage === 'en'
									? exhibition.description_en || exhibition.description_uk
									: exhibition.description_uk || exhibition.description_en

							const location =
								currentLanguage === 'en'
									? exhibition.location_en || exhibition.location_uk
									: exhibition.location_uk || exhibition.location_en

							const artistNames =
								exhibition.exhibitionArtists &&
									exhibition.exhibitionArtists.length > 0
									? exhibition.exhibitionArtists
										.map(ea => {
											const artist = ea.artist
											return artist.name || artist.title || artist.email
										})
										.join(',')
									: t('Немає митців')
							return (
								<div key={exhibition.id} className={styles.exhibitionCard}>
									{/* {exhibition.images && exhibition.images.length > 0 && (
									<div className={styles.imagesContainer}>
										{exhibition.images.map(image => (
											<img
												key={image.id}
												src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
												alt={title}
												className={styles.exhibitionImage}
												loading='lazy'
											/>
										))}
									</div>
									)} */}

									{exhibition.images && exhibition.images.length > 0 && (
										<div className={styles.imagesContainer}>
											<img
												src={`${process.env.REACT_APP_API_URL}${exhibition.images[0].imageUrl}`}
												alt={title}
												className={styles.exhibitionImage}
												loading='lazy'
											/>
										</div>
									)}
									<h3>
										{t('Назва виставки')}
										<p className={styles.productCardSubTitle}>{title}</p>
									</h3>
									<h4>
										{t('Опис виставки')}
										<p className={styles.productCardSubTitle}>{description}</p>
									</h4>
									<h4>
										{t('Митці')}
										<p className={styles.productCardSubTitle}>{artistNames}</p>
									</h4>
									<h4>
										{t('Дата проведення')}
										<p className={styles.productCardSubTitle}> </p>
										<p className={styles.productCardSubTitle}>
											{new Date(exhibition.startDate).toLocaleDateString()} -{' '}
											{new Date(exhibition.endDate).toLocaleDateString()}
										</p>
									</h4>
									<h4>
										{t('Час початку')}
										<p className={styles.productCardSubTitle}>
											{exhibition.time}
										</p>
									</h4>
									<h4>
										{t('Місце проведення')}
										<p className={styles.productCardSubTitle}>{location}</p>
									</h4>
									{console.log('type data artists:', artistNames)}
									<div className={styles.exhibitionDelEditWrapper}>
										<button
											className="button button-default"
											onClick={() => openEditModal(exhibition)}
										>
											{t('Редагувати')}
										</button>
										<button
											className={styles.exhibitionDeleteButton}
											onClick={() => handleDeleteExhibition(exhibition.id)}
										>
											{t('Видалити')}
										</button>
									</div>
								</div>
							)
						})}
					</div>
				)}
				<div className={styles.pagination}>
					<button
						onClick={() => setPage(prev => Math.max(prev - 1, 1))}
						disabled={page === 1}
					>
						{/* {t('Попередня')} */}
						&#8592;
					</button>
					<p>
						{t('Сторінка')} {page} {t('з')} {totalPages}
					</p>
					<button
						onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
						disabled={page === totalPages}
					>
						{/* {t('Наступна')} */}
						&#8594;
					</button>
				</div>
			</div>
			{/* Image Modal Component */}
			{isModalOpen && !editingExhibition && (
				<div className={styles.modalOverlay} onClick={handleCloseModal}>
					<div
						className={styles.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<button className={styles.closeButton} onClick={handleCloseModal}>
							&times;
						</button>
						<div className={styles.modalImages}>
							{selectedExhibitionImages.map((image, index) => (
								<img
									key={index}
									src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
									alt={`Exhibition Image ${index + 1}`}
									className={styles.modalImage}
									loading='lazy'
								/>
							))}
						</div>
					</div>
				</div>
			)}
			{/* Modal Edit Component */}
			{isModalOpen && editingExhibition && (
				<div className={styles.modalOverlay} onClick={handleCloseModal}>
					<div
						className={styles.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<div className={styles.modalFormWrapper}>
							<button className={styles.closeButton} onClick={closeEditModal}>
								&times;
							</button>
							<form onSubmit={handleEditSubmit}>
								{formErrors.form && (
									<p className={styles.error}>{formErrors.form}</p>
								)}
								{message && <p className={styles.success}>{message}</p>}
								<div className={styles.modalTitleWrapper}>
									<h2 className={styles.modalTitle}>
										{t('Редагування виставки')}
									</h2>
								</div>
								<div className={styles.modalTextWrapper}>
									<div className={styles.modalFieldUk}>
										<div className={styles.formGroup}>
											<TextEditor label={t('Назва виставки українською')}
												name='title_uk' value={formData.title_uk}
												maxLength={50} required onChange={textEditorOnChange} />
										</div>
										<div className={styles.formGroup}>
											<TextAreaEditor label={t('Опис виставки українською')}
												name='description_uk' value={formData.description_uk}
												maxLength={500} required onChange={textEditorOnChange} />
										</div>
										<div className={styles.formGroup}>
											<TextEditor label={t('Місце проведення українською')}
												name='location_uk' value={formData.location_uk}
												maxLength={500} required onChange={textEditorOnChange} />
										</div>
										{/* Start Date Field */}
										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												{t('Дата початку')}
											</label>
											<input
												type='date'
												name='startDate'
												value={formData.startDate}
												onChange={handleChange}
											/>
										</div>
										{/* Time Field */}
										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												{t('Час початку')}
											</label>
											<input
												type='text'
												name='time'
												value={formData.time}
												onChange={handleChange}
											/>
										</div>
									</div>

									<div className={styles.modalFieldEn}>
										<div className={styles.formGroup}>
											<TextEditor label={t('Назва виставки англійською')}
												name='title_en' value={formData.title_en}
												maxLength={50} required onChange={textEditorOnChange} />
										</div>
										<div className={styles.formGroup}>
											<TextAreaEditor label={t('Опис виставки англійською')}
												name='description_en' value={formData.description_en}
												maxLength={500} required onChange={textEditorOnChange} />
										</div>
										<div className={styles.formGroup}>
											<TextEditor label={t('Місце проведення англійською')}
												name='location_en' value={formData.location_en}
												maxLength={500} required onChange={textEditorOnChange} />
										</div>
										{/* End Date Field */}
										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												{t('Дата завершення')}
											</label>
											<input
												type='date'
												name='endDate'
												value={formData.endDate}
												onChange={handleChange}
											/>
										</div>
										{/* Time Field */}
										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												{t('Час завершення')}
											</label>
											<input
												type='text'
												name='time'
												value={formData.time}
												onChange={handleChange}
											/>
										</div>
									</div>
								</div>
								{/* Artists Field */}
								<div className={styles.formGroup}>
									<label className={styles.formLabel}>{t('Митці')}</label>
									<div className={styles.checkArtistWrapper}>
										{artists.map(artist => (
											<div className={styles.checkArtistItem} key={artist.id}>
												<input
													type='checkbox'
													name='artists'
													value={artist.id}
													checked={formData.artists.includes(artist.id)}
													onChange={handleArtistSelection}
												/>
												<label
													htmlFor={`artist-${artist.id}`}
													className={styles.checkboxLabel}
												>
													{artist.name || artist.title || artist.email}
												</label>
											</div>
										))}
									</div>
								</div>
								<ImageEditor
									label={t('Додати зображення')}
									required
									name="exhibitionImages"
									value={formData.images}
									multiple
									onChange={textEditorOnChange}
								/>
								<button type='submit'>{t('Зберегти')}</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default MuseumExhibitions
