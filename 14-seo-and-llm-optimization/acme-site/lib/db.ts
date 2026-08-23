// Repository scaffolding, not printed in the chapter.
//
// The chapter's data helpers call a `db` client in the shape an ORM such as
// Prisma exposes. This is an in-memory stand-in with that shape.
export type Author = {
  name: string
  slug: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  readingTimeMinutes: number
  publishedAt: Date
  updatedAt: Date
  author: Author
}

const authors: Record<string, Author> = {
  jdoe: { name: 'John Doe', slug: 'john-doe' },
  jroe: { name: 'Jane Roe', slug: 'jane-roe' },
}

const posts: Post[] = [
  {
    slug: 'edge-caching-explained',
    title: 'Edge caching explained',
    excerpt:
      'Edge caching stores rendered responses at CDN nodes near the user, reducing latency from hundreds of milliseconds to tens.',
    coverImage: 'https://acme.com/covers/edge-caching.png',
    readingTimeMinutes: 7,
    publishedAt: new Date('2026-04-22T09:00:00Z'),
    updatedAt: new Date('2026-06-02T14:30:00Z'),
    author: authors.jdoe,
  },
  {
    slug: 'funnel-analysis-from-first-principles',
    title: 'Funnel analysis from first principles',
    excerpt:
      'A funnel measures how many users survive each step of a flow, which turns a vague sense that "checkout is broken" into a number.',
    coverImage: 'https://acme.com/covers/funnels.png',
    readingTimeMinutes: 11,
    publishedAt: new Date('2026-05-14T09:00:00Z'),
    updatedAt: new Date('2026-05-14T09:00:00Z'),
    author: authors.jroe,
  },
]

export type DocPage = { slug: string; title: string; updatedAt: Date }

const docPages: DocPage[] = [
  { slug: 'quickstart', title: 'Quickstart', updatedAt: new Date('2026-06-01') },
  { slug: 'api', title: 'API reference', updatedAt: new Date('2026-06-10') },
  { slug: 'sdks', title: 'SDK guides', updatedAt: new Date('2026-05-20') },
]

export type Product = { slug: string; name: string; updatedAt: Date }

export const db = {
  posts: {
    async findFirst({ where }: { where: { slug: string } }) {
      return posts.find((post) => post.slug === where.slug) ?? null
    },
    async findMany({ take }: { take?: number } = {}) {
      return take ? posts.slice(0, take) : posts
    },
  },
  docPages: {
    async findMany() {
      return docPages
    },
  },
  products: {
    async findMany({
      skip,
      take,
    }: {
      skip: number
      take: number
    }): Promise<Product[]> {
      // Pretend we have 200,000 products
      const total = 200_000
      const end = Math.min(skip + take, total)
      const result: Product[] = []
      for (let i = skip; i < end; i++) {
        result.push({
          slug: `product-${i + 1}`,
          name: `Product ${i + 1}`,
          updatedAt: new Date('2026-06-01'),
        })
      }
      return result
    },
  },
}
