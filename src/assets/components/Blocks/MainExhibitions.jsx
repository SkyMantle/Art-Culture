import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/Blocks/MainNews.module.scss'
import { getFormattedDate, getImageUrl } from '../../../utils/helper'

function MainExhibitions() {
	const { t } = useTranslation()
	const [exhibitions, setExhibitions] = useState([])

	const [visibleExhibitionsCount, setVisibleExhibitionsCount] = useState(
		getPostsCount(window.innerWidth)
	)

	function getPostsCount(Width) {
		if (Width >= 1600) {
			return 3
		} else if (Width >= 1440) {
			return 2
		} else {
			return 2 // Assuming you meant to return 1 for widths below 1440px
		}
	}

	useEffect(() => {
		const handleResize = () => {
			const newPostCount = getPostsCount(window.innerWidth)
			if (newPostCount !== visibleExhibitionsCount) {
				setVisibleExhibitionsCount(newPostCount)
				console.log(
					`Window width: ${window.innerWidth}, Visible posts count: ${newPostCount}`
				)
			}
		}

		window.addEventListener('resize', handleResize)

		// Initial check
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [visibleExhibitionsCount])

	useEffect(() => {
		// Запит на отримання виставок з медіа-даними
		axios
			.get('/api/exhibitions')
			.then(response => {
				console.log('Отримані дані виставок:', response.data)
				setExhibitions(response.data.exhibitions)
			})
			.catch(error => {
				console.error('Помилка при завантаженні виставок', error)
			})
	}, [])
	// Запит на отримання медіа

	return (
		<div className={`${styles.mainPageNewsContainer}`}>
			<div className={`${styles.mainPageNewsTitleWithButton}`}>
				<h3 className={`${styles.mainPageNewsTitle}`}>{t('Виставки')}</h3>
				<div
					className={`${styles.mainPageNewsButtonWrapper} ${styles.desktopButtonWrapper}`}
				>
					<button className={`${styles.mainPageNewsButton}`}>
						<p className={`${styles.mainPageNewsButtonTitle}`}>
							{t('Усі виставки')}
						</p>
						<img
							className={`${styles.mainPageNewsButtonImg}`}
							src={'/Img/buttonArrow.svg'}
							alt={t('Стрілка')}
							onError={e => {
								e.target.onerror = null
								e.target.src = '/mainNewImg/buttonArrow.svg'
							}}
						/>
					</button>
				</div>
			</div>
			<div className={`${styles.mainPageNewsCardsWrapper}`}>
				{exhibitions
					.slice(0, visibleExhibitionsCount)
					.map((exhibition, index) => {
						// Логування даних для перевірки
						console.log('Витягнуті виставки:', exhibitions)

						const featuredMediaUrl =
							exhibition.images && exhibition.images.length > 0
								? getImageUrl(exhibition.images[0].imageUrl, '/Img/halfNewsCard.jpg')
								: '/Img/halfNewsCard.jpg'
						console.log('Витягнуте медіа:', featuredMediaUrl)

						const formattedStartDate = getFormattedDate(exhibition.startDate)
						const formattedEndDate = getFormattedDate(exhibition.endDate)
						const formattedTime = exhibition.cardTime
							? exhibition.cardTime
							: '-'

						return (
							<div
								key={exhibition.id}
								className={`${styles.mainPageNewsCard} ${index === 0 ? styles.firstCard : index === 1 ? styles.secondCard : styles.thirdCard}`}
							>
								<div className={`${styles.cardInner}`}>
									<div className={`${styles.cardImgWrapper}`}>
										<img
											className={`${styles.cardImg} ${index === 0 ? styles.firstCardImg : index === 1 ? styles.secondCardImg : index === 2 ? styles.thirdCardImg : styles.fourthCardImg}`}
											src={featuredMediaUrl}
											alt={t('Світлина виставки')}
											onError={e => {
												e.target.onerror = null
												e.target.src = '/Img/newsCardERROR.jpg'
											}}
										/>
									</div>
									<div className={`${styles.cardTextWrapper}`}>
										<div className={`${styles.cardTitleWrapper}`}>
											<h3
												className={`${styles.cardTitle} ${index === 0 ? styles.firstCardTitle : index === 1 ? styles.secondCardTitle : index === 2 ? styles.thirdCardTitle : styles.fourthCardTitle}`}
											>
												{exhibition.title || exhibition.email}
											</h3>
										</div>
										<div className={`${styles.cardDescriptioneWrapper}`}>
											<p
												className={`${styles.cardDescription} ${index === 0 ? styles.firstCardDescription : index === 1 ? styles.secondCardDescription : styles.thirdCardDescription}`}
											/>
										</div>
										<div className={`${styles.cardReadMoreWrapper}`}>
											{/*	TODO:write correct link */}
											<a href={''} className={`${styles.cardReadMoreLink}`}>
												{t('Читати далі')}
											</a>
										</div>
									</div>
								</div>
								<div className={`${styles.cardClockAndDateWrapper}`}>
									<div className={`${styles.cardClockAndDateInner}`}>
										<div className={`${styles.cardClockImgWrapper}`}>
											<img
												className={`${styles.cardClockImg}`}
												src={'/Img/clock.svg'}
												alt={t('Світлина годинника')}
												onError={e => {
													e.target.onerror = null
													e.target.src = '/Img/clock.svg'
												}}
											/>
										</div>
										<div className={`${styles.cardDateWrapper}`}>
											<p className={`${styles.cardDate}`}>
												{formattedStartDate} - {formattedEndDate}
											</p>
										</div>
										<div className={`${styles.cardTimeWrapper}`}>
											<p className={`${styles.cardTime}`}>{formattedTime}</p>
										</div>
									</div>
								</div>
							</div>
						)
					})}
			</div>
			<div
				className={`${styles.mainPageNewsButtonWrapper} ${styles.mobileButtonWrapper}`}
			>
				<button className={`${styles.mainPageNewsButton}`}>
					<p className={`${styles.mainPageNewsButtonTitle}`}>
						{t('Усі виставки')}
					</p>
					<img
						className={`${styles.mainPageNewsButtonImg}`}
						src={'/Img/buttonArrow.svg'}
						alt={t('Стрілка')}
						onError={e => {
							e.target.onerror = null
							e.target.src = '/Img/buttonArrow.svg'
						}}
					/>
				</button>
			</div>
		</div>
	)
}

export default MainExhibitions
