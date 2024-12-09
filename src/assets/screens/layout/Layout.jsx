import cn from 'clsx'
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types';
import ProtectedRoute from '../../../routes/ProtectedRoute'
import ExhibitionCardCreate from '../userProfile/ExhibitionCardCreate'
import PostDetail from '../Post/PostDetail'
import Login from '../../components/VerificationPages/LoginPage'
import SignUp from '../../components/VerificationPages/SignUpPage'
import AdminDashboard from '../Admin/AdminDashboard'
import ArtistPage from '../ArtistPage/ArtistPage'
import ArtistsPage from '../ArtistsPage/ArtistsPage'
import MuseumExhibitions from '../ExhibitionList/Exhibitions'
import MuseumPage from '../MuseumPage/MuseumPage'
import MuseumsPage from '../MuseumsPage/MuseumsPage'
import Paintings from '../ProductList/Paintings'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import MainPage from '../mainPage/MainPage'
import NewsPage from '../newsPage/NewsPage'
import UserProfile from '../userProfile/userProfile'
import UserProfileAddPost from '../userProfile/userProfileAddPost'
import UserProfilePosts from '../userProfile/userProfilePosts'
import ProductCardCreate from '../userProfile/ProductCardCreate'
import styles from '/src/styles/layout/Layout.module.scss'
import ArtTermsPage from '../ArtTerms/ArtTermsPage'
import ArtTermsFilteredPage from '../ArtTerms/ArtTermsFilteredPage'
import ArtTermPage from '../ArtTerms/ArtTermPage'
import AdminArtTermsList from '../Admin/ArtTermsList';
import AdminArtTermsEdit from '../Admin/ArtTermsEdit';

const Layout = ({ heading = '' }) => {
	const [username, setUsername] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [serverMessage, setServerMessage] = useState('')
	return (
		<BrowserRouter>
			<section
				className={cn(styles.container, {
					[styles.otherPage]: !!heading,
				})}
			>
				<Header />
				<Routes>
					<Route path='/' element={<Navigate to='/MainPage' />} />
					<Route path='/MainPage' element={<MainPage />} />
					<Route path='/ArtistsPage' element={<ArtistsPage />} />
					<Route path='/artist/:id' element={<ArtistPage />} />
					<Route path='/MuseumsPage' element={<MuseumsPage />} />
					<Route path='/MuseumPage' element={<MuseumPage />} />
					<Route path='/art-terms' element={<ArtTermsPage />} />
					<Route path='/art-terms/letters/:letter' element={<ArtTermsFilteredPage />} />
					<Route path='/art-terms/:id' element={<ArtTermPage />} />
					<Route
						path='/profile'
						element={
							<UserProfile
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								setUsername={setUsername}
								username={username}
								serverMessage={serverMessage}
								setServerMessage={setServerMessage}
							/>
						}
					/>
					<Route
						path='/admin/dashboard'
						element={
							<ProtectedRoute roles={['ADMIN']}>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route path='/admin/art-terms'
						element={<ProtectedRoute roles={['ADMIN']}><AdminArtTermsList /></ProtectedRoute>} />
					<Route path='/admin/art-terms/:id'
						element={<ProtectedRoute roles={['ADMIN']}><AdminArtTermsEdit /></ProtectedRoute>} />
					<Route path='/profile/posts/create' element={<UserProfileAddPost />} />
					<Route path='/profile/posts' element={<UserProfilePosts />} />
					<Route path='/profile/products' element={<Paintings />} />
					<Route path='/profile/products/create' element={<ProductCardCreate />} />
					<Route
						path='/exhibitions/create'
						element={<ExhibitionCardCreate />}
					/>
					<Route path='/Exhibitions' element={<MuseumExhibitions />} />
					<Route path='/NewsPage' element={<NewsPage />} />
					<Route
						path='/login'
						element={
							<Login
								setUsername={setUsername}
								setIsLoggedIn={setIsLoggedIn}
								serverMessage={serverMessage}
								setServerMessage={setServerMessage}
							/>
						}
					/>
					<Route path='/posts/:id' element={<PostDetail />} />
					<Route
						path='/signup'
						element={
							<SignUp
								setUsername={setUsername}
								setIsLoggedIn={setIsLoggedIn}
								serverMessage={serverMessage}
								setServerMessage={setServerMessage}
							/>
						}
					/>
				</Routes>
				<Footer />
			</section>
		</BrowserRouter>
	)
}
Layout.propTypes = {
	heading: PropTypes.string,
}
export default Layout
