// Repository scaffolding, not printed in the chapter. Renders the traced
// loadOrderSummary so the spans and logs above have a route to run on.
import * as Sentry from '@sentry/nextjs'
import { loadOrderSummary } from '@/lib/orders'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const summaries = []

  for (const id of ['1001', '1002']) {
    try {
      summaries.push(await loadOrderSummary(id))
    } catch (error) {
      const err = error as { code?: string }
      // Errors with enough information to debug them
      Sentry.logger.error('Order summary failed to render', {
        orderId: id,
        errorCode: err.code,
      })
    }
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
