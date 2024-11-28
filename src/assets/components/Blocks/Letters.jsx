import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from "../../../styles/components/Blocks/Letters.module.scss"

function Letters() {
	const { i18n } = useTranslation()

	const letters = i18n.language == "en" 
		? ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '0-9']
		: ['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я', '0-9']
	console.log(letters);
	return (
		<div>
			{letters.map(letter => {
				return <span className={styles.letter} key={letter}>{letter}</span>
			})}
		</div>
	)
}

export default Letters