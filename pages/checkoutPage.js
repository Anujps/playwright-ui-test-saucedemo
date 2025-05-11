import {CartPage} from "./cartPage";

export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cartPage = new CartPage(page);

        //locators
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button', {name: 'Continue'});
        this.finishButton = this.page.locator('#finish')
        this.checkoutCompleteContainer = this.page.locator('.checkout_complete_container')
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    async enterFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async enterPostalCode(postalCode) {
        await this.postalCodeInput.fill(postalCode);
    }

    async enterBasicInformationForCheckout(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }


    async checkout(firstName, lastName, postalCode) {
        console.log("Checking out...");
        await this.cartPage.checkoutButton.click();
        await this.enterBasicInformationForCheckout(firstName, lastName, postalCode);
        await this.continueButton.click();
        await this.finishButton.click();
    }


    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async getCheckoutCompleteMessage() {
        return await this.checkoutCompleteContainer.textContent();
    }

    async getTotalPriceWithoutTaxOnCheckout() {
        const totalPriceText = await this.page.locator('.summary_subtotal_label').textContent();
        return parseFloat(totalPriceText.replace('Item total: $', ''));
    }

    async getTotalPriceWithTaxOnCheckout() {
        const totalPriceText = await this.page.locator('.summary_total_label').textContent();
        return parseFloat(totalPriceText.replace('Total: $', ''));
    }

}