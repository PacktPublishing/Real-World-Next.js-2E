'use server'

import { revalidatePath } from 'next/cache'
import { profileSchema } from '@/lib/schemas/profile'

export async function updateProfile(input: unknown) {
  const parsed = profileSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false as const, error: 'Invalid profile data' }
  }

  // In a real app, persist parsed.data to the database here

  revalidatePath('/profile')
  return { success: true as const }
}
