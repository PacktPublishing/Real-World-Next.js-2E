'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@tanstack/react-pacer'
import { type Product } from '@/lib/products'

async function searchProducts(term: string): Promise<Product[]> {
  const response = await fetch(
    `/api/products/search?q=${encodeURIComponent(term)}`
  )
  if (!response.ok) throw new Error('Search failed')
  return response.json()
}

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  // Trails searchTerm, updating 300ms after the last keystroke
  const [debouncedTerm] = useDebouncedValue(searchTerm, { wait: 300 })

  const { data, isFetching } = useQuery({
    queryKey: ['products', 'search', debouncedTerm],
    queryFn: () => searchProducts(debouncedTerm),
    enabled: debouncedTerm.length >= 2,
  })

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      {isFetching && <span>Searching...</span>}
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
