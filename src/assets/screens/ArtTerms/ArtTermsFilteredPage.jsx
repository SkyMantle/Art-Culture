import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import Letters from '@components/Blocks/Letters'
import layoutStyles from '@styles/layout/Layout.module.scss'

function ArtTermsFilteredPage() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { letter } = useParams()
	return (
		<div className={`${layoutStyles.PageContainer}`}>
			<div className={`${layoutStyles.PageTitleWrapper}`}>
				<h2 className={`${layoutStyles.PageTitle}`}>{t('Арт-терміни')}</h2>
			</div>

			<div className={`${layoutStyles.PageSeparatorWrapper}`}>
				<div className={`${layoutStyles.PageSeparator}`}></div>
			</div>

			<div className={`${layoutStyles.DescriptionWrapper}`}>
				<Letters selected={letter} onLetterSelected={(letter) => navigate(`/art-terms/${letter}`)} />
			</div>

		</div>
	)
}

export default ArtTermsFilteredPage
