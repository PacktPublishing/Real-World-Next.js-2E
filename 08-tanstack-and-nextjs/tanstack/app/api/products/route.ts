// Repository scaffolding, not printed in the chapter.
//
// The page-based products API that lib/products-client.ts fetches from.
import { NextResponse } from 'next/server'
import { getProductPage } from '@/lib/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') ?? 0)
  const limit = Number(searchParams.get('limit') ?? 50)

  if (!Number.isInteger(page) || page < 0) {
    return NextResponse.json({ error: 'invalid page' }, { status: 400 })
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 200) {
    return NextResponse.json({ error: 'invalid limit' }, { status: 400 })
  }

  return NextResponse.json(await getProductPage(page, limit))
}
