// Repository scaffolding, not printed in the chapter.
//
// Receives the optimistic updates the collection's onUpdate handler syncs.
import { NextResponse } from 'next/server'
import { updateInspection } from '@/lib/inspections-store'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const updated = updateInspection(id, body)

  if (!updated) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}
