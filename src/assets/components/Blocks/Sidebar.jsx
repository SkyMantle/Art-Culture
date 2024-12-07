import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext.jsx'
import styles from "@styles/components/Blocks/Sidebar.module.scss"

function Sidebar() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user, logout } = useAuth()
	const isUser = user && user.role === 'USER'
	const isEditor = user && user.role === 'EDITOR'
	const isMuseum = user && user.role === 'MUSEUM'
	const isAdmin = user && user.role === 'ADMIN'
	const isCreator = user && user.role === 'CREATOR'

	const handleProfilePageClick = () => {
		navigate('/userProfile')
	}

	const handlePostsClick = () => {
		navigate('/userProfilePosts')
	}

	const handleAddPostClick = () => {
		navigate('/userProfileAddPost')
	}

	const handleProductCartCreateClick = () => {
		navigate('/ProductCardCreate')
	}

	const handlePaintingCardListClick = () => {
		navigate('/Paintings')
	}

	const handleExhibitionCardCreateClick = () => {
		navigate('/exhibitions/create')
	}

	const handleExhibitionListClick = () => {
		navigate('/Exhibitions')
	}

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<div className={styles.profileActions}>
			<button
				className={`${styles.profileAction} ${styles.profileActionActive}`}
				onClick={handleProfilePageClick}
			>
				{t('Профіль')}
			</button>
			{isAdmin && (
				<>
					<button
						className={`${styles.profileAction} ${styles.profileActionActive}`}
						onClick={() => navigate('/admin/dashboard')}
					>
						{t('Адміністрація')}
					</button>
				</>
			)}
			{(isCreator || isEditor || isAdmin) && (
				<>
					<button
						className={styles.profileAction}
						onClick={handleAddPostClick}
					>
						{t('Додати публікацію')}
					</button>
					<button className={styles.profileAction} onClick={handlePostsClick}>
						{t('Публікації')}
					</button>
					<button
						className={styles.profileAction}
						onClick={handleProductCartCreateClick}
					>
						{t('Додати картину')}
					</button>
					<button
						className={styles.profileAction}
						onClick={handlePaintingCardListClick}
					>
						{t('Переглянути вироби/картини')}
					</button>
				</>
			)}
			{isMuseum && (
				<>
					<button
						className={styles.profileAction}
						onClick={handleExhibitionCardCreateClick}
					>
						{t('Додати виставку')}
					</button>
					<button
						className={styles.profileAction}
						onClick={handleExhibitionListClick}
					>
						{t('Переглянути виставки')}
					</button>
				</>
			)}
			<button className={styles.profileAction} onClick={handleLogout}>
				{t('Вийти')}
			</button>
		</div>
	)
}

export default Sidebar
