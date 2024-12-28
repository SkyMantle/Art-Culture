import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TranslatedContent from '../../Blocks/TranslatedContent'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getBaseUrl, getImageUrl } from '../../../../utils/helper'
import Loading from '../../Blocks/Loading'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/MainPageBannerSlider/MainPageBannerSlider.scss'

const Slide = ({ museum, baseUrl, onClick }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const featuredMediaUrl = getImageUrl(museum.images, '/Img/halfNewsCard.jpg')
	console.log('Витягнуте медіа:', featuredMediaUrl)

	const museumLogoUrl = museum.museum_logo_image?.imageUrl
		? getImageUrl(
				museum.museum_logo_image.imageUrl,
				'/Img/logoMuseum_3.png',
			)
		: '/Img/logoMuseum_3.png' // Fallback logo

	return (
		<div className="BannerSliderCardContainer">
			<div className="BannerSliderCardWrapper">
				<div className="BannerSliderCardInnerWrapper">
					<div className="BannerSliderCardLogoWrapper">
						<img
							className="BannerSliderCardLogo"
							src={museumLogoUrl}
							alt={t('Фото музея')}
							onError={(e) => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</div>

					<div className="BannerSliderCardSeparator"></div>

					<div className="BannerSliderCardTitleWrapper">
						<h2 className="BannerSliderCardTitle">
							{museum.title}
						</h2>
					</div>

					<div className="BannerSliderCardDescriptionWrapper">
						<p className="BannerSliderCardDescription">
							<TranslatedContent
								en={museum.bio}
								uk={museum.bio}
								html
							/>
						</p>
					</div>

					<div className="BannerSliderCardReadMoreButtonWrapper">
						<button
							className="BannerSliderCardReadMoreButton"
							onClick={() => onClick(museum.id)}
						>
							{t('Читати далі')}
						</button>
					</div>
				</div>

				<div className="BannerSliderCardImgWrapper">
					<img
						className="BannerSliderCardImg"
						src={featuredMediaUrl}
						alt={t('Фото музея')}
						onError={(e) => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</div>
			</div>
		</div>
	)
}

const MainPageBannerSlider = () => {
	const { t } = useTranslation()
	const [museums, setMuseums] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const baseUrl = getBaseUrl()
	useEffect(() => {
		const fetchMuseums = async () => {
			try {
				const response = await axios.get('/api/users/museums')
				console.log('Fetch museums', response.data)
				setMuseums(response.data.museums || [])
				setLoading(false)
			} catch (err) {
				console.error('Error fetching museum:', err)
				setError(t('Не вдалося завантажити.'))
				setLoading(false)
			}
		}
		fetchMuseums()
	}, [t])
	const handleMuseumPageClick = (id) => {
		console.log('Navigating to museum with id:', id)
		navigate(`/museumpage/${id}`)
	}
	return (
		<div className="BannerSliderContainer">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={0}
				slidesPerView={'1'}
				navigation
				pagination={{ clickable: false, type: 'fraction' }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{loading ? (
					<SwiperSlide>
						<Loading />
					</SwiperSlide>
				) : error ? (
					<SwiperSlide>
						<div className="error">{error}</div>
					</SwiperSlide>
				) : museums.length === 0 ? (
					<SwiperSlide>
						<div className="noProducts">{t('Немає музеїв.')}</div>
					</SwiperSlide>
				) : (
					museums.map((museum) => (
						<SwiperSlide key={museum.id}>
							<Slide
								museum={museum}
								baseUrl={baseUrl}
								onClick={handleMuseumPageClick}
							/>
						</SwiperSlide>
					))
				)}
			</Swiper>

			<div className={'${swiper-button-prev}'}></div>
			<div className={'${swiper-pagination}'}></div>
			<div className={'${swiper-button-next}'}></div>
		</div>
	)
}

export default MainPageBannerSlider
