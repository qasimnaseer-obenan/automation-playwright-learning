import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test('launch browser with context', async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // set true for CI

  // Create a new isolated context
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    // storageState: 'storage-state.json', // optionally reuse auth/session
    // userAgent: 'MyCustomAgent/1.0',
  });

  // Open a page in this context
  const page = await context.newPage();
  await page.goto('https://practice.expandtesting.com/upload');

    const fileInput = page.getByTestId('file-input');
    await fileInput.waitFor({timeout: 60000});
    await fileInput.scrollIntoViewIfNeeded();
    // await fileInput.setFiles('tests/example.spec.js');
    await fileInput.setInputFiles('tests/example.spec.js');


  await page.pause();
  // Cleanup
  await context.close();
  await browser.close();
});