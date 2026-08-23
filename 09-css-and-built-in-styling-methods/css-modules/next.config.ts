import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    // Prepend an import to every Sass file, so shared variables
    // don't need an explicit @use rule in each one
    additionalData: `@use "@/styles/variables" as *;`,
    // sass-embedded is a faster compiler with the same API
    implementation: 'sass-embedded',
  },
}

export default nextConfig
