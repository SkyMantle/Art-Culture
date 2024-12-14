import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import styles from '@styles/components/Blocks/TextEditor.module.scss'

function TextAreaEditor({
	className,
	name,
	label,
	value,
	maxLength,
	onChange,
	placeholder,
	required,
	html,
}) {
	const { t } = useTranslation()
	const [remaining, setRemaining] = useState(maxLength - (value ?? '').length)
	const handleQuillChange = (html) => {
		if (html.length > maxLength) {
			return // Блокируем изменение, если больше maxLength символов
		}

		setRemaining(maxLength - html.length)
		onChange({ name, value: html })
	}

	const handleChange = (e) => {
		if (e.target.value.length > maxLength) {
			return // Блокируем изменение, если больше maxLength символов
		}

		setRemaining(maxLength - e.target.value.length)
		onChange({ name, value: e.target.value })
		e.target.style.height = 'auto'
		e.target.style.height = `${e.target.scrollHeight + 10}px`
	}
	return (
		<>
			<label className={`field-label ${className ? className : ''}`}>
				<span>
					{label}{' '}
					{required ? (
						<span
							className="required-field"
							title={t("Це поле обов'язково")}
						>
							*
						</span>
					) : null}
				</span>
				{html ? null : (
					<textarea
						name={name}
						value={value}
						onChange={handleChange}
						maxLength={maxLength}
						className={styles.profileAddPostTextarea}
						placeholder={placeholder}
						required={required}
					/>
				)}
			</label>
			{html ? (
				<div className={styles.textAreaQuillWrapper}>
					<ReactQuill
						theme="snow"
						value={value}
						onChange={handleQuillChange}
						modules={{ toolbar: true }}
					/>
				</div>
			) : null}
			<small className={styles.remainingChars}>
				{remaining} {t('символів залишилось')}
			</small>
		</>
	)
}

TextAreaEditor.propTypes = {
	maxLength: PropTypes.number,
	className: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	html: PropTypes.bool,
	onChange: PropTypes.func,
}

export default TextAreaEditor
