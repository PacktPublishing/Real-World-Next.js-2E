'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchPost, type Post } from '@/lib/posts'
import { queryKeys } from '@/lib/query-keys'

export function PostDetail({
  postId,
  initialData,
}: {
  postId: string
  initialData: Post
}) {
  const { data, isFetching } = useQuery({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: () => fetchPost(postId),
    initialData,
    staleTime: 60 * 1000,
  })

  return (
    <div>
      {isFetching && <div>Refreshing...</div>}
      <p>{data.body}</p>
      <p>
        <small>Post ID: {data.id}</small>
      </p>
    </div>
  )
}
