import express from 'express'
import { body, validationResult } from 'express-validator'
import {
	createExhibitions,
	deleteExhibition,
	getAllExhibitions,
	getExhibitionById,
	getMyExhibitions,
} from '../controllers/exhibitionController.js'
import authenticateToken from '../middleware/authMiddleware.js'
import uploadExhibition from '../middleware/exhibitionImageUploader.js'
import authorize from '../middleware/roleMIddleware.js'

const router = express.Router()

router.post(
	'/',

	authenticateToken,
	authorize('MUSEUM', 'CREATOR', 'ADMIN'),
	//uploadExhibition.array('exhibitionImages', 10),
	uploadExhibition.upload,
	uploadExhibition.processImages,
	[
		body('title_en').notEmpty().withMessage('English title is required'),
		body('title_uk').notEmpty().withMessage('Ukrainian title is required'),
		body('description_en')
			.notEmpty()
			.withMessage('English description is required'),
		body('description_uk')
			.notEmpty()
			.withMessage('Ukrainian description is required'),
		body('location_en').notEmpty().withMessage('English location is required'),
		body('location_uk')
			.notEmpty()
			.withMessage('Ukrainian location is required'),
	],
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	},
	createExhibitions
)

router.get('/', getAllExhibitions)
router.get(
	'/my-exhibitions',
	authenticateToken,

	getMyExhibitions
)
router.get('/:id', getExhibitionById)

router.delete('/:id', authenticateToken, deleteExhibition)

export default router
