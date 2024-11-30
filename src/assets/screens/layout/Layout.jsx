import cn from 'clsx'
import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../../routes/ProtectedRoute'
import ExhibitionCardCreate from '../../components/ExhibitionCard/ExhibitionCardCreate'
import PostDetail from '../../components/Post/PostDetail'
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
import ProductCardCreate from '/src/assets/components/ProductCard/ProductCardCreate'
import styles from '/src/styles/layout/Layout.module.scss'
import ArtTermsPage from '../ArtTerms/ArtTermsPage'
import ArtTermsFilteredPage from '../ArtTerms/ArtTermsFilteredPage'

const Layout = ({ children, heading = '', backLink = '/' }) => {
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
					<Route
						path='/userProfile'
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
						path='/AdminDashboard'
						element={
							<ProtectedRoute roles={['ADMIN']}>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route path='/userProfileAddPost' element={<UserProfileAddPost />} />
					<Route path='/userProfilePosts' element={<UserProfilePosts />} />
					<Route path='/Paintings' element={<Paintings />} />
					<Route path='/ProductCardCreate' element={<ProductCardCreate />} />
					<Route
						path='/ExhibitionCardCreate'
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
export default Layout
