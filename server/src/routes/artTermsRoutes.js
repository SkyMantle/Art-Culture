import express from 'express'
import {
	getArtTermsByLang,
	getLastArtTerms,
	getArtTermsByLetter,
	getPagesArtTerms,
	getArtTermById,
} from '../controllers/artTermsController.js'
import { authenticateToken, authorize } from '../middleware/index.js'

const router = express.Router()

// Route to get all creators
router.get('/letters/:lang', getArtTermsByLang)
router.get('/last-terms/:lang', getLastArtTerms)
router.get('/', authenticateToken, authorize('ADMIN'), getPagesArtTerms)
router.get('/by-letter/:letter', getArtTermsByLetter)
router.get('/:id', getArtTermById)

export default router

