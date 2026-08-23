import Link from 'next/link'
import { ArticleDetails } from './article-details'

// Exported so our tests can exercise it directly
export async function getArticle(id: string) {
  const response = await fetch(`https://api.example.com/articles/${id}`)
  if (!response.ok) throw new Error('Article not found')
  return response.json()
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await getArticle(id)
  return (
    <>
      <ArticleDetails article={article} />
      <Link href="/articles">All articles</Link>
    </>
  )
}
