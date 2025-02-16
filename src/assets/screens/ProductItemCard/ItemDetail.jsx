import TranslatedContent from '@components/Blocks/TranslatedContent'
import styles from '@styles/components/ProductItemCard/ItemDetail.module.scss'
import { useTranslation } from 'react-i18next'

function ItemDetail() {
	const { t } = useTranslation()

	return (
		<div className={styles.ItemDetailContainer}>
			<div className={`${styles.ItemPageNavigationContainer}`}>
				<nav className={`${styles.ItemPageNavigation}`}>
					<ul className={`${styles.ItemPageNavigationList}`}>
						<li
							className={`${styles.ItemPageNavigationItem}`}
						>
							{t('Митці')}
						</li>
						<p
							className={`${styles.ItemPageNavigationItemSeparator}`}
						>
							&#8250;
						</p>
						<li className={`${styles.ItemPageNavigationItem}`}>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default ItemDetail
