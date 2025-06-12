import { z } from 'zod'

export const resetPasswordSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
