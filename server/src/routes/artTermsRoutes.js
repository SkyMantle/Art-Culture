// src/routes/userRoutes.js

import express from 'express'
import {
	getArtTermsByLang,
} from '../controllers/artTermsController.js'

const router = express.Router()

// Route to get all creators
router.get('/:lang', getArtTermsByLang)

export default router

