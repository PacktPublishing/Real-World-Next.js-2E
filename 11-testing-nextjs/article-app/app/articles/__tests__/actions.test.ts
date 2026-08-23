import { describe, test, expect, vi } from 'vitest'
import { createArticle } from '../actions'

// Mock the Next.js server APIs before they are imported
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// These imports now receive the mocked versions.
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

describe('createArticle', () => {
  test('should return error when title is too short', async () => {
    const formData = new FormData()
    formData.set('title', 'Hi')
    formData.set('body', 'Some content')

    const result = await createArticle(formData)

    expect(result).toEqual({
      error: 'Title must be at least 3 characters',
    })
    expect(redirect).not.toHaveBeenCalled()
  })

  test('should revalidate and redirect on success', async () => {
    const formData = new FormData()
    formData.set('title', 'My new article')
    formData.set('body', 'Article content here')

    await createArticle(formData)

    expect(revalidatePath).toHaveBeenCalledWith('/articles')
    expect(redirect).toHaveBeenCalledWith(
      expect.stringMatching(/^\/articles\/\d+$/)
    )
  })
})
