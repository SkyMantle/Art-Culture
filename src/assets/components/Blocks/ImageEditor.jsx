import { useState } from 'react'
import styles from "@styles/components/Blocks/TextEditor.module.scss";
import PropTypes from 'prop-types';

function getPreviews(value) {
	const filesArray = Array.from(value)
	const previews = filesArray.map(file => URL.createObjectURL(file))
	return previews
}

function ImageEditor({ className, name, label, value, required, multiple, onChange }) {
	const [imagePreviews, setImagePreviews] = useState(value ? getPreviews(value) : [])
	const handleChange = (e) => {
		const filesArray = Array.from(e.target.files)
		const previews = filesArray.map(file => URL.createObjectURL(file))
		setImagePreviews(previews)
		console.log(previews)
		onChange({ name, value: e.target.files });
	};

	return (
		<>
		<label className={`${styles.profileAddPostLabel} ${className ? className : ''}`}>
		<span>{label} {required ? <span className="required-field">*</span> : null}</span>
			<input
				type='file'
				name={name}
				accept='image/*'
				multiple={multiple}
				onChange={handleChange}
				required={required}
			/>
		</label>
		{/* Image Previews */}
		<div className={styles.imagePreviews}>
			{imagePreviews.map((preview, index) => (
				<img
					key={index}
					src={preview}
					alt={`Preview ${index}`}
					className={styles.previewImage}
				/>
			))}
		</div>
		</>
	)
}

ImageEditor.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	multiple: PropTypes.bool,
	onChange: PropTypes.func,
};

export default ImageEditor
