// Файл: /src/assets/components/Sliders/MainInstagramSlider/MainInstagramSlider.jsx

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import '/src/styles/components/Sliders/MainInstagramSlider/MainInstagramSlider.scss'

// Компонент для одного слайду
const Slide = ({ post }) => {
	const { t } = useTranslation()

	// Якщо немає поста, показуємо заглушку
	if (!post) {
		return (
			<div className="mainInstagramSliderCardWrapper">
				<p className="mainInstagramSliderLoadingText">{t('Завантаження...')}</p>
			</div>
		)
	}

	return (
		<div className="mainInstagramSliderCardWrapper">
			<div className="mainInstagramSliderCardTopInnerWrapper">
				<div className="mainInstagramSliderCardUserPhotoWrapper">
					<Image
						className="mainInstagramSliderCardUserPhoto"
						src={post.userPhoto || '/Img/mainInstagramSliderUserPhoto.png'}
						alt={t('Фотографія автора')}
						width={50}
						height={50}
						draggable={false}
					/>
				</div>
				<div className="mainInstagramSliderCardUserNameWrapper">
					<p className="mainInstagramSliderCardUserName">{post.username || 'ukr_art&culture'}</p>
				</div>
				<div className="mainInstagramSliderCardDateWrapper">
					<p className="mainInstagramSliderCardDate">{post.date || '3 days ago'}</p>
				</div>
			</div>

			<div className="mainInstagramSliderCardMiddleInnerWrapper">
				<div className="mainInstagramSliderCardImageWrapper">
					<Image
						className="mainInstagramSliderCardImg"
						src={post.imageUrl || '/Img/mainInstagramSliderIMG.jpg'}
						alt={t('Світлина автора')}
						width={630}
						height={330}
						priority={false}
						draggable={false}
					/>
				</div>
			</div>

			<div className="mainInstagramSliderCardBottomInnerWrapper">
				<div className="mainInstagramSliderCardDescriptionWrapper">
					<p className="mainInstagramSliderCardDescription">
						{post.description ||
							t(
								'Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів.'
							)}
					</p>
				</div>
			</div>
		</div>
	)
}

const MainInstagramSlider = () => {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchInstagramPosts = async () => {
			try {
				// TODO: замініть на реальний API-ендпоінт
				const response = await axios.get('/api/instagram/posts')
				setPosts(response.data.data || [])
			} catch (err) {
				console.error('Error fetching Instagram post data', err)
				setError(err)
			}
		}

		fetchInstagramPosts()
	}, [])

	if (error) {
		return (
			<div className="mainInstagramSliderErrorWrapper">
				<p className="mainInstagramSliderErrorText">
					{t('Помилка завантаження даних Instagram')}
				</p>
			</div>
		)
	}

	return (
		<div className="mainInstagramSliderContainer">
			<div className="mainInstagramSliderWrapper">
				<div className="mainInstagramSliderTopInnerWrapper">
					<div className="mainInstagramSliderTitleWrapper">
						<h2 className="mainInstagramSliderTitle">{t('on instagram')}</h2>
					</div>
					<div className="mainInstagramSliderFollowUsWrapper">
						<div className="mainInstagramSliderFollowUsButtonWrapper">
							<button className="mainInstagramSliderFollowUsButton">
								<p className="mainInstagramSliderFollowUsButtonText">{t('Follow us')}</p>
							</button>
						</div>
					</div>
				</div>

				<div className="mainInstagramSliderMiddleInnerWrapper">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={16}
						slidesPerView="auto"
						navigation
						pagination={{ clickable: true, type: 'fraction' }}
						className="mainInstagramSwiper"
					>
						{posts.length > 0
							? posts.map((post, idx) => (
								<SwiperSlide key={idx} className="mainInstagramSwiperSlide">
									<Slide post={post} />
								</SwiperSlide>
							))
							: // Показуємо кілька пустих слайдів як заглушки, поки дані не завантажені
							[0, 1, 2, 3, 4].map(idx => (
								<SwiperSlide key={idx} className="mainInstagramSwiperSlide">
									<Slide post={null} />
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default dynamic(() => Promise.resolve(MainInstagramSlider), {
	ssr: false,
	loading: () => <p className="mainInstagramSliderLoadingText">Завантаження слайдера...</p>,
})
