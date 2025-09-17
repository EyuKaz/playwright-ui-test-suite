const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login-page');

test.describe('Login Edge Case Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login with empty username', async () => {
    await loginPage.login('', 'demo123');
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('ERROR: The username field is empty');
  });

  test('Login with empty password', async () => {
    await loginPage.login('admin', '');
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('ERROR: The password field is empty');
  });

  test('Login with special characters in credentials', async () => {
    await loginPage.login('<script>alert("xss")</script>', 'pass@#$%');
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('ERROR: Invalid username');
  });
});