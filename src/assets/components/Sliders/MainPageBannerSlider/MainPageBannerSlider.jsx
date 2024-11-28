import React from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/MainPageBannerSlider/MainPageBannerSlider.scss';

const Slide = () => {
	const { t } = useTranslation();const navigate = useNavigate()

	const handleMuseumPageClick = () => {
		navigate('/MuseumPage')
	}
	
	return (
		<div className="MainPageBannerSliderCardContainer">

			<div className="MainPageBannerSliderCardWrapper">

				<div className="MainPageBannerSliderCardLogoWrapper">

					<img
						className="MainPageBannerSliderCardLogo"
						src={'/Img/logoMuseum_3.png'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>

				</div>

				<div className="MainPageBannerSliderCardTitleWrapper">

					<p className="MainPageBannerSliderCardTitle">
						{t('Назва першого музею')}
					</p>

				</div>

				<div className="MainPageBannerSliderCardDescriptionWrapper">

					<p className="MainPageBannerSliderCardDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam deleniti odit nesciunt consequatur modi at totam impedit harum natus ratione! Aliquam illo quos, deleniti sunt sapiente molestiae aperiam dolore consequuntur?
						Dignissimos saepe maxime totam magnam libero at tempora. Corporis laborum, consequatur quasi reiciendis necessitatibus sapiente ipsum nobis doloremque omnis temporibus incidunt deleniti! Autem cupiditate ut veritatis, aliquid nisi iste cumque!
						Neque aliquam nemo accusantium saepe debitis praesentium dolor officiis in doloremque, tempora blanditiis totam impedit modi iure. Iste, impedit reiciendis. Vel fugiat asperiores reiciendis sint nisi odit accusamus sunt eius!
						Eum, ipsam, consequatur ex deserunt ut vitae, necessitatibus iure tempora numquam eius incidunt debitis voluptatem ea odit? Magnam, enim iure, vitae eius officiis magni fugit qui, corporis ratione illo sint!
						Doloribus sint architecto dicta repellat repellendus consequatur impedit deserunt ipsa laboriosam, nemo amet dolorum voluptatum quam velit aliquam incidunt exercitationem id facilis magnam vero enim tenetur animi minus. Ab, deleniti.
					</p>

				</div>

				<div className="MainPageBannerSliderCardReadMoreButtonWrapper">

					<button className="MainPageBannerSliderCardReadMoreButton" onClick={handleMuseumPageClick}>
						{t('Читати далі')}
					</button>

				</div>

				<div className="MainPageBannerSliderCardImgWrapper">

					<img
						className="MainPageBannerSliderCardImg"
						src={'/Img/mainBanner.jpeg'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>

				</div>

			</div>

		</div>
	)
}

const Slide1 = () => {
	const { t } = useTranslation();
	return (
		<div className="MainPageBannerSliderCardContainer">

			<div className="MainPageBannerSliderCardWrapper">

				<div className="MainPageBannerSliderCardLogoWrapper">

					<img
						className="MainPageBannerSliderCardLogo"
						src={'/Img/logoMuseum_1.png'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>

				</div>

				<div className="MainPageBannerSliderCardTitleWrapper">

					<p className="MainPageBannerSliderCardTitle">
						{t('Назва другого музею')}
					</p>

				</div>

				<div className="MainPageBannerSliderCardDescriptionWrapper">

					<p className="MainPageBannerSliderCardDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam deleniti odit nesciunt consequatur modi at totam impedit harum natus ratione! Aliquam illo quos, deleniti sunt sapiente molestiae aperiam dolore consequuntur?
						Dignissimos saepe maxime totam magnam libero at tempora. Corporis laborum, consequatur quasi reiciendis necessitatibus sapiente ipsum nobis doloremque omnis temporibus incidunt deleniti! Autem cupiditate ut veritatis, aliquid nisi iste cumque!
						Neque aliquam nemo accusantium saepe debitis praesentium dolor officiis in doloremque, tempora blanditiis totam impedit modi iure. Iste, impedit reiciendis. Vel fugiat asperiores reiciendis sint nisi odit accusamus sunt eius!
						Eum, ipsam, consequatur ex deserunt ut vitae, necessitatibus iure tempora numquam eius incidunt debitis voluptatem ea odit? Magnam, enim iure, vitae eius officiis magni fugit qui, corporis ratione illo sint!
						Doloribus sint architecto dicta repellat repellendus consequatur impedit deserunt ipsa laboriosam, nemo amet dolorum voluptatum quam velit aliquam incidunt exercitationem id facilis magnam vero enim tenetur animi minus. Ab, deleniti.
					</p>

				</div>

				<div className="MainPageBannerSliderCardReadMoreButtonWrapper">

					<button className="MainPageBannerSliderCardReadMoreButton">
						{t('Читати далі')}
					</button>

				</div>

				<div className="MainPageBannerSliderCardImgWrapper">

					<img
						className="MainPageBannerSliderCardImg"
						src={'/Img/museumPhoto_1.jpg'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>

				</div>

			</div>

		</div>
	)
}

const Slide2 = () => {
	const { t } = useTranslation();
	return (
		<div className="MainPageBannerSliderCardContainer">

			<div className="MainPageBannerSliderCardWrapper">

				<div className="MainPageBannerSliderCardLogoWrapper">

					<img
						className="MainPageBannerSliderCardLogo"
						src={'/Img/logoMuseum_2.png'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>

				</div>

				<div className="MainPageBannerSliderCardTitleWrapper">

					<p className="MainPageBannerSliderCardTitle">
						{t('Назва третього музею')}
					</p>

				</div>

				<div className="MainPageBannerSliderCardDescriptionWrapper">

					<p className="MainPageBannerSliderCardDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam deleniti odit nesciunt consequatur modi at totam impedit harum natus ratione! Aliquam illo quos, deleniti sunt sapiente molestiae aperiam dolore consequuntur?
						Dignissimos saepe maxime totam magnam libero at tempora. Corporis laborum, consequatur quasi reiciendis necessitatibus sapiente ipsum nobis doloremque omnis temporibus incidunt deleniti! Autem cupiditate ut veritatis, aliquid nisi iste cumque!
						Neque aliquam nemo accusantium saepe debitis praesentium dolor officiis in doloremque, tempora blanditiis totam impedit modi iure. Iste, impedit reiciendis. Vel fugiat asperiores reiciendis sint nisi odit accusamus sunt eius!
						Eum, ipsam, consequatur ex deserunt ut vitae, necessitatibus iure tempora numquam eius incidunt debitis voluptatem ea odit? Magnam, enim iure, vitae eius officiis magni fugit qui, corporis ratione illo sint!
						Doloribus sint architecto dicta repellat repellendus consequatur impedit deserunt ipsa laboriosam, nemo amet dolorum voluptatum quam velit aliquam incidunt exercitationem id facilis magnam vero enim tenetur animi minus. Ab, deleniti.
					</p>

				</div>

				<div className="MainPageBannerSliderCardReadMoreButtonWrapper">

					<button className="MainPageBannerSliderCardReadMoreButton">
						{t('Читати далі')}
					</button>

				</div>

				<div className="MainPageBannerSliderCardImgWrapper">

					<img
						className="MainPageBannerSliderCardImg"
						src={'/Img/museumPhoto_2.jpg'}
						alt={t('Фото музея')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/public/Img/newsCardERROR.jpg'
						}}
					/>

				</div>

			</div>

		</div>
	)
}

const MainPageBannerSlider = () => {
	// const { t } = useTranslation();
	return (
		<div className="MainPageBannerSliderContainer">

			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={0}
				slidesPerView={'1'}
				navigation
				pagination={{ clickable: false, type: 'fraction' }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				<SwiperSlide>
					<Slide />
				</SwiperSlide>
				<SwiperSlide>
					<Slide1 />
				</SwiperSlide>
				<SwiperSlide>
					<Slide2 />
				</SwiperSlide>
			</Swiper>

			<div className={'${swiper-button-prev}'}></div>
			<div className={'${swiper-pagination}'}></div>
			<div className={'${swiper-button-next}'}></div>

		</div>
	)
}

export default MainPageBannerSlider;
