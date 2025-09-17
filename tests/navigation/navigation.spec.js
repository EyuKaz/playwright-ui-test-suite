const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login-page');
const { DashboardPage } = require('../../pages/dashboard-page');
const { credentials } = require('../../utils/test-data');

test.describe('Navigation Tests', () => {
  let loginPage, dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUsername, credentials.validPassword);
  });

  test('Navigate to Add New Post page', async () => {
    await dashboardPage.navigateToAddPost();
    await expect(dashboardPage.page).toHaveURL(/post-new.php/);
  });
});