'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { and, eq, gt, inArray, lt } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking, listing } from '@/lib/db/schema'

const bookingInput = z
  .object({
    listingId: z.uuid(),
    checkIn: z.iso.date(),
    checkOut: z.iso.date(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: 'Check-out must be after check-in',
  })
  .refine((data) => data.checkIn >= new Date().toISOString().slice(0, 10), {
    message: 'Check-in cannot be in the past',
  })
  .refine(
    (data) =>
      (new Date(data.checkOut).getTime() -
        new Date(data.checkIn).getTime()) /
        86_400_000 <=
      30,
    { message: 'Stays are limited to 30 nights' }
  )

// Drizzle re-throws driver errors wrapped, so the shape is roughly:
//   { message: 'Failed query: insert into "booking" …',
//     cause: { code: '23P01', constraint: 'booking_no_overlap', … } }
function isOverlapViolation(err: unknown): boolean {
  const code = (e: unknown) =>
    typeof e === 'object' && e !== null && 'code' in e
      ? (e as { code?: unknown }).code
      : undefined

  return (
    code(err) === '23P01' ||
    code((err as { cause?: unknown })?.cause) === '23P01'
  )
}

export async function createBooking(input: {
  listingId: string
  checkIn: string
  checkOut: string
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return { error: 'You must be signed in to book.' }
  }

  const parsed = bookingInput.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  const { listingId, checkIn, checkOut } = parsed.data

  const [item] = await db
    .select()
    .from(listing)
    .where(eq(listing.id, listingId))
  if (!item) {
    return { error: 'Listing not found.' }
  }

  const nights = Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const totalAmount = nights * item.pricePerNight

  let created: typeof booking.$inferSelect | null = null

  try {
    created = await db.transaction(async (tx) => {
      const conflicts = await tx
        .select({ id: booking.id })
        .from(booking)
        .where(
          and(
            eq(booking.listingId, listingId),
            inArray(booking.status, ['pending', 'confirmed']),
            lt(booking.checkIn, checkOut),
            gt(booking.checkOut, checkIn)
          )
        )

      if (conflicts.length > 0) {
        return null
      }

      const [row] = await tx
        .insert(booking)
        .values({
          listingId,
          guestId: session.user.id,
          checkIn,
          checkOut,
          totalAmount,
          status: 'pending',
        })
        .returning()

      return row
    })
  } catch (err) {
    // The database rejected an overlap our pre-check didn't see.
    // Anything else is a real failure and must keep bubbling up.
    if (!isOverlapViolation(err)) throw err
    created = null
  }

  if (!created) {
    return { error: 'Those dates are taken. Please pick different dates.' }
  }

  // Outside the try on purpose: redirect throws by design
  redirect(`/bookings/${created.id}/pay`)
}
