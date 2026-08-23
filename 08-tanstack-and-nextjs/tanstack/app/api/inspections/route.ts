// Repository scaffolding, not printed in the chapter.
//
// The backend the inspections collection loads from and syncs writes to.
import { NextResponse } from 'next/server'
import { addInspection, listInspections } from '@/lib/inspections-store'

export async function GET() {
  return NextResponse.json(listInspections())
}

export async function POST(request: Request) {
  const body = await request.json()

  if (typeof body?.id !== 'string' || typeof body?.site !== 'string') {
    return NextResponse.json(
      { error: 'id and site are required' },
      { status: 400 }
    )
  }

  return NextResponse.json(addInspection(body), { status: 201 })
}
