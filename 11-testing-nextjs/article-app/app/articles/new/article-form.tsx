// Repository scaffolding, not printed in the chapter.
//
// The chapter unit tests createArticle directly and then e2e tests the form
// that submits to it, but never prints the form itself. This is that form:
// labelled Title and Body fields and a Publish button, which is what the
// Playwright test locates by accessible name.
'use client'

import { useActionState } from 'react'
import { createArticle } from '../actions'

export function ArticleForm() {
  const [state, formAction, pending] = useActionState(
    async (_previous: { error: string } | null, formData: FormData) =>
      (await createArticle(formData)) ?? null,
    null
  )

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea id="body" name="body" />
      </div>
      {state?.error && <p role="alert">{state.error}</p>}
      <button type="submit" disabled={pending}>
        Publish
      </button>
    </form>
  )
}
