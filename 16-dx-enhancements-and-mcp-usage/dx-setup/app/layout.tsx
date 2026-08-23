import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DX Enhancements and MCP Usage',
  description: 'Chapter 16 — developer experience tooling',
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
