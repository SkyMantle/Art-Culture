import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import '/src/styles/components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.scss'
import { getBaseUrl } from '../../../../utils/helper'
const Slide = ({ product, baseUrl }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	const handleProductClick = () => {
		navigate(`/products/${product.id}`) // Adjust the route as per your application
	}

	const title =
		currentLanguage === 'en' ? product.title_en : product.title_ru || ''
	const description =
		currentLanguage === 'en'
			? product.description_en
			: product.description_uk || ''
	const specs =
		currentLanguage === 'en' ? product.specs_en : product.specs_uk || ''

	const imageUrl =
		product.images && product.images.length > 0
			? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
			: '/Img/defaultProductImage.jpg' // Fallback image

	return (
		<div className='mainPopularArtistsSliderCardWrapper'>
			<div className='mainPopularArtistsSliderCardInnerWrapper'>
				<img
					className='mainPopularArtistsSliderCardImg'
					src={imageUrl}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/mainPopularArtistsSlide.jpg'
					}}
				/>
			</div>
			<div className='mainPopularArtistsSliderCardAbsoluteWrapper'>
				<div className='mainPopularArtistsSliderCardButtonWrapper'>
					<button className='mainPopularArtistsSliderCardButton'>
						{t('Огляд')}
					</button>
				</div>
				<div className='mainPopularArtistsSliderCardTitleWrapper'>
					<h3 className='mainPopularArtistsSliderCardTitle'>
						{''}
						{title.length > 50 ? `${title.substring(0, 50)}...` : title}
					</h3>
				</div>
				<div className='mainPopularArtistsSliderCardDescriptionWrapper'>
					<p className='mainPopularArtistsSliderCardDescription'>
						{''}
						{description.length > 100
							? `${description.substring(0, 100)}...`
							: description}
					</p>
				</div>
			</div>
		</div>
	)
}

const MainPopularArtistsSlider = () => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const baseUrl = getBaseUrl()

	useEffect(() => {
		const fetchCreatorProducts = async () => {
			try {
				const response = await axios.get('/api/products/creators-products')
				console.log('Received creator products:', response.data)
				setProducts(response.data.products || [])
				setLoading(false)
			} catch (err) {
				console.error('Error fetching creator products:', err)
				setError(t('Не вдалося завантажити продукти.'))
				setLoading(false)
			}
		}

		fetchCreatorProducts()
	}, [t])
	return (
		<div className='mainPopularArtistsSliderContainer'>
			<div className='mainPopularArtistsSliderWrapper'>
				<div className='mainPopularArtistsSliderTopInnerWrapper'>
					<div className='mainPopularArtistsSliderTitleWrapper'>
						<p className='mainPopularArtistsSliderTitle'>
							{t('Популярне.')} &#8243;{t('Мистецтво')}&#8243;
						</p>
					</div>
					<div className='mainPopularArtistsSliderLikeAndShareWrapper'>
						<div className='mainPopularArtistsSliderLikeInnerWrapper'>
							<button className='mainPopularArtistsSliderLikeButton'>
								<img
									className='mainPopularArtistsSliderLikeButtonImg'
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className='mainPopularArtistsSliderShareInnerWrapper'>
							<button className='mainPopularArtistsSliderShareButtonButton'>
								<img
									className='mainPopularArtistsSliderShareButtonImg'
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
				<div className='mainPopularArtistsSliderBottomInnerWrapper'>
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
								<div className='loading'>{t('Завантаження...')}</div>
							</SwiperSlide>
						) : error ? (
							<SwiperSlide>
								<div className='error'>{error}</div>
							</SwiperSlide>
						) : products.length === 0 ? (
							<SwiperSlide>
								<div className='noProducts'>
									{t('Немає продуктів від митців.')}
								</div>
							</SwiperSlide>
						) : (
							products.map(product => (
								<SwiperSlide key={product.id}>
									<Slide product={product} baseUrl={baseUrl} />
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

export default MainPopularArtistsSlider
