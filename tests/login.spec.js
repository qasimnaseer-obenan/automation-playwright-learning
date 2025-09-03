import { test, expect, chromium } from '@playwright/test';

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
  await page.goto('https://v2staging.obenan.com/auth/login');

  const heading = page.getByRole('heading', { name: 'Sign into Dashboard' , timeout: 60000});
  await expect(heading).toBeVisible({ timeout: 60000 });

  // Simple assertion
//   await page.waitForURL('https://v2staging.obenan.com/auth/login', { timeout: 60000 });

  const signinLinkWithPassword = page.getByRole('link', { name: 'Sign in with password' });
  await signinLinkWithPassword.waitFor({timeout: 60000});
  await signinLinkWithPassword.click();
  await expect(page).toHaveURL('https://v2staging.obenan.com/auth/login/password', { timeout: 60000 });



  const emailInput = page.getByRole('textbox', { name: 'Email Address Email Address' });
  await emailInput.waitFor({timeout: 60000});
  await emailInput.fill('test@obenan.com');
  await expect(emailInput).toHaveValue('test@obenan.com');


  const passwordInput = page.getByRole('textbox', { name: 'Password Password' });
  await passwordInput.waitFor({timeout: 60000});
  await passwordInput.fill('test@obenan.com');
  await expect(passwordInput).toHaveValue('test@obenan.com');

  const loginButton = page.getByRole('button', { name: 'Sign in' });
  await loginButton.waitFor({timeout: 60000});
  await loginButton.click();

  const toastMessage = page.getByText('No active user with this email');
  await toastMessage.waitFor({timeout: 60000});
  await expect(toastMessage).toBeVisible({ timeout: 60000 });

  
  // Cleanup
  await context.close();
  await browser.close();
});