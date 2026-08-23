import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main>
      <h1>Acme</h1>
      <h2>Blog</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Generated files</h2>
      <ul>
        <li>
          <Link href="/robots.txt">/robots.txt</Link>
        </li>
        <li>
          <Link href="/sitemap.xml">/sitemap.xml</Link>
        </li>
        <li>
          <Link href="/llms.txt">/llms.txt</Link>
        </li>
        <li>
          <Link href="/products/sitemap/0.xml">/products/sitemap/0.xml</Link>
        </li>
      </ul>
    </main>
  )
}
