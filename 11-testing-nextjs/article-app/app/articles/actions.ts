'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string
  const body = formData.get('body') as string

  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters' }
  }

  // In a real app, this would save to a database
  const article = { id: Date.now().toString(), title, body }

  revalidatePath('/articles')
  redirect(`/articles/${article.id}`)
}
