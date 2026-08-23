import { PostDetail } from './post-detail'
import { type Post } from '@/lib/posts'

async function getPost(id: string): Promise<Post> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    // Caching is opt-in in Next.js 16, so this states the intent
    // explicitly and holds if the route becomes prerenderable,
    // as covered in Chapter 3
    { cache: 'no-store' }
  )
  if (!response.ok) throw new Error('Failed to fetch post')
  return response.json()
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div>
      <h1>{post.title}</h1>
      <PostDetail postId={id} initialData={post} />
    </div>
  )
}
