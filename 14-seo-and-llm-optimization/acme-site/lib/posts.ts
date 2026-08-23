import { cache } from 'react'
import { db } from '@/lib/db'

// Wrapped in React's cache helper so it runs once per request no matter how
// many components call it: generateMetadata and the page component both do.
export const getPostBySlug = cache(async (slug: string) => {
  return db.posts.findFirst({ where: { slug } })
})

export async function getAllPosts({ limit }: { limit?: number } = {}) {
  return db.posts.findMany({ take: limit })
}
