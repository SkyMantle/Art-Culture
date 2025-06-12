import { Router, Request } from 'express'

import validateRequest from '../../../shared/middlewares/validate-request.middleware'
import authController from '../controllers/auth.controller'
// import authenticateToken from '../middleware/authMiddleware.js'
// import authorize from '../middleware/roleMIddleware.js'
// import uploadProfileLogo from '../middleware/uploadProfileLogoImages.js'
import { registerValidator } from '../validators/register.validator'
import { loginValidator } from '../validators/login.validator'
import { resetPasswordValidator } from '../validators/reset-password.validator'
import { getCurrentUserValidator } from '../validators/get-current-user.validator'
import { updateUserProfileValidator } from '../validators/update-user-profile.validator'

const authRoute = Router()

authRoute.post(
  '/register',
  // uploadProfileLogo.upload,
  // (req, res, next) => {
  //   if (!req.file) {
  //     return next()
  //   }
  
  //   uploadProfileLogo.processImages(req, res, next)
  // },
  validateRequest(registerValidator),
  authController.register,
)

// Self-Registration Route - Accessible to All
authRoute.post(
  '/signup',
  // authenticateToken,
  // authorize('ADMIN'),
  validateRequest(loginValidator),
  authController.registerUser,
)

authRoute.post(
  '/login',
  validateRequest(loginValidator),
  authController.login,
)

authRoute.post(
  '/reset-password',
  validateRequest(resetPasswordValidator),
  authController.resetPassword,
)

authRoute.post(
  '/reset-password/:token',
  authController.resetPasswordConfirm,
)

authRoute.get(
  '/me',
  // authenticateToken,
  // validateRequest(getCurrentUserValidator),
  authController.getCurrentUser,
)

// Update User Profile
authRoute.put(
  '/me',
  // authenticateToken,
  // uploadProfileLogo.upload,
  // (req, res, next) => {
  //   if (!req.file) {
  //     return next()
  //   }

  //   uploadProfileLogo.processImages(req, res, next)
  // },
  validateRequest(updateUserProfileValidator),
  authController.updateUserProfile,
)

export default authRoute
