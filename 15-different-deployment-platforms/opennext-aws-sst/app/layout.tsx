import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenNext on AWS with SST',
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
