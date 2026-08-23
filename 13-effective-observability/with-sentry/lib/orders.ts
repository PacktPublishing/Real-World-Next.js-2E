import * as Sentry from '@sentry/nextjs'
import { db } from '@/lib/db'

// This is the function behind the chapter's Friday-afternoon outage. When the
// summary page is slow, the trace shows whether the order query or the
// customer lookup is responsible.
export async function loadOrderSummary(orderId: string) {
  return Sentry.startSpan(
    { name: 'load-order-summary', op: 'function' },
    async () => {
      const order = await Sentry.startSpan(
        { name: 'fetch-order', op: 'db.query' },
        () => db.orders.findUnique({ where: { id: orderId } })
      )

      const customer = await Sentry.startSpan(
        { name: 'fetch-customer', op: 'db.query' },
        () => db.customers.findUnique({ where: { id: order.customerId } })
      )

      // Instead of console.log('Order summary rendered', orderId)
      Sentry.logger.info('Order summary rendered', { orderId })

      // Warnings for things that aren't broken but probably shouldn't be
      // happening. This is the one that would have caught our outage:
      // a null on a field the page treats as guaranteed.
      if (!customer.email) {
        Sentry.logger.warn('Missing customer email on order', {
          orderId,
          customerId: order.customerId,
        })
      }

      return { order, customer }
    }
  )
}
