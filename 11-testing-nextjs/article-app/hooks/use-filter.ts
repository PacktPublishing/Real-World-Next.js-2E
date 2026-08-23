import { useState, useCallback, useMemo } from 'react'

export function useFilter<T>(
  items: T[],
  filterFn: (item: T, query: string) => boolean
) {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(
    () => (query ? items.filter((item) => filterFn(item, query)) : items),
    [items, query, filterFn]
  )

  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery.trim().toLowerCase())
  }, [])

  return { query, filteredItems, updateQuery }
}
