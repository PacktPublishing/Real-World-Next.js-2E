import { queryOptions } from '@tanstack/react-query'
import { HttpError } from '@/lib/http'
import { queryKeys } from '@/lib/query-keys'

export type Post = {
  id: number
  title: string
  body: string
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new HttpError(response.status)
  }
  return response.json()
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  if (!response.ok) throw new HttpError(response.status)
  return response.json()
}

export const postOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => fetchPost(id),
    staleTime: 60 * 1000,
  })
