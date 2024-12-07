import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/Base/NewsSlider.scss'
import { getBaseUrl } from '../../../../utils/helper'
import LikeAndShare from '@components/Blocks/LikeAndShare'
import sliderStyles from '@styles/components/Blocks/Slider.module.scss'

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
		<div className="NewsSliderCardContainer">
			<a
				className="NewsSliderCardLink"
			// TODO:Rewrite component to use navigate for post	onClick={handleArtistPageClick}
			>
				<div className="NewsSliderCardImgWrapper">
					<img
						className="NewsSliderCardImg"
						src={featuredMediaUrl}
						alt={t('Світлина мистецтва')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>
				</div>

				<div className="NewsSliderCardTitleWrapper">
					{/* <h3 className="NewsSliderCardTitle">
						{title.length > 50 ? `${title.substring(0, 50)}...` : title}
					</h3> */}
					<h3 className="NewsSliderCardTitle">
						{title.length > 50
							? `${title.substring(0, title.substring(0, 50).lastIndexOf(' ') || 50)}...`
							: title}
					</h3>

				</div>

				<div
					className="NewsSliderCardDescriptionWrapper"
				>
					{/* <p className="NewsSliderCardDescription">
						{content.length > 230 ? `${content.substring(0, 230)}...` : content}
					</p> */}
					<p className="NewsSliderCardDescription">
						{content.length > 230
							? `${content.substring(0, content.substring(0, 230).lastIndexOf(' ') || 230)}...`
							: content}
					</p>

				</div>
			</a>
		</div>
	)
}

const ArtistsPageNewsArtistsSlider = () => {
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
		<div className="NewsSliderContainer">
			<div className="NewsSliderWrapper">
				<div className="NewsSliderTopInnerWrapper">
					<div className="NewsSliderTitleWrapper">
						<h2 className="NewsSliderTitle">
							{t('Новини.')} &#8243;{t('Митці')}&#8243;
						</h2>
					</div>
					<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
				</div>
				<div className="NewsSliderBottomInnerWrapper">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						slidesPerView={'auto'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={swiper => console.log(swiper)}
					>
						{loading ? (
							<SwiperSlide>
								<div className="loading">{t('Завантаження...')}</div>
							</SwiperSlide>
						) : error ? (
							<SwiperSlide>
								<div className="error">{error}</div>
							</SwiperSlide>
						) : creatorPosts.length === 0 ? (
							<SwiperSlide>
								<div className="noPosts">
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

export default ArtistsPageNewsArtistsSlider