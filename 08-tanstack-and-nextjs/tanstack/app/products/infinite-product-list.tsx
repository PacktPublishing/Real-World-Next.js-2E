'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useEffect } from 'react'
import { fetchProducts } from '@/lib/products-client'

export function InfiniteProductList() {
  const parentRef = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['products'],
      queryFn: ({ pageParam }) => fetchProducts(pageParam),
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length : undefined,
      initialPageParam: 0,
    })

  const allProducts = data?.pages.flatMap((page) => page.products) ?? []

  const virtualizer = useVirtualizer({
    // One extra row acts as the "loading more" placeholder
    count: hasNextPage ? allProducts.length + 1 : allProducts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })

  const virtualItems = virtualizer.getVirtualItems()

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()

    if (!lastItem) return

    if (
      lastItem.index >= allProducts.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allProducts.length,
    isFetchingNextPage,
    virtualItems,
  ])

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allProducts.length - 1
          const product = allProducts[virtualRow.index]

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? (
                <div>Loading more...</div>
              ) : (
                <div style={{ padding: '16px' }}>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
