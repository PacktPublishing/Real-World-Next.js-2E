import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking, listing } from '@/lib/db/schema'

export default async function TripsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect('/sign-in')
  }

  const trips = await db
    .select({
      id: booking.id,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      status: booking.status,
      title: listing.title,
      location: listing.location,
    })
    .from(booking)
    .innerJoin(listing, eq(booking.listingId, listing.id))
    .where(eq(booking.guestId, session.user.id))
    .orderBy(desc(booking.createdAt))

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Your trips</h1>
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li key={trip.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{trip.title}</h2>
            <p className="text-gray-600">{trip.location}</p>
            <p>
              {trip.checkIn} → {trip.checkOut}
            </p>
            <p className="text-sm uppercase text-gray-500">{trip.status}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
