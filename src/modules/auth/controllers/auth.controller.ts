import { Request, Response } from 'express'

import loginUseCase from '../use-cases/login.use-case'
import registerUseCase from '../use-cases/register.use-case'
import resetPasswordUseCase from '../use-cases/reset-password.use-case'
import resetPasswordConfirmUseCase from '../use-cases/reset-password-confirm.use-case'
import getCurrentUserUseCase from '../use-cases/get-current-user.use-case'
import updateUserProfileUseCase from '../use-cases/update-user-profile.use-case'
import registerUserUseCase from '../use-cases/register-user.use-case'

const authController = {
  async register(req: Request, res: Response) {
    const result = await registerUseCase.execute(req.body)

    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },

  async registerUser(req: Request, res: Response) {
    const result = await registerUserUseCase.execute(req.body)

    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },

  async login(req: Request, res: Response) {
    const result = await loginUseCase.execute(req.body)

    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },

  async resetPassword(req: Request, res: Response) {
    const result = await resetPasswordUseCase.execute(req.body)

    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },

  async resetPasswordConfirm(req: Request, res: Response) {
    const result = await resetPasswordConfirmUseCase.execute(req.body)

    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },

  async getCurrentUser(req: Request, res: Response) {
    const result = await getCurrentUserUseCase.execute({
      userId: req.user.id,
    })
    
    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },

  async updateUserProfile(req: Request, res: Response) {
    const body = { ...req.body }
    if (req.file) {
      body.profileImagePath = req.file.path
      if (req.file.originalname.toLowerCase().endsWith('.svg')) {
        body.museumLogoPath = req.file.path
      }
    }
    const result = await updateUserProfileUseCase.execute({
      userId: req.user.id,
      ...body,
    })

    res
      .status(result.metadata.statusCode)
      .json(result.data)
  },
}

export default authController
