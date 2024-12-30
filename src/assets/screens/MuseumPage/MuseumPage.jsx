import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '@styles/layout/MuseumPage.module.scss'
import { getBaseUrl, getImageUrl } from '../../../utils/helper.js'
import MuseumMaps from '@components/Blocks/MuseumMaps'
import MuseumPageMasonryGallery from '@components/Sliders/MuseumPageSliders/MuseumPageMasonryGallery.jsx'
function MuseumPage() {
	const { t } = useTranslation()
	const { id } = useParams()
	const BaseUrl = getBaseUrl()
	const [isExpanded, setIsExpanded] = useState(false)

	const [museum, setMuseum] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchMuseum = async () => {
			try {
				const response = await axios.get(`/api/users/museums/${id}`)
				console.log('Fetched museum', response.data)
				setMuseum(response.data.museum)
				setLoading(false)
			} catch (error) {
				console.error('Error fetch museum', error)
				setError(t('Не вдалося завантажити дані митця.'))
				setLoading(false)
			}
		}
		fetchMuseum()
	}, [id, t])

	if (loading) {
		return <div className={styles.loading}>{t('Завантаження...')}</div>
	}

	if (error) {
		return <div className={styles.error}>{error}</div>
	}

	if (!museum) {
		return (
			<div className={styles.noCreator}>{t('Музей не знайдений.')}</div>
		)
	}
	const images = getImageUrl(museum.images, '/Img/newsCardERROR.jpg')

	const museumLogo = museum.museum_logo_image?.imageUrl
		? getImageUrl(
				museum.museum_logo_image.imageUrl,
				'/Img/logoMuseum_3.png',
			)
		: '/Img/logoMuseum_3.png' // Fallback logo
	const toggleText = () => {
		setIsExpanded((prevState) => !prevState)
	}

	const handleMainPageClick = () => {
		navigate('/MainPage')
	}

	const handleMuseumsPage = () => {
		navigate('/MuseumsPage')
	}

	return (
		<div className={`${styles.museumPage}`}>
			<div className={`${styles.museumPageNavigationContainer}`}>
				<nav className={`${styles.museumPageNavigation}`}>
					<ul className={`${styles.museumPageNavigationList}`}>
						<li
							className={`${styles.museumPageNavigationItem}`}
							onClick={handleMuseumsPage}
						>
							{t('Музеи')}
						</li>
						<p
							className={`${styles.museumPageNavigationItemSeparator}`}
						>
							&#8250;
						</p>
						<li className={`${styles.museumPageNavigationItem}`}>
							{museum.title}
						</li>
					</ul>
				</nav>
			</div>

			<div className={`${styles.museumPageAboutMuseumContainer}`}>
				<div className={`${styles.museumPageMuseumPhotoWrapper}`}>
					<img
						className={`${styles.museumPageMuseumPhoto}`}
						src={images}
						alt={t('Фото музея')}
						onError={(e) => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</div>

				<div
					className={`${styles.museumPageMuseumTopLogoWhithAdressWrapper}`}
				>
					<div className={`${styles.museumPageMuseumLogoWrapper}`}>
						<img
							className={`${styles.museumPageMuseumLogo}`}
							src={museumLogo}
							alt={t('Логотип музея')}
							onError={(e) => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</div>

					<div className={`${styles.museumPageTopAdressWrapper}`}>
						<div
							className={`${styles.museumPageMuseumTitleWrapper}`}
						>
							<p className={`${styles.museumPageMuseumTitle}`}>
								{museum.title}
							</p>
						</div>

						<div
							className={`${styles.museumPageMuseumTopLocationWrapper}`}
						>
							<p
								className={`${styles.museumPageMuseumLocationCity}`}
							>
								{museum.city}
							</p>
							<p>&#44;&#160;</p>
							<p
								className={`${styles.museumPageMuseumLocationCountry}`}
							>
								{museum.country}
							</p>
						</div>
					</div>
				</div>

				<div
					className={`${styles.museumPageMuseumDescriptionWrapper} ${isExpanded ? styles.expanded : ''}`}
				>
					<p
						className={`${styles.museumPageMuseumDescription}`}
						dangerouslySetInnerHTML={{ __html: museum.bio }}
					></p>
				</div>

				<button
					className={`${styles.museumPageMuseumDescriptionButton}`}
					onClick={toggleText}
				>
					{isExpanded ? t('Згорнути текст') : t('Читати далі')}
				</button>
			</div>

			<MuseumPageMasonryGallery />

			<div className={`${styles.underDevelopmentContainer}`}>
				<MuseumMaps museum={museum} />
			</div>

			<div
				className={`${styles.museumPageMuseumBottomLogoWhithAdressWrapper}`}
			>
				<div className={`${styles.museumPageищеещьAdressWrapper}`}>
					<div className={`${styles.museumPageMuseumLogoWrapper}`}>
						<img
							className={`${styles.museumPageMuseumLogo}`}
							src={museumLogo}
							alt={t('Логотип музея')}
							onError={(e) => {
								e.target.onerror = null
								e.target.src = '/Img/newsCardERROR.jpg'
							}}
						/>
					</div>

					<div className={`${styles.museumPageMuseumTitleWrapper}`}>
						<p className={`${styles.museumPageMuseumTitle}`}>
							{museum.title}
						</p>
					</div>

					<div
						className={`${styles.museumPageMuseumBottomLocationWrapper}`}
					>
						<p
							className={`${styles.museumPageMuseumLocationStreet}`}
						>
							{museum.street} {','} {museum.house_number}
						</p>
						<p className={`${styles.museumPageMuseumLocationCity}`}>
							{museum.city}
						</p>
						<p
							className={`${styles.museumPageMuseumLocationCountry}`}
						>
							{museum.country}
						</p>
						<p
							className={`${styles.museumPageMuseumLocationIndex}`}
						>
							{museum.postcode}
						</p>
					</div>

					<div
						className={`${styles.museumPageMuseumToTheSiteButtonWrapper}`}
					>
						<button
							className={`${styles.museumPageMuseumToTheSiteButton}`}
							onClick={handleMainPageClick}
						>
							{t('Перейти до сайту')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MuseumPage
