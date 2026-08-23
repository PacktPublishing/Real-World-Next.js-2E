import { describe, test, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/node'
import { getArticle } from '../page'

describe('getArticle', () => {
  test('should surface an error when the article API fails', async () => {
    server.use(
      http.get('https://api.example.com/articles/:id', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(getArticle('1')).rejects.toThrow('Article not found')
  })
})
