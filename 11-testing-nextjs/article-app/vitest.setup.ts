import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/node'

afterEach(() => {
  cleanup()
})

// Fail loudly if a test hits an endpoint we haven't mocked
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
