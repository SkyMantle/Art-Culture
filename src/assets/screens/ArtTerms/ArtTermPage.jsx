import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '@components/Blocks/Loading'
import LoadingError from '@components/Blocks/LoadingError'
import layoutStyles from '@styles/layout/Layout.module.scss'

function ArtTermPage() {
	const { i18n } = useTranslation()
	const { id } = useParams()

	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [artTerm, setArtTerm] = useState({})
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

	const title = () => i18n.language == "en" ? artTerm.title_en : artTerm.title_uk;
	const description = () => i18n.language == "en" ? artTerm.description_en : artTerm.description_uk;
	const content = () => i18n.language == "en" ? artTerm.content_en : artTerm.content_uk;
	return (
		loading ? <Loading /> : error ? <LoadingError />
			: <div className={`${layoutStyles.PageContainer}`}>
			<div className={`${layoutStyles.PageTitleWrapper}`}>
				<h2 className={`${layoutStyles.PageTitle}`}>{title()}</h2>
			</div>

			<div className={`${layoutStyles.PageSeparatorWrapper}`}>
				<div className={`${layoutStyles.PageSeparator}`}></div>
			</div>

			<div className={`${layoutStyles.DescriptionWrapper}`}>
				<p className={`${layoutStyles.Description}`}>
					{description()}
				</p>
			</div>

			<div className={`${layoutStyles.DescriptionWrapper}`}>
				<div>{content()}</div>
			</div>
		</div>
	)
}

export default ArtTermPage
