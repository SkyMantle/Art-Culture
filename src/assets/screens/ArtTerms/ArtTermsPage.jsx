import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArtistsPageNewsArtistsSlider from '../../components/Sliders/ArtistsPageSliders/ArtistsPageNewsArtistsSlider.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import layoutStyles from '../../../styles/layout/Layout.module.scss'

function ArtTermsPage() {
	const { t } = useTranslation()
	const host = window.location.hostname
	const isLocalhost = host === 'localhost' || host === '127.0.0.1'
	const baseUrl = isLocalhost
		? 'http://localhost:5000'
		: 'https://art.playukraine.com'

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
			if (newPostCount !== visibleCreatorsCount) {
				setVisibleCreatorsCount(newPostCount)
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

	return (
		<div className={`${layoutStyles.PageContainer}`}>
			<div className={`${layoutStyles.PageTitleWrapper}`}>
				<h2 className={`${layoutStyles.PageTitle}`}>{t('Арт-терміни')}</h2>
			</div>

			<div className={`${layoutStyles.PageSeparatorWrapper}`}>
				<div className={`${layoutStyles.PageSeparator}`}></div>
			</div>

			<div className={`${layoutStyles.DescriptionWrapper}`}>
				<p className={`${layoutStyles.Description}`}>
					{t('Арт-терміни-інформація')}
				</p>
			</div>
		</div>
	)
}

export default ArtTermsPage
