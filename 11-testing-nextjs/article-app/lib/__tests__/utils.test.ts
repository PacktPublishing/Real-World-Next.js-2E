import { describe, test, expect } from 'vitest'
import {
  trimTextToLength,
  slugify,
  composeArticleSlug,
  extractArticleIdFromSlug,
} from '../utils'

describe('trimTextToLength', () => {
  test('should cut a string that exceeds the max length', () => {
    const input = 'This is a 35 characters long string'
    const result = trimTextToLength(input, 10)
    expect(result).toBe('This is a ...')
  })

  test('should not cut a string shorter than the max length', () => {
    const input = '7 chars'
    const result = trimTextToLength(input, 10)
    expect(result).toBe('7 chars')
  })

  test('should return the exact string when length equals max', () => {
    const input = '1234567890'
    const result = trimTextToLength(input, 10)
    expect(result).toBe('1234567890')
  })
})

describe('slugify', () => {
  test('should convert a string to URL-safe format', () => {
    expect(slugify('This is a string to slugify')).toBe(
      'this-is-a-string-to-slugify'
    )
  })

  test('should remove special characters', () => {
    expect(slugify('Hello World!@#$%^&*()')).toBe('hello-world')
  })

  test('should handle multiple consecutive spaces', () => {
    expect(slugify('too   many   spaces')).toBe('too-many-spaces')
  })
})

describe('composeArticleSlug', () => {
  test('should create a slug from title and id', () => {
    const result = composeArticleSlug('Healthy Summer Soup', 'abc123')
    expect(result).toBe('healthy-summer-soup-abc123')
  })
})

describe('extractArticleIdFromSlug', () => {
  test('should extract the id from a composed slug', () => {
    const result = extractArticleIdFromSlug('healthy-summer-soup-abc123')
    expect(result).toBe('abc123')
  })
})
