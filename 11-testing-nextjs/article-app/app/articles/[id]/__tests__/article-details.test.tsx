import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleDetails } from '../article-details'

describe('ArticleDetails', () => {
  test('should render the article and its author', () => {
    render(
      <ArticleDetails
        article={{
          id: '1',
          title: 'Healthy summer melon-carrot soup',
          body: 'Lorem ipsum dolor sit amet.',
          author: 'John Doe',
        }}
      />
    )

    expect(
      screen.getByRole('heading', { name: 'Healthy summer melon-carrot soup' })
    ).toBeInTheDocument()
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })
})
