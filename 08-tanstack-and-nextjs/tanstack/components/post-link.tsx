'use client'

import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { fetchPost, type Post } from '@/lib/posts'
import { queryKeys } from '@/lib/query-keys'

export function PostLink({ post }: { post: Post }) {
  const queryClient = useQueryClient()

  return (
    <Link
      href={`/posts/${post.id}`}
      onMouseEnter={() => {
        queryClient.prefetchQuery({
          queryKey: queryKeys.posts.detail(String(post.id)),
          queryFn: () => fetchPost(String(post.id)),
        })
      }}
    >
      {post.title}
    </Link>
  )
}
