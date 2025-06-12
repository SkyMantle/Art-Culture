import { z } from 'zod'

export const updateUserProfileSchema = z.object({
  userId: z.number().int('User ID must be an integer'),
  data: z.object({
    title: z.string().optional(),
    bio: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    house_number: z.string().optional(),
    postcode: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    profileImagePath: z.string().optional(),
    museumLogoPath: z.string().optional(),
  }),
})

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>
