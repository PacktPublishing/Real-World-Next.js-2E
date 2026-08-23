import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tailwind CSS',
  description: 'Tailwind CSS examples from Chapter 9',
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
