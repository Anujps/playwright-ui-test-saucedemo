import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

// Extend the base test with a login fixture
export const test = baseTest.extend({
    page: async ({ page }, use) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login()

        // Provide the logged-in page to the test
        await use(page);
    },
});

export { expect };