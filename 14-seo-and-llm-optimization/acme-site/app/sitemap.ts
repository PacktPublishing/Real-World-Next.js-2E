import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllDocPages } from '@/lib/docs'

export const revalidate = 3600 // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const docPages = await getAllDocPages()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://acme.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://acme.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const docRoutes: MetadataRoute.Sitemap = docPages.map((page) => ({
    url: `https://acme.com/docs/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes, ...docRoutes]
}
