import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styles from '../../../styles/layout/ArtistPage.module.scss'
import ArtistPageMasonryGallery from '../../components/Sliders/ArtistPageSliders/ArtistPageMasonryGallery.jsx'
import ArtistPageNewsArtistsSlider from '../../components/Sliders/ArtistPageSliders/ArtistPageNewsArtistsSlider.jsx'
import PopularOfThisArtistSlider from '../../components/Sliders/ArtistPageSliders/PopularOfThisArtistSlider.jsx'
import MainPopularArtsSlider from '../../components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.jsx'
import { getBaseUrl, getImageUrl } from '../../../utils/helper.js'

function ArtistPage() {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language
	const { id } = useParams()
	const baseUrl = getBaseUrl()

	const [creator, setCreator] = useState(null)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchCreatorAndProduct = async () => {
			try {
				const response = await axios.get(`/api/users/creators/${id}`)
				console.log('Fetched creator', response.data)
				setCreator(response.data.creator)
				// Fetch creator's products
				const productsResponse = await axios.get(`/api/products/author/${id}`)
				console.log('Fetched products:', productsResponse.data)
				setProducts(productsResponse.data.products)

				setLoading(false)
			} catch (error) {
				console.error('Error fetch creator', error)
				setError(t('Не вдалося завантажити дані митця.'))
				setLoading(false)
			}
		}

		fetchCreatorAndProduct()
	}, [id, t])

	if (loading) {
		return <div className={styles.loading}>{t('Завантаження...')}</div>
	}

	if (error) {
		return <div className={styles.error}>{error}</div>
	}

	if (!creator) {
		return <div className={styles.noCreator}>{t('Митець не знайдений.')}</div>
	}

	// Extract data based on current language
	const title =
		currentLanguage === 'en'
			? creator.title_en || creator.title
			: creator.title_uk || creator.title
	const bio =
		currentLanguage === 'en'
			? creator.bio_en || creator.bio
			: creator.bio_uk || creator.bio
	const images = getImageUrl(creator.images, '/Img/defaultArtistPhoto.jpg')

	return (
		<div className={`${styles.artistPage}`}>
			<div className={`${styles.artistPageNavigationContainer}`}>
				<nav className={`${styles.artistPageNavigation}`}>
					<ul className={`${styles.artistPageNavigationList}`}>
						<li className={`${styles.artistPageNavigationItem}`}>
							{t('Митці')}
						</li>
						<p className={`${styles.artistPageNavigationItemSeparator}`}>
							&#8250;
						</p>
						<li className={`${styles.artistPageNavigationItem}`}>{title}</li>
					</ul>
				</nav>
			</div>

			<div className={`${styles.artistPageAboutArtistContainer}`}>
				<div
					className={`${styles.artistPageArtisPhotoWhithDescriptionWrapper}`}
				>
					<div className={`${styles.artistPageArtistPhotoWrapper}`}>
						<img
							className={`${styles.artistPageArtistPhoto}`}
							loading='lazy'
							src={images}
							alt={t('Фото митця')}
							onError={e => {
								e.target.onerror = null
								e.target.src = '/public/Img/newsCardERROR.jpg'
							}}
						/>
					</div>
				</div>

				<div className={`${styles.artistPageArtisNameWrapper}`}>
					<p className={`${styles.artistPageArtisName}`}>{title}</p>
				</div>

				<div className={`${styles.artistPageArtisSeparatorWrapper}`}>
					<div className={`${styles.artistPageArtisSeparator}`}></div>
				</div>

				<div className={`${styles.artistPageArtisDescriptionWrapper}`}>
					<p className={`${styles.artistPageArtisDescription}`}>{bio}</p>
				</div>

				<div className={`${styles.artistPageArtisReadMoreButtonWrapper}`}>
					<button className={`${styles.artistPageArtisReadMoreButton}`}>
						<p className={`${styles.artistPageArtisReadMoreButtonText}`}>
							{t('Детальніше')}
						</p>
						<p className={`${styles.artistPageArtisReadMoreButtonArrow}`}>
							&#160;&#10230;
						</p>
					</button>
				</div>
			</div>

			<ArtistPageNewsArtistsSlider />

			<PopularOfThisArtistSlider products={products} baseUrl={baseUrl} />

			<ArtistPageMasonryGallery
				products={products}
				baseUrl={baseUrl}
				creator={creator}
			/>

			<div className={`${styles.artistPageFollowContainer}`}>
				<p className={`${styles.artistPageFollowTitle}`}>
					{t('Стежити за цим митцем')}
				</p>
				<div className={`${styles.artistPageFollowEmailWrapper}`}>
					<input
						type='email'
						className={`${styles.artistPageFollowEmail}`}
						placeholder={t('Введіть ваш email')}
					/>
					<button className={`${styles.artistPageFollowButton}`}>
						{t('Зареєструватися')}
					</button>
				</div>
			</div>

			<MainPopularArtsSlider />
		</div>
	)
}

export default ArtistPage
