import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '@components/Blocks/Loading'
import LoadingError from '@components/Blocks/LoadingError'
import layoutStyles from '@styles/layout/Layout.module.scss'

function ArtTermPage() {
	const { t } = useTranslation()
	const { id } = useParams()

	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [artTerm, setArtTerm] = useState(null)
	useEffect(() => {
		const fetchCreator = async () => {
			try {
				setLoading(true)
				const response = await axios.get('/api/art-terms/' + id)
				setArtTerm(response.data.artTerm)
				setLoading(false)
				setError(false)
			} catch (error) {
				console.error('Error fetching art term data', error)
				setLoading(false)
				setError(true)
			}
		}

		fetchCreator()
	}, [id])

	return (
		<div className={`${layoutStyles.PageContainer}`}>
			<div className={`${layoutStyles.PageTitleWrapper}`}>
				<h2 className={`${layoutStyles.PageTitle}`}>{t('Арт-термін')}</h2>
			</div>

			<div className={`${layoutStyles.PageSeparatorWrapper}`}>
				<div className={`${layoutStyles.PageSeparator}`}></div>
			</div>
			<div className={`${layoutStyles.DescriptionWrapper}`}>
				{loading ? <Loading /> : error ? <LoadingError />
					: <div>Art term {artTerm}</div>}
			</div>
		</div>
	)
}

export default ArtTermPage
