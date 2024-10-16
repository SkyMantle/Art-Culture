import React from 'react';
import { useTranslation } from 'react-i18next'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules'

import '/src/styles/components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.scss';

const Slide = () => {
	const { t } = useTranslation();
	return (
		<div className="mainPopularArtistsSliderCardWrapper">
			<div className="mainPopularArtistsSliderCardInnerWrapper">
				<img
					className="mainPopularArtistsSliderCardImg"
					src={'/Img/mainPopularArtistsSliderIMG.jpg'}
					alt={t('Світлина мистецтва')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/mainPopularArtistsSlide.jpg'
					}}
				/>
			</div>
			<div className="mainPopularArtistsSliderCardAbsoluteWrapper">
				<div className="mainPopularArtistsSliderCardButtonWrapper">
					<button className="mainPopularArtistsSliderCardButton">
						{t('Огляд')}
					</button>
				</div>
				<div className="mainPopularArtistsSliderCardTitleWrapper">
					<h3 className="mainPopularArtistsSliderCardTitle">
						Lorem Ipsum
					</h3>
				</div>
				<div className="mainPopularArtistsSliderCardDescriptionWrapper">
					<p className="mainPopularArtistsSliderCardDescription">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Libero vero numquam cum excepturi enim iste quis
						doloribus cupiditate? Temporibus, laboriosam quis?
						Reprehenderit velit sequi, inventore nostrum odit illum?
						Doloremque, veniam.
					</p>
				</div>
			</div>
		</div>
	)
}

const MainPopularArtistsSlider = () => {
	const { t } = useTranslation();
	return (
		<div className="mainPopularArtistsSliderContainer">
			<div className="mainPopularArtistsSliderWrapper">
				<div className="mainPopularArtistsSliderTopInnerWrapper">
					<div className="mainPopularArtistsSliderTitleWrapper">
						<p className="mainPopularArtistsSliderTitle">
							{t('Популярне.')} &#8243;{t('Мистецтво')}&#8243;
						</p>
					</div>
					<div className="mainPopularArtistsSliderLikeAndShareWrapper">
						<div className="mainPopularArtistsSliderLikeInnerWrapper">
							<button className="mainPopularArtistsSliderLikeButton">
								<img className="mainPopularArtistsSliderLikeButtonImg"
									src={'/Img/likeHeart.svg'}
									alt={t('Світлина вподобайки')}
									onError={e => {
										e.target.onerror = null
										e.target.src = '/Img/likeHeart.svg'
									}}
								/>
							</button>
						</div>
						<div className="mainPopularArtistsSliderShareInnerWrapper">
							<button className="mainPopularArtistsSliderShareButtonButton">
								<img className="mainPopularArtistsSliderShareButtonImg"
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
				<div className="mainPopularArtistsSliderBottomInnerWrapper">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						slidesPerView={'auto'}
						navigation
						pagination={{ clickable: false, type: 'fraction' }}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
					>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
						<SwiperSlide>
							<Slide />
						</SwiperSlide>
					</Swiper>
					<div className={'${swiper-button-prev}'}></div>
					<div className={'${swiper-pagination}'}></div>
					<div className={'${swiper-button-next}'}></div>
				</div>
			</div>
		</div>
	)
}

export default MainPopularArtistsSlider;
