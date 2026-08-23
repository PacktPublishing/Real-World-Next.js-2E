type Article = {
  id: string
  title: string
  body: string
  author: string
}

export function ArticleDetails({ article }: { article: Article }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <footer>By {article.author}</footer>
    </article>
  )
}
