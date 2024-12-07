// src/components/PostDetail/PostDetail.jsx

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styles from '../../../styles/components/Post/PostDetail.module.scss'
import { getFormattedDate, getImageUrl, getFormattedTime } from '../../../utils/helper'
import TranslatedContent from '@components/Blocks/TranslatedContent'

function PostDetail() {
	const { t } = useTranslation()
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		axios
			.get(`/api/posts/${id}`)
			.then(response => {
				console.log('Received post data:', response.data)
				setPost(response.data)
			})
			.catch(error => {
				console.error('Error fetching post:', error)
				setError(error)
			})
	}, [id])

	if (error) {
		return <div>{t('Error loading post')}</div>
	}

	if (!post) {
		return <div>{t('Loading...')}</div>
	}

	const featuredMediaUrl = getImageUrl(post.images, '/Img/halfNewsCard.jpg')

	const formattedDate = getFormattedDate(post.createdAt)
	const formattedTime = getFormattedTime(post.createdAt)

	return (
		<div className={styles.postDetailContainer}>
			<img
				src={featuredMediaUrl}
				alt={t('Світлина новини')}
				onError={e => {
					e.target.onerror = null
					e.target.src = '/Img/newsCardERROR.jpg'
				}}
			/>
			<h1><TranslatedContent en={post.title_en} uk={post.title_uk} /></h1>
			<TranslatedContent en={post.content_en} uk={post.content_uk} html />
			<p>
				{t('Автор')}: {post.author.title || post.author.email}
			</p>
			<p>
				{t('Дата')}: {`${formattedDate} ${formattedTime}`}
			</p>
		</div>
	)
}

export default PostDetail
