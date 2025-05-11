import { test, expect } from '../utils/fixtures'
import {ProductsPage} from "../pages/productsPage";


test('verify products are sorted from A to Z by default @regression', async ({ page }) => {
    //wait until products are loaded before extracting the product names
    const productLocator = page.locator('[data-test="inventory-item-name"]');
    await productLocator.last().waitFor({ state: 'visible' });

    const productNames = await productLocator.allTextContents();
    console.log(productNames);
    expect(productNames).toEqual(productNames.sort());
});


test('verify products can be sorted from low to high price @regression', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');//select 'low to high price' from the dropdown

    //wait until products are loaded before extracting the product prices
    const productLocator = page.locator('[class="inventory_item_price"]');
    await productLocator.last().waitFor({ state: 'visible' });

    const productPrices = await productLocator.allTextContents();
    //console.log(productPrices);

   // Remove the dollar sign and convert to numbers for sorting
    const prices = [];
    for (const price of productPrices) {
        prices.push(parseFloat(price.slice(1)));
    }
    const sortedPrices = [...prices].sort((a,b) => a - b);
    expect(prices).toEqual(sortedPrices);
})


test('should be able to add and remove products from cart @smoke', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToCart(3)
    const cartCount = await productsPage.shoppingCartBadge.textContent();
    expect(cartCount).toBe("3");

    // remove all products from the cart and verify the badge number does not exist
    await productsPage.removeProductsFromCart();
    const isBadgeVisible = await productsPage.shoppingCartBadge.isVisible();
    expect(isBadgeVisible).toBe(false);

})

test ('should retain products in cart after page refresh @regression', async ({page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToCart(3)
    const cartCount = await productsPage.shoppingCartBadge.textContent();
    expect(cartCount).toBe("3");

    // refresh the page and verify the badge number is still 3
    await page.reload();
    const cartCountAfterRefresh = await productsPage.shoppingCartBadge.textContent();
    expect(cartCountAfterRefresh).toBe("3");
})




