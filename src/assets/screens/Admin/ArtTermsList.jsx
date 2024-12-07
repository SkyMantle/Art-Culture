import { useTranslation } from 'react-i18next'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'

const AdminArtTermsList = () => {
	const { t } = useTranslation()

	return (
		<ProfilePageContainer>
			<div>
				<h2>{t('Список термінів')}</h2>
			</div>
		</ProfilePageContainer>
	)
}

export default AdminArtTermsList
