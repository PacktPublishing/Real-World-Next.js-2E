'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { type Post } from '@/lib/posts'

export function NewPostForm() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const createPost = useMutation({
    // /api/posts is a Route Handler, as covered in Chapter 6
    mutationFn: async (newTitle: string): Promise<Post> => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title: newTitle }),
      })
      if (!response.ok) throw new Error('Failed to create post')
      return response.json()
    },
    onSuccess: () => {
      // Every query under the posts key refetches on next read
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => createPost.mutate(title)}
        disabled={createPost.isPending}
      >
        {createPost.isPending ? 'Creating...' : 'Create post'}
      </button>
      {createPost.isError && <p>{createPost.error.message}</p>}
    </div>
  )
}
