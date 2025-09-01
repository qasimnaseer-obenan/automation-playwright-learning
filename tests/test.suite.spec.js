// Suite entry point that imports all other spec files.
// Playwright will execute tests registered in the imported modules.

import './login.spec.js';
import './locators.spec.js';
import './example.spec.js';
import './codegen.spec.js';

// Optional: you can add tags or grouping via a no-op describe if desired
// import { test } from '@playwright/test';
// test.describe('All tests suite', () => {});
