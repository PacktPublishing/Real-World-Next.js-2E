import ArticleCard from '@/components/ArticleCard'
import { articles } from './articles'

export default function ArticlesPage() {
  return (
    <main>
      <h1>Articles</h1>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </main>
  )
}
