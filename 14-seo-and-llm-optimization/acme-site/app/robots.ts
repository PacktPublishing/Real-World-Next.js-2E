import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: everyone gets the public site, nothing more.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/admin/', '/api/'],
      },
      // Search-AI crawlers we want indexing us for AI answers.
      // Agent names per vendor docs; Anthropic's roster is at
      // support.anthropic.com (ClaudeBot / Claude-User / Claude-SearchBot).
      {
        userAgent: ['PerplexityBot', 'OAI-SearchBot', 'Claude-SearchBot'],
        allow: '/',
        disallow: ['/dashboard/', '/admin/', '/api/'],
      },
      // Training crawlers we don't want using our content.
      // Google-Extended controls Gemini training specifically.
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          'CCBot',
          'Bytespider',
        ],
        disallow: '/',
      },
      // Live-fetch agents that visit specific URLs on user request.
      {
        userAgent: ['ChatGPT-User', 'Claude-User'],
        allow: '/',
        disallow: ['/dashboard/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
