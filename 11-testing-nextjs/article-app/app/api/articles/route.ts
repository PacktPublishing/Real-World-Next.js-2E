import { NextResponse } from 'next/server'

const articles = [
  { id: '1', title: 'Getting started with Next.js', body: '...' },
  { id: '2', title: 'Understanding Server Components', body: '...' },
]

export async function GET() {
  return NextResponse.json(articles)
}
