import type { Metadata } from 'next'
import * as Sentry from '@sentry/nextjs'
import { getSession } from '@/lib/session'
import './globals.css'

export const metadata: Metadata = {
  title: 'Observability with Sentry',
  description: 'The Sentry examples from Chapter 13',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (session?.user) {
    Sentry.setUser({
      id: session.user.id,
      email: session.user.email,
    })
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
