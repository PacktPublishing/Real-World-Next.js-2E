'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { profileSchema } from '@/lib/schemas/profile'
import { updateProfile } from './actions'

export function ProfileForm() {
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      bio: '',
    },
    validators: {
      // The Zod schema is the validator — no adapter needed
      onChange: profileSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const result = await updateProfile(value)
      if (!result.success) {
        setServerError(result.error)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="name">
        {(field) => (
          <div>
            <label htmlFor={field.name}>Name</label>
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {!field.state.meta.isValid && (
              <span>
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div>
            <label htmlFor={field.name}>Email</label>
            <input
              id={field.name}
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {!field.state.meta.isValid && (
              <span>
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="bio">
        {(field) => (
          <div>
            <label htmlFor={field.name}>Bio</label>
            <textarea
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {!field.state.meta.isValid && (
              <span>
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join(', ')}
              </span>
            )}
          </div>
        )}
      </form.Field>

      {serverError && <p role="alert">{serverError}</p>}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        )}
      </form.Subscribe>
    </form>
  )
}
