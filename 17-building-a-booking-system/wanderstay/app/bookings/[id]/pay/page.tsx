import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { and, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking, listing } from '@/lib/db/schema'
import { startCheckout } from './actions'

// The chapter passes startCheckout straight to the form:
//   <form action={startCheckout.bind(null, row.id)}>
// That does not typecheck. startCheckout returns { error: string } on its two
// defensive branches, and a form's `action` must return void | Promise<void>.
// Beyond the type, a returned object has nowhere to go in a plain form: there
// is no client state to put it in, so the message would be discarded.
//
// This wrapper keeps startCheckout exactly as the chapter prints it and keeps
// the no-client-JavaScript form. Both of startCheckout's error branches are
// conditions the page below has already turned into a 404, so reaching one
// means the state changed between render and submit; sending the guest back to
// this page produces the same 404 for the same reason.
async function payAction(bookingId: string) {
  'use server'
  const result = await startCheckout(bookingId)
  if (result?.error) {
    redirect(`/bookings/${bookingId}/pay`)
  }
}

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) notFound()

  const [row] = await db
    .select({
      id: booking.id,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      totalAmount: booking.totalAmount,
      status: booking.status,
      title: listing.title,
    })
    .from(booking)
    .innerJoin(listing, eq(booking.listingId, listing.id))
    .where(and(eq(booking.id, id), eq(booking.guestId, session.user.id)))

  if (!row || row.status !== 'pending') notFound()

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">{row.title}</h1>
      <p className="text-gray-600">
        {row.checkIn} → {row.checkOut}
      </p>
      <p className="mt-2 text-xl">
        Total ${(row.totalAmount / 100).toFixed(2)}
      </p>
      <form action={payAction.bind(null, row.id)}>
        <button className="mt-6 w-full bg-black p-2 text-white">
          Pay with Stripe
        </button>
      </form>
    </main>
  )
}
