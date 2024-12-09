import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '/src/styles/components/Blocks/MainNews.module.scss'
import { getFormattedDate, getFormattedTime, getImageUrl } from '../../../utils/helper'
import TranslatedContent from './TranslatedContent'

function MainNews() {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])

	const [visiblePostsCount, setVisiblePostsCount] = useState(
		getPostsCount(window.innerWidth)
	)
	const navigate = useNavigate()
	const handleNewsPageClick = () => {
		navigate('/NewsPage')
	}

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
			if (newPostCount !== visiblePostsCount) {
				setVisiblePostsCount(newPostCount)
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
	}, [visiblePostsCount])

	useEffect(() => {
		// Запит на отримання постів з медіа-даними
		axios
			.get('/api/posts')
			.then(response => {
				console.log('Отримані дані постів:', response.data)
				setPosts(response.data)
			})
			.catch(error => {
				console.error('Помилка при завантаженні постів', error)
			})
	}, [])

	return (
		<div className={`${styles.mainPageNewsContainer}`}>
			<div className={`${styles.mainPageNewsTitleWithButton}`}>
				<h3 className={`${styles.mainPageNewsTitle}`}>{t('Новини')}</h3>
				<div
					className={`${styles.mainPageNewsButtonWrapper} ${styles.desktopButtonWrapper}`}
				>
					<button
						className={`${styles.mainPageNewsButton}`}
						onClick={handleNewsPageClick}
					>
						<p className={`${styles.mainPageNewsButtonTitle}`}>
							{t('Усі новини')}
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
				{posts.slice(0, visiblePostsCount).map((post, index) => {
					// Логування даних для перевірки
					console.log('Пост:', post)

					const featuredMediaUrl = getImageUrl(post.images, '/Img/halfNewsCard.jpg');

					console.log('Витягнуте медіа:', featuredMediaUrl)

					const formattedDate = getFormattedDate(post.createdAt)
					const formattedTime = getFormattedTime(post.createdAt)

					return (
						<div
							key={post.id}
							className={`${styles.mainPageNewsCard} ${index === 0 ? styles.firstCard : index === 1 ? styles.secondCard : styles.thirdCard}`}
						>
							<div className={`${styles.cardInner}`}>
								<div className={`${styles.cardImgWrapper}`}>
									<img
										className={`${styles.cardImg} ${index === 0 ? styles.firstCardImg : index === 1 ? styles.secondCardImg : index === 2 ? styles.thirdCardImg : styles.fourthCardImg}`}
										src={featuredMediaUrl}
										alt={t('Світлина новини')}
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
											<TranslatedContent en={post.title_en} uk={post.title_uk} maxLength={50} />
										</h3>
									</div>
									<div className={`${styles.cardDescriptioneWrapper}`}>
										<p
											className={`${styles.cardDescription} ${index === 0 ? styles.firstCardDescription : index === 1 ? styles.secondCardDescription : styles.thirdCardDescription}`}
										>
											<TranslatedContent en={post.content_en} uk={post.content_uk} maxLength={100} />
										</p>
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
										<p className={`${styles.cardDate}`}>{formattedDate}</p>
									</div>
									<div className={`${styles.cardTimeWrapper}`}>
										<p className={`${styles.cardTime}`}>{formattedTime}</p>
									</div>
									<div className={`${styles.cardReadMoreWrapper}`}>
										<a
											href={`/posts/${post.id}`}
											className={`${styles.cardReadMoreLink}`}
										>
											{t('Читати далі')}
										</a>
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
				<button
					className={`${styles.mainPageNewsButton}`}
					onClick={handleNewsPageClick}
				>
					<p className={`${styles.mainPageNewsButtonTitle}`}>
						{t('Усі новини')}
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

export default MainNews
