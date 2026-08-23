// Repository scaffolding, not printed in the chapter. Renders the traced
// loadOrderSummary so the spans above have a route to run on.
import { loadOrderSummary } from '@/lib/orders'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const summaries = []

  for (const id of ['1001', '1002']) {
    summaries.push(await loadOrderSummary(id))
  }

  return (
    <main>
      <h1>Orders</h1>
      <ul>
        {summaries.map(({ order, customer }) => (
          <li key={order.id}>
            #{order.id} — {customer.name} — ${order.total.toFixed(2)}
            {!customer.email && ' (no email on file)'}
          </li>
        ))}
      </ul>
    </main>
  )
}
