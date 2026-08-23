'use client'

export function ThemeToggle() {
  return (
    <button onClick={() => document.documentElement.classList.toggle('dark')}>
      Toggle theme
    </button>
  )
}
