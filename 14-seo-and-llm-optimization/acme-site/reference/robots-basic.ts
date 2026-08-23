// The chapter's first robots.ts listing, kept for reference.
//
// It is NOT a route: app/robots.ts serves /robots.txt, and only one file can.
// The live version in app/robots.ts is the per-bot AI-crawler policy the
// chapter builds up to.
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
