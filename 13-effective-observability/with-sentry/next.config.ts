import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  // Our existing Next.js configuration
}

export default withSentryConfig(nextConfig, {
  org: 'our-org',
  project: 'our-project',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
})
