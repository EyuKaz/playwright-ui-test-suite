Playwright UI Testing Project Documentation
Introduction
This document provides comprehensive details for the Playwright UI testing project, designed to test a WordPress site running locally at http://localhost/wordpress. The project uses Playwright with JavaScript, follows the Page Object Model (POM) pattern, includes HTML reporting, and integrates with GitHub Actions for continuous integration (CI). It includes three test suites for login, form submission, and navigation, ensuring robust UI testing.
Project Purpose
The purpose of this project is to automate UI testing for a local WordPress installation, verifying core functionalities such as user login, post creation, and navigation. The tests are designed to be reusable, maintainable, and production-ready, with clear reporting and CI integration.
Project Structure
The project is organized as follows:

.github/workflows/: Contains the GitHub Actions workflow for CI.
docs/: Contains this documentation file.
pages/: Page Object Model classes for reusable page interactions.
tests/: Test files for login, form submission, and navigation.
utils/: Test data (e.g., credentials, post content).
playwright.config.js: Playwright configuration file.
package.json: Project dependencies and scripts.
README.md: Instructions for setup, running tests, and viewing reports.
.gitignore: Specifies files and folders to ignore in version control.

Prerequisites
To set up and run the project, you need:

Node.js: Version 20 or higher. Download from nodejs.org.
Git: For version control and pushing to GitHub.
WordPress: A local WordPress installation running at http://localhost/wordpress. Ensure the admin credentials are admin / demo123 (or update utils/test-data.js if different).
Local Server: A web server (e.g., XAMPP, WAMP, or Docker) to host the WordPress site.

Installation
Follow these steps to set up the project:

Clone the repository (or create the project structure manually):git clone <repository-url>
cd playwright-ui-tests


Install dependencies:npm install


Install Playwright browsers:npx playwright install --with-deps


Set up WordPress locally:
Install WordPress on your local machine (e.g., using XAMPP or Docker).
Ensure the site is accessible at http://localhost/wordpress.
Verify that the admin credentials are admin / demo123 or update utils/test-data.js accordingly.



Running Tests
Tests can be run in headless or headed mode:

Headless mode (default, no browser UI):npm test


Headed mode (visible browser):npm run test:headed



Tests are located in the tests/ folder and include:

login.spec.js: Tests login functionality.
form-submission.spec.js: Tests creating a new post.
navigation.spec.js: Tests navigation to the "Add New Post" page.

Test Cases
1. Login Tests (tests/login.spec.js)

Successful login with valid credentials:
Navigates to http://localhost/wordpress/wp-login.php.
Enters valid credentials (admin / demo123).
Asserts that the dashboard welcome panel is visible and the URL contains wp-admin.


Failed login with invalid credentials:
Navigates to the login page.
Enters invalid credentials (wronguser / wrongpass).
Asserts that an error message contains "ERROR: Invalid username".



2. Form Submission Tests (tests/form-submission.spec.js)

Create a new post:
Logs in with valid credentials.
Navigates to the "Add New Post" page.
Enters a post title and content.
Publishes the post and asserts that the success message contains "Post published".



3. Navigation Tests (tests/navigation.spec.js)

Navigate to Add New Post page:
Logs in with valid credentials.
Hovers over the "Posts" menu and clicks "Add New".
Asserts that the URL contains post-new.php.



Page Object Model
The project uses the Page Object Model (POM) for maintainability and reusability. Page objects are located in the pages/ folder:

login-page.js: Handles login page interactions (e.g., filling credentials, clicking the login button).
dashboard-page.js: Manages dashboard interactions (e.g., navigating to the "Add New Post" page).
post-page.js: Handles post creation (e.g., filling title/content, publishing).

Each page object encapsulates locators and methods, reducing code duplication and improving test readability.
Test Data
Test data is stored in utils/test-data.js:

Credentials:
Valid: admin / demo123
Invalid: wronguser / wrongpass


Post Data:
Title: "Test Post Title"
Content: "This is a test post content created by Playwright."



Update this file if your local WordPress setup uses different credentials.
Reporting
The project uses Playwright's built-in HTML reporter, configured in playwright.config.js. After running tests:

Reports are saved in the playwright-report/ folder.
View the report:npm run report


The report provides detailed results, including pass/fail status, screenshots (on failure), and test logs.

CI Integration
The project includes a GitHub Actions workflow (.github/workflows/playwright.yml) that:

Triggers on push or pull_request to the main branch.
Sets up Node.js and installs dependencies.
Installs Playwright browsers.
Runs all tests.
Uploads the HTML report as an artifact, accessible in the GitHub Actions UI.

Note: The CI workflow assumes the WordPress site is not accessible in the CI environment. For CI to work with a local WordPress instance, you must host the site publicly or mock the server (not covered in this project).
Pushing to GitHub
To push the project to GitHub:

Initialize a Git repository (if not already done):git init


Add all files:git add .


Commit changes:git commit -m "Initial commit with Playwright UI tests"


Create a new repository on GitHub and get its URL (e.g., https://github.com/your-username/playwright-ui-tests.git).
Link the remote repository:git remote add origin <your-repo-url>


Push to GitHub:git push -u origin main



The CI workflow will run automatically, and you can download the HTML report from the GitHub Actions "Artifacts" section.
Configuration
The playwright.config.js file configures:

Test directory: tests/
Timeout: 30 seconds per test, 5 seconds for assertions.
Base URL: http://localhost/wordpress
Browser: Chromium (headless by default).
Reporter: HTML reporter, saving reports to playwright-report/.
Screenshots: Captured on test failure.
Tracing: Enabled on the first retry.

To extend the project (e.g., add Firefox/WebKit), modify the projects section in playwright.config.js.
Troubleshooting

WordPress not accessible: Ensure your local server is running and WordPress is accessible at http://localhost/wordpress.
Credential errors: Verify that admin / demo123 works or update utils/test-data.js.
Test failures: Check the HTML report for screenshots and logs.
CI failures: The CI environment cannot access http://localhost. Consider hosting WordPress publicly or skipping certain tests in CI.

Extensibility

Add more tests: Create new files in tests/ and use existing page objects.
Add browsers: Update playwright.config.js to include Firefox or WebKit.
Custom reporting: Integrate Allure or other reporters by updating playwright.config.js.
Test data: Expand utils/test-data.js for additional scenarios.

Conclusion
This project provides a robust, production-ready Playwright UI testing setup for a local WordPress site. It ensures reliable testing of login, form submission, and navigation, with clear reporting and CI integration. For further customization, refer to the Playwright documentation or extend the page objects and test suites as needed.