import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // Enable structured logging
  enableLogs: true,
})
