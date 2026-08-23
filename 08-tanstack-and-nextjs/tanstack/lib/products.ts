// Server-side data module. Client Components may import the Product *type*
// from here (type imports erase at compile time), but never getProducts:
// browser-side fetching lives in lib/products-client.ts.
export type Product = {
  id: number
  name: string
  price: number
}

const CATEGORIES = [
  'Keyboard',
  'Monitor',
  'Desk Lamp',
  'Headphones',
  'Webcam',
  'Microphone',
  'Docking Station',
  'Standing Desk',
]

const FINISHES = ['Matte', 'Brushed', 'Anodized', 'Walnut', 'Graphite']

// Stands in for whatever data access the application uses: a database query
// or a call to an internal service. It is deterministic so the examples in
// this chapter render the same list on every run.
function buildCatalog(size: number): Product[] {
  return Array.from({ length: size }, (_, index) => {
    const category = CATEGORIES[index % CATEGORIES.length]
    const finish = FINISHES[index % FINISHES.length]
    return {
      id: index + 1,
      name: `${finish} ${category} #${index + 1}`,
      // Deterministic pseudo-price between 19.99 and 519.99
      price: Number((19.99 + ((index * 37) % 500)).toFixed(2)),
    }
  })
}

const catalog = buildCatalog(10_000)

export async function getProducts(): Promise<Product[]> {
  return catalog
}

export async function getProductPage(
  page: number,
  limit: number
): Promise<{ products: Product[]; hasMore: boolean }> {
  const start = page * limit
  const products = catalog.slice(start, start + limit)
  return { products, hasMore: start + limit < catalog.length }
}

export async function searchProducts(term: string): Promise<Product[]> {
  const needle = term.trim().toLowerCase()
  if (!needle) return []
  return catalog
    .filter((product) => product.name.toLowerCase().includes(needle))
    .slice(0, 100)
}
