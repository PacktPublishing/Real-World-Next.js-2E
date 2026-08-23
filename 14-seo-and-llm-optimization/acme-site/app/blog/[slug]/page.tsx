import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      // Repeated because this object replaces the layout's openGraph
      siteName: 'Acme',
      locale: 'en_US',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    // openGraph.images is deliberately unset: opengraph-image.tsx in this
    // folder generates it. When a route has both, the metadata field wins and
    // the generated file is never referenced.
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: post.coverImage,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://acme.com/authors/${post.author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Acme',
      logo: {
        '@type': 'ImageObject',
        url: 'https://acme.com/logo.png',
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: `https://acme.com/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <footer>
          By {post.author.name} · {post.readingTimeMinutes} min read
        </footer>
      </article>
    </>
  )
}
