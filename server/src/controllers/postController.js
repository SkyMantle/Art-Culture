import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'
import fs from 'fs'
import multer from 'multer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import client from '../utils/elasticsearch.js'

const prisma = new PrismaClient()

// Derive __filename and __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Multer Storage Configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.join(__dirname, '../../uploads')
		// Ensure the upload directory exists
		fs.mkdirSync(uploadPath, { recursive: true })
		cb(null, uploadPath)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, uniqueSuffix + path.extname(file.originalname))
	},
})

// Multer File Filter
const fileFilter = (req, file, cb) => {
	const allowedTypes = /(jpg|jpeg|png|gif|webp)/
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	)
	const mimetype = allowedTypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb(new Error('Only images are allowed'))
	}
}

// Multer Upload Configuration
export const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 5 * 1080 * 1920 }, // 5 MB
})

export const createPost = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			if (req.file) {
				fs.unlinkSync(req.file.path)
			}
			return res.status(400).json({ errors: errors.array() })
		}

		const { title_en, title_uk, content_en, content_uk } = req.body
		const userId = req.user.id

		let imageUrl = null
		if (req.file) {
			// const file = req.file
			imageUrl = `/uploads/${req.file.filename}`
		}

		const post = await prisma.post.create({
			data: {
				title_en,
				title_uk,
				content_en,
				content_uk,
				images: imageUrl,
				author: { connect: { id: userId } },
			},
			//TODO: include id: true
			include: { author: { select: { email: true, id: true } } },
		})

		res.status(201).json(post)
	} catch (error) {
		next(error)
	}

	await client.index({
		index: 'posts',
		id: post.id,
		body: {
			title_en: post.title_en,
			title_uk: post.title_uk,
			content_en: post.content_en,
			content_uk: post.content_uk,
			authorId: post.author.id,
			createdAt: post.createdAt,
		},
	})
}

export const getAllPosts = async (req, res, next) => {
	try {
		const { authorId } = req.query
		const filter = authorId ? { authorId: parseInt(authorId) } : {}

		const posts = await prisma.post.findMany({
			where: filter,
			include: {
				author: {
					select: {
						email: true,
						id: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		})
		res.json(posts)
	} catch (error) {
		next(error)
	}
}

export const getPostById = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.id)
		if (isNaN(postId)) {
			return res.status(400).json({ error: 'Invalid post ID' })
		}
		const post = await prisma.post.findUnique({
			where: { id: postId },
			include: {
				author: {
					select: {
						email: true,
						id: true,
					},
				},
			},
		})

		if (!post) return res.status(404).json({ error: 'Post not found' })

		res.json(post)
	} catch (error) {
		console.error('Error fetching post:', error)
		next(error)
	}
}

export const getCreatorsPosts = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				author: {
					role: 'CREATOR',
				},
			},
			include: {
				author: {
					select: {
						id: true,
						email: true,
						title: true,
						// Include other fields if necessary
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		res.json({ posts })
	} catch (error) {
		console.error('Error fetching creator posts:', error)
		next(error)
	}
}

export const updatePost = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title_en, title_uk, content_en, content_uk, images } = req.body
		const userId = req.user.id

		// Verify ownership
		const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })
		if (!post) return res.status(404).json({ error: 'Post not found' })
		if (post.authorId !== userId)
			return res.status(403).json({ error: 'Unauthorized' })

		let imageUrl = post.images
		if (req.file) {
			if (post.images) {
				const oldImagePath = path.join(__dirname, '../../', post.images)
				fs.unlinkSync(oldImagePath)
			}
			imageUrl = `/uploads/${req.file.filename}`
		}
		// Update post
		const updatedPost = await prisma.post.update({
			where: { id: parseInt(id) },
			data: { title_en, title_uk, content_en, content_uk, images: imageUrl },
			include: { author: { select: { email: true, id: true } } },
		})

		res.json(updatedPost)
	} catch (error) {
		next(error)
	}
	await client.update({
		index: 'posts',
		id: id,
		body: {
			doc: {
				title_en: title_en,
				title_uk: title_uk,
				content_en: content_en,
				content_uk: content_uk,
			},
		},
	})
}

export const deletePost = async (req, res, next) => {
	try {
		const { id } = req.params
		const userId = req.user.id

		// Verify ownership
		const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })
		if (!post) return res.status(404).json({ error: 'Post not found' })
		if (post.authorId !== userId)
			return res.status(403).json({ error: 'Unauthorized' })

		// Delete image if exist
		if (post.images) {
			const imagePath = path.join(__dirname, '../../', post.images)
			fs.unlinkSync(imagePath)
		}

		// Delete post
		await prisma.post.delete({ where: { id: parseInt(id) } })

		res.json({ message: 'Post deleted successfully' })
	} catch (error) {
		next(error)
	}
}
