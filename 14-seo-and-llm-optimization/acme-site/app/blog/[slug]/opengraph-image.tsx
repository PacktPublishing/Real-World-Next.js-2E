import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Acme blog post'

// Read once at module scope, not per request
const interSemiBold = readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'))

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7 }}>Acme Blog</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {post?.title ?? 'Post not found'}
        </div>
        <div style={{ display: 'flex', gap: 8, fontSize: 28, opacity: 0.8 }}>
          {/* If the post is missing we still render a card rather than a
              404: this route can't call notFound(), because its job is to
              return an image, not a page. */}
          <span>{post?.author.name}</span>
          <span>·</span>
          <span>{post?.readingTimeMinutes} min read</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )
}
