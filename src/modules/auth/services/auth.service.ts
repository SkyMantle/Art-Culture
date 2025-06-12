import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Prisma, User } from '@prisma/client'

import ResetPasswordConfirmInput from '../types/interfaces/service-inputs/reset-password-confirm.input'
import appPrismaClient from '../../../data/app-prisma-client'
import LoginInput from '../types/interfaces/service-inputs/login.input'
import RegisterUserInput from '../types/interfaces/service-inputs/register-user.input'
import LoginOutput from '../types/interfaces/service-outputs/login.output'
import RegisterOutput from '../types/interfaces/service-outputs/register.output'
import GetCurrentUserOutput from '../types/interfaces/service-outputs/get-current-user.output'
import UpdateUserProfileOutput from '../types/interfaces/service-outputs/update-user-profile.output'
import GetCurrentUserInput from '../types/interfaces/service-inputs/get-current-user.input'
import UpdateUserProfileInput from '../types/interfaces/service-inputs/update-user-profile.input'
import getObjectWithoutKeys from '../../../shared/utils/get-object-without-keys'
import ResetPasswordInput from '../types/interfaces/service-inputs/reset-password.input'
import { sendEmail } from '../../../shared/utils/sendEmails.js'
import { generateToken } from '../../../shared/utils/generateToken.js'

const authService = {
  async register(input: RegisterUserInput): Promise<RegisterOutput> {

    const existingUser = await appPrismaClient.user.findUnique({ where: { email: input.email } })
    
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)
    const userData: Partial<User> = {
      email: input.email,
      password: hashedPassword,
      role: input.role || 'USER',
      title: input.title,
      bio: input.bio,
    }

    if (input.role === 'MUSEUM') {
      userData.country = input.country || null
      userData.city = input.city || null
      userData.street = input.street || null
      userData.house_number = input.house_number || null
      userData.postcode = input.postcode || null
      userData.lat = input.lat ? parseFloat(input.lat) : null
      userData.lon = input.lon ? parseFloat(input.lon) : null
    }

    const user = await appPrismaClient.user.create({
      data: userData as Prisma.UserCreateInput,
    })

    const token = generateToken(user)

    await sendEmail(
      user.email,
      'Підтвердження реестрації',
      `Дякуємо за реестрацію на проекті ArtPlayUkraine.`,
      `<p>Дякуємо за реестрацію на проекті ArtPlayUkraine.
        <a href='${process.env.CLIENT_URL}'>Перейти до сайту</a>
        </p>`,
    )

    return {
      token,
      user: getObjectWithoutKeys(user, ['password']),
      message: 'User created successfully',
    }
  },

  registerUser: async (data: RegisterUserInput): Promise<RegisterOutput> => {
    const { email, password } = data

    const existingUser = await appPrismaClient.user.findUnique({ where: { email } })

    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await appPrismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER',
      },
    })

    const token = generateToken(user)

    return {
      token,
      user: getObjectWithoutKeys(user, ['password']),
      message: 'User created successfully',
    }
  },

  async login(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input

    const user = await appPrismaClient.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken(user)

    return {
      token,
      user: getObjectWithoutKeys(user, ['password']),
    }
  },

  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const { email } = input

    const user = await appPrismaClient.user.findUnique({ where: { email } })

    if (!user) {
      throw new Error('User not found')
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    await appPrismaClient.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires: new Date(Date.now() + 3600000),
      },
    })
  },

  async resetPasswordConfirm(input: ResetPasswordConfirmInput): Promise<void> {
    const { userId, token, newPassword } = input

    try {
      jwt.verify(token, process.env.JWT_SECRET)
    }
    
    catch (error) {
      throw new Error('Invalid or expired token')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await appPrismaClient.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    })
  },

  async getCurrentUser(input: GetCurrentUserInput): Promise<GetCurrentUserOutput> {
    const { userId } = input

    const user = await appPrismaClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        title: true,
        bio: true,
        country: true,
        city: true,
        street: true,
        house_number: true,
        postcode: true,
        lat: true,
        lon: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return { user }
  },

  async updateUserProfile(input: UpdateUserProfileInput): Promise<UpdateUserProfileOutput> {
    const { userId, data: updateData } = input

    const user = await appPrismaClient.user.update({
      where: { id: userId },
      data: updateData,
    })

    return { user }
  },
}

export default authService
