import * as Sentry from '@sentry/nextjs'

Sentry.init({
  // The DSN (Data Source Name) is a unique URL that tells the SDK where to
  // send data. We get this from our Sentry project settings.
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',

  // Sampling: record only a fraction of events to keep volume and cost
  // down. 0.1 records one in ten transactions in production.
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // Capture all sessions where an error occurs for replay
  replaysOnErrorSampleRate: 1.0,

  // Capture 10% of all sessions for general replay
  replaysSessionSampleRate: 0.1,

  integrations: [Sentry.replayIntegration()],
})

// Instrument client-side route navigations
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
