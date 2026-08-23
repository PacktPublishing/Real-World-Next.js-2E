import { and, eq } from 'drizzle-orm'
import type Stripe from 'stripe'
import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('Missing signature', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const checkout = event.data.object
      const bookingId = checkout.metadata?.bookingId

      if (bookingId && checkout.payment_status === 'paid') {
        await db
          .update(booking)
          .set({ status: 'confirmed' })
          .where(
            and(eq(booking.id, bookingId), eq(booking.status, 'pending'))
          )
      }
      break
    }

    case 'checkout.session.expired': {
      const checkout = event.data.object
      const bookingId = checkout.metadata?.bookingId

      if (bookingId) {
        await db
          .update(booking)
          .set({ status: 'expired' })
          .where(
            and(eq(booking.id, bookingId), eq(booking.status, 'pending'))
          )
      }
      break
    }
  }

  return new Response(null, { status: 200 })
}
