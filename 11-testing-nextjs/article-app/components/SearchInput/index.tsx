'use client'

import { useState } from 'react'

export function SearchInput({
  onSearch,
}: {
  onSearch: (query: string) => void
}) {
  const [query, setQuery] = useState('')

  return (
    <div>
      <label htmlFor="search">Search articles</label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  )
}
