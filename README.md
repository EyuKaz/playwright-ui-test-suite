Playwright UI Testing Project 🚀
Welcome to the Playwright UI Testing Project, a production-ready framework for automating UI tests on a public WordPress demo site at https://s1.demo.opensourcecms.com/wordpress/ 🌐. Built with Playwright and JavaScript, it leverages the Page Object Model (POM) for maintainable code, supports cross-browser testing (Chromium, Firefox, WebKit), and includes Allure reporting with screenshots and videos 📸🎥. With features like accessibility checks, mobile viewport testing, performance smoke tests, and an AI-powered test generator 🤖, this project ensures robust testing with CI integration via GitHub Actions 🔄.
🎯 Project Purpose
This project automates UI testing for a WordPress site, verifying core functionalities like user login, post creation, and navigation. It is designed to be:

Reusable 🔄: Modular page objects reduce code duplication.
Maintainable 🛠: Clear structure and documentation simplify updates.
Production-ready ✅: Includes comprehensive reporting and CI integration.

📂 Project Structure
The project is organized for clarity and scalability:



Directory/File
Description



.github/workflows/playwright.yml
GitHub Actions workflow for CI and report uploads 📊.


pages/
Page Object Model classes for reusable page interactions 🧩.


tests/
Test suites for login, navigation, post creation, and more 🧪.


tools/
Scripts for AI test generation and flakiness detection 🤖🔍.


utils/test-data.js
Test data for credentials and post content 📋.


playwright.config.js
Playwright configuration for test settings and reporting ⚙️.


package.json
Project dependencies and scripts 📦.


.env.example
Template for environment variables (e.g., AI API key) 🔑.


.gitignore
Excludes unnecessary files from version control 🙈.


🛠 Prerequisites
To set up and run the project, ensure you have:

Node.js (v20+): Download from nodejs.org 📥.
Git: For version control Install Git 🗃.
Optional: OpenAI API key for AI test generation (add to .env) 🔑.


Note 📝: The project uses the public WordPress demo site at https://s1.demo.opensourcecms.com/wordpress/, so no local WordPress setup is required. The site uses admin / demo123 credentials.

🚀 Developer Setup Guide
Follow these steps to get started:
1. Clone or Create the Project

Clone the repository:git clone <repository-url>
cd playwright-ui-tests


Or create manually:mkdir playwright-ui-tests
cd playwright-ui-tests

Copy the project files into the directory, maintaining the structure above.

2. Install Dependencies

Install Node.js dependencies:npm install


Install Playwright browsers:npx playwright install --with-deps



3. Optional: Set Up AI Test Generation

Copy the environment file:cp .env.example .env


Edit .env to add your OPENAI_API_KEY:OPENAI_API_KEY=your-openai-api-key-here



4. Verify Test Data

The tests use admin / demo123 for the demo site. If testing a different WordPress instance, update utils/test-data.js:const credentials = {
  validUsername: 'your-username',
  validPassword: 'your-password',
  invalidUsername: 'wronguser',
  invalidPassword: 'wrongpass',
};



🧪 Running Tests
Execute tests in various modes:

Headless mode (all browsers):npm test


Headed mode (visible browser):npm run test:headed


Specific browser:npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit



📋 Test Suites
Tests are organized in tests/ for clarity:



Folder
Tests Included



login/
Login functionality, edge cases (empty fields, special characters) 🔐.


navigation/
Navigation to "Add New Post" page 🧭.


post/
Post creation, edge cases, mobile viewport, performance smoke tests 📝.


accessibility/
Accessibility checks using Axe ♿.


Test Cases
1. Login Tests (tests/login/)



Test Case
Description



Successful login
Navigates to login page, enters admin / demo123, verifies dashboard and URL contains wp-admin ✅.


Failed login
Enters wronguser / wrongpass, checks for "ERROR: Invalid username" 🚫.


Empty username
Submits empty username, expects "ERROR: The username field is empty" 🚫.


Empty password
Submits empty password, expects "ERROR: The password field is empty" 🚫.


Special characters
Uses <script> in credentials, expects "ERROR: Invalid username" 🚫.


2. Navigation Tests (tests/navigation/)



Test Case
Description



Navigate to Add New Post
Logs in, hovers over "Posts", clicks "Add New", verifies URL contains post-new.php 🧭.


3. Post Tests (tests/post/)



Test Case
Description



Create a new post
Logs in, navigates to "Add New Post", publishes a post, verifies "Post published" ✅.


Empty title
Submits post with empty title, expects validation error 🚫.


Long content
Publishes post with 10,000-character content, verifies success ✅.


Mobile viewport
Tests dashboard rendering on iPhone 12 viewport, verifies mobile menu 📱.


Performance smoke test
Measures login page load time, ensures under 5 seconds ⏱.


4. Accessibility Tests (tests/accessibility/)



Test Case
Description



Login page accessibility
Runs Axe checks, allows up to 4 minor violations ♿.


📊 Reporting
The project uses HTML and Allure reporters for detailed results:

HTML Report:npm run report

Opens in playwright-report/ 📈.
Allure Report (with screenshots/videos on failure):npm run allure

Opens in allure-report/ 📸🎥.


Note 📝: Allure reports include detailed logs, screenshots, and videos for failed tests, making debugging easier.

🤖 AI-Powered Test Generation
Generate Playwright test files from plain-English descriptions using the AI tool:
npm run generate-test "Test login with valid credentials"


Requirements: OpenAI API key in .env.
Output: Saves test files in tests/generated/.
Example:npm run generate-test "Test navigation to settings page"

Creates test-navigation-to-settings-page.spec.js.


Warning ⚠: Without an API key, the tool uses a mocked response. Update tools/generate-test.js to integrate with an LLM API.

🔍 Flakiness Detection
Analyze test flakiness by checking Allure results:
npm run flakiness


Requires multiple test runs to populate allure-results/.
Outputs failure rates for each test to identify flaky behavior.

🔄 CI Integration
The GitHub Actions workflow (.github/workflows/playwright.yml) automates testing:

Triggers: On push or pull_request to main.
Browsers: Runs on Chromium, Firefox, and WebKit.
Steps:
Sets up Node.js 📦.
Installs dependencies and browsers 🛠.
Runs tests 🧪.
Generates and uploads Allure reports 📊.


Access Reports: Download from GitHub Actions "Artifacts" section 📥.


Note 📝: The public demo site ensures CI compatibility without needing a local WordPress instance.

📤 Pushing to GitHub
To push the project to GitHub:

Initialize Git repository:git init


Add all files:git add .


Commit changes:git commit -m "Initial commit with Playwright UI tests"


Create a GitHub repository and link:git remote add origin <your-repo-url>


Push to GitHub:git push -u origin main



⚙️ Configuration
The playwright.config.js file defines:



Setting
Value



Test Directory
tests/


Timeout
30s (tests), 5s (assertions)


Retries
2 attempts to handle flakiness 🔄


Base URL
https://s1.demo.opensourcecms.com/wordpress/


Browsers
Chromium, Firefox, WebKit 🖥📱


Reporters
HTML (playwright-report/), Allure (allure-results/) 📊


Screenshots
On failure 📸


Videos
Retained on failure 🎥


Tracing
On first retry 🕵️‍♂️


To extend browsers or reporters, modify playwright.config.js.
🛠 Troubleshooting



Issue
Solution



Site not accessible
Verify https://s1.demo.opensourcecms.com/wordpress/ is online 🌐.


Credential errors
Ensure admin / demo123 works or update utils/test-data.js 🔑.


Test failures
Check Allure reports for screenshots/videos in allure-report/ 📸🎥.


CI failures
Ensure demo site is accessible; check GitHub Actions logs 🔍.


AI tool errors
Verify OPENAI_API_KEY in .env or update tools/generate-test.js 🤖.


🌟 Extensibility
Enhance the project with:

New Tests 🧪: Add files in tests/ using existing page objects.
Browsers 🖥: Update playwright.config.js for additional browsers.
Reporters 📊: Integrate other reporters (e.g., JUnit) in playwright.config.js.
Test Data 📋: Expand utils/test-data.js for new scenarios.
AI Tool 🤖: Enhance tools/generate-test.js with advanced LLM prompts.

🎉 Conclusion
This Playwright UI testing project delivers a robust, scalable framework for testing a WordPress demo site. With cross-browser support, comprehensive test coverage, Allure reporting, flakiness handling, and AI-powered test generation, it ensures reliable and maintainable UI testing. For further customization, explore the Playwright documentation or extend the page objects and test suites 📚.
Happy testing! 🎈