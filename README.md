# Playwright UI Test Automation – SauceDemo

Automated UI test suite for [SauceDemo](https://www.saucedemo.com) using [Playwright](https://playwright.dev/) and JavaScript.  
This project follows the **Page Object Model (POM)** structure and includes sample regression and smoke tests.

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anujps/playwright-ui-test-saucedemo.git
   cd playwright-ui-test-saucedemo
   ```
2. **Install dependencies**
   ```bash
    npm install
    npx playwright install
    ```
3. **Run tests**
   ```bash
   npx playwright test
   ```
4. **Run tests with tags(regression or smoke)**
   ```bash
    npx playwright test --grep @smoke
    ```
   
5. **View test results**
   - Open the `test-results` folder to view the generated reports.
   - Use the command below to view the HTML report:
   ```bash
   npx playwright show-report
   ```
   