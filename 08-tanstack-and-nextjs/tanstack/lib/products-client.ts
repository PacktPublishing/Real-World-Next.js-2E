import { type Product } from '@/lib/products'

export type ProductPage = {
  products: Product[]
  hasMore: boolean
}

export async function fetchProducts(page: number): Promise<ProductPage> {
  const response = await fetch(`/api/products?page=${page}&limit=50`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}
