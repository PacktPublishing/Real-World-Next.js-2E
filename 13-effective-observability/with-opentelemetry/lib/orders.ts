import { trace, SpanStatusCode } from '@opentelemetry/api'
import { db } from '@/lib/db'

const tracer = trace.getTracer('our-app')

// Deliberately the same function the chapter instruments with Sentry,
// rewritten against the OTel API. OTel is more verbose, and we manage the
// span's lifecycle ourselves rather than handing a callback to startSpan.
// What we get back is a function that reports to any OTLP backend without a
// rewrite.
export async function loadOrderSummary(orderId: string) {
  return tracer.startActiveSpan('load-order-summary', async (span) => {
    try {
      span.setAttribute('order.id', orderId)

      const order = await db.orders.findUnique({ where: { id: orderId } })
      const customer = await db.customers.findUnique({
        where: { id: order.customerId },
      })

      if (!customer.email) {
        span.addEvent('missing-customer-email')
      }

      return { order, customer }
    } catch (error) {
      span.recordException(error as Error)
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: 'Order summary failed',
      })
      throw error
    } finally {
      span.end()
    }
  })
}
