import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import errorHandler from './src/middleware/errorHandler.js'
import authRoutes from './src/routes/authRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())

// Security HTTP headers
app.use(helmet())

// CORS Configuration
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)

// Rate Limiting
const limiter = rateLimit({
	windowMs: 0.2 * 60 * 1000, // 2 sec
	max: 10000, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later.',
})
app.use(limiter)

// HTTP request logger
app.use(morgan('combined'))

// Middleware to parse JSON
app.use(express.json())

// Enforce HTTPS
if (process.env.NODE_ENV === 'production') {
	app.use((req, res, next) => {
		if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
			next()
		} else {
			res.redirect(`https://${req.headers.host}${req.url}`)
		}
	})
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// Error Handling Middleware
app.use(errorHandler)
app.get('/api/test', (req, res) => {
	res.json({ message: 'API is working!' })
})

export default app