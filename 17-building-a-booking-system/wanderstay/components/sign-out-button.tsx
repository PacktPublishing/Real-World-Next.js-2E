'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()

  return (
    <button onClick={() => authClient.signOut().then(() => router.push('/'))}>
      Sign out
    </button>
  )
}
