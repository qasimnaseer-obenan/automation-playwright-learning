import { test, expect } from '@playwright/test';

test('locators demo actions on testautomationpractice', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  await page.waitForTimeout(5000);

//   const nameInput = page.locator('[placeholder="Enter Name"]');
//   await nameInput.waitFor();
//   await nameInput.fill('John Doe');
//   await page.waitForTimeout(5000);
//   await expect(nameInput).toHaveValue('John Doe');


  const fileInput = page.locator('#singleFileInput');
  await fileInput.scrollIntoViewIfNeeded();
  await fileInput.setInputFiles('tests/example.spec.js');

  await page.pause()

  const itemCheckbox = page.locator("//td[normalize-space(.)='Smartphone']/following-sibling::td//input[@type='checkbox']");
  await itemCheckbox.scrollIntoViewIfNeeded();
  await itemCheckbox.check();
  await expect(itemCheckbox).toBeChecked();



});