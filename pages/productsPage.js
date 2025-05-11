export class ProductsPage {
    constructor(page) {
        this.page = page;

        //locators
        this.addToCartButtons = this.page.getByRole('button', {name: 'Add to cart'});
        this.removeButtons = this.page.getByRole('button', {name: 'Remove'});
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
        this.shoppingCartButton = this.page.locator('[data-test="shopping-cart-link"]')
    }

    async addProductsToCart(numberOfProduct) {
        for (let i = 0; i < numberOfProduct; i++) {
            await this.addToCartButtons.first().click();
        }
    }

    async removeProductsFromCart() {
        const removeButtonsCount = await this.removeButtons.count();
        for (let i = 0; i < removeButtonsCount; i++) {
            await this.removeButtons.first().click();
        }
    }
}