import { test, expect } from '@playwright/test'

test.describe('Route Handlers', () => {
  test('GET /api/articles should return articles', async ({ request }) => {
    const response = await request.get('/api/articles')

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/json')

    const articles = await response.json()
    expect(Array.isArray(articles)).toBe(true)
    expect(articles.length).toBeGreaterThan(0)
  })

  test('GET /api/articles/[id] should return 404 for missing articles', async ({
    request,
  }) => {
    const response = await request.get('/api/articles/nonexistent-id')
    expect(response.status()).toBe(404)
  })
})
