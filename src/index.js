import 'leaflet/dist/leaflet.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from '/src/assets/screens/home/Home.jsx'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
