import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Chapter 13 — Error boundaries</h1>
      <p>
        <Link href="/dashboard">Dashboard</Link> — fails on first load, then
        recovers when you press &ldquo;Try again&rdquo;.
      </p>
    </main>
  )
}
