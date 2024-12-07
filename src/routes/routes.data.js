import PostDetail from '../assets/components/Post/PostDetail'
import ProductCartCreate from '../assets/components/ProductCard/ProductCardCreate'
import Login from '../assets/components/VerificationPages/LoginPage'
import SignUp from '../assets/components/VerificationPages/SignUpPage'
import AdminDashboard from '../assets/screens/Admin/AdminDashboard'
import ArtistsPage from '../assets/screens/ArtistsPage/ArtistsPage'
import ArtistPage from '../assets/screens/ArtistPage/ArtistPage'
import MuseumExhibitions from '../assets/screens/ExhibitionList/Exhibitions'
import MuseumPage from '../assets/screens/MuseumPage/MuseumPage'
import MuseumsPage from '../assets/screens/MuseumsPage/MuseumsPage'
import Paintings from '../assets/screens/ProductList/Paintings'
import Home from '../assets/screens/home/Home'
import Layout from '../assets/screens/layout/Layout'
import MainPage from '../assets/screens/mainPage/MainPage'
import NewsPage from '../assets/screens/newsPage/NewsPage'
import UserProfile from '../assets/screens/userProfile/userProfile'
import UserProfileAddPost from '../assets/screens/userProfile/userProfileAddPost'
import UserProfilePosts from '../assets/screens/userProfile/userProfilePosts'

export const routes = [
	{
		path: '/',
		element: Home,
		isAuth: false,
	},

	{
		path: '/MainPage',
		element: MainPage,
		isAuth: false,
	},
	{
		path: '/Layout',
		element: Layout,
		isAuth: false,
	},

	{
		path: '/userProfile',
		element: UserProfile,
		isAuth: true,
	},

	{
		path: '/login',
		element: Login,
		isAuth: false,
	},

	{
		path: '/signup',
		element: SignUp,
		isAuth: false,
	},

	{
		path: '/userProfileAddPost',
		element: UserProfileAddPost,
		isAuth: true,
	},

	{
		path: '/userProfilePosts',
		element: UserProfilePosts,
		isAuth: true,
	},

	{
		path: '/NewsPage',
		element: NewsPage,
		isAuth: false,
	},

	{
		path: '/ArtistsPage',
		element: ArtistsPage,
		isAuth: false,
	},

	{
		path: '/ArtistPage',
		element: ArtistPage,
		isAuth: false,
	},

	{
		path: '/MuseumsPage',
		element: MuseumsPage,
		isAuth: false,
	},

	{
		path: '/MuseumPage',
		element: MuseumPage,
		isAuth: false,
	},

	{
		path: '/AdminDashboard',
		element: AdminDashboard,
		isAuth: true,
	},
	{
		path: '/ProductCardCreate',
		element: ProductCartCreate,
		isAuth: true,
	},

	{
		path: '/Exhibitions',
		element: MuseumExhibitions,
		isAuth: true,
	},

	{
		path: '/Paintings',
		element: Paintings,
		isAuth: true,
	},

	{
		path: '/post/:id',
		element: PostDetail,
		isAuth: false,
	},
]
