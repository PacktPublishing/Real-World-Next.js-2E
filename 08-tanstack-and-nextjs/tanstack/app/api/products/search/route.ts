// Repository scaffolding, not printed in the chapter.
//
// The search endpoint the TanStack Pacer example debounces calls to.
import { NextResponse } from 'next/server'
import { searchProducts } from '@/lib/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get('q') ?? ''

  return NextResponse.json(await searchProducts(term))
}
