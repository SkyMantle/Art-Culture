// src/routes/userRoutes.js

import express from 'express'
import {
	getArtTermsByLang,
	getArtTermsByLetter,
	getArtTermById,
} from '../controllers/artTermsController.js'

const router = express.Router()

// Route to get all creators
router.get('/letters/:lang', getArtTermsByLang)
router.get('/by-letter/:letter', getArtTermsByLetter)
router.get('/:id', getArtTermById)

export default router

