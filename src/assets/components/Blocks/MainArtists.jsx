import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '/src/styles/components/Blocks/MainNews.module.scss' // Assuming you have a CSS module for styling

function MainArtists() {
	const { t } = useTranslation()
	const [posts, setPosts] = useState([])
	const [media, setMedia] = useState({})
	const [visiblePostsCount, setVisiblePostsCount] = useState(
		getPostsCount(window.innerWidth)
	)

	function getPostsCount(width) {
		if (width === null || width === undefined) {
			throw new Error('Width must be a number')
		}
		if (width >= 1920) {
			return 4
		}
		if (width >= 1600 && width < 1920) {
			return 3
		}
		if (width > 1440 && width < 1600) {
			return 2
		}
		if (width <= 1440) {
			return 2
		}
	}

	useEffect(() => {
		const handleResize = () => {
			const newPostCount = getPostsCount(window.innerWidth)
			console.log(
				`Window width: ${window.innerWidth}, New post count: ${newPostCount}`
			)
			if (newPostCount !== visiblePostsCount) {
				setVisiblePostsCount(newPostCount)
				console.log(`Updated visiblePostsCount to: ${newPostCount}`)
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
		axios
			.get('https://zimbabaluba.pp.ua/wp-json/wp/v2/posts?categories=4&_embed')
			.then(response => {
				console.log('Received post data:', response.data)
				setPosts(response.data)
			})
			.catch(error => {
				console.error('Error loading posts', error)
			})

		axios
			.get('https://zimbabaluba.pp.ua/wp-json/wp/v2/media')
			.then(response => {
				const mediaMap = response.data.reduce((acc, mediaItem) => {
					acc[mediaItem.id] = mediaItem.source_url
					return acc
				}, {})
				console.log('Received media data:', mediaMap)
				setMedia(mediaMap)
			})
			.catch(error => {
				console.error('Error loading media', error)
			})
	}, [])

	return (
		<div className={styles.mainPageNewsContainer}>
			<div className={styles.mainPageNewsTitleWithButton}>
				<h3 className={styles.mainPageNewsTitle}>{t('Митці')}</h3>
				<div
					className={`${styles.mainPageNewsButtonWrapper} ${styles.desktopButtonWrapper}`}
				>
					<button className={styles.mainPageNewsButton}>
						<p className={styles.mainPageNewsButtonTitle}>{t('Усі митці')}</p>
						<img
							className={styles.mainPageNewsButtonImg}
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
			<div className={styles.mainPageNewsCardsWrapper}>
				{posts.slice(0, visiblePostsCount).map((post, index) => {
					const featuredMediaId = post.featured_media
					const featuredMediaUrl =
						media[featuredMediaId] || '/Img/halfNewsCard.jpg'

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
							<div className={styles.cardInner}>
								<div className={styles.cardImgWrapper}>
									<img
										className={`${styles.cardImg} ${index === 0 ? styles.firstCardImg : index === 1 ? styles.secondCardImg : index === 2 ? styles.thirdCardImg : styles.fourthCardImg}`}
										src={featuredMediaUrl}
										alt={t('Світлина')}
										onError={e => {
											e.target.onerror = null
											e.target.src = '/Img/newsCardERROR.jpg'
										}}
									/>
								</div>
								<div className={styles.cardTextWrapper}>
									<div className={styles.cardTitleWrapper}>
										<h3
											className={`${styles.cardTitle} ${index === 0 ? styles.firstCardTitle : index === 1 ? styles.secondCardTitle : index === 2 ? styles.thirdCardTitle : styles.fourthCardTitle}`}
											dangerouslySetInnerHTML={{ __html: post.title.rendered }}
										/>
									</div>
									<div className={styles.cardDescriptioneWrapper}>
										<p
											className={`${styles.cardDescription} ${index === 0 ? styles.firstCardDescription : index === 1 ? styles.secondCardDescription : styles.thirdCardDescription}`}
											dangerouslySetInnerHTML={{
												__html: post.excerpt.rendered,
											}}
										/>
									</div>
									<div className={styles.cardReadMoreWrapper}>
										<a href={post.link} className={styles.cardReadMoreLink}>
											{t('Читати далі')}
										</a>
									</div>
								</div>
							</div>
							<div className={styles.cardClockAndDateWrapper}>
								<div className={styles.cardClockAndDateInner}>
									<div className={styles.cardClockImgWrapper}>
										<img
											className={styles.cardClockImg}
											src={'/Img/clock.svg'}
											alt={t('Світлина годинника')}
											onError={e => {
												e.target.onerror = null
												e.target.src = '/Img/clock.svg'
											}}
										/>
									</div>
									<div className={styles.cardDateWrapper}>
										<p className={styles.cardDate}>{formattedDate}</p>
									</div>
									<div className={styles.cardTimeWrapper}>
										<p className={styles.cardTime}>{formattedTime}</p>
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
				<button className={styles.mainPageNewsButton}>
					<p className={styles.mainPageNewsButtonTitle}>{t('Усі митці')}</p>
					<img
						className={styles.mainPageNewsButtonImg}
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

export default MainArtists
