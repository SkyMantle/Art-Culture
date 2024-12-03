// src/components/UserProfile/UserProfileAddPost.jsx

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfileAddPost.module.scss'
import Sidebar from '@components/Blocks/Sidebar'
import TextEditor from '@components/Blocks/TextEditor'
import TextAreaEditor from '@components/Blocks/TextAreaEditor'

function UserProfileAddPost() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAuth()

	const [formData, setFormData] = useState({
		title_en: '',
		title_uk: '',
		content_en: '',
		content_uk: '',
		images: null,
	})
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		const { name, files } = e.target;
		setFormData({ ...formData, [name]: files[0] });
	};

	const handleSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setErrors({})

		// Frontend Validation
		if (
			!formData.title_en ||
			!formData.content_en ||
			!formData.title_uk ||
			!formData.content_uk
		) {
			setErrors({ form: 'Title and content are required.' })
			return
		}

		if (!user) {
			setErrors('User not authenticated. Please log in.')
			navigate('/login')
			return
		}

		const token = localStorage.getItem('token')
		if (!token) {
			setErrors('Authentication token missing. Please log in again.')
			navigate('/login')
			return
		}

		try {
			const postData = new FormData()
			postData.append('title_en', formData.title_en)
			postData.append('content_en', formData.content_en)
			postData.append('title_uk', formData.title_uk)
			postData.append('content_uk', formData.content_uk)
			if (formData.images) {
				postData.append('images', formData.images)
			}

			const response = await API.post('/posts', postData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			if (response.status === 201) {
				setMessage('Post added successfully!')
				navigate('/userProfilePosts')
			}
		} catch (error) {
			console.error('Error adding post:', error)
			setMessage(
				error.response?.data?.error || 'Failed to add post. Please try again.'
			)
		}
	}

	const textEditorOnChange = ({name, value}) => {
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
	};
	console.log(formData);
	return (
		<div className={styles.profile}>
			<Sidebar />

			<div className={styles.profileAddPostContainer}>
				<h2 className={styles.profileAddPostTitle}>
					{t('Додати нову публікацію')}
				</h2>
				{message && <p className={styles.message}>{message}</p>}
				{errors.form && <p className={styles.error}>{errors.form}</p>}
				<form onSubmit={handleSubmit} className={styles.profileAddPostForm}>
					<div className={styles.modalTextField}>
						<div className={styles.modalFieldUk}>
							<div className={styles.profileAddPostField}>
								<TextEditor label={t('Назва публікації українською')}
									name='title_uk' value={formData.title_uk}
									maxLength={50} required onChange={textEditorOnChange}
									placeholder={t('Назва публікації українською')} />
							</div>
							<div className={styles.profileAddPostField}>
								<TextAreaEditor label={t('Опис публікації українською')}
									name='content_uk' value={formData.content_uk}
									maxLength='500' required onChange={textEditorOnChange}
									placeholder={t('Опис публікації українською')} />
							</div>
						</div>
						<div className={styles.modalFieldEn}>
							<div className={styles.profileAddPostField}>
								<TextEditor label={t('Назва публікації англійською')}
									name='title_en' value={formData.title_en}
									maxLength='50' required onChange={textEditorOnChange}
									placeholder={t('Назва публікації англійською')} />
							</div>
							<div className={styles.profileAddPostField}>
								<TextAreaEditor label={t('Опис публікації англійською')}
									name='content_en' value={formData.content_en}
									maxLength='500' required onChange={textEditorOnChange}
									placeholder={t('Опис публікації англійською')} />
							</div>
						</div>
					</div>
					<div className={styles.profileAddPostField}>
						<label className={styles.profileAddPostLabel}>
							{t('Додати зображення (опційно):')}
							<input
								type='file'
								name='images'
								accept='image/*'
								onChange={handleChange}
								className={styles.profileAddPostInput}
							/>
						</label>
					</div>

					<div className={styles.profileLinksWrapper}>
						<button
							className={styles.profileLink}
							onClick={() =>
								window.open(
									'https://www.deepl.com/en/translator',
									'_blank',
									'noopener'
								)
							}
						>
							{t('Онлайн перекладач')}&#8194;&#187;
						</button>
						<button
							className={styles.profileLink}
							onClick={() =>
								window.open(
									'https://cloudconvert.com/jpeg-to-webp',
									'_blank',
									'noopener'
								)
							}
						>
							{t('Онлайн WEBP-конвертер')}&#8194;&#187;
						</button>
					</div>
					<button type='submit' className={styles.profileAddPostButton}>
						{t('Зберегти')}
					</button>
				</form>
			</div>
		</div>
	)
}

export default UserProfileAddPost
