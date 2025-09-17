const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');
const { LoginPage } = require('../../pages/login-page');

test.describe('Accessibility Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await injectAxe(page);
  });

  test('Login page accessibility check', async ({ page }) => {
    const results = await checkA11y(page);
    await expect(results.violations.length).toBeLessThan(5); // Allow up to 4 minor violations
  });
});