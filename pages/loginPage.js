export class LoginPage {
    constructor(page) {
        this.page = page;

        //locators
        this.userNameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
    }

    async login(username=process.env.USERNAME, password=process.env.PASSWORD) {
        await this.navigateToLoginPage()
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

