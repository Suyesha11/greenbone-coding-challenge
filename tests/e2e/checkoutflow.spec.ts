
//import { test } from '../../fixtures/authenticated';
import { test  , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS , PRODUCTS , CHECKOUT } from '../fixtures/test-data';

test.describe('Checkout Flow', () => {

  test('TC10 - user can complete full checkout and sees order confirmation', 
  async ({ page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await expect(page).toHaveURL(/inventory\.html/);
   

        const productPage = new ProductPage(page);
        await productPage.addProductToCart(PRODUCTS.backpack);

        //Navigate to cart page
        await productPage.goToCart();
        await expect(page).toHaveURL(/cart\.html/);


        const cartPage = new CartPage(page);
        await cartPage.verifyProductInCart(PRODUCTS.backpack);
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/checkout-step-one\.html/);

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInformation(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.postalCode);
        await checkoutPage.proceedToOverview();
        await expect(page).toHaveURL(/checkout-step-two\.html/);
       await expect(page.getByTestId('inventory-item-name')).toContainText(PRODUCTS.backpack);
       await expect(page.getByTestId('payment-info-label')).toBeVisible();
       await expect(page.getByTestId('shipping-info-label')).toBeVisible();
       await expect(page.getByTestId('total-info-label')).toBeVisible();

         await checkoutPage.completeCheckout();
         await expect(page).toHaveURL(/checkout-complete\.html/);
         await expect(page.getByTestId('complete-header')).toContainText('Thank you for your order!');
         await expect(page.getByTestId('complete-text')).toContainText('Your order has been dispatched');

  });

});