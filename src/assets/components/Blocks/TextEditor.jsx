import { useState } from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import styles from "@styles/components/Blocks/TextEditor.module.scss"

function TextEditor({ className, type, name, label, value, maxLength, onChange, placeholder, required }) {
	const { t } = useTranslation()
	const [remaining, setRemaining] = useState(maxLength - (value ?? "").length)
	const handleChange = (e) => {
		if (e.target.value.length > maxLength) {
			return; // Блокируем изменение, если больше maxLength символов
		}

		setRemaining(maxLength - e.target.value.length);
		onChange({ name, value: e.target.value });
	};
		
	return (
		<>
		<label className={`${styles.profileAddPostLabel} ${className ? className : ''}`}>
			<span>{label} {required ? <span className="required-field">*</span> : null}</span>
			<input
				type={type ?? "text"}
				name={name}
				value={value}
				onChange={handleChange}
				maxLength={maxLength}
				className={styles.profileAddPostInput}
				placeholder={placeholder}
				required={required}
			/>
		</label>
		<small className={styles.remainingChars}>
			{remaining} {t('символів залишилось')}
		</small>
		</>
	)
}

TextEditor.propTypes = {
    maxLength: PropTypes.number,
	className: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
};

export default TextEditor
