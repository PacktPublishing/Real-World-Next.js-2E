import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Chapter 13 — Observability with Sentry</h1>
      <p>
        <Link href="/orders">Orders</Link> — renders the traced
        <code> loadOrderSummary</code>, which emits custom spans and
        structured logs.
      </p>
    </main>
  )
}
