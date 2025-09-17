const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login-page');
const { DashboardPage } = require('../../pages/dashboard-page');
const { PostPage } = require('../../pages/post-page');
const { credentials } = require('../../utils/test-data');

test.describe('Post Edge Case Tests', () => {
  let loginPage, dashboardPage, postPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    postPage = new PostPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUsername, credentials.validPassword);
    await dashboardPage.navigateToAddPost();
  });

  test('Create post with empty title', async () => {
    await postPage.createPost('', 'Content without title');
    await expect(postPage.publishedMessage).not.toBeVisible();
    await expect(postPage.titleInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('Create post with long content', async () => {
    const longContent = 'A'.repeat(10000);
    await postPage.createPost('Long Content Post', longContent);
    const message = await postPage.getPublishedMessage();
    await expect(message).toContain('Post published');
  });
});