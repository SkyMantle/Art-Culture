import { z } from 'zod'

const roles = [
  'ADMIN',
  'USER',
  'MUSEUM',
  'CREATOR',
  'EDITOR',
  'AUTHOR',
  'EXHIBITION',
]

const registerJsonValidationSchema = z.object({
  email: z
    .string({ message: 'should be a string' })
    .email({ message: 'should be a valid email' }),
  password: z
    .string({ message: 'should be a string' })
    .min(6, { message: 'should be at least 6 characters long' }),
  role: z
    .enum(
      [
        'ADMIN',
        'USER',
        'MUSEUM',
        'CREATOR',
        'EDITOR',
        'AUTHOR',
        'EXHIBITION',
      ],
      { message: `should be one of: ${roles.join(', ')}` }
    ),
})

export default registerJsonValidationSchema
