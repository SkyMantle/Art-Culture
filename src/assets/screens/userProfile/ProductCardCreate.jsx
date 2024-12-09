import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/ProductCard/ProductCardCreate.module.scss'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import TextEditor from '@components/Blocks/TextEditor'
import TextAreaEditor from '@components/Blocks/TextAreaEditor'
import ImageEditor from '../../components/Blocks/ImageEditor.jsx'

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

	const [serverMessage, setServerMessage] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		setServerMessage('')

		const formDataToSend = new FormData()
		formDataToSend.append('title_en', formData.title_en)
		formDataToSend.append('title_uk', formData.title_uk)
		formDataToSend.append('description_en', formData.description_en)
		formDataToSend.append('description_uk', formData.description_uk)
		formDataToSend.append('specs_en', formData.specs_en)
		formDataToSend.append('specs_uk', formData.specs_uk)

		formData.images.forEach((image) => {
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
				console.log('Navigating to /profile/products')
				navigate('/profile/products')
			}
		} catch (error) {
			console.error('product create error', error)
			if (error.response && error.response.data) {
				setServerMessage(error.response.data.error || 'Product could not be created')
			} else {
				setServerMessage('Product could not be created during action')
			}
		}
	}

	const textEditorOnChange = ({ name, value }) => {
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
	}

	return (
		<ProfilePageContainer>
			<h2 className={styles.productCreateTitle}>{t('Додати картину')}</h2>
			{serverMessage && (
				<p className={styles.serverMessage}>{serverMessage}</p>
			)}
			<form onSubmit={handleSubmit} className='form-wrapper'>
				<div className="flex gap-8 form-wrapper">
					<div className="form-group">
						<div className="field-group">
							<TextEditor
								label={t('Назва українською')}
								name="title_uk"
								value={formData.title_uk}
								maxLength={50}
								required
								onChange={textEditorOnChange}
							/>
						</div>
						<div className="field-group">
							<TextAreaEditor
								label={t('Опис українською')}
								name="description_uk"
								value={formData.description_uk}
								maxLength={500}
								required
								onChange={textEditorOnChange}
							/>
						</div>
						<div className="field-group">
							<TextAreaEditor
								label={t('Специфікація українською')}
								name="specs_uk"
								value={formData.specs_uk}
								maxLength={500}
								required
								onChange={textEditorOnChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="field-group">
							<TextEditor
								label={t('Назва англійською')}
								name="title_en"
								value={formData.title_en}
								maxLength={50}
								required
								onChange={textEditorOnChange}
							/>
						</div>
						<div className="field-group">
							<TextAreaEditor
								label={t('Опис англійською')}
								name="description_en"
								value={formData.description_en}
								maxLength={500}
								required
								onChange={textEditorOnChange}
							/>
						</div>
						<div className="field-group">
							<TextAreaEditor
								label={t('Специфікація англійською')}
								name="specs_en"
								value={formData.specs_en}
								maxLength={500}
								required
								onChange={textEditorOnChange}
							/>
						</div>
					</div>
				</div>
				<ImageEditor
					label={t('Додати зображення')}
					required
					name="images"
					value={formData.images}
					multiple
					onChange={textEditorOnChange}
				/>
				<button type="submit">{t('Створити')}</button>
			</form>
		</ProfilePageContainer>
	)
}

export default ProductCardCreate
