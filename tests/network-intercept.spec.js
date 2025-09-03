import { test, expect } from '@playwright/test';

test('Intercept network request and verify response', async ({ page }) => {
  // 1. Listen for all network requests
  page.on('request', request => {
    console.log(`>> Request: ${request.method()} ${request.url()}`);
  });

  // 2. Listen for all network responses
  page.on('response', response => {
    console.log(`<< Response: ${response.status()} ${response.url()}`);
  });

  // 3. Wait for specific response - method 1 (using page.waitForResponse)
  const responsePromise = page.waitForResponse('**/api/users**');
  
  await page.goto('https://reqres.in/');
  
  // Click on a button that triggers the API request
  await page.getByText('Get API Users').click();
  
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();
  expect(responseBody.data).toBeDefined();
  expect(responseBody.data.length).toBeGreaterThan(0);

  // 4. Intercept and modify requests
  await page.route('**/api/users**', async route => {
    // Either fulfill with custom data
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          { id: 999, first_name: 'Custom', last_name: 'User', email: 'custom@example.com' }
        ]
      })
    });
    
    // Or continue with the original request but inspect it
    // const request = route.request();
    // console.log(`Intercepted ${request.method()} ${request.url()}`);
    // await route.continue();
  });

  // 5. Expect response - method 2 (using page.expect_response)
  const responsePromise2 = page.waitForResponse(response => 
    response.url().includes('/api/users') && response.status() === 200
  );
  
  await page.getByText('Get API Users').click();
  
  const response2 = await responsePromise2;
  const responseBody2 = await response2.json();
  expect(responseBody2.data[0].id).toBe(999); // Verify our mocked data

  // 6. Block specific requests
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  
  // 7. Verify API response with specific data
  await page.route('**/api/users/2', async route => {
    const json = {
      data: {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver'
      }
    };
    await route.fulfill({ 
      status: 200, 
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

  // Navigate to single user page
  await page.goto('https://reqres.in/api/users/2');
  
  // Get the pre-formatted response on the page
  const responseText = await page.textContent('pre');
  const parsedResponse = JSON.parse(responseText);
  
  // Verify the response contains our mocked data
  expect(parsedResponse.data.first_name).toBe('Janet');
  expect(parsedResponse.data.last_name).toBe('Weaver');
});

test('API testing with direct fetch', async ({ request }) => {
  // 8. Direct API testing without browser
  const response = await request.get('https://reqres.in/api/users?page=2');
  expect(response.ok()).toBeTruthy();
  
  const responseBody = await response.json();
  expect(responseBody.page).toBe(2);
  expect(responseBody.data.length).toBeGreaterThan(0);
  
  // Verify specific user data
  const firstUser = responseBody.data[0];
  expect(firstUser).toHaveProperty('id');
  expect(firstUser).toHaveProperty('email');
  expect(firstUser).toHaveProperty('first_name');
  expect(firstUser).toHaveProperty('last_name');
});
