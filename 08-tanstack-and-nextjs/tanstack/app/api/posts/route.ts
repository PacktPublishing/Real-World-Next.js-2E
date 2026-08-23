// Repository scaffolding, not printed in the chapter.
//
// The Route Handler NewPostForm posts to. jsonplaceholder accepts writes but
// discards them, so this mirrors that behaviour locally: it echoes the created
// post back with an id, which is all the mutation example needs.
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  if (typeof body?.title !== 'string' || body.title.trim() === '') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  return NextResponse.json(
    { id: Date.now(), title: body.title, body: '' },
    { status: 201 }
  )
}
