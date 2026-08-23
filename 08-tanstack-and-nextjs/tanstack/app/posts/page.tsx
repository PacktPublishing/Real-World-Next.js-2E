import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'
import { fetchPosts } from '@/lib/posts'
import { NewPostForm } from '@/components/new-post-form'
import { PostsList } from './posts-list'

export default async function PostsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewPostForm />
      <PostsList />
    </HydrationBoundary>
  )
}
