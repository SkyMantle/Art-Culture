import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '@styles/layout/newsPage.module.scss'
import NewsPageAuthorsSlider from '@components/Sliders/NewsPageAuthorsSlider/NewsPageAuthorsSlider.jsx'
import { getFormattedDate, getImageUrl } from '../../../utils/helper.js'
import LikeAndShare from '@components/Blocks/LikeAndShare'
import sliderStyles from '@styles/components/Blocks/Slider.module.scss'
import TranslatedContent from '../../components/Blocks/TranslatedContent.jsx'

function NewsPage() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const currentLanguage = i18n.language

	// State to hold all posts
	const [posts, setPosts] = useState([])
	// State to handle search input
	const [searchTerm, setSearchTerm] = useState('')

	// State to handle loading and error states
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// Determine the number of visible posts based on window width
	const [visiblePostsCount, setVisiblePostsCount] = useState(
		getPostsCount(window.innerWidth)
	)

	// Function to determine number of posts to display based on window width
	function getPostsCount(width) {
		if (width >= 1600) {
			return 3
		} else if (width >= 1440) {
			return 2
		} else {
			return 1 // Changed to 1 for widths below 1440px
		}
	}

	// Handle window resize to adjust visible posts count
	useEffect(() => {
		const handleResize = () => {
			const newPostCount = getPostsCount(window.innerWidth)
			if (newPostCount !== visiblePostsCount) {
				setVisiblePostsCount(newPostCount)
				console.log(
					`Window width: ${window.innerWidth}, Visible posts count: ${newPostCount}`
				)
			}
		}

		window.addEventListener('resize', handleResize)

		// Initial check
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [visiblePostsCount])

	// Fetch all posts from the server
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get('/api/posts')
				console.log('Received posts data:', response.data)
				// Assuming the API returns { posts: [...] }
				setPosts(response.data)
				setLoading(false)
			} catch (err) {
				console.error('Error loading posts:', err)
				setError('Failed to load posts.')
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	// Filter posts based on search term (author's title or email)
	const filteredPosts = posts.filter(post => {
		const authorName = post.author.title || post.author.email
		return authorName.toLowerCase().includes(searchTerm.toLowerCase())
	})

	const handleNewsPageClick = () => {
		navigate('/NewsPage')
	}

	const handleSignUpClick = () => {
		navigate('/SignUp')
	}

	return (
		<div className={`${styles.newsPageContainer}`}>
			{/* Title Section */}
			<div className={`${styles.newsPageTitleContainer}`}>
				<div className={`${styles.newsPageTitle}`}>{t('Новини')}</div>
			</div>

			{/* Horizontal Separator */}
			<div className={`${styles.newsPageHorizontalSeparatorContainer}`}>
				<img
					className={`${styles.newsPageHorizontalSeparator}`}
					src='/Img/verticalSeparator.svg' // Ensure this path is correct
					alt={t('Горизонтальний сепаратор')}
					onError={e => {
						e.target.onerror = null
						e.target.src = '/Img/verticalSeparator.svg' // Fallback image
					}}
				/>
			</div>

			{/* Search Input */}
			<div className={`${styles.newsPageSearchContainer}`}>
				<input
					className={`${styles.newsPageSearchInput}`}
					type='text'
					placeholder={t('Пошук авторів')}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			{/* Like and Share Buttons */}
			<div className={`${styles.newsPageLikeAndShareContainer}`}>
				<div className={`${styles.newsPageLikeWrapper}`}>
					<button className={`${styles.newsPageLikeButton}`}>
						<img
							className={`${styles.newsPageLikeButtonImg}`}
							src={'/Img/likeHeart.svg'}
							alt={t('Світлина вподобайки')}
							onError={e => {
								e.target.onerror = null
								e.target.src = '/Img/likeHeart.svg' // Fallback image
							}}
						/>
						<p className={`${styles.newsPageLikeButtonText}`}>Like</p>
					</button>
				</div>
				<div className={`${styles.newsPageShareWrapper}`}>
					<button className={`${styles.newsPageShareButton}`}>
						<p className={`${styles.newsPageShareButtonText}`}>Share</p>
						<img
							className={`${styles.newsPageShareButtonImg}`}
							src={'/Img/shareArrow.svg'}
							alt={t('Світлина поширити')}
							onError={e => {
								e.target.onerror = null
								e.target.src = '/Img/shareArrow.svg' // Fallback image
							}}
						/>
					</button>
				</div>
			</div>

			{/* Top Cards Section */}
			<div className={`${styles.newsPageTopCardsContainer}`}>
				<div className={`${styles.newsPageTopCardsWrapper}`}>
					{loading ? (
						<p>{t('Завантаження...')}</p>
					) : error ? (
						<p>{t(error)}</p>
					) : filteredPosts.length === 0 ? (
						<p>{t('Немає новин, що відповідають вашому запиту.')}</p>
					) : (
						filteredPosts.slice(0, visiblePostsCount).map((post, index) => {
							// Construct image URL similar to MainNews component
							const featuredMediaUrl = getImageUrl(post.images, '/Img/halfNewsCard.jpg')

							// Format date and time
							const formattedDate = getFormattedDate(post.createdAt)

							// Determine the card number for styling (1 to 12)
							const cardNumber = index + 1 // Adjust if you have separate top and bottom sections

							return (
								<div
									key={post.id}
									className={`${styles.newsPageCardContainer} ${styles[`newsPageCard${cardNumber}`]}`}
								>
									<div className={`${styles.newsPageCardWrapper}`}>
										{/* Image */}
										<div className={`${styles.newsPageCardImageWrapper}`}>
											<img
												className={`${styles.newsPageCardImage}`}
												src={featuredMediaUrl}
												alt={t('Зображення')}
												onError={e => {
													e.target.onerror = null
													e.target.src = '/Img/newsCardERROR.jpg' // Fallback image
												}}
											/>
										</div>

										{/* Title */}
										<div className={`${styles.newsPageCardTitleWrapper}`}>
											<p className={`${styles.newsPageCardTitle}`}>
												<TranslatedContent en={post.title_en} uk={post.title_uk} maxLength={50} />
											</p>
										</div>

										{/* Description */}
										<div className={`${styles.newsPageCardDescriptionWrapper}`}>
											<p className={`${styles.newsPageCardDescription}`}>
												<TranslatedContent en={post.content_en} uk={post.content_uk} maxLength={100} />
											</p>
										</div>

										{/* Clock, Date, and Read More Button */}
										<div
											className={`${styles.newsPageCardClockDateAndReadMoreButtonWrapper}`}
										>
											<div className={`${styles.newsPageCardClockWrapper}`}>
												<img
													className={`${styles.newsPageCardClockImg}`}
													src={'/Img/clock.svg'}
													alt={t('Час')}
													onError={e => {
														e.target.onerror = null
														e.target.src = '/Img/clock.svg' // Fallback image
													}}
												/>
											</div>
											<div className={`${styles.newsPageCardDateWrapper}`}>
												<p className={`${styles.newsPageCardDate}`}>
													{formattedDate}
												</p>
											</div>
											<div
												className={`${styles.newsPageCardReadMoreButtonWrapper}`}
											>
												<button
													onClick={() => navigate(`/posts/${post.id}`)}
													className={`${styles.newsPageCardReadMoreButton}`}
												>
													{t('Читати далі')}
												</button>
											</div>
										</div>
									</div>
								</div>
							)
						})
					)}
				</div>
			</div>

			{/* Authors Slider */}
			<NewsPageAuthorsSlider />

			{/* Bottom Cards Section */}
			<div className={`${styles.newsPageBottomCardsContainer}`}>
				<div className={`${styles.newsPageBottomCardsWrapper}`}>
					{loading ? (
						<p>{t('Завантаження...')}</p>
					) : error ? (
						<p>{t(error)}</p>
					) : filteredPosts.length === 0 ? (
						<p>{t('Немає новин, що відповідають вашому запиту.')}</p>
					) : (
						filteredPosts.slice(visiblePostsCount, 12).map((post, index) => {
							// Calculate the card number starting from 5
							const cardNumber = visiblePostsCount + index + 1

							// Construct image URL similar to MainNews component
							const featuredMediaUrl = getImageUrl(post.images, '/Img/halfNewsCard.jpg')

							// Format date and time
							const formattedDate = getFormattedDate(post.createdAt)

							return (
								<div
									key={post.id}
									className={`${styles.newsPageCardContainer} ${styles[`newsPageCard${cardNumber}`]}`}
								>
									<div className={`${styles.newsPageCardWrapper}`}>
										{/* Image */}
										<div className={`${styles.newsPageCardImageWrapper}`}>
											<img
												className={`${styles.newsPageCardImage}`}
												src={featuredMediaUrl}
												alt={t('Зображення')}
												onError={e => {
													e.target.onerror = null
													e.target.src = '/Img/newsCardERROR.jpg' // Fallback image
												}}
											/>
										</div>

										{/* Title */}
										<div className={`${styles.newsPageCardTitleWrapper}`}>
											<p className={`${styles.newsPageCardTitle}`}>
												<TranslatedContent en={post.title_en} uk={post.title_uk} maxLength={50} />
											</p>
										</div>

										{/* Description */}
										<div className={`${styles.newsPageCardDescriptionWrapper}`}>
											<p className={`${styles.newsPageCardDescription}`}>
												<TranslatedContent en={post.content_en} uk={post.content_uk} maxLength={100} />
											</p>
										</div>

										{/* Clock, Date, and Read More Button */}
										<div
											className={`${styles.newsPageCardClockDateAndReadMoreButtonWrapper}`}
										>
											<div className={`${styles.newsPageCardClockWrapper}`}>
												<img
													className={`${styles.newsPageCardClockImg}`}
													src={'/Img/clock.svg'}
													alt={t('Час')}
													onError={e => {
														e.target.onerror = null
														e.target.src = '/Img/clock.svg' // Fallback image
													}}
												/>
											</div>
											<div className={`${styles.newsPageCardDateWrapper}`}>
												<p className={`${styles.newsPageCardDate}`}>
													{formattedDate}
												</p>
											</div>
											<div
												className={`${styles.newsPageCardReadMoreButtonWrapper}`}
											>
												<button
													className={`${styles.newsPageCardReadMoreButton}`}
													onClick={() => navigate(`/posts/${post.id}`)} // Pass the post ID as a prop
												>
													{t('Читати далі')}
												</button>
											</div>
										</div>
									</div>
								</div>
							)
						})
					)}
				</div>
			</div>

			{/* More News and Like/Share Buttons */}
			<div className={`${styles.newsPageMoreNewsButtonAndLikeAndShareWrapper}`}>
				<div className={`${styles.newsPageMoreNewsButtonWrapper}`}>
					<button
						className={`${styles.newsPageMoreNewsButton}`}
						onClick={handleNewsPageClick}
					>
						<p className={`${styles.newsPageNewsButtonTitle}`}>
							{t('Більше новин')}
						</p>
						<img
							className={`${styles.newsPageNewsButtonImg}`}
							src={'/Img/buttonArrow.svg'}
							alt={t('Стрілка')}
							onError={e => {
								e.target.onerror = null
								e.target.src = '/mainNewImg/buttonArrow.svg' // Fallback image
							}}
						/>
					</button>
				</div>

				<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
			</div>

			{/* Subscription Section */}
			<div className={`${styles.newsPageInputMailContainer}`}>
				<p className={`${styles.newsPageInputMailTitle}`}>
					{t('Підписатися на розсилку')}
				</p>
				<input
					className={`${styles.newsPageInputMail}`}
					type='email'
					placeholder={t('Введіть ваш email')}
					// You can add value and onChange handlers if needed
				/>
			</div>

			<div className={`${styles.newsPageSignUpButtonContainer}`}>
				<button
					className={`${styles.newsPageSignUpButton}`}
					onClick={handleSignUpClick}
				>
					{t('Зареєструватися')}
				</button>
			</div>
		</div>
	)
}

export default NewsPage
