// MuseumPageMasonryGallery.jsx

import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import style from '../../../../styles/components/Sliders/MasonrySlider/PageMasonryGallery.module.scss'
import { allImages } from '../../../../utils/constants' // Adjust the path as necessary
import TranslatedContent from '../../Blocks/TranslatedContent'

const MuseumPageMasonryGallery = ({ products, baseUrl, creator }) => {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.language

	const containerRef = useRef(null)
	const sliderRef = useRef(null)

	const [isPaused, setIsPaused] = useState(false)
	const [sliderWidth, setSliderWidth] = useState(0)
	const [position, setPosition] = useState(0)
	const speed = 0.5 // Pixels per frame
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProductImages, setSelectedProductImages] = useState([])
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [selectedCreator, setSelectedCreator] = useState(null)

	// Zoom-related state variables
	const [zoomStates, setZoomStates] = useState([])

	// Carousel state
	const [currentSlide, setCurrentSlide] = useState(0)

	// Define the number of columns and custom scaling factor
	const customScaleFactor = 1.2 // Change this to scale images up or down

	const getBaseImageHeight = () => {
		const width = window.innerWidth
		if (width >= 1800) return 689
		if (width >= 1600) return 607
		if (width >= 1500) return 571
		if (width >= 1400) return 567
		return 599
	}

	const [baseImageHeight, setBaseImageHeight] = useState(getBaseImageHeight())

	// Determine the number of columns based on viewport width
	const getNumberOfColumns = () => {
		const width = window.innerWidth
		if (width < 600) return 2
		if (width < 900) return 4
		if (width < 1500) return 5
		if (width < 1800) return 6
		return 7
	}

	const [numberOfColumns, setNumberOfColumns] = useState(getNumberOfColumns())

	// Define dynamic height patterns per column
	const columnHeightPatterns = [
		[33, 67], // Column 0: Top 33%, Middle 67%
		[20, 20, 60], // Column 1: Top 20%, Middle 20%, Bottom 60%
		[25, 50, 25], // Column 2: Top 25%, Middle 50%, Bottom 25%
		// Add more patterns as needed
	]

	// Import fallback images from constants.jsx
	const fallbackImageList = useMemo(() => allImages, [])

	// Memoize the images array to prevent unnecessary re-creations
	const images = useMemo(() => {
		if (products && products.length > 0) {
			return products.map((product) => {
				const mainImageSrc =
					product.images && product.images.length > 0
						? `${baseUrl}${product.images[0].imageUrl.replace('../../', '/')}`
						: null // Will handle null later

				return {
					src: mainImageSrc, // Can be null if no images
					alt:
						product.title_en ||
						product.title_uk ||
						product.title ||
						'Artwork',
					productId: product.id,
					productImages: product.images,
				}
			})
		} else {
			// If no products, use fallback images
			return fallbackImageList.map((src, idx) => ({
				src,
				alt: `Fallback Image ${idx + 1}`,
				productId: null,
				productImages: [],
			}))
		}
	}, [products, baseUrl, fallbackImageList])

	// Prepare images with dimensions
	const [loadedImages, setLoadedImages] = useState([])

	useEffect(() => {
		if (images.length === 0) {
			console.warn('No images to load.')
			// As a fallback, load images from constants.jsx
			const fallbackLoadedImages = fallbackImageList.map((src, idx) => ({
				src,
				alt: `Fallback Image ${idx + 1}`,
				productId: null,
				width: 0,
				height: 0,
			}))
			setLoadedImages(fallbackLoadedImages)
			return
		}

		const imagePromises = images.map((imageObj) => {
			return new Promise((resolve) => {
				if (!imageObj.src) {
					// If src is null, use fallback
					resolve({
						...imageObj,
						src: allImages[
							Math.floor(Math.random() * allImages.length)
						], // Random fallback image
						width: 0,
						height: 0,
					})
					return
				}

				const img = new Image()
				img.src = imageObj.src
				img.onload = () => {
					resolve({
						...imageObj,
						width: img.width,
						height: img.height,
					})
				}
				img.onerror = () => {
					console.error('Error loading image:', imageObj.src)
					// On error, use a fallback image
					const fallbackSrc =
						allImages[Math.floor(Math.random() * allImages.length)]
					resolve({
						...imageObj,
						src: fallbackSrc,
						width: 0,
						height: 0,
					})
				}
			})
		})

		Promise.all(imagePromises).then((imgs) => {
			// Check if all images failed to load and fallback images are needed
			const hasValidImages = imgs.some(
				(img) => img.src && img.src !== '/Img/newsCardERROR.jpg',
			)

			if (!hasValidImages) {
				console.warn(
					'All images failed to load. Using fallback images.',
				)
				const fallbackLoadedImages = fallbackImageList.map(
					(src, idx) => ({
						src,
						alt: `Fallback Image ${idx + 1}`,
						productId: null,
						width: 0,
						height: 0,
					}),
				)
				setLoadedImages(fallbackLoadedImages)
			} else {
				setLoadedImages(imgs)
			}
		})
	}, [images, fallbackImageList])

	// Split images into columns
	const [columns, setColumns] = useState([])

	useEffect(() => {
		if (loadedImages.length === 0) {
			console.log('No loaded images to split into columns.')
			return
		}

		const newColumns = Array.from({ length: numberOfColumns }, () => [])

		loadedImages.forEach((img, idx) => {
			newColumns[idx % numberOfColumns].push(img)
		})

		// Check if columns have actually changed
		const isColumnsEqual =
			newColumns.length === columns.length &&
			newColumns.every((col, idx) => {
				if (col.length !== columns[idx].length) return false
				return col.every(
					(img, imgIdx) => img.src === columns[idx][imgIdx]?.src,
				)
			})

		if (!isColumnsEqual) {
			setColumns(newColumns)
		}
	}, [loadedImages, numberOfColumns, columns])

	// Define scaledColumns state
	const [scaledColumns, setScaledColumns] = useState([])

	// Calculate slider width by measuring the DOM
	useLayoutEffect(() => {
		if (columns.length === 0) {
			return
		}

		const columnWidth = 170 // Desired image width
		const columnGap = 20 // Gap between columns

		const newScaledColumns = columns.map((column) => {
			return column.map((img) => {
				const aspectRatio = img.height / img.width || 1
				const scaledWidth = columnWidth * customScaleFactor
				// Height will be handled by CSS

				return {
					...img,
					scaledWidth,
					aspectRatio,
				}
			})
		})

		setScaledColumns(newScaledColumns)
	}, [columns, customScaleFactor])

	// Measure the width of one set of columns after scaling
	useLayoutEffect(() => {
		if (sliderRef.current) {
			const firstSet = sliderRef.current.querySelectorAll(
				`.${style.column}`,
			)
			if (firstSet.length === 0) {
				return
			}

			let totalWidth = 0
			firstSet.forEach((col) => {
				totalWidth +=
					col.offsetWidth +
					parseInt(getComputedStyle(col).marginRight, 10)
			})

			setSliderWidth(totalWidth)
		}
	}, [scaledColumns])

	// Handle responsive columns with debounce
	useEffect(() => {
		const handleResize = debounce(() => {
			const newNumberOfColumns = getNumberOfColumns()
			setBaseImageHeight(getBaseImageHeight())
			setNumberOfColumns(newNumberOfColumns)
		}, 100)

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
			handleResize.cancel()
		}
	}, [])

	// Automatically move images to the left (horizontal sliding)
	useEffect(() => {
		let animationFrameId

		const animate = () => {
			if (!isPaused) {
				setPosition((prevPosition) => {
					let newPosition = prevPosition - speed

					if (-newPosition >= sliderWidth / 2) {
						// Reset position to 0 for seamless looping
						return 0
					}

					return newPosition
				})
			}

			animationFrameId = requestAnimationFrame(animate)
		}

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [isPaused, sliderWidth, speed])

	// Compute if any image is zoomed
	const isAnyImageZoomed = zoomStates.some((state) => state.isZoomed)

	// Prevent body scrolling when any image is zoomed
	useEffect(() => {
		if (isAnyImageZoomed) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isAnyImageZoomed])

	// Handle mouse events to pause and resume animation
	const handleMouseEnter = () => {
		setIsPaused(true)
	}

	const handleMouseLeave = () => {
		setIsPaused(false)
	}

	// Handle image click to open modal
	const handleImageClick = (productImages, product) => {
		if (productImages && productImages.length > 0) {
			setSelectedProductImages(productImages)
			setSelectedProduct(product)
			setSelectedCreator(creator)
			setZoomStates(
				productImages.map(() => ({
					zoomLevel: 1,
					isZoomed: false,
					cursorPos: { x: 0, y: 0 },
					showLens: false,
				})),
			)
			setCurrentSlide(0)
		} else {
			// If no sub-images, display fallback
			setSelectedProductImages([])
			setSelectedProduct(null)
			setSelectedCreator(null)
			setZoomStates([])
		}
		setIsModalOpen(true)
	}

	// Handle closing the modal
	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProductImages([])
		setSelectedProduct(null)
		setSelectedCreator(null)
		setZoomStates([])
		setCurrentSlide(0)
	}

	// Handle zoom in
	const handleZoomIn = (index) => {
		setZoomStates((prevZoomStates) => {
			const newZoomStates = [...prevZoomStates]
			const currentZoom = newZoomStates[index].zoomLevel
			if (currentZoom < 5) {
				newZoomStates[index].zoomLevel = parseFloat(
					(currentZoom + 0.5).toFixed(1),
				)
				newZoomStates[index].isZoomed = true
			}
			return newZoomStates
		})
	}

	// Handle zoom out
	const handleZoomOut = (index) => {
		setZoomStates((prevZoomStates) => {
			const newZoomStates = [...prevZoomStates]
			const currentZoom = newZoomStates[index].zoomLevel
			if (currentZoom > 1) {
				newZoomStates[index].zoomLevel = parseFloat(
					(currentZoom - 0.5).toFixed(1),
				)
				if (newZoomStates[index].zoomLevel === 1) {
					newZoomStates[index].isZoomed = false
				}
			}
			return newZoomStates
		})
	}

	// Handle mouse move events to update cursor position for zoom
	const handleMouseMoveImage = useCallback(
		(e, index) => {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// Update cursor position
			setZoomStates((prevZoomStates) => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...newZoomStates[index],
					cursorPos: { x, y },
				}
				return newZoomStates
			})
		},
		[setZoomStates],
	)

	// Handle mouse enter to show zoom lens
	const handleMouseEnterImage = useCallback(
		(index) => {
			setZoomStates((prevZoomStates) => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...newZoomStates[index],
					showLens: true,
				}
				return newZoomStates
			})
		},
		[setZoomStates],
	)

	// Handle mouse leave to hide zoom lens
	const handleMouseLeaveImage = useCallback(
		(index) => {
			setZoomStates((prevZoomStates) => {
				const newZoomStates = [...prevZoomStates]
				newZoomStates[index] = {
					...newZoomStates[index],
					showLens: false,
					cursorPos: { x: 0, y: 0 },
				}
				return newZoomStates
			})
		},
		[setZoomStates],
	)

	// Handle click to toggle zoom
	const handleImageClickToggleZoom = useCallback(
		(index) => {
			setZoomStates((prevZoomStates) => {
				const newZoomStates = [...prevZoomStates]
				const zoomState = newZoomStates[index]
				const isZoomed = !zoomState.isZoomed
				const zoomLevel = isZoomed ? 2 : 1

				newZoomStates[index] = {
					...zoomState,
					isZoomed,
					zoomLevel,
				}
				return newZoomStates
			})
		},
		[setZoomStates],
	)

	// Handle manual navigation in carousel
	const handlePrevSlide = () => {
		setCurrentSlide(
			(prev) =>
				(prev - 1 + selectedProductImages.length) %
				selectedProductImages.length,
		)
	}

	const handleNextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % selectedProductImages.length)
	}

	const getImageHeight = (columnIdx, imageIdx) => {
		const pattern =
			columnHeightPatterns[columnIdx % columnHeightPatterns.length]
		if (imageIdx < pattern.length) {
			return `${(pattern[imageIdx] / 100) * baseImageHeight}px`
		} else {
			// Check if scaledColumns[columnIdx] exists
			if (scaledColumns[columnIdx] && scaledColumns[columnIdx].length) {
				const totalPattern = pattern.reduce((sum, val) => sum + val, 0)
				const remainingPercentage = 100 - totalPattern
				const remainingImages =
					scaledColumns[columnIdx].length - pattern.length
				if (remainingImages > 0) {
					return `${(remainingPercentage / remainingImages / 100) * baseImageHeight}px`
				}
			}
			// Fallback if scaledColumns[columnIdx] is undefined or has no remaining images
			return `${baseImageHeight}px`
		}
	}

	return (
		<div className={style.ArtistPageMasonryGalleryWrapper}>
			<div
				className={style.galleryContainer}
				style={{ overflow: 'hidden' }}
			>
				{/* Gallery Title */}
				<div className={style.galleryTitleWrapper}>
					<h3 className={style.galleryTitle}>
						{t('Експонати цього музею')}
					</h3>
				</div>

				{/* Horizontal Slider */}
				<div
					className={style.justifiedGallery}
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div
						ref={sliderRef}
						className={style.slider}
						style={{
							display: 'flex',
							flexDirection: 'row', // Arrange columns side by side horizontally
							transform: `translateX(${position}px)`, // Horizontal movement
							width: `${sliderWidth * 2}px`, // Set width to accommodate duplicated columns
							transition: isPaused
								? 'none'
								: 'transform 0.1s linear', // Smooth sliding
							willChange: 'transform', // Optimize for transform changes
						}}
					>
						{/* Duplicate the entire set of scaled columns for seamless looping */}
						{scaledColumns
							.concat(scaledColumns)
							.map((column, columnIndex) => (
								<div
									key={columnIndex}
									className={style.column}
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginRight: '20px', // Gap between columns
									}}
								>
									{column.map((img, index) => (
										<div
											key={`${img.src}-${index}-${columnIndex}`}
											className={style.item}
											style={{
												marginBottom: '20px', // Gap between items in a column
												width: `${img.scaledWidth}px`,
												flex: '0 0 auto', // Prevent flex items from growing or shrinking
												cursor: 'pointer',
												height: getImageHeight(
													columnIndex,
													index,
												),
												position: 'relative',
											}}
											onClick={() =>
												handleImageClick(
													img.productImages,
													products.find(
														(p) =>
															p.id ===
															img.productId,
													),
												)
											}
										>
											<img
												src={img.src}
												alt={img.alt}
												loading="lazy"
												className={style.galleryImage}
												style={{
													width: '100%',
													height: '100%', // Let height adjust based on image aspect ratio
													objectFit: 'cover', // Ensures the image covers the container without distortion
												}}
												onError={(e) => {
													e.target.onerror = null
													e.target.src =
														'/Img/newsCardERROR.jpg'
												}}
											/>
										</div>
									))}
								</div>
							))}
					</div>
				</div>

				{/* Modal */}
				{isModalOpen && selectedProduct && selectedCreator && (
					<div
						className={style.modalOverlay}
						onClick={handleCloseModal}
						role="dialog"
						aria-modal="true"
						aria-labelledby="productInfoContainer"
					>
						<div
							className={style.modalContent}
							onClick={(e) => e.stopPropagation()}
							aria-labelledby="productInfoContainer"
						>
							{/* Close Button */}
							<button
								className={style.closeButton}
								onClick={handleCloseModal}
								aria-label={t('Закрити модальне вікно')}
							>
								&times;
							</button>

							{/* Product Information */}
							<div
								id="productInfoContainer"
								className={style.productInfoContainer}
								tabIndex="-1" // Make it focusable
							>
								<div className={style.productHeaderWrapper}>
									<h2 className={style.productModalTitle}>
										{t('Назва Картини:')}
										<p>
											<TranslatedContent
												en={selectedProduct.title_en}
												uk={selectedProduct.title_uk}
												html
											/>
										</p>
									</h2>
									<h3
										className={style.productModalAuthorName}
									>
										{t('Імя автора:')}
										<p>
											{selectedCreator.title_en ||
												selectedCreator.title_uk ||
												selectedCreator.title ||
												'—'}
										</p>
									</h3>
								</div>

								<div
									className={style.productModalMainInfoAbout}
								>
									<h3
										className={style.productModelAboutTitle}
									>
										{t('Докладніше')}
									</h3>
									<div
										className={
											style.productModelDescrWrapper
										}
									>
										<h4
											className={
												style.productModelDescrTitle
											}
										>
											{t('Про Картину:')}
											<p
												className={
													style.productModelDescr
												}
											>
												<TranslatedContent
													en={
														selectedProduct.description_en
													}
													uk={
														selectedProduct.description_uk
													}
													html
												/>
											</p>
										</h4>
									</div>
									<div
										className={
											style.productModelSpecsWrapper
										}
									>
										<h4
											className={
												style.productModelSpecsTitle
											}
										>
											{t('Використані матеріали:')}
											<p
												className={
													style.productModelSpecs
												}
											>
												<TranslatedContent
													en={
														selectedProduct.specs_en
													}
													uk={
														selectedProduct.specs_uk
													}
													html
												/>
											</p>
										</h4>
									</div>
								</div>
							</div>

							{/* Carousel Navigation Buttons */}
							{selectedProductImages.length > 1 && (
								<div className={style.carouselNav}>
									<button
										className={style.carouselButton}
										onClick={handlePrevSlide}
										aria-label={t('Попереднє зображення')}
									>
										&#10094; {/* Left Arrow */}
									</button>
									<button
										className={style.carouselButton}
										onClick={handleNextSlide}
										aria-label={t('Наступне зображення')}
									>
										&#10095; {/* Right Arrow */}
									</button>
								</div>
							)}

							{/* Carousel Images */}
							<div className={style.modalImages}>
								{selectedProductImages &&
								selectedProductImages.length > 0 ? (
									selectedProductImages.map(
										(image, index) => {
											// Only render the current slide
											if (index !== currentSlide)
												return null

											const zoomState = zoomStates[
												index
											] || {
												zoomLevel: 1,
												isZoomed: false,
												cursorPos: { x: 0, y: 0 },
												showLens: false,
											}

											return (
												<div
													key={index}
													className={
														style.modalImageWrapper
													}
													onMouseEnter={() =>
														handleMouseEnterImage(
															index,
														)
													}
													onMouseLeave={() =>
														handleMouseLeaveImage(
															index,
														)
													}
													onMouseMove={(e) =>
														handleMouseMoveImage(
															e,
															index,
														)
													}
													onClick={() =>
														handleImageClickToggleZoom(
															index,
														)
													}
													style={{
														position: 'relative',
														overflow: 'hidden',
														cursor: zoomState.isZoomed
															? 'zoom-out'
															: 'zoom-in',
														width: '70%', // Make image responsive
													}}
												>
													<div
														className={
															style.zoomContainer
														}
														style={{
															transform: `scale(${zoomState.zoomLevel})`,
															transformOrigin: `${zoomState.cursorPos.x}px ${zoomState.cursorPos.y}px`,
															transition:
																'transform 0.3s ease-in-out',
															display:
																'inline-block',
														}}
													>
														<img
															src={`${baseUrl}${image.imageUrl.replace('../../', '/')}`}
															alt={`Product Image ${index + 1}`}
															loading="lazy"
															className={
																style.modalImage
															}
															style={{
																width: '100%',
																height: 'auto',
															}}
															onError={(e) => {
																e.target.onerror =
																	null
																e.target.src =
																	'/Img/newsCardERROR.jpg'
																console.error(
																	'Error loading modal image:',
																	e.target
																		.src,
																)
															}}
														/>
													</div>
													{zoomState.showLens &&
														!zoomState.isZoomed && (
															<div
																className={
																	style.zoomLens
																}
																style={{
																	position:
																		'absolute',
																	top:
																		zoomState
																			.cursorPos
																			.y -
																		50,
																	left:
																		zoomState
																			.cursorPos
																			.x -
																		50,
																	width: '100px',
																	height: '100px',
																	border: '2px solid #fff',
																	borderRadius:
																		'50%',
																	pointerEvents:
																		'none',
																	backgroundColor:
																		'rgba(255, 255, 255, 0.2)',
																}}
															></div>
														)}
													{/* Zoom Controls */}
													{zoomState.isZoomed && (
														<div
															className={
																style.zoomControls
															}
														>
															<button
																className={
																	style.zoomButton
																}
																onClick={(
																	e,
																) => {
																	e.stopPropagation()
																	handleZoomOut(
																		index,
																	)
																}}
																aria-label={t(
																	'Zoom Out',
																)}
															>
																-
															</button>
															<div
																className={
																	style.zoomIndicator
																}
															>
																<span>{`Zoom: ${zoomState.zoomLevel}x`}</span>
																<div
																	className={
																		style.zoomBar
																	}
																>
																	<div
																		className={
																			style.zoomProgress
																		}
																		style={{
																			width: `${((zoomState.zoomLevel - 1) / 4) * 100}%`,
																		}}
																	></div>
																</div>
															</div>
															<button
																className={
																	style.zoomButton
																}
																onClick={(
																	e,
																) => {
																	e.stopPropagation()
																	handleZoomIn(
																		index,
																	)
																}}
																aria-label={t(
																	'Zoom In',
																)}
															>
																+
															</button>
														</div>
													)}
												</div>
											)
										},
									)
								) : (
									<p>
										{t(
											'Немає додаткових зображень для цього продукту.',
										)}
									</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			{/* More Arts Button */}
			<div className={style.moreArtsButtonWrapper}>
				{/* <button className={style.moreArtsButton}>
					<p className={style.moreArtsButtonText}>
					{t('Всі експонати цьго музею')}
					</p>
					<img
						className={`${style.buttonArrow}`}
						src={'/Img/buttonArrow.svg'}
						alt={t('Фото митця')}
						loading="lazy"
						onError={(e) => {
							e.target.onerror = null
							e.target.src = '/Img/newsCardERROR.jpg'
						}}
					/>
				</button> */}
			</div>
		</div>
	)
}

MuseumPageMasonryGallery.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired,
					imageUrl: PropTypes.string.isRequired,
				}),
			),
			title: PropTypes.string.isRequired,
			title_en: PropTypes.string,
			title_uk: PropTypes.string,
			description: PropTypes.string.isRequired,
			description_en: PropTypes.string,
			description_uk: PropTypes.string,
			specs: PropTypes.string.isRequired,
			specs_en: PropTypes.string,
			specs_uk: PropTypes.string,
			author: PropTypes.shape({
				title: PropTypes.string,
				title_en: PropTypes.string,
				title_uk: PropTypes.string,
				// ... other fields
			}),
		}),
	).isRequired,
	baseUrl: PropTypes.string.isRequired,
	creator: PropTypes.shape({
		title: PropTypes.string,
		title_en: PropTypes.string,
		title_uk: PropTypes.string,
		// ... other fields
	}).isRequired,
}

export default MuseumPageMasonryGallery
