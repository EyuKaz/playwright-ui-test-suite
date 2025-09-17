const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcomePanel = page.locator('#welcome-panel');
    this.postsMenu = page.locator('#menu-posts');
    this.addNewPostLink = page.locator('#menu-posts a[href*="post-new.php"]');
  }

  async isDashboardVisible() {
    return await this.welcomePanel.isVisible();
  }

  async navigateToAddPost() {
    await this.postsMenu.hover();
    await this.addNewPostLink.click();
  }
}

module.exports = { DashboardPage };