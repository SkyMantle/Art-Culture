import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// Import Swiper modules
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import '/src/styles/components/Sliders/ArtistPageSliders/PopularOfThisArtistSlider.scss'
import LikeAndShare from '@components/Blocks/LikeAndShare'
import sliderStyles from '@styles/components/Blocks/Slider.module.scss'
import TranslatedContent from '../../Blocks/TranslatedContent'

const PopularOfThisArtistSlider = ({ products, baseUrl }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const navigate = useNavigate()

	const handleProductPreviewClick = productId => {
		navigate(`/products/${productId}`)

		// If no products are available, display a message
		if (!products || products.length === 0) {
			return (
				<div className='popular-of-this-artist-slider-container'>
					<p>{t('У цього митця немає продуктів для відображення.')}</p>
				</div>
			)
		}
	}
	return (
		<div className='popularOfThisArtistSliderContainer'>
			<div className='popularOfThisArtistSliderWrapper'>
				<div className='popularOfThisArtistSliderTopInnerWrapper'>
					<div className='popularOfThisArtistSliderTitleWrapper'>
						<p className='popularOfThisArtistSliderTitle'>
							{t('Популярне цього митця')}
						</p>
					</div>
					<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
				</div>
				<div className='popularOfThisArtistSliderBottomInnerWrapper'>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={'auto'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={swiper => console.log(swiper)}
					>
						{products.map(product => {
							const title =
								currentLanguage === 'en'
									? product.title_en || product.title
									: product.title_uk || product.title

							const imageUrl =
								product.images && product.images.length > 0
									? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
									: '/Img/defaultProductImage.jpg' // Fallback imageide>
							return (
								<SwiperSlide key={product.id}>
									<div className='product-slide-card-wrapper'>
										<div className='product-slide-card-inner-wrapper'>
											<img
												className='product-slide-card-img'
												src={imageUrl}
												alt={title}
												onClick={() => handleProductPreviewClick(product.id)}
												onError={e => {
													e.target.onerror = null
													e.target.src = '/Img/defaultProductImage.jpg'
												}}
											/>
										</div>
										<div className='product-slide-card-absolute-wrapper'>
											<div className='product-slide-card-button-wrapper'>
												<button
													className='product-slide-card-button'
													onClick={() => handleProductPreviewClick(product.id)}
												>
													{t('Огляд')}
												</button>
											</div>
											<div className='product-slide-card-title-wrapper'>
												<h3 className='product-slide-card-title'>
													<TranslatedContent en={product.title_en} uk={product.title_uk} maxLength={50} />
												</h3>
											</div>
											<div className='product-slide-card-description-wrapper'>
												<p className='product-slide-card-description'>
													<TranslatedContent en={product.description_en} uk={product.description_uk} maxLength={100} />
												</p>
											</div>
										</div>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
					{/* <div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div> */}
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}
PopularOfThisArtistSlider.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title_en: PropTypes.string,
			title_uk: PropTypes.string,
			description_en: PropTypes.string,
			description_uk: PropTypes.string,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired,
					imageUrl: PropTypes.string.isRequired,
				})
			),
		})
	).isRequired,
	baseUrl: PropTypes.string.isRequired,
}
export default PopularOfThisArtistSlider
