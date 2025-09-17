const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login-page');
const { DashboardPage } = require('../../pages/dashboard-page');
const { credentials } = require('../../utils/test-data');

test.describe('Mobile Viewport Tests', () => {
  let loginPage, dashboardPage;

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone 12 viewport
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUsername, credentials.validPassword);
  });

  test('Dashboard renders correctly on mobile', async () => {
    await expect(dashboardPage.welcomePanel).toBeVisible();
    const mobileMenu = page.locator('#wp-admin-bar-menu-toggle');
    await expect(mobileMenu).toBeVisible();
    await mobileMenu.click();
    await expect(page.locator('#adminmenu')).toBeVisible();
  });
});