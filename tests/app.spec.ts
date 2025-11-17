import { expect, test } from '@playwright/test';

test('renders the recipe gallery and choose one', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link')).toHaveCount(1);

  await page.getByRole('link', { name: 'Favorite Sourdough Bread' }).click();

  await expect(
    page.getByRole('heading', { name: 'Favorite Sourdough Bread' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Ingredients' }),
  ).toBeVisible();
  await expect(page.getByText('Starter')).toBeVisible();
});
