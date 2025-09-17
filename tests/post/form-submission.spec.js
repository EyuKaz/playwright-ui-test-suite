const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login-page');
const { DashboardPage } = require('../../pages/dashboard-page');
const { PostPage } = require('../../pages/post-page');
const { credentials, postData } = require('../../utils/test-data');

test.describe('Form Submission Tests', () => {
  let loginPage, dashboardPage, postPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    postPage = new PostPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUsername, credentials.validPassword);
    await dashboardPage.navigateToAddPost();
  });

  test('Create a new post', async () => {
    await postPage.createPost(postData.title, postData.content);
    const message = await postPage.getPublishedMessage();
    await expect(message).toContain('Post published');
  });
});