// src/utils/api.js

import axios from 'axios'
// Determine the host in both browser and server environments
const host =
  typeof window !== 'undefined'
    ? window.location.hostname
    : process.env.NEXT_PUBLIC_HOST || 'localhost'
const isLocalhost = host === 'localhost' || host === '127.0.0.1'
// Create an instance of axios with default configurations
const API = axios.create({
        baseURL: isLocalhost
                ? `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')}/api/`
                : process.env.NEXT_PUBLIC_PROD_API_URL || 'https://art.playukraine.com/api/',
	timeout: 10000, // Optional: set a timeout for requests
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
        config => {
                let token
                if (typeof window !== 'undefined') {
                        token = localStorage.getItem('token')
                } else {
                        token = process.env.TOKEN
                }
                if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                }
                return config
        },
        error => {
                return Promise.reject(error)
        }
)

// Add a response interceptor to handle responses globally
API.interceptors.response.use(
        response => response,
        error => {
                // You can handle specific status codes here
                if (error.response && error.response.status === 401) {
                        // Handle unauthorized access (e.g., redirect to login)
                        if (typeof window !== 'undefined') {
                                window.location.href = '/login'
                        }
                }
                return Promise.reject(error)
        }
)

export default API
