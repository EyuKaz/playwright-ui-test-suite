const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user_login');
    this.passwordInput = page.locator('#user_pass');
    this.loginButton = page.locator('#wp-submit');
    this.errorMessage = page.locator('#login_error');
  }

  async navigate() {
    await this.page.goto('https://s1.demo.opensourcecms.com/wordpress/wp-login.php');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };