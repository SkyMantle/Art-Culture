import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/ProductCard/ProductCardCreate.module.scss'
import Sidebar from '@components/Blocks/Sidebar'

const ProductCardCreate = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		title_en: '',
		title_uk: '',
		description_en: '',
		description_uk: '',
		specs_en: '',
		specs_uk: '',
		images: [],
	})

	const [imagePreviews, setImagePreviews] = useState([])
	const [serverMessage, setServerMessage] = useState('')

	const handleChange = e => {
		const { name, value, files } = e.target

		if (name === 'images') {
			const filesArray = Array.from(files)
			setFormData(prevData => ({ ...prevData, images: filesArray }))
			const previews = filesArray.map(file => URL.createObjectURL(file))
			setImagePreviews(previews)
		} else {
			setFormData(prevData => ({ ...prevData, [name]: value }))
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setServerMessage('')

		const formDataToSend = new FormData()
		formDataToSend.append('title_en', formData.title_en)
		formDataToSend.append('title_uk', formData.title_uk)
		formDataToSend.append('description_en', formData.description_en)
		formDataToSend.append('description_uk', formData.description_uk)
		formDataToSend.append('specs_en', formData.specs_en)
		formDataToSend.append('specs_uk', formData.specs_uk)

		formData.images.forEach(image => {
			formDataToSend.append('productImages', image)
		})

		try {
			const response = await API.post('/products', formDataToSend, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})

			if (response.status === 201) {
				setServerMessage('Product created successfully')
				console.log('Navigating to /paintings')
				navigate('/paintings')
			}
		} catch (error) {
			console.error('product create error', error)
			if (error.response && error.response.data) {
				setServerMessage(
					error.response.data.error || 'Product could not be created'
				)
			} else {
				setServerMessage('Product could not be created during action')
			}
		}
	}

	return (
		<div className={styles.profile}>
			<Sidebar />
			<div className={styles.productCreate}>
				<h2 className={styles.productCreateTitle}>{t('Додати картину')}</h2>
				{serverMessage && (
					<p className={styles.serverMessage}>{serverMessage}</p>
				)}
				<form onSubmit={handleSubmit}>
					<div className={styles.modalTextWrapper}>
						<div className={styles.modalFieldUk}>
							<label className={styles.profileLabel}>
								{t('Заголовок українською')}
								{/* Title in Ukrainian */}
								<input
									type='text'
									// placeholder={t('Заголовок українською')}
									name='title_uk'
									value={formData.title_uk}
									onChange={handleChange}
									required
								/>
							</label>
							<label className={styles.profileLabel}>
								{t('Опис українською')}
								{/* Description in Ukrainian */}
								<textarea
									// placeholder={t('Опис українською')}
									name='description_uk'
									value={formData.description_uk}
									onChange={handleChange}
									required
								/>
							</label>
							<label className={styles.profileLabel}>
								{t('Специфікація українською')}
								{/* Specification in Ukrainian */}
								<textarea
									// placeholder={t('Специфікація')}
									name='specs_uk'
									value={formData.specs_uk}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div className={styles.modalFieldEn}>
							<label className={styles.profileLabel}>
								{t('Заголовок англійською')}
								{/* Title in English */}
								<input
									type='text'
									// placeholder={t('Title in English')}
									name='title_en'
									value={formData.title_en}
									onChange={handleChange}
									required
								/>
							</label>
							<label className={styles.profileLabel}>
								{t('Опис англійською')}
								{/* Description in English */}
								<textarea
									// placeholder={t('Description in English')}
									name='description_en'
									value={formData.description_en}
									onChange={handleChange}
									required
								/>
							</label>
							<label className={styles.profileLabel}>
								{t('Специфікація англійською')}
								{/* Specs on English */}
								<textarea
									// placeholder={t('Specifications')}
									name='specs_en'
									value={formData.specs_en}
									onChange={handleChange}
								/>
							</label>
						</div>
					</div>
					<label className={styles.profileLabel}>
						{t('Додати зображення')}
						{/* Images */}
						<input
							type='file'
							name='images'
							accept='image/*'
							multiple
							onChange={handleChange}
							required
						/>
					</label>
					{/* Image Previews */}
					<div className={styles.imagePreviews}>
						{imagePreviews.map((preview, index) => (
							<img
								key={index}
								src={preview}
								alt={`Preview ${index}`}
								className={styles.previewImage}
							/>
						))}
					</div>
					<button type='submit'>{t('Створити')}</button>
				</form>
			</div>
		</div>
	)
}

export default ProductCardCreate
