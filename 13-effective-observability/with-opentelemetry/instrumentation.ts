import { registerOTel } from '@vercel/otel'
import { type Instrumentation } from 'next'

export function register() {
  registerOTel({ serviceName: 'our-nextjs-app' })
}

export const onRequestError: Instrumentation.onRequestError = async (
  error,    // Typed as unknown, so we narrow it before use
  request,  // { path, method, headers }
  context   // { routerKind, routePath, routeType, renderSource, revalidateReason }
) => {
  // context.routeType tells us WHERE the error occurred:
  //   'render'  - Server Component rendering
  //   'route'   - Route Handler
  //   'action'  - Server Action
  //   'proxy'   - Proxy

  // context.renderSource tells us HOW:
  //   'react-server-components'         - RSC rendering
  //   'react-server-components-payload' - RSC payload generation
  //   'server-rendering'                - HTML rendering

  const err = error as { message: string; digest?: string }

  await fetch('https://our-collector.example.com/errors', {
    method: 'POST',
    body: JSON.stringify({
      message: err.message,
      digest: err.digest,
      path: request.path,
      routeType: context.routeType,
      renderSource: context.renderSource,
    }),
  })
}
