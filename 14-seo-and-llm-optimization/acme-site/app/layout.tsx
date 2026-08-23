import type { Metadata } from 'next'
import './globals.css'

// The chapter shows the root metadata twice: once in full, then again in the
// staging section with metadataBase and robots made environment-aware. This is
// the two merged, which is what a production root layout actually looks like.
const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL(
    isProduction ? 'https://acme.com' : 'https://staging.acme.com'
  ),
  title: {
    template: '%s | Acme',
    default: 'Acme — Analytics for product teams',
  },
  description:
    'Acme helps product teams ship faster with developer-first analytics.',
  openGraph: {
    type: 'website',
    siteName: 'Acme',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@acme',
    creator: '@acme',
  },
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
