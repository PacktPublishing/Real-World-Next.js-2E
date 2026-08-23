// The chapter says this page is "nearly identical, swapping signUp.email for
// signIn.email and dropping the name field, so we won't reprint it; it's in
// the chapter's repository." This is that page.
'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // The proxy sets ?from= so we can bounce the user back to where they were
  // headed, a small courtesy users never notice and always miss.
  const from = searchParams.get('from') ?? '/listings'
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    await authClient.signIn.email(
      {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
      {
        onSuccess: () => router.push(from),
        onError: (ctx) => {
          setError(ctx.error.message)
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4 p-8">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <input name="email" type="email" placeholder="Email" required className="w-full border p-2" />
      <input name="password" type="password" placeholder="Password" required className="w-full border p-2" />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={isLoading} className="w-full bg-black p-2 text-white">
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default function SignInPage() {
  // useSearchParams needs a Suspense boundary to keep the route prerenderable
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
