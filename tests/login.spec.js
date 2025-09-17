const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { DashboardPage } = require('../pages/dashboard-page');
const { credentials } = require('../utils/test-data');

test.describe('Login Tests', () => {
  let loginPage, dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('Successful login with valid credentials', async () => {
    await loginPage.login(credentials.validUsername, credentials.validPassword);
    await expect(dashboardPage.welcomePanel).toBeVisible();
    await expect(dashboardPage.page).toHaveURL(/wp-admin/);
  });

  test('Failed login with invalid credentials', async () => {
    await loginPage.login(credentials.invalidUsername, credentials.invalidPassword);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('ERROR: Invalid username');
  });
});