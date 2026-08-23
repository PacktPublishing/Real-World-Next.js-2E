import { getProducts } from '@/lib/products'
import { ProductList } from './product-list'

export default async function ProductsPage() {
  // Server-side: reads from the database or an internal API
  const products = await getProducts()
  return <ProductList products={products} />
}
