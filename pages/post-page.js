const { expect } = require('@playwright/test');

class PostPage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.locator('#title');
    this.contentInput = page.locator('#content');
    this.publishButton = page.locator('#publish');
    this.publishedMessage = page.locator('#message');
  }

  async createPost(title, content) {
    await this.titleInput.fill(title);
    await this.contentInput.fill(content);
    await this.publishButton.click();
  }

  async getPublishedMessage() {
    return await this.publishedMessage.textContent();
  }
}

module.exports = { PostPage };