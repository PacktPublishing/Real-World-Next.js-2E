import { NextRequest, NextResponse } from 'next/server'

const articles = [
  { id: '1', title: 'Getting started with Next.js', body: '...' },
  { id: '2', title: 'Understanding Server Components', body: '...' },
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = articles.find((a) => a.id === id)

  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}
