import axios from 'axios'
import { useEffect, useState } from 'react'
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
import '@styles/components/Sliders/Base/PopularSlider.scss'
import { getBaseUrl } from '../../../../utils/helper'
import LikeAndShare from '@components/Blocks/LikeAndShare'
import sliderStyles from '@styles/components/Blocks/Slider.module.scss'
import TranslatedContent from '../../Blocks/TranslatedContent'

const Slide = ({ product, baseUrl }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleProductClick = () => {
		navigate(`/products/${product.id}`) // Adjust the route as per your application
	}

	const imageUrl =
		product.images && product.images.length > 0
			? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
			: '/Img/defaultProductImage.jpg' // Fallback image

	return (
		<div className='PopularSliderCardWrapper'>
			<div className='PopularSliderCardInnerWrapper'>
				<img
					className='PopularSliderCardImg'
					src={imageUrl}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/PopularSlide.jpg'
					}}
				/>
			</div>
			<div className='PopularSliderCardAbsoluteWrapper'>
				<div className='PopularSliderCardButtonWrapper'>
					<button className='PopularSliderCardButton'>
						{t('Огляд')}
					</button>
				</div>
				<div className='PopularSliderCardTitleWrapper'>
					<h3 className='PopularSliderCardTitle'>
						<TranslatedContent en={product.title_en} uk={product.title_uk} maxLength={50} />
					</h3>
				</div>
				<div className='PopularSliderCardDescriptionWrapper'>
					<p className='PopularSliderCardDescription'>
						<TranslatedContent en={product.description_en} uk={product.description_uk} maxLength={50} />
					</p>
				</div>
			</div>
		</div>
	)
}

const MainPopularArtistsSlider = () => {
	const { t } = useTranslation()

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
		<div className='PopularSliderContainer'>
			<div className='PopularSliderWrapper'>
				<div className='PopularSliderTopInnerWrapper'>
					<div className='PopularSliderTitleWrapper'>
						<h2 className='PopularSliderTitle'>
							{t('Популярне.')} &#8243;{t('Мистецтво')}&#8243;
						</h2>
					</div>
					<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
				</div>
				<div className='PopularSliderBottomInnerWrapper'>
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
