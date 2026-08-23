export function trimTextToLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function composeArticleSlug(title: string, id: string): string {
  return `${slugify(title)}-${id}`
}

export function extractArticleIdFromSlug(slug: string): string {
  return slug.split('-').pop() ?? ''
}
