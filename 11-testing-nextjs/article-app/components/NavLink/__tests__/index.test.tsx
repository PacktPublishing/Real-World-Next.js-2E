import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavLink } from '../index'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/articles'),
}))

describe('NavLink', () => {
  test('should apply active class when pathname matches', () => {
    render(<NavLink href="/articles">Articles</NavLink>)
    const link = screen.getByRole('link', { name: 'Articles' })
    expect(link).toHaveClass('active')
  })

  test('should not apply active class when pathname differs', () => {
    render(<NavLink href="/about">About</NavLink>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).not.toHaveClass('active')
  })
})
