import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The chapter writes this as `adapterPath: './my-adapter.mjs'`.
  // Next.js resolves the value with `require.resolve()` from inside its own
  // package (next/dist/server/config.js), so a bare relative path is looked up
  // against node_modules/next and the build fails with MODULE_NOT_FOUND.
  // An absolute path — or a package name — is what actually resolves.
  // See this example's README.
  adapterPath: path.join(process.cwd(), 'my-adapter.mjs'),
}

export default nextConfig
