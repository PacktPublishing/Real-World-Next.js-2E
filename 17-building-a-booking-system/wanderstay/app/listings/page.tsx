import Link from 'next/link'
import { db } from '@/lib/db'
import { listing } from '@/lib/db/schema'

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export default async function ListingsPage() {
  const listings = await db.select().from(listing)

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Find a stay</h1>
      <ul className="space-y-4">
        {listings.map((item) => (
          <li key={item.id} className="rounded-lg border p-4">
            <Link href={`/listings/${item.id}`}>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.location}</p>
              <p className="mt-1">{formatPrice(item.pricePerNight)} / night</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
