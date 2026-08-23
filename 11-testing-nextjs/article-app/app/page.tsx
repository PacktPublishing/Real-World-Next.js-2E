import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Chapter 11 — Testing Next.js</h1>
      <ul>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/articles/new">New article</Link>
        </li>
      </ul>
    </main>
  )
}
