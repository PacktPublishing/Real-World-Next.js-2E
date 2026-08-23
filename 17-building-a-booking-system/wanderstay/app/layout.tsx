import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { SignOutButton } from '@/components/sign-out-button'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wanderstay',
  description: 'The booking system from Chapter 17',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <html lang="en">
      <body>
        <nav className="flex items-center gap-4 border-b p-4">
          <Link href="/listings" className="font-bold">
            Wanderstay
          </Link>
          {session ? (
            <>
              <Link href="/trips">Your trips</Link>
              <span className="ml-auto text-gray-600">
                {session.user.name}
              </span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="ml-auto">
                Sign in
              </Link>
              <Link href="/sign-up">Sign up</Link>
            </>
          )}
        </nav>
        {children}
      </body>
    </html>
  )
}
