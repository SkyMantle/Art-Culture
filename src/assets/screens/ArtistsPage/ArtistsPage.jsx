import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArtistsPageNewsArtistsSlider from '../../components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.jsx'
import PopularArtsSlider from '../../components/Sliders/ArtistsPageSliders/PopularArtsSlider.jsx'
// import MainPopularArtsSlider from '../../components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/layout/ArtistsPage.module.scss'
import { getImageUrl } from '../../../utils/helper.js'

function ArtistsPage() {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language

	const [creators, setCreators] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [visibleCreatorsCount, setVisibleCreatorsCount] = useState(
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
			if (newPostCount !== visibleCreatorsCount) {
				setVisibleCreatorsCount(newPostCount)
				console.log(`Updated visiblePostsCount to: ${newPostCount}`)
			}
		}

		window.addEventListener('resize', handleResize)

		// Initial check
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [visibleCreatorsCount])
	useEffect(() => {
		const fetchCreator = async () => {
			try {
				const response = await axios.get('/api/users/creators')
				console.log('received author data', response.data)
				setCreators(response.data.creators)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching author data', error)
				setLoading(false)
			}
		}

		fetchCreator()
	}, [])

	const handleAuthorPreviewClick = id => {
		navigate(`/artist/${id}`)
	}

	return (
		<div className={`${styles.ArtistsPageContainer}`}>
			<div className={`${styles.ArtistsPageTitleWrapper}`}>
				<h2 className={`${styles.ArtistsPageTitle}`}>{t('Митці')}</h2>
			</div>

			<div className={`${styles.ArtistsPageSeparatorWrapper}`}>
				<div className={`${styles.ArtistsPageSeparator}`}></div>
			</div>

			<div className={`${styles.ArtistsPageSubTitleWrapper}`}>
				<p className={`${styles.ArtistsPageSubTitle}`}>
					{t('Слідкуйте за мистецтвом!')}
				</p>
			</div>

			<div className={`${styles.ArtistsPageArtistsDescriptionWrapper}`}>
				<p className={`${styles.ArtistsPageArtistsFirstDescription}`}>
					{t(
						'Отримуйте запрошення на перегляди виставок та будьте серед перших, хто дізнається про нагороди, призи, книги та виставки в публічних і комерційних галереях.'
					)}
				</p>

				<p className={`${styles.ArtistsPageArtistsSecondDescription}`}>
					{t('Просто шукайте поля для підписки')}&#8194;&#34;
					{t('СЛІДКУВАТИ ЗА ЦИМ МИТЦЕМ')}&#34;&#8194;
					{t(
						'у нижній частині новинних статей Art & Culture Online, профілів митців та попередніх переглядів виставок, або переглядайте сторінки митців нижче.'
					)}
				</p>
			</div>

			<div className={`${styles.ArtistsPageArtistsSearchWrapper}`}>
				<input
					className={`${styles.ArtistsPageArtistsSearchInput}`}
					placeholder={t('Пошук митця')}
				/>
			</div>

			<ArtistsPageNewsArtistsSlider />

			<div className={`${styles.ArtistsPageGalleryContainer}`}>
				<div className={`${styles.ArtistsPageGalleryTitleWrapper}`}>
					<h3 className={`${styles.ArtistsPageGalleryTitle}`}>
						{t('Перегляд.')} &#8243;{t('Митці')}&#8243;
					</h3>
				</div>

				<div className={`${styles.ArtistsPageGalleryButtonsWrapper}`}>
					<button className={`${styles.ArtistsPageGalleryButton}`}>
						<p className={`${styles.ArtistsPageGalleryButtonTitle}`}>
							{t('Усі')}
						</p>
					</button>

					<p className={`${styles.ArtistsPageGalleryButtonSeparator}`}>|</p>

					<button className={`${styles.ArtistsPageGalleryButton}`}>
						<p className={`${styles.ArtistsPageGalleryButtonTitle}`}>
							{t('А-Я')}
						</p>
					</button>

					<p className={`${styles.ArtistsPageGalleryButtonSeparator}`}>|</p>

					<button className={`${styles.ArtistsPageGalleryButtonWhithClock}`}>
						<p className={`${styles.ArtistsPageGalleryButtonTitle}`}>
							{t('Час')}
						</p>

						<img
							className={`${styles.ArtistsPageGalleryButtonClock}`}
							src={'/Img/clock.svg'}
							alt='Слідкуйте за мистецтвом!'
							onError={e => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</button>
				</div>

				<div className={`${styles.ArtistsPageGalleryCardsWrapper}`}>
					{loading ? (
						<div className={styles.loading}>{t('Завантаження...')}</div>
					) : error ? (
						<div className={styles.error}>{error}</div>
					) : creators.length === 0 ? (
						<div className={styles.noCreators}>
							{t('Немає митців для відображення.')}
						</div>
					) : (
						creators.slice(0, visibleCreatorsCount).map(creator => {
							const featuredMediaUrl = getImageUrl(creator.images, '/Img/ArtistPhoto.jpg')
							return (
								<div key={creator.id} className={`${styles.ArtistsPageGalleryInnerWrapper}`}>
									<div className={`${styles.ArtistsPageGalleryCardWrapper}`}>
										<div
											className={`${styles.ArtistsPageGalleryCardPictureWrapper}`}
											onClick={() => handleAuthorPreviewClick(creator.id)}
											style={{ cursor: 'pointer' }}
										>
											<img
												className={`${styles.ArtistsPageGalleryCardPicture}`}
												src={featuredMediaUrl}
												alt='Слідкуйте за мистецтвом!'
												loading='lazy'
												onError={e => {
													e.target.onerror = null
													e.target.src = '/Img/ArtistPhoto.jpg'
												}}
											/>
										</div>

										<div
											className={`${styles.ArtistsPageGalleryCardDescriptionWrapper}`}
										>
											<p
												className={`${styles.ArtistsPageGalleryCardDescription}`}
											>
												{creator.title}
											</p>
										</div>
									</div>
								</div>
							)
						})
					)}
				</div>

				<div className={`${styles.ArtistsPageGalleryAllArtistsButtonWrapper}`}>
					<button className={`${styles.ArtistsPageGalleryAllArtistsButton}`}>
						{/* TODO: write page for all artists              */}
						<p className={`${styles.ArtistsPageGalleryAllArtistsButtonText}`}>
							{t('Всі митці')}
						</p>

						<img
							className={`${styles.ArtistsPageGalleryAllArtistsButtonArrow}`}
							src={'/Img/buttonArrow.svg'}
							alt='Слідкуйте за мистецтвом!'
							onError={e => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</button>
				</div>
			</div>

			<PopularArtsSlider />
		</div>
	)
}

export default ArtistsPage
