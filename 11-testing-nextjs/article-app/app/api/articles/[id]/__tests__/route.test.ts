import { describe, test, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '../route'

describe('GET /api/articles/[id]', () => {
  test('should return 200 with article data for valid id', async () => {
    const request = new NextRequest('http://localhost:3000/api/articles/1')
    const response = await GET(request, { params: Promise.resolve({ id: '1' }) })
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.title).toBe('Getting started with Next.js')
  })

  test('should return 404 for nonexistent id', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/articles/nonexistent'
    )
    const response = await GET(request, {
      params: Promise.resolve({ id: 'nonexistent' }),
    })

    expect(response.status).toBe(404)
  })
})
