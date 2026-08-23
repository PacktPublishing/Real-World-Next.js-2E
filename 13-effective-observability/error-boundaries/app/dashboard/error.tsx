'use client'

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>Error digest: {error.digest}</p>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}
