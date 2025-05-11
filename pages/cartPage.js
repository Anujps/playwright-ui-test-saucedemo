export class CartPage {
    constructor(page) {
        this.page = page;
        this.url = '/cart.html';

        //locators
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = this.page.locator('#continue-shopping');
    }

    async calculateTotalPrice() {
        await this.page.goto(this.url);
        const prices = await this.page.locator('.inventory_item_price').allTextContents();
        let totalPrice = 0;
        for (const price of prices) {
            totalPrice += parseFloat(price.replace('$', ''));
        }
        return totalPrice;
    }


}