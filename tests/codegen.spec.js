import { test, expect } from '@playwright/test';


test('codegen flow navigates Playwright docs and GitHub', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
  await page.locator('.tabs > li:nth-child(2)').first().click();
  await page.getByRole('link', { name: 'API', exact: true }).click();
  await page.getByRole('button', { name: 'Node.js' }).click();
  await page.getByRole('link', { name: 'Node.js' }).click();
  await page.getByRole('link', { name: 'Community' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'GitHub repository' }).click();
  const page1 = await page1Promise;
  await page1.goto('https://github.com/microsoft/playwright');
  await page1.getByRole('button', { name: 'Clear Search' }).click();
});