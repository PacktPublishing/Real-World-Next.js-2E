import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Custom adapter',
  description: 'Chapter 15 — Different Deployment Platforms',
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
