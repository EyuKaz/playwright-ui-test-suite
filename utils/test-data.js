const credentials = {
  validUsername: 'admin',
  validPassword: 'demo123',
  invalidUsername: 'wronguser',
  invalidPassword: 'wrongpass',
};

const postData = {
  title: 'Test Post Title',
  content: 'This is a test post content created by Playwright.',
};

module.exports = { credentials, postData };