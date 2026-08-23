import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should open an article from the list', async ({ page }) => {
    await page.goto('/articles')

    // The link rendered by the ArticleCard we unit tested earlier
    await page
      .getByRole('link', { name: /Healthy summer melon-carrot soup/ })
      .click()

    await expect(page).toHaveURL(/\/articles\//)
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toContainText('Healthy summer melon-carrot soup')
  })

  test('should navigate back to the article list', async ({ page }) => {
    await page.goto('/articles/1')

    await page.getByRole('link', { name: 'All articles' }).click()

    await expect(page).toHaveURL('/articles')
  })
})
