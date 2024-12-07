import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/ProductCard/ProductCardCreate.module.scss'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import TextEditor from '@components/Blocks/TextEditor'
import TextAreaEditor from '@components/Blocks/TextAreaEditor'

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

	const textEditorOnChange = ({ name, value }) => {
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
	};

	return (
		<ProfilePageContainer>
			<div className={styles.productCreate}>
				<h2 className={styles.productCreateTitle}>{t('Додати картину')}</h2>
				{serverMessage && (
					<p className={styles.serverMessage}>{serverMessage}</p>
				)}
				<form onSubmit={handleSubmit}>
					<div className={styles.modalTextWrapper}>
						<div className={styles.modalFieldUk}>
							<div className={styles.formGroup}>
								<TextEditor label={t('Назва українською')}
									name='title_uk' value={formData.title_uk}
									maxLength={50} required onChange={textEditorOnChange} />
							</div>
							<div className={styles.formGroup}>
								<TextAreaEditor label={t('Опис українською')}
									name='description_uk' value={formData.description_uk}
									maxLength={500} required onChange={textEditorOnChange} />
							</div>
							<div className={styles.formGroup}>
								<TextAreaEditor label={t('Специфікація українською')}
									name='specs_uk' value={formData.specs_uk}
									maxLength={500} required onChange={textEditorOnChange} />
							</div>
						</div>
						<div className={styles.modalFieldEn}>
							<div className={styles.formGroup}>
								<TextEditor label={t('Назва англійською')}
									name='title_en' value={formData.title_en}
									maxLength={50} required onChange={textEditorOnChange} />
							</div>
							<div className={styles.formGroup}>
								<TextAreaEditor label={t('Опис англійською')}
									name='description_en' value={formData.description_en}
									maxLength={500} required onChange={textEditorOnChange} />
							</div>
							<div className={styles.formGroup}>
								<TextAreaEditor label={t('Специфікація англійською')}
									name='specs_en' value={formData.specs_en}
									maxLength={500} required onChange={textEditorOnChange} />
							</div>
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
		</ProfilePageContainer>
	)
}

export default ProductCardCreate
