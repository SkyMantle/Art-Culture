import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './assets/screens/home/Home.jsx'
import '/src/styles/index.scss'
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
