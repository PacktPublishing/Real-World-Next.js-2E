import Link from 'next/link'
import { composeArticleSlug, trimTextToLength } from '@/lib/utils'

type ArticleCardProps = {
  id: string
  title: string
  body: string
  author: {
    id: string
    name: string
  }
}

export default function ArticleCard({
  id,
  title,
  body,
  author,
}: ArticleCardProps) {
  const slug = composeArticleSlug(title, id)

  return (
    <Link href={`/articles/${slug}`}>
      <article>
        <h2>{title}</h2>
        <p>{trimTextToLength(body, 100)}</p>
        <span>By {author.name}</span>
      </article>
    </Link>
  )
}
