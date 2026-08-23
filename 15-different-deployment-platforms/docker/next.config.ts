import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // In a monorepo the pnpm store sits above this directory, so file tracing
  // has to be told where the workspace root is or it stops at the package
  // boundary and leaves files out of the image.
  outputFileTracingRoot: path.join(process.cwd(), '../..'),
}

export default nextConfig
