import { test, expect } from '@playwright/test'

test.describe('Article creation', () => {
  test('should reject a title that is too short', async ({ page }) => {
    await page.goto('/articles/new')

    await page.getByLabel('Title').fill('Hi')
    await page.getByLabel('Body').fill('Some content')
    await page.getByRole('button', { name: 'Publish' }).click()

    await expect(
      page.getByText('Title must be at least 3 characters')
    ).toBeVisible()
  })

  test('should publish a valid article and redirect to it', async ({
    page,
  }) => {
    await page.goto('/articles/new')

    await page.getByLabel('Title').fill('Testing Next.js end to end')
    await page.getByLabel('Body').fill('Article content here')
    await page.getByRole('button', { name: 'Publish' }).click()

    await expect(page).toHaveURL(/\/articles\/\d+/)
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toContainText('Testing Next.js end to end')
  })
})
