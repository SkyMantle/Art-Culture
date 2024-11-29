import { useTranslation } from 'react-i18next'
import styles from "@styles/components/Blocks/LoadingError.module.scss"

function LoadingError() {
	const { t } = useTranslation()

	return (
		<div className={styles.error}>{t("Неможливо завантажити дані")}</div>
	)
}

export default LoadingError
