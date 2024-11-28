import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import { useNavigate } from 'react-router-dom'
import styles from '/src/styles/components/Sliders/ArtistPageSliders/ArtistPageNewsArtistsSlider.module.scss'
import { getBaseUrl } from '../../../../utils/helper'

const Slide = ({ post, baseUrl }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	// TODO:Rewrite component to use navigate for post
	// const handleArtistPageClick = () => {
	// 	navigate('/ArtistPage')
	// }

	const title = currentLanguage === 'en' ? post.title_en : post.title_uk
	const content =
		(currentLanguage === 'en' ? post.content_en : post.content_uk) || ''

	const featuredMediaUrl = post.images
		? `${baseUrl}${post.images.replace('../../', '/')}`
		: '/Img/halfNewsCard.jpg'
	return (
		<div className={styles.artistPageNewsArtistsSliderCardContainer}>
			<div className={styles.artistPageNewsArtistsSliderCardImgWrapper}>
				<img
					className={styles.artistPageNewsArtistsSliderCardImg}
					src={featuredMediaUrl}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/newsCardERROR.jpg'
					}}
				/>
			</div>

			<div className={styles.artistPageNewsArtistsSliderCardTitleWrapper}>
				<h3 className={styles.artistPageNewsArtistsSliderCardTitle}>
					{title.length > 50 ? `${title.substring(0, 50)}...` : title}
				</h3>
			</div>

			<div className={styles.artistPageNewsArtistsSliderCardDescriptionWrapper}>
				<p className={styles.artistPageNewsArtistsSliderCardDescription}>
					{content.length > 100 ? `${content.substring(0, 100)}...` : content}
				</p>
			</div>
		</div>
	)
}

// const Slide1 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="artistPageNewsArtistsSliderCardContainer">

// 			<div className="artistPageNewsArtistsSliderCardImgWrapper">
// 				<img
// 					className="artistPageNewsArtistsSliderCardImg"
// 					src={'/Img/mainInstagramSliderIMG.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

// 			<div className="artistPageNewsArtistsSliderCardTitleWrapper">
// 				<h3 className="artistPageNewsArtistsSliderCardTitle">
// 					Lorem Ipsum
// 				</h3>
// 			</div>

// 			<div className="artistPageNewsArtistsSliderCardDescriptionWrapper">
// 				<p className="artistPageNewsArtistsSliderCardDescription">
// 					Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 					Libero vero numquam cum excepturi enim iste quis
// 					doloribus cupiditate? Temporibus, laboriosam quis?
// 					Reprehenderit velit sequi, inventore nostrum odit illum?
// 					Doloremque, veniam.
// 				</p>
// 			</div>

// 		</div>
// 	)
// }

// const Slide2 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="artistPageNewsArtistsSliderCardContainer">

// 			<div className="artistPageNewsArtistsSliderCardImgWrapper">
// 				<img
// 					className="artistPageNewsArtistsSliderCardImg"
// 					src={'/Img/mainPopularArtistsSlide.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

// 			<div className="artistPageNewsArtistsSliderCardTitleWrapper">
// 				<h3 className="artistPageNewsArtistsSliderCardTitle">
// 					Lorem Ipsum
// 				</h3>
// 			</div>

// 			<div className="artistPageNewsArtistsSliderCardDescriptionWrapper">
// 				<p className="artistPageNewsArtistsSliderCardDescription">
// 					Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 					Libero vero numquam cum excepturi enim iste quis
// 					doloribus cupiditate? Temporibus, laboriosam quis?
// 					Reprehenderit velit sequi, inventore nostrum odit illum?
// 					Doloremque, veniam.
// 				</p>
// 			</div>

// 		</div>
// 	)
// }

// const Slide3 = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="artistPageNewsArtistsSliderCardContainer">

// 			<div className="artistPageNewsArtistsSliderCardImgWrapper">
// 				<img
// 					className="artistPageNewsArtistsSliderCardImg"
// 					src={'/Img/newsCard1.jpg'}
// 					alt={t('Світлина мистецтва')}
// 					onError={e => {
// 						e.target.onerror = null
// 						e.target.src = '/public/Img/newsCardERROR.jpg'
// 					}}
// 				/>
// 			</div>

// 			<div className="artistPageNewsArtistsSliderCardTitleWrapper">
// 				<h3 className="artistPageNewsArtistsSliderCardTitle">
// 					Lorem Ipsum
// 				</h3>
// 			</div>

// 			<div className="artistPageNewsArtistsSliderCardDescriptionWrapper">
// 				<p className="artistPageNewsArtistsSliderCardDescription">
// 					Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 					Libero vero numquam cum excepturi enim iste quis
// 					doloribus cupiditate? Temporibus, laboriosam quis?
// 					Reprehenderit velit sequi, inventore nostrum odit illum?
// 					Doloremque, veniam.
// 				</p>
// 			</div>

// 		</div>
// 	)
// }

const ArtistPageNewsArtistsSlider = () => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()
	const [creatorPosts, setCreatorPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const baseUrl = getBaseUrl()

	useEffect(() => {
		const fetchCreatorPosts = async () => {
			try {
				const response = await axios.get('/api/posts/creators')
				console.log('Received creator posts:', response.data)
				setCreatorPosts(response.data.posts || [])
				setLoading(false)
			} catch (err) {
				console.error('Error fetching creator posts:', err)
				setError(t('Не вдалося завантажити публікації.'))
				setLoading(false)
			}
		}

		fetchCreatorPosts()
	}, [t])

	return (
		<div className={styles.artistPageNewsArtistsSliderContainer}>
			<div className={styles.artistPageNewsArtistsSliderWrapper}>
				<div className={styles.artistPageNewsArtistsSliderTopInnerWrapper}>
					<div className={styles.artistPageNewsArtistsSliderTitleWrapper}>
						<p className={styles.artistPageNewsArtistsSliderTitle}>
							{t('Новини.')} &#8243;{t('Митці')}&#8243;
						</p>
					</div>
					<div
						className={styles.artistPageNewsArtistsSliderLikeAndShareWrapper}
					>
						<div className={styles.artistPageNewsArtistsSliderLikeInnerWrapper}>
							<button className={styles.artistPageNewsArtistsSliderLikeButton}>
								<img
									className={styles.artistPageNewsArtistsSliderLikeButtonImg}
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div
							className={styles.artistPageNewsArtistsSliderShareInnerWrapper}
						>
							<button
								className={styles.artistPageNewsArtistsSliderShareButtonButton}
							>
								<img
									className={styles.artistPageNewsArtistsSliderShareButtonImg}
									src={'/Img/shareArrow.svg'}
									alt={t('Світлина поширити')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/shareArrow.svg'
									}}
								/>
							</button>
						</div>
					</div>
				</div>
				<div className={styles.artistPageNewsArtistsSliderBottomInnerWrapper}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={'4'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={swiper => console.log(swiper)}
					>
						{loading ? (
							<SwiperSlide>
								<div className={styles.loading}>{t('Завантаження...')}</div>
							</SwiperSlide>
						) : error ? (
							<SwiperSlide>
								<div className={styles.error}>{error}</div>
							</SwiperSlide>
						) : creatorPosts.length === 0 ? (
							<SwiperSlide>
								<div className={styles.noPosts}>
									{t('Немає публікацій від митців.')}
								</div>
							</SwiperSlide>
						) : (
							creatorPosts.map(post => (
								<SwiperSlide key={post.id}>
									<Slide post={post} baseUrl={baseUrl} />
								</SwiperSlide>
							))
						)}
					</Swiper>
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default ArtistPageNewsArtistsSlider
