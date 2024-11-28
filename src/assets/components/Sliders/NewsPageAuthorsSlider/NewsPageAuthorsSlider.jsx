import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.scss'
import { getBaseUrl } from '../../../../utils/helper'

const Slide = ({ creator, onClick }) => {
	const { t } = useTranslation()
	const baseUrl = getBaseUrl()
	return (
		<div
			className='newsPageAuthorsSliderCardContainer'
			onClick={() => onClick(creator.id)}
		>
			<div className='newsPageAuthorsSliderCardWrapper'>
				<div className='newsPageAuthorsSliderCardUserPhotoWrapper'>
					<img
						className='newsPageAuthorsSliderCardUserPhoto'
						src={
							creator.images
								? `${baseUrl}${creator.images.replace('../../', '/')}`
								: '/Img/halfNewsCard.jpg'
						}
						alt={t('Фотографія автора')}
						loading='lazy'
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/mainInstagramSliderUserPhoto.png'
						}}
					/>
				</div>
				<div className='newsPageAuthorsSliderCardUserNameWrapper'>
					<p className='newsPageAuthorsSliderCardUserName'>{creator.title}</p>
				</div>
			</div>
		</div>
	)
}

const NewsPageAuthorsSlider = () => {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [error, setError] = useState(null)
	const [creators, setCreators] = useState({})
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCreator = async () => {
			try {
				const response = await axios.get(`/api/users/creators`)
				console.log('Received author data ', response.data)
				setCreators(response.data.creators)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching author data', error)
				setLoading(false)
			}
		}

		fetchCreator()
	}, [])

	const handleSlideClick = id => {
		navigate(`/artist/${id}`)
	}

	return (
		<div className='newsPageAuthorsSliderContainer'>
			<div className='newsPageAuthorsSliderWrapper'>
				<div className='newsPageAuthorsSliderTitleWrapper'>
					<p className='newsPageAuthorsSliderTitle'>{t('Автори')}</p>
				</div>

				<div className='newsPageAuthorsSliderInnerWrapper'>
					{' '}
					{loading ? (
						<p>{t('Завантаження авторів...')}</p>
					) : error ? (
						<p>{error}</p>
					) : creators.length === 0 ? (
						<p>{t('Немає авторів для відображення.')}</p>
					) : (
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={0}
							slidesPerView={'auto'}
							navigation
							pagination={{ clickable: false, type: 'fraction' }}
							onSlideChange={() => console.log('slide change')}
							onSwiper={swiper => console.log(swiper)}
						>
							{creators.map(creator => (
								<SwiperSlide key={creator.id}>
									<Slide creator={creator} onClick={handleSlideClick} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default NewsPageAuthorsSlider
