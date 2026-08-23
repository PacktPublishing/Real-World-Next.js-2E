import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleCard from '../index'

const mockArticle = {
  id: 'u12w3o0d',
  title: 'Healthy summer melon-carrot soup',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, felis quis sagittis molestie, mi sem lobortis dui, a sollicitudin nibh erat id ex.',
  author: {
    id: '93ksj19s',
    name: 'John Doe',
  },
}

describe('ArticleCard', () => {
  test('should render the article title', () => {
    render(<ArticleCard {...mockArticle} />)
    expect(
      screen.getByText('Healthy summer melon-carrot soup')
    ).toBeInTheDocument()
  })

  test('should generate the correct link', () => {
    render(<ArticleCard {...mockArticle} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      '/articles/healthy-summer-melon-carrot-soup-u12w3o0d'
    )
  })

  test('should truncate the body to 100 characters', () => {
    render(<ArticleCard {...mockArticle} />)
    const bodyText = screen.getByText(/Lorem ipsum dolor sit amet/)
    expect(bodyText.textContent).toContain('...')
  })

  test('should display the author name', () => {
    render(<ArticleCard {...mockArticle} />)
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })
})
