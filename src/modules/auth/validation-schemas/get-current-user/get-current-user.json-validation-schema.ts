import { z } from 'zod'

export const getCurrentUserSchema = z.object({
  userId: z.number().int('User ID must be an integer'),
})

export type GetCurrentUserInput = z.infer<typeof getCurrentUserSchema>
