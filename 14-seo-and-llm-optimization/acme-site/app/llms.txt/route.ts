import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = await getAllPosts({ limit: 20 })

  const body = `# Acme

> Acme is a developer-first analytics platform for product teams.

## Documentation
- [Quickstart](https://acme.com/docs/quickstart): set up in 5 minutes
- [API reference](https://acme.com/docs/api)

## Recent posts
${posts.map((p) => `- [${p.title}](https://acme.com/blog/${p.slug}): ${p.excerpt}`).join('\n')}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export const revalidate = 3600
