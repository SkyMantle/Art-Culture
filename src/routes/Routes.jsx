import {
	BrowserRouter,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import Login from '../assets/components/VerificationPages/LoginPage.jsx'
import SignUp from '../assets/components/VerificationPages/SignUpPage.jsx'
import Footer from '../assets/screens/footer/Footer.jsx'
import Home from '../assets/screens/home/Home.jsx'
import MainPage from '../assets/screens/mainPage/MainPage.jsx'
import UserProfile from '../assets/screens/userProfile/userProfile.jsx'
import { routes } from './routes.data.js'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				))}

				<Home />
				<MainPage />
				<UserProfile />
				<Login />
				<SignUp />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default Router
