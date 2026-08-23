// Repository scaffolding, not printed in the chapter.
//
// getSession() comes from our auth library. The specifics depend on the
// auth setup, but the Sentry pattern is the same regardless. Chapter 17
// builds the real thing with Better Auth.
export async function getSession() {
  return {
    user: {
      id: 'user_123',
      email: 'john@example.com',
    },
  }
}
