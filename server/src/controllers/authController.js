import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import prisma from '../../prismaClient.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmails.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const register = async (req, res, next) => {
	try {
		// Handle Validation Errors
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password, role, title, bio } = req.body

		// Access the uploaded file
		const profileImage = req.file
			? `../../uploads/profileImages/${req.file.filename}`
			: null

		// Check if user exists
		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' })
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create user
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				images: profileImage,
				role: role || 'USER',
				title,
				bio,
			},
		})
		console.log('User object after creation:', user)
		const token = generateToken(user)

		const { password: pwd, ...userWithoutPassword } = user
		console.log('Request body:', req.body)
		console.log('Uploaded file:', req.file)

		res.status(201).json({
			token,
			user: userWithoutPassword,
			message: 'user created successfully',
		})
	} catch (error) {
		next(error)
	}
}

// src/controllers/authController.js

export const registerUser = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		// Check if user exists
		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' })
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create user with default role 'USER'
		const user = await prisma.user.create({
			data: { email, password: hashedPassword, role: 'USER' },
		})

		console.log('User object after self-registration:', user)
		const token = generateToken(user)

		const { password: pwd, ...userWithoutPassword } = user

		res.status(201).json({
			token,
			user: userWithoutPassword,
			message: 'User created successfully',
		})
	} catch (error) {
		next(error)
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		// Find user
		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) return res.status(401).json({ error: 'Invalid credentials' })

		// Compare passwords
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword)
			return res.status(401).json({ error: 'Invalid credentials' })

		console.log('User object before token generation:', user)

		// Generate token
		const token = generateToken(user)

		const { password: pwd, ...userWithoutPassword } = user

		res.json({ token, user: userWithoutPassword })
	} catch (error) {
		console.error('Login error:', error)
		next(error)
	}
}

export const resetPassword = async (req, res, next) => {
	try {
		const { email } = req.body

		// Find user
		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) return res.status(404).json({ error: 'User not found' })

		// Generate reset token
		const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})

		// Update user with reset token and expiry
		await prisma.user.update({
			where: { email },
			data: {
				resetToken,
				resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
			},
		})

		// Send reset email
		const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`
		await sendEmail(
			user.email,
			'Password Reset Request',
			`Click the link to reset your password: ${resetLink}`
		)

		res.json({ message: 'Password reset link sent to email' })
	} catch (error) {
		next(error)
	}
}

export const resetPasswordConfirm = async (req, res, next) => {
	try {
		const { token } = req.params
		const { newPassword } = req.body

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const userId = decoded.id

		// Find user
		const user = await prisma.user.findUnique({ where: { id: userId } })
		if (!user) return res.status(404).json({ error: 'User not found' })

		// Check if token matches and is not expired
		if (user.resetToken !== token || user.resetTokenExpiry < new Date()) {
			return res.status(400).json({ error: 'Invalid or expired token' })
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10)

		// Update password and remove reset token
		await prisma.user.update({
			where: { id: userId },
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			},
		})

		res.json({ message: 'Password reset successful' })
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			return res.status(400).json({ error: 'Invalid token' })
		}
		next(error)
	}
}

export const getCurrentUser = async (req, res, next) => {
	try {
		const userId = req.user.id
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				role: true,
				title: true,
				bio: true,
				images: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (!user) return res.status(404).json({ error: 'User not found' })

		res.json({ user })
	} catch (error) {
		next(error)
	}
}

export const updateUserProfile = async (req, res, next) => {
	try {
		const { title, bio } = req.body
		const user = req.user
		let profileImage = user.images
		if (req.file) {
			profileImage = `../../uploads/profileImages/${req.file.filename}`

			if (user.images) {
				const oldImagePath = path.join(__dirname, '../../', user.images)
				try {
					await fs.promises.unlink(oldImagePath)
					console.log('Old image deleted successfully: ${oldImagePath}')
				} catch (err) {
					if (err.code !== 'ENOENT') {
						console.error('Failed to delete old image:', err)
					}
				}
			}
		}
		const updateUserProfile = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				title: title || user.title,
				bio: bio || user.bio,
				images: profileImage,
			},
			select: {
				id: true,
				email: true,
				role: true,
				title: true,
				bio: true,
				images: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		res.json({
			user: updateUserProfile,
			message: 'Profile updated successfully',
		})
	} catch (error) {
		console.error('Error updating user profile:', error)
		next(error)
	}
}
