import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from '../index'

describe('SearchInput', () => {
  test('should call onSearch with the typed query', async () => {
    const user = userEvent.setup()
    const handleSearch = vi.fn() // creates a mock function

    render(<SearchInput onSearch={handleSearch} />)

    await user.type(screen.getByLabelText('Search articles'), 'nextjs')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    // Assert the mock was called with the right argument
    expect(handleSearch).toHaveBeenCalledWith('nextjs')
  })

  test('should call onSearch with empty string when no input', async () => {
    const user = userEvent.setup()
    const handleSearch = vi.fn()

    render(<SearchInput onSearch={handleSearch} />)

    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(handleSearch).toHaveBeenCalledWith('')
  })
})
