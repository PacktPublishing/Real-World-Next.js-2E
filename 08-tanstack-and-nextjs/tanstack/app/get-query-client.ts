import {
  QueryClient,
  QueryCache,
  environmentManager,
} from '@tanstack/react-query'
import { HttpError } from '@/lib/http'

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        // One place for global handling, e.g. send the user
        // to /login when a query comes back 401
        if (error instanceof HttpError && error.status === 401) {
          window.location.href = '/login'
        }
      },
    }),
    defaultOptions: {
      queries: {
        // How long data is considered fresh. The default is 0
        // (stale immediately), so we raise it to avoid refetching
        // during the initial render cycle.
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          // 4xx means the request is wrong; retrying won't fix it
          if (
            error instanceof HttpError &&
            error.status >= 400 &&
            error.status < 500
          ) {
            return false
          }
          return failureCount < 3
        },
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // On the server, always make a fresh client so that
    // one user's cache never leaks into another's request.
    return makeQueryClient()
  }
  // In the browser, reuse a single client for the whole session.
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
