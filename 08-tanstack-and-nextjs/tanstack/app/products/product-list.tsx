'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { type Product } from '@/lib/products'

export function ProductList({ products }: { products: Product[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const product = products[virtualRow.index]

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
              <div style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
