const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login-page');

test.describe('Performance Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await loginPage.navigate();
    const loadTime = Date.now() - startTime;
    await expect(loadTime).toBeLessThan(5000); // 5 seconds threshold
  });
});