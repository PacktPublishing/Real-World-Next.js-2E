import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Chapter 13 — OpenTelemetry</h1>
      <p>
        <Link href="/orders">Orders</Link> — renders the traced
        <code> loadOrderSummary</code>, written against the vendor-neutral
        OTel API.
      </p>
    </main>
  )
}
