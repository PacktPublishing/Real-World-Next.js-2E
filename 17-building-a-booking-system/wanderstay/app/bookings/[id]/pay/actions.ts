'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { and, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking, listing } from '@/lib/db/schema'
import { stripe } from '@/lib/stripe'

export async function startCheckout(bookingId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return { error: 'You must be signed in.' }
  }

  const [row] = await db
    .select({
      id: booking.id,
      totalAmount: booking.totalAmount,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      status: booking.status,
      title: listing.title,
    })
    .from(booking)
    .innerJoin(listing, eq(booking.listingId, listing.id))
    .where(
      and(eq(booking.id, bookingId), eq(booking.guestId, session.user.id))
    )

  if (!row || row.status !== 'pending') {
    return { error: 'This booking can no longer be paid.' }
  }

  const baseUrl = process.env.BETTER_AUTH_URL!

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: row.title,
            description: `${row.checkIn} to ${row.checkOut}`,
          },
          unit_amount: row.totalAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: row.id,
    },
    customer_email: session.user.email,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    success_url: `${baseUrl}/trips`,
    cancel_url: `${baseUrl}/bookings/${row.id}/pay`,
  })

  await db
    .update(booking)
    .set({ stripeSessionId: checkout.id })
    .where(eq(booking.id, row.id))

  redirect(checkout.url!)
}
