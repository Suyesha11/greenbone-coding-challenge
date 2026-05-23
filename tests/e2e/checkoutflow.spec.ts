import { test  } from '../../fixtures/authenticated';
import { expect } from '@playwright/test';
import { PRODUCTS , CHECKOUT } from '../../fixtures/test-data';

test.describe('Checkout Flow', () => {

  test('TC10 - user can complete full checkout and sees order confirmation', 
  async ({ authenticatedPage , productPage , cartPage , checkoutPage}) => {

        await expect(authenticatedPage).toHaveURL(/inventory\.html/);
   
        await productPage.addProductToCart(PRODUCTS.backpack);

        await productPage.goToCart();
        await expect(authenticatedPage).toHaveURL(/cart\.html/);
        await cartPage.verifyProductInCart(PRODUCTS.backpack);

        await cartPage.proceedToCheckout();
        await expect(authenticatedPage).toHaveURL(/checkout-step-one\.html/);

        await checkoutPage.fillCheckoutInformation(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.postalCode);
        await checkoutPage.proceedToOverview();
        await expect(authenticatedPage).toHaveURL(/checkout-step-two\.html/);
       await expect(authenticatedPage.getByTestId('inventory-item-name')).toContainText(PRODUCTS.backpack);
       await expect(authenticatedPage.getByTestId('payment-info-label')).toBeVisible();
       await expect(authenticatedPage.getByTestId('shipping-info-label')).toBeVisible();
       await expect(authenticatedPage.getByTestId('total-info-label')).toBeVisible();

         await checkoutPage.completeCheckout();
         await expect(authenticatedPage).toHaveURL(/checkout-complete\.html/);
         await expect(authenticatedPage.getByTestId('complete-header')).toContainText('Thank you for your order!');
         await expect(authenticatedPage.getByTestId('complete-text')).toContainText('Your order has been dispatched');

  });

});