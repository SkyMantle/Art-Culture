import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '@styles/screen/Admin/AdminDashboard.module.scss'

const AdminDashboard = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	return (
		<div className={styles.adminDashboard}>
			<h2>{t('Панель керування')}</h2>
			{/* Admin functionalities like managing users, posts, etc. */}
			<button onClick={() => navigate('/admin/users')}>
				{t('Manage Users')}
			</button>
			<button onClick={() => navigate('/admin/posts')}>
				{t('Manage Posts')}
			</button>
			<button onClick={() => navigate('/admin/artterms')}>
				{t('Керування термінами')}
			</button>
		</div>
	)
}

export default AdminDashboard
