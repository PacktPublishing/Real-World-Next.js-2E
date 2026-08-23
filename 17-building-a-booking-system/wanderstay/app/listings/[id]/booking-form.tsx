'use client'

import { useState, useTransition } from 'react'
import { createBooking } from './actions'

export function BookingForm({
  listingId,
  pricePerNight,
}: {
  listingId: string
  pricePerNight: number
}) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await createBooking({ listingId, checkIn, checkOut })
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-lg border p-4">
      <div className="flex gap-4">
        <label className="flex-1">
          Check-in
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required className="w-full border p-2" />
        </label>
        <label className="flex-1">
          Check-out
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required className="w-full border p-2" />
        </label>
      </div>
      {nights > 0 && (
        <p>
          {nights} night{nights === 1 ? '' : 's'} · total $
          {((nights * pricePerNight) / 100).toFixed(2)}
        </p>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={isPending || nights < 1} className="w-full bg-black p-2 text-white">
        {isPending ? 'Reserving...' : 'Reserve'}
      </button>
    </form>
  )
}
