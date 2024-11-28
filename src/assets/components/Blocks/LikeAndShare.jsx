import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'

function LikeAndShare({ className }) {
	const { t } = useTranslation()

	return (
		<div className={`${className ? className : ""} socialLikeAndShareInner`}>
			<button className='socialLikeAndShareInner__likeButton circleButton'>
				<img
					className='likeButtonImg'
					src='/Img/likeHeart.svg'
					alt={t('Світлина вподобайки')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/likeHeart.svg'
					}}
				/>
			</button>
			<button className='socialLikeAndShareInner__shareButton circleButton'>
				<img
					className='shareButtonImg'
					src='/Img/shareArrow.svg'
					alt={t('Світлина вподобайки')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/likeHeart.svg'
					}}
				/>
			</button>
		</div>
	)
}

LikeAndShare.propTypes = {
	className: PropTypes.string
};

export default LikeAndShare
