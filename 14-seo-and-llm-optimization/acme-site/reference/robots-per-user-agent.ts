// The chapter's second robots.ts listing, showing per-user-agent rules.
// Kept for reference only; see reference/robots-basic.ts for why.
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/private/'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: ['/'],
      },
    ],
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
