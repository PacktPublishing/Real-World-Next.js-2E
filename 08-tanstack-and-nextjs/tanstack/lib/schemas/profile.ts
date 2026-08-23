import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email'),
  bio: z.string().max(500),
})

export type ProfileValues = z.infer<typeof profileSchema>
