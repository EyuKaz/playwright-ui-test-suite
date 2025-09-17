Playwright UI Testing Project Documentation
Introduction
This document provides a comprehensive guide to the Playwright UI testing project, designed to automate testing for a WordPress site running locally at http://localhost/wordpress. Built with Playwright and JavaScript, the project adheres to the Page Object Model (POM) pattern, ensuring maintainable and reusable code. It includes HTML reporting for clear test results and integrates with GitHub Actions for continuous integration (CI). The project features three test suites—login, form submission, and navigation—to validate core WordPress functionalities.

Project Purpose
The goal of this project is to provide a production-ready UI testing framework for a local WordPress installation. It automates testing of key features such as user login, post creation, and navigation, ensuring reliability and consistency. The framework is designed to be:

Reusable: Modular page objects reduce code duplication.
Maintainable: Clear structure and documentation simplify updates.
Production-ready: Includes robust reporting and CI integration.


Project Structure
The project is organized for clarity and scalability:



Directory/File
Description



.github/workflows/playwright.yml
GitHub Actions workflow for running tests and uploading reports.


docs/documentation.md
Detailed project documentation (this file).


pages/
Page Object Model classes for reusable page interactions.


tests/
Test files for login, form submission, and navigation.


utils/test-data.js
Test data for credentials and post content.


playwright.config.js
Playwright configuration for test settings and reporting.


package.json
Project dependencies and scripts.


README.md
Quick setup and usage instructions.


.gitignore
Specifies files/folders to exclude from version control.



Prerequisites
To set up and run the project, ensure the following are installed:

Node.js: Version 20 or higher. Download from nodejs.org.
Git: For version control and GitHub integration. Install Git.
WordPress: A local WordPress installation accessible at http://localhost/wordpress with admin credentials admin / demo123 (update utils/test-data.js if different).
Local Web Server: A server like XAMPP, WAMP, or Docker to host WordPress locally.


Note: Ensure your local WordPress site is running before executing tests. The CI environment cannot access http://localhost, so tests may need to be skipped or the site hosted publicly for CI.


Developer Setup Guide
Follow these steps to set up the project on your local machine:
1. Set Up WordPress Locally

Install a local web server:
Use XAMPP, WAMP, or Docker to set up a local server environment.
Example for XAMPP:
Install XAMPP from apachefriends.org.
Start Apache and MySQL from the XAMPP control panel.


Example for Docker:docker run -d -p 80:80 --name wordpress wordp




Install WordPress:
Download WordPress from wordpress.org or use a Docker image (wordpress:latest).
Place WordPress files in the server's web root (e.g., htdocs/wordpress for XAMPP).
Complete the WordPress setup wizard at http://localhost/wordpress, setting admin credentials to admin / demo123 or noting your custom credentials.


Verify accessibility:
Ensure http://localhost/wordpress loads the WordPress site.
Test login at http://localhost/wordpress/wp-login.php with admin / demo123.



2. Clone or Create the Project

Option 1: Clone the repository (if hosted on GitHub):git clone <repository-url>
cd playwright-ui-tests


Option 2: Create manually:mkdir playwright-ui-tests
cd playwright-ui-tests

Copy the project files (provided in the repository or documentation) into the directory, maintaining the structure above.

3. Install Dependencies

Install Node.js dependencies:npm install


Install Playwright browsers:npx playwright install --with-deps



4. Update Test Data (if needed)

If your WordPress credentials differ from admin / demo123, update utils/test-data.js:const credentials = {
  validUsername: 'your-username',
  validPassword: 'your-password',
  invalidUsername: 'wronguser',
  invalidPassword: 'wrongpass',
};




Running Tests
Tests can be executed in two modes:

Headless mode (no browser UI, default):npm test


Headed mode (visible browser):npm run test:headed



Tests are located in the tests/ directory:

login.spec.js: Tests login functionality.
form-submission.spec.js: Tests post creation.
navigation.spec.js: Tests navigation to the "Add New Post" page.


Test Cases
1. Login Tests (tests/login.spec.js)



Test Case
Description



Successful login
Navigates to http://localhost/wordpress/wp-login.php, enters admin / demo123, and verifies the dashboard is visible with a URL containing wp-admin.


Failed login
Navigates to the login page, enters wronguser / wrongpass, and checks for an error message containing "ERROR: Invalid username".


2. Form Submission Tests (tests/form-submission.spec.js)



Test Case
Description



Create a new post
Logs in, navigates to "Add New Post", enters a title and content, publishes the post, and verifies the message contains "Post published".


3. Navigation Tests (tests/navigation.spec.js)



Test Case
Description



Navigate to Add New Post page
Logs in, hovers over the "Posts" menu, clicks "Add New", and verifies the URL contains post-new.php.



Page Object Model (POM)
The project uses POM for maintainability, with page objects in the pages/ directory:



File
Purpose



login-page.js
Handles login page interactions (e.g., filling credentials, clicking login).


dashboard-page.js
Manages dashboard actions (e.g., navigating to "Add New Post").


post-page.js
Controls post creation (e.g., filling title/content, publishing).


Each page object encapsulates locators and methods, improving code readability and reducing duplication.

Test Data
Test data is stored in utils/test-data.js:



Category
Details



Credentials
Valid: admin / demo123Invalid: wronguser / wrongpass


Post Data
Title: "Test Post Title"Content: "This is a test post content created by Playwright."


Update utils/test-data.js if your WordPress credentials differ.

Reporting
The project uses Playwright's built-in HTML reporter, configured in playwright.config.js.

Report Location: playwright-report/ folder.
View Report:npm run report


Features:
Detailed pass/fail status.
Screenshots on test failure.
Test execution logs.




CI Integration
The GitHub Actions workflow (.github/workflows/playwright.yml) automates testing:

Triggers: On push or pull_request to the main branch.
Steps:
Sets up Node.js.
Installs dependencies and Playwright browsers.
Runs all tests.
Uploads the HTML report as an artifact.


Accessing Reports: Download from the "Artifacts" section in the GitHub Actions UI.


Warning: The CI environment cannot access http://localhost. For CI to work, host WordPress publicly or mock the server (not covered here).


Pushing to GitHub
To push the project to GitHub:

Initialize a Git repository (if not already done):git init


Add all files:git add .


Commit changes:git commit -m "Initial commit with Playwright UI tests"


Create a GitHub repository and get its URL (e.g., https://github.com/your-username/playwright-ui-tests.git).
Link the remote repository:git remote add origin <your-repo-url>


Push to GitHub:git push -u origin main



The CI workflow will run automatically, with reports available in GitHub Actions.

Configuration
The playwright.config.js file defines:



Setting
Value



Test Directory
tests/


Timeout
30s (tests), 5s (assertions)


Base URL
http://localhost/wordpress


Browser
Chromium (headless by default)


Reporter
HTML, saved to playwright-report/


Screenshots
Captured on failure


Tracing
Enabled on first retry


To add browsers (e.g., Firefox, WebKit), update the projects section in playwright.config.js.

Troubleshooting



Issue
Solution



WordPress not accessible
Ensure the local server is running and http://localhost/wordpress loads.


Credential errors
Verify admin / demo123 or update utils/test-data.js.


Test failures
Check playwright-report/ for screenshots and logs.


CI failures
CI cannot access http://localhost. Host WordPress publicly or skip tests.



Extensibility
To enhance the project:

Add Tests: Create new files in tests/ using existing page objects.
Add Browsers: Modify playwright.config.js to include Firefox or WebKit.
Custom Reporting: Integrate Allure or other reporters in playwright.config.js.
Expand Test Data: Update utils/test-data.js for new scenarios.


Conclusion
This Playwright UI testing project provides a robust framework for testing a local WordPress site. With modular page objects, comprehensive test cases, HTML reporting, and GitHub Actions integration, it ensures reliable and maintainable UI testing. For further customization, refer to the Playwright documentation or extend the page objects and test suites as needed.