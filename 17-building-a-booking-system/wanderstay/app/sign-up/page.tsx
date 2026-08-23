'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    await authClient.signUp.email(
      {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
      {
        onSuccess: () => router.push('/listings'),
        onError: (ctx) => {
          setError(ctx.error.message)
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4 p-8">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <input name="name" placeholder="Name" required className="w-full border p-2" />
      <input name="email" type="email" placeholder="Email" required className="w-full border p-2" />
      <input name="password" type="password" placeholder="Password" required minLength={8} className="w-full border p-2" />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={isLoading} className="w-full bg-black p-2 text-white">
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
    </form>
  )
}
