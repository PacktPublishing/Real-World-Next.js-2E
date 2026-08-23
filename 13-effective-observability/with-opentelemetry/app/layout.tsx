import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Observability with OpenTelemetry',
  description: 'The OpenTelemetry examples from Chapter 13',
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
