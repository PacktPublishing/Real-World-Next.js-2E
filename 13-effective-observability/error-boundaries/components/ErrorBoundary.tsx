'use client'

// NOTE: the chapter imports this as `unstable_catchError as catchError`.
// In the Next.js version this repository pins (16.3.2) the API is stable and
// exported as `catchError`; there is no `unstable_catchError` binding, and
// Next's own bundled docs use the name below. See this example's README.
import { catchError, type ErrorInfo } from 'next/error'

// catchError uses a different function signature than a normal component.
// The first argument is our custom props, and the second argument is an
// error info object provided by the framework, carrying error, retry
// and reset.
function ErrorFallback(props: { title?: string }, { retry }: ErrorInfo) {
  return (
    <div>
      <p>{props.title ?? 'Something went wrong'}</p>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}

export default catchError(ErrorFallback)
