'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/lib/posts'
import { PostLink } from '@/components/post-link'

export function PostsList() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <ul>
      {data.map((post) => (
        // Practice 5 in the chapter: swapping a plain Link for PostLink
        // prefetches the detail query on hover
        <li key={post.id}>
          <PostLink post={post} />
        </li>
      ))}
    </ul>
  )
}
