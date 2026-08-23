import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { listing } from '@/lib/db/schema'
import { BookingForm } from './booking-form'

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [item] = await db.select().from(listing).where(eq(listing.id, id))

  if (!item) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{item.title}</h1>
      <p className="text-gray-600">{item.location}</p>
      <p className="mt-4">{item.description}</p>
      <BookingForm listingId={item.id} pricePerNight={item.pricePerNight} />
    </main>
  )
}
