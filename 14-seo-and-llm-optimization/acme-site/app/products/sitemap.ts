import type { MetadataRoute } from 'next'
import { getProductsPage } from '@/lib/products'

export async function generateSitemaps() {
  // Pretend we have 200,000 products. We need 4 sitemaps, each with 50,000.
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>
}): Promise<MetadataRoute.Sitemap> {
  const sitemapId = Number(await id)
  const products = await getProductsPage({
    page: sitemapId,
    pageSize: 50000,
  })

  return products.map((product) => ({
    url: `https://acme.com/products/${product.slug}`,
    lastModified: product.updatedAt,
  }))
}
