export class HamburgerMenu {
    constructor(page) {
        this.page = page;

        //locators
        this.hamburgerMenu = this.page.getByRole('button', {name: 'Open Menu'})
        this.logoutButton = this.page.getByRole('link', {name: 'Logout'})
    }

    async logout() {
        console.log("Logging out...");
        await this.hamburgerMenu.click();
        await this.logoutButton.click();

    }
}