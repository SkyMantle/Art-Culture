// src/components/UserProfile/UserProfilePosts.jsx

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import API from '../../../utils/api.js'
import styles from '/src/styles/components/UserProfile/userProfilePosts.module.scss'

function UserProfilePosts() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAuth()

	const [posts, setPosts] = useState([]) // User's posts
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('') // Error state

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingPost, setEditingPost] = useState(null)
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		images: null,
	})
	const [remainingTitle, setRemainingTitle] = useState(50)
	const [message, setMessage] = useState('')
	const [formErrors, setFormErrors] = useState([])

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				if (!user) {
					setError('User not authenticated')
					navigate('/login')
					return
				}

				// Fetch posts by this user
				const response = await API.get('/posts', {
					params: { authorId: user.id }, // Assuming your API can filter by authorId
				})

				setPosts(Array.isArray(response.data) ? response.data : [])
			} catch (err) {
				console.error('Error fetching user posts:', err)
				setError('Failed to fetch posts')
			} finally {
				setLoading(false)
			}
		}

		fetchUserPosts()
	}, [user, navigate])

	// Handlers for navigation
	const handleProfilePageClick = () => {
		navigate('/userProfile')
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

	// Modal Handlers
	const openEditModal = post => {
		console.log('Opening edit window', post)
		setEditingPost(post)
		setFormData({
			title: post.title || '',
			content: post.content || '',
			images: null,
		})
		setRemainingTitle(50 - (post.title ? post.title.length : 0))
		setIsModalOpen(true)
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setEditingPost(null)
		setFormErrors({})
		setMessage('')
	}

	const handleChange = e => {
		const { name, value, files } = e.target

		console.log('Invalid change', { name, value, files })
		if (name === 'images') {
			setFormData({ ...formData, images: files[0] })
		} else {
			setFormData({ ...formData, [name]: value })

			if (name === 'title') {
				setRemainingTitle(50 - value.length)
			}

			if (e.target.tagName.toLowerCase() === 'textarea') {
				e.target.style.height = 'auto'
				e.target.style.height = `${e.target.scrollHeight}px`
			}
		}
	}

	const handleEditSubmit = async e => {
		e.preventDefault()
		setMessage('')
		setFormErrors({})

		console.log('Submitting form with data:', formData)

		if (!formData.title.trim() || !formData.content.trim()) {
			setFormErrors({ form: 'Заголовок та опис необхідні' })
			return
		}

		try {
			const postData = new FormData()
			postData.append('title', formData.title)
			postData.append('content', formData.content)
			if (formData.images instanceof File) {
				postData.append('images', formData.images)
			}

			const response = await API.put(`/posts/${editingPost.id}`, postData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			if (response.status === 200) {
				setMessage('Post update successfully')

				setPosts(prevPosts =>
					prevPosts.map(post =>
						post.id === editingPost.id ? response.data : post
					)
				)
				closeEditModal()
			}
		} catch (error) {
			console.error('Error updating post', error)
			setMessage(
				error.response?.data?.error ||
					'Failed to update post. Please try again.'
			)
		}
	}

	const handleDeletePost = async postId => {
		if (window.confirm(t('Ви впевнені, що хочете видалити цю публікацію?'))) {
			try {
				const response = await API.delete(`/posts/${postId}`)
				if (response.status === 200) {
					setPosts(posts.filter(post => post.id !== postId))
				}
			} catch (err) {
				console.error('Error deleting post', err)
				setError('Failed to delete post')
			}
		}
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileActions}>
				<button
					className={styles.profileAction}
					onClick={handleProfilePageClick}
				>
					{t('Профіль')}
				</button>
				<button
					className={`${styles.profileAction} ${styles.profileActionActive}`}
				>
					{t('Публікації')}
				</button>
				<button className={styles.profileAction} onClick={handleAddPostClick}>
					{t('Додати публікацію')}
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
					{t('Переглянути вироби/картини ')}
				</button>
				<button
					className={styles.profileAction}
					onClick={handleExhibitionCardCreateClick}
				>
					{t('Додати виставку ')}
				</button>
				<button className={styles.profileAction} onClick={handleLogout}>
					{t('Вийти')}
				</button>
			</div>

			<div className={styles.userProfilePostsContainer}>
				{loading ? (
					<p>{t('Завантаження...')}</p>
				) : error ? (
					<p className={styles.ErrorMessage}>{error}</p>
				) : posts.length === 0 ? (
					<p>{t('Публікацій немає')}</p>
				) : (
					posts.map(post => (
						<div key={post.id} className={styles.userProfilePostsWrapper}>
							<div className={styles.userProfilePostsPicAndTextWrapper}>
								<div className={styles.userProfilePostsPicWrapper}>
									{post.images ? (
										<img
											className={styles.userProfilePostsPic}
											src={post.images}
											alt={t('Світлина публікації')}
											onError={e => {
												e.target.onerror = null
												e.target.src = '/Img/defaultPostImage.jpg' // Default image path
											}}
										/>
									) : (
										<img
											className={styles.userProfilePostsPic}
											src='/Img/defaultPostImage.jpg'
											alt={t('Світлина публікації')}
										/>
									)}
								</div>
								<div className={styles.userProfilePostsTextWrapper}>
									<h3 className={styles.userProfilePostsTitle}>{post.title}</h3>
									<p className={styles.userProfilePostsDescription}>
										{post.content.substring(0, 100)}...
									</p>
									<div className={styles.userProfilePostsClockAndDateWrapper}>
										<img
											className={styles.userProfilePostsClock}
											src='/Img/clock.svg'
											alt={t('Дата')}
										/>
										<p className={styles.userProfilePostsDate}>
											{new Date(post.createdAt).toLocaleDateString()}
										</p>
										<button
											className={styles.userProfilePostsButton}
											onClick={() => navigate(`/posts/${post.id}`)} // Navigate to post detail page
										>
											{t('До публікації')}
										</button>
									</div>
									<div className={styles.userProfileEditWrapper}>
										<button
											className={styles.userProfileEditButton}
											onClick={() => openEditModal(post)}
										>
											{t('Редагувати')}
										</button>
										<button
											className={styles.userProfileDeleteButton}
											onClick={() => handleDeletePost(post.id)}
										>
											{t('Видалити')}
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
			{/* Modal Window */}
			{isModalOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<h2 className={styles.modalTitle}>{t('Редагувати публікацію')}</h2>
						{message && <p className={styles.message}>{message}</p>}
						{formErrors.form && (
							<p className={styles.error}>{formErrors.form}</p>
						)}
						<form onSubmit={handleEditSubmit} className={styles.modalForm}>
							<div className={styles.modalField}>
								<label className={styles.modalLabel}>
									{t('Назва публікації:')}
									<input
										type='text'
										name='title'
										value={formData.title}
										onChange={handleChange}
										maxLength='50'
										className={styles.modalInput}
										placeholder='Наприклад: Моя перша публікація'
										required
									/>
								</label>
								<small className={styles.remainingChars}>
									{remainingTitle} {t('символів залишилось')}
								</small>
							</div>
							<div className={styles.modalField}>
								<label className={styles.modalLabel}>
									{t('Опис публікації:')}
									<textarea
										name='content'
										value={formData.content}
										onChange={handleChange}
										className={styles.modalTextarea}
										placeholder='Введіть детальний опис публікації'
										required
									/>
								</label>
							</div>
							<div className={styles.modalField}>
								<label className={styles.modalLabel}>
									{t('Змінити зображення (опційно):')}
									<input
										type='file'
										name='images'
										accept='image/*'
										onChange={handleChange}
										className={styles.modalInput}
									/>
								</label>
								{editingPost.images && !(formData.images instanceof File) && (
									<img
										src={editingPost.images}
										alt={t('Поточне зображення')}
										className={styles.currentImage}
									/>
								)}
							</div>
							<div className={styles.modalButtons}>
								<button type='submit' className={styles.modalSaveButton}>
									{t('Зберегти')}
								</button>
								<button
									type='button'
									className={styles.modalCancelButton}
									onClick={closeEditModal}
								>
									{t('Скасувати')}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserProfilePosts
