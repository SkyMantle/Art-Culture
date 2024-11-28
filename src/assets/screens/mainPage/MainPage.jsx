import { debounce } from 'lodash'
import { useCallback, useEffect } from 'react'
import styles from '../../../styles/layout/MainPage.module.scss'
import MainArtists from '../../components/Blocks/MainArtists.jsx'
import MainExhibitions from '../../components/Blocks/MainExhibitions.jsx'
import MainMuseums from '../../components/Blocks/MainMuseums.jsx'
import MainNews from '../../components/Blocks/MainNews.jsx'
// import MainBannerSlider from '../../components/Sliders/MainBannerSlider/MainBannerSlider.jsx'
import MainPageBannerSlider from '../../components/Sliders/MainPageBannerSlider/MainPageBannerSlider.jsx'
import MainInstagramSlider from '../../components/Sliders/MainInstagramSlider/MainInstagramSlider.jsx'
import MainPopularArtsSlider from '../../components/Sliders/MainPopularArtsSlider/MainPopularArtsSlider.jsx'
function MainPage() {
	const handleScroll = useCallback(
		debounce(() => {
			console.log('Scrolling...')
		}, 100),

		[]
	)

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])
	return (
		<div className={styles.mainPage}>
			{/* <MainBannerSlider /> */}
			<MainPageBannerSlider />
			<div className={styles.mainPageWelcomeTitleWrapper}>
				<h1 className={styles.welcomeTitle}>
					Вітаємо на ukrainian art&culture
				</h1>
				<p className={styles.welcomeParagraph}>
					Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли
					<a className={styles.mainPageWelcomeTitleParagraphLink}>
						невідомий друкар
					</a>{' '}
					взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба"
					не тільки успішно пережила п'ять століть, але й прижилася в
					електронному верстуванні, залишаючись по суті незмінною... Lorem Ipsum
					є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий
					друкар взяв шрифтову гранку Lorem Ipsum є, фактично, стандартною
					"рибою" аж з{' '}
					<a className={styles.mainPageWelcomeTitleParagraphLink}>
						XVI сторіччя
					</a>
					, коли{' '}
					<a className={styles.mainPageWelcomeTitleParagraphLink}>
						невідомий друкар
					</a>{' '}
					взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба"
					не тільки успішно пережила п'ять століть, але й прижилася в
					електронному верстуванні, залишаючись по суті незмінною... <br />
					Lorem Ipsum є, фактично, стандартною "рибою" аж з{' '}
					<a className={styles.mainPageWelcomeTitleParagraphLink}>
						XVI сторіччя
					</a>
					, коли невідомий друкар взяв шрифтову гранку{' '}
					<a className={styles.mainPageWelcomeTitleParagraphReadMoreLink}>
						&#8250;&#8250;
					</a>
				</p>
			</div>
			<MainNews />
			<MainArtists />
			<MainInstagramSlider />
			<MainExhibitions />
			<MainMuseums />
			<MainPopularArtsSlider />
		</div>
	)
}

export default MainPage
