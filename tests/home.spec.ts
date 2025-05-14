import { test, expect } from '@playwright/test';

test('home page loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check that the page contains the expected heading
  await expect(page.locator('h1')).toContainText('Learning Management System');

  // Check that the authentication component is present
  await expect(page.locator('.amplify-authenticator')).toBeVisible();
});
