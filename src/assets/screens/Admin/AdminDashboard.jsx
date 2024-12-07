import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProfilePageContainer from '@components/Blocks/ProfilePageContainer'

const AdminDashboard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	return (
		<ProfilePageContainer>
			<div>
				<h2>{t('Панель керування')}</h2>
				{/* Admin functionalities like managing users, posts, etc. */}
				<button onClick={() => navigate('/admin/users')} className="button button-default">
					{t('Manage Users')}
				</button>
				<button onClick={() => navigate('/admin/posts')} className="button button-default">
					{t('Manage Posts')}
				</button>
				<button onClick={() => navigate('/admin/art-terms')} className="button button-default">
					{t('Керування термінами')}
				</button>
			</div>
		</ProfilePageContainer>
	)
}

export default AdminDashboard
