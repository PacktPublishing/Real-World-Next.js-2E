import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Error boundaries',
  description: 'The error boundary examples from Chapter 13',
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
