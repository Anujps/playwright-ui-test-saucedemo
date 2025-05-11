import {test, expect} from '../utils/fixtures'
import {ProductsPage} from "../pages/productsPage";
import {CheckoutPage} from "../pages/checkoutPage";
import {CartPage} from "../pages/cartPage";


test('should not be able to checkout without entering name @regression @smoke', async({page}) => {
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)

    await productsPage.addProductsToCart(2)
    await productsPage.shoppingCartButton.click()
    await checkoutPage.cartPage.checkoutButton.click();
    await checkoutPage.enterBasicInformationForCheckout("", "Doe", "12345");
    await checkoutPage.continueButton.click();

    const errorMessage = await checkoutPage.getErrorMessage()
    expect(errorMessage).toContain('Error: First Name is required')
})

test('should be able to checkout with required fields @regression @smoke', async({page}) => {
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)

    await productsPage.addProductsToCart(2)
    await productsPage.shoppingCartButton.click()
    await checkoutPage.checkout("John", "Doe", "12345")
    const checkoutMessage = await checkoutPage.getCheckoutCompleteMessage()
    expect(checkoutMessage).toContain('Thank you for your order!')
})

test ('should calculate total price correctly excluding tax @regression @smoke', async({page}) => {
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const cartPage = new CartPage(page)

    await productsPage.addProductsToCart(3)
    const totalPrice = await cartPage.calculateTotalPrice()
    await cartPage.checkoutButton.click()
    await checkoutPage.enterBasicInformationForCheckout("John", "Doe", "12345");
    await checkoutPage.continueButton.click();
    const totalPriceOnCheckout = await checkoutPage.getTotalPriceWithoutTaxOnCheckout()
    expect(totalPriceOnCheckout).toEqual(totalPrice)
})

test('should apply 8% tax on total price @regression @smoke', async({page}) => {
    const productsPage = new ProductsPage(page)
    const checkoutPage = new CheckoutPage(page)
    const cartPage = new CartPage(page)

    await productsPage.addProductsToCart(3)
    const totalPrice = await cartPage.calculateTotalPrice()
    await cartPage.checkoutButton.click()
    await checkoutPage.enterBasicInformationForCheckout("John", "Doe", "12345");
    await checkoutPage.continueButton.click();

    const totalPriceWithoutTax = await checkoutPage.getTotalPriceWithoutTaxOnCheckout()
    const totalPriceWithTax = await checkoutPage.getTotalPriceWithTaxOnCheckout()
    const expectedTotalPriceWithTax = totalPriceWithoutTax + (8/100 * totalPriceWithoutTax)
    expect(totalPriceWithTax).toBeCloseTo(expectedTotalPriceWithTax, 2)
})
