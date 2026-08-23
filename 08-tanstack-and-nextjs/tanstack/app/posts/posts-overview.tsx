'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/lib/posts'

// The client-only shape, shown in the chapter to isolate useQuery: everything
// renders in the browser and the data arrives after a loading state. The route
// itself (app/posts/page.tsx) uses the prefetching version instead.
export function PostsOverview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  if (isLoading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
