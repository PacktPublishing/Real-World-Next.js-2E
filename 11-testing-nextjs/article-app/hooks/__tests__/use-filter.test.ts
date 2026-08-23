import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFilter } from '../use-filter'

const articles = [
  { id: '1', title: 'Getting started with Next.js' },
  { id: '2', title: 'Understanding React Server Components' },
  { id: '3', title: 'Advanced Next.js patterns' },
]

const filterByTitle = (item: (typeof articles)[0], query: string) =>
  item.title.toLowerCase().includes(query)

describe('useFilter', () => {
  test('should return all items when query is empty', () => {
    const { result } = renderHook(() => useFilter(articles, filterByTitle))
    expect(result.current.filteredItems).toHaveLength(3)
  })

  test('should filter items matching the query', () => {
    const { result } = renderHook(() => useFilter(articles, filterByTitle))

    act(() => {
      result.current.updateQuery('Next.js')
    })

    expect(result.current.filteredItems).toHaveLength(2)
    expect(result.current.filteredItems[0].title).toContain('Next.js')
  })

  test('should trim and lowercase the query', () => {
    const { result } = renderHook(() => useFilter(articles, filterByTitle))

    act(() => {
      result.current.updateQuery('  REACT  ')
    })

    expect(result.current.query).toBe('react')
    expect(result.current.filteredItems).toHaveLength(1)
  })
})
