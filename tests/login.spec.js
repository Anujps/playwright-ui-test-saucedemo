import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HamburgerMenu} from "../components/hamburgerMenu";


test('should not be able to login with invalid password @smoke', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage()
    await loginPage.login(process.env.USERNAME, 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
})


test ('should be able to logout @smoke', async({page}) => {
    const hamburgerMenu = new HamburgerMenu(page);
    const loginPage = new LoginPage(page);

    await loginPage.login()
    await hamburgerMenu.logout()
    await expect(loginPage.loginButton).toBeVisible()

})
