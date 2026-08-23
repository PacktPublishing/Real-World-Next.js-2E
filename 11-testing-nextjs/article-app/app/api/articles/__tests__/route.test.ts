import { describe, test, expect } from 'vitest'
import { GET } from '../route'

describe('GET /api/articles', () => {
  test('should return a list of articles as JSON', async () => {
    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBeGreaterThan(0)
    expect(body[0]).toHaveProperty('id')
    expect(body[0]).toHaveProperty('title')
  })
})
