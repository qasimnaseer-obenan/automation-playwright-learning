// laibawaheed145@gmail.com
// laiba@123
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
  await page.goto('https://mui.com/x/react-date-pickers/date-time-picker/');


  const clockicon1 = page.getByRole('group', { name: 'With Time Clock' }).getByLabel('Choose date')
  await clockicon1.waitFor({timeout: 60000});
  await clockicon1.click();

  const chooseDate = page.getByRole('dialog').getByRole('gridcell', { name: '2', exact: true });
  await chooseDate.waitFor({timeout: 60000});
  await chooseDate.click();

  const hour = 4;

  const selectHour = page.locator(`div[role="listbox"] span[role="option"][aria-label="1 hours"]`);
  await selectHour.waitFor({timeout: 60000});
  await selectHour.click({ force: true });

  const minutes = 30;

    const selectMinutes = page.locator(`div span[role="option"][aria-label="${minutes} minutes"]`);
  await selectMinutes.waitFor({timeout: 60000});
  await selectMinutes.click({ force: true });


  const ampm = 'AM';

  const selectAmPm = page.locator(`[title="${ampm}"]`);
  await selectAmPm.waitFor({timeout: 60000});   
  await selectAmPm.click();

  const okButton = page.getByRole('button', { name: 'OK' });
  await okButton.waitFor({timeout: 60000});
  await okButton.click();

  const timeverification = page.locator('input[value="09/02/2025 04:30 AM"]');
  await timeverification.waitFor({timeout: 60000});
  await expect(timeverification).toHaveValue('09/02/2025 04:30 AM');

  await page.pause();

//   const signinLinkWithPassword = page.getByRole('link', { name: 'Sign in with password' });
//   await signinLinkWithPassword.waitFor({timeout: 60000});
//   await signinLinkWithPassword.click();
//   await expect(page).toHaveURL('https://v2staging.obenan.com/auth/login/password', { timeout: 60000 });



//   const emailInput = page.getByRole('textbox', { name: 'Email Address Email Address' });
//   await emailInput.waitFor({timeout: 60000});
//   await emailInput.fill('laibawaheed145@gmail.com');
//   await expect(emailInput).toHaveValue('laibawaheed145@gmail.com');


//   const passwordInput = page.getByRole('textbox', { name: 'Password Password' });
//   await passwordInput.waitFor({timeout: 60000});
//   await passwordInput.fill('laiba@123');
//   await expect(passwordInput).toHaveValue('laiba@123');

//   const loginButton = page.getByRole('button', { name: 'Sign in' });
//   await loginButton.waitFor({timeout: 60000});
//   await loginButton.click();

//   await page.waitForTimeout(7000);


//   await page.goto('https://v2staging.obenan.com/user/posts');
//   await page.pause();


//   const postButton = page.getByText('Create Post');
//   await postButton.waitFor({timeout: 60000});
//   await postButton.click();



  // Cleanup
  await context.close();
  await browser.close();
});