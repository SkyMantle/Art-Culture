import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/screen/ProductList/Paintings.module.scss'
import API from '/src/utils/api.js'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'
import TextEditor from '@components/Blocks/TextEditor'
import TextAreaEditor from '@components/Blocks/TextAreaEditor'
import TranslatedContent from '@components/Blocks/TranslatedContent'
import ImageEditor from '../../components/Blocks/ImageEditor'

const Paintings = () => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const [products, setProducts] = useState([])
	const [serverMessage, setServerMessage] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProductImages, setSelectedProductImages] = useState([])
	const [editingProduct, setEditingProduct] = useState(null)
	const [formData, setFormData] = useState({
		title_en: '',
		description_en: '',
		specs_en: '',
		title_uk: '',
		description_uk: '',
		specs_uk: '',
		images: null,
	})
	const [message, setMessage] = useState('')
	const [formErrors, setFormErrors] = useState({})
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await API.get('/products/my-products', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				setProducts(response.data.products)
			} catch (error) {
				console.error('Error fetching products:', error)
				setServerMessage('Failed to load products.')
			}
		}

		fetchProducts()
	}, [])

	const handleImageClick = images => {
		setSelectedProductImages(images)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProductImages([])
	}

	const openEditModal = product => {
		setEditingProduct(product)
		setFormData({
			title_en: product.title_en || '',
			description_en: product.description_en || '',
			specs_en: product.specs_en || '',
			title_uk: product.title_uk || '',
			description_uk: product.description_uk || '',
			specs_uk: product.specs_uk || '',
			images: null,
		})
		setIsModalOpen(true)
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setEditingProduct(null)
		setFormErrors({})
		setMessage('')
	}

	const handleEditSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setFormErrors({})

		if (
			!formData.title_en ||
			!formData.description_en ||
			!formData.title_uk ||
			!formData.description_uk ||
			!formData.specs_en ||
			!formData.specs_uk
		) {
			setFormErrors({ form: 'Потрібно заповнити поля' })
			return
		}

		try {
			const productData = new FormData()
			productData.append('title_en', formData.title_en)
			productData.append('description_en', formData.description_en)
			productData.append('title_uk', formData.title_uk)
			productData.append('description_uk', formData.description_uk)
			productData.append('specs_en', formData.specs_en)
			productData.append('specs_uk', formData.specs_uk)
			if (formData.images && formData.images.length > 0) {
				for (let i = 0; i < formData.images.length; i++) {
					productData.append('productImages', formData.images[i])
				}
			}
			const response = await API.put(
				`/products/${editingProduct.id}`,
				productData,
				{
					headers: {
						'content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			if (response.status === 200) {
				setMessage('Product update successfully')

				setProducts(prevProducts =>
					prevProducts.map(product =>
						product.id === editingProduct.id ? response.data : product
					)
				)
				closeEditModal()
			}
		} catch (error) {
			console.error('Error updating product', error)
			setMessage(
				error.response?.data?.error ||
				'Failed to update product. Please try again.'
			)
		}
	}

	const handleDeleteProduct = async productId => {
		if (window.confirm(t('Ви впевнені, що хочете видалити цей виріб?'))) {
			try {
				const response = await API.delete(`/products/${productId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				if (response.status === 200) {
					setProducts(products.filter(product => product.id !== productId))
				}
			} catch (err) {
				console.error('Error deleting product', err)
				setError('Failed to delete product')
			}
		}
	}

	const textEditorOnChange = ({ name, value }) => {
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
	};

	return (
		<ProfilePageContainer>
			<div className={styles.productList}>
				<h2>{t('Картини')}</h2>
				{serverMessage && (
					<p className={styles.serverMessage}>{serverMessage}</p>
				)}
				<div className={styles.products}>
					{products.map(product => {
						const title =
						currentLanguage === 'en'
							? product.title_en || product.title_uk
							: product.title_uk || product.title_en

						return (
							<div key={product.id} className={styles.productCard}>
								{product.images.length > 0 && (
									<img
										src={`${product.images[0].imageUrl}`}
										alt={title}
										className={styles.productImage}
										onClick={() => handleImageClick(product.images)}
										loading='lazy'
									/>
								)}
								<h3>
									{t('Назва картини')}
									<p className={styles.productCardSubTitle}>
										<TranslatedContent en={product.title_en} uk={product.title_uk} />
									</p>
								</h3>
								<h4>
									{t('Про картину')}
									<p className={styles.productCardSubTitle}>
										<TranslatedContent en={product.description_en} uk={product.description_uk} html />
									</p>
								</h4>
								<h4>
									{t('Використані матеріали')}
									<p className={styles.productCardSubTitle}>
										<TranslatedContent en={product.specs_en} uk={product.specs_uk} html />
									</p>
								</h4>
								<div className={styles.paintingsDelEditWrapper}>
									<button
										className="button button-default"
										onClick={() => openEditModal(product)}
									>
										{t('Редагувати')}
									</button>
									<button
										className={styles.paintingsDeleteButton}
										onClick={() => handleDeleteProduct(product.id)}
									>
										{t('Видалити')}
									</button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			{/* Image Modal Component */}
			{isModalOpen && !editingProduct && (
				<div className="modal-overlay" onClick={handleCloseModal}>
					<div
						className="modal-content"
						onClick={e => e.stopPropagation()}
					>
						<button className={styles.closeButton} onClick={handleCloseModal}>
							&times;
						</button>
						<div className={styles.modalImages}>
							{selectedProductImages.map((image, index) => (
								<img
									key={index}
									src={`${image.imageUrl}`}
									alt={`Product Image ${index + 1}`}
									className={styles.modalImage}
								/>
							))}
						</div>
					</div>
				</div>
			)}
			{/* Modal edit component */}
			{isModalOpen && editingProduct && (
				<div className="modal-overlay" onClick={closeEditModal}>
					<div
						className="modal-content"
						onClick={e => e.stopPropagation()}
					>
						<button className="modal-close-button" onClick={closeEditModal}>
							&times;
						</button>
						<form onSubmit={handleEditSubmit}>
							{formErrors.form && (
								<p className={styles.error}>{formErrors.form}</p>
							)}
							{message && <p className={styles.success}>{message}</p>}
							<div className={styles.modalTitleWrapper}>
								<h2 className={styles.modalTitle}>
									{t('Редагування картини/виробу')}
								</h2>
							</div>
							<div className="flex gap-8 form-wrapper">
								<div className="form-group">
									<div className="field-group">
										<TextEditor label={t('Назва українською')}
											name='title_uk' value={formData.title_uk}
											maxLength={50} required onChange={textEditorOnChange} />
									</div>
									<div className="field-group">
										<TextAreaEditor label={t('Опис українською')}
											name='description_uk' value={formData.description_uk}
											maxLength={500} required onChange={textEditorOnChange} />
									</div>
									<div className="field-group">
										<TextAreaEditor label={t('Специфікація українською')}
											name='specs_uk' value={formData.specs_uk}
											maxLength={500} required onChange={textEditorOnChange} />
									</div>
								</div>
								<div className="form-group">
									<div className="field-group">
										<TextEditor label={t('Назва англійською')}
											name='title_en' value={formData.title_en}
											maxLength={50} required onChange={textEditorOnChange} />
									</div>
									<div className="field-group">
										<TextAreaEditor label={t('Опис англійською')}
											name='description_en' value={formData.description_en}
											maxLength={500} required onChange={textEditorOnChange} />
									</div>
									<div className="field-group">
										<TextAreaEditor label={t('Специфікація англійською')}
											name='specs_en' value={formData.specs_en}
											maxLength={500} required onChange={textEditorOnChange} />
									</div>
								</div>
							</div>
							<ImageEditor
								label={t('Додати зображення')}
								required
								name="productImages"
								value={formData.images}
								multiple
								onChange={textEditorOnChange}
							/>
							<button type='submit'>{t('Зберегти')}</button>
						</form>
					</div>
				</div>
			)}
		</ProfilePageContainer>
	)
}

export default Paintings
