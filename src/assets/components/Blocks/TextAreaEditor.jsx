import { forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import ReactQuill from "react-quill"
import "quill/dist/quill.snow.css"
import styles from "@styles/components/Blocks/TextEditor.module.scss"

const TextAreaEditor = forwardRef(({ className, name, label, value, maxLength, onChange, placeholder, required }, ref) => {
	const { t } = useTranslation()
	const [remaining, setRemaining] = useState(maxLength - (value ?? "").length)
	const handleChange = (e) => {
		if (e.target.value.length > maxLength) {
			return; // Блокируем изменение, если больше maxLength символов
		}

		setRemaining(maxLength - e.length);
		onChange({ name, value: e });
	};
	return (
		<>
		<label className={`${styles.profileAddPostLabel} ${className ? className : ''}`}>
			{label}
		</label>
		<ReactQuill theme="snow" value={value} onChange={handleChange} modules={{ toolbar: false }} />
		<small className={styles.remainingChars}>
			{remaining} {t('символів залишилось')}
		</small>
		</>
	)
})
TextAreaEditor.displayName = "TextAreaEditor"

TextAreaEditor.propTypes = {
    maxLength: PropTypes.number,
	className: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
};

export default TextAreaEditor
