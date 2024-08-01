import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/Blocks/MainNews.module.scss'

function MainMuseums() {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [media, setMedia] = useState({})
	const [visiblePostsCount, setVisiblePostsCount] = useState(
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
			.get('https://zimbabaluba.pp.ua/wp-json/wp/v2/posts?categories=5&_embed')
			.then(response => {
				console.log('Отримані дані постів:', response.data)
				setPosts(response.data)
			})
			.catch(error => {
				console.error('Помилка при завантаженні постів', error)
			})

		// Запит на отримання медіа
		axios
			.get('https://zimbabaluba.pp.ua/wp-json/wp/v2/media')
			.then(response => {
				const mediaMap = response.data.reduce((acc, mediaItem) => {
					acc[mediaItem.id] = mediaItem.source_url
					return acc
				}, {})
				console.log('Отримані медіа-дані:', mediaMap)
				setMedia(mediaMap)
			})
			.catch(error => {
				console.error('Помилка при завантаженні медіа', error)
			})
	}, [])

	return (
		<div className={`${styles.mainPageNewsContainer}`}>
			<div className={`${styles.mainPageNewsTitleWithButton}`}>
				<h3 className={`${styles.mainPageNewsTitle}`}>{t('Музеї')}</h3>
				<div
					className={`${styles.mainPageNewsButtonWrapper} ${styles.desktopButtonWrapper}`}
				>
					<button className={`${styles.mainPageNewsButton}`}>
						<p className={`${styles.mainPageNewsButtonTitle}`}>
							{t('Усі музеї')}
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

					const featuredMediaId = post.featured_media
					const featuredMediaUrl =
						media[featuredMediaId] || '/Img/halfNewsCard.jpg'

					console.log('Витягнуте медіа:', featuredMediaUrl)

					const postDate = new Date(post.date)
					const formattedDate = postDate.toLocaleDateString('uk-UA', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})
					const formattedTime = postDate.toLocaleTimeString('uk-UA', {
						hour: 'numeric',
						minute: 'numeric',
					})

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
										alt={t('Світлина музею')}
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
											dangerouslySetInnerHTML={{ __html: post.title.rendered }}
										/>
									</div>
									<div className={`${styles.cardDescriptioneWrapper}`}>
										<p
											className={`${styles.cardDescription} ${index === 0 ? styles.firstCardDescription : index === 1 ? styles.secondCardDescription : styles.thirdCardDescription}`}
											dangerouslySetInnerHTML={{
												__html: post.excerpt.rendered,
											}}
										/>
									</div>
									<div className={`${styles.cardReadMoreWrapper}`}>
										<a
											href={post.link}
											className={`${styles.cardReadMoreLink}`}
										>
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
										<p className={`${styles.cardDate}`}>{formattedDate}</p>
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
						{t('Усі музеї')}
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

export default MainMuseums
