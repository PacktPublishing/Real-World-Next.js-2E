import { test, expect } from '@playwright/test'

test('article page should display the fetched article', async ({ page }) => {
  await page.goto('/articles/1')

  await expect(
    page.getByRole('heading', { level: 1 })
  ).toContainText('Healthy summer melon-carrot soup')
  await expect(page.getByText('By John Doe')).toBeVisible()
})
