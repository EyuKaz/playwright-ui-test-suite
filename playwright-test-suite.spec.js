// This suite automates the installation, activation, and basic UI flows for a WordPress plugin.
// Assumes a local WordPress instance running at http://localhost:8080/wp-admin.
// Requires Playwright installed: npm init playwright@latest

const { test, expect } = require('@playwright/test');

test.describe('WordPress Plugin Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to WP Admin login
    await page.goto('http://localhost:8080/wp-admin');
    // Login with default credentials (update as needed)
    await page.fill('#user_login', 'admin');
    await page.fill('#user_pass', 'password');
    await page.click('#wp-submit');
    await expect(page).toHaveURL(/wp-admin/);
  });

  test('Install and Activate Plugin', async ({ page }) => {
    // Navigate to Plugins page
    await page.goto('http://localhost:8080/wp-admin/plugins.php');

    // Search for the plugin (assuming plugin slug is 'my-plugin')
    await page.fill('#search-input', 'my-plugin');
    await page.click('button[aria-label="Search Plugins"]');

    // If not installed, install it (this simulates via UI; in real, might need WP-CLI setup)
    const installLink = page.locator('a:has-text("Install Now")');
    if (await installLink.count() > 0) {
      await installLink.click();
      await page.waitForSelector('a:has-text("Activate")');
      await page.click('a:has-text("Activate")');
    } else {
      // Assume already installed, activate if inactive
      const activateLink = page.locator('a:has-text("Activate")');
      if (await activateLink.count() > 0) {
        await activateLink.click();
      }
    }

    // Verify activation
    await expect(page.locator('tr.active td.plugin-title a')).toContainText('My Plugin');
  });

  test('Basic UI Flow: Plugin Settings', async ({ page }) => {
    // Navigate to plugin settings (assuming settings page slug)
    await page.goto('http://localhost:8080/wp-admin/options-general.php?page=my-plugin-settings');

    // Test a simple UI interaction, e.g., fill a form field
    await page.fill('#plugin-setting-input', 'Test Value');
    await page.click('#submit-button');

    // Verify success message
    await expect(page.locator('.notice-success')).toContainText('Settings saved');
  });
});
