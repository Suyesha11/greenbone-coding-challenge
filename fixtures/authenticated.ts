import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { USERS } from "./test-data";

type AuthenticatedFixtures = {
  authenticatedPage: Page;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ page }, use): Promise<void> => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await use(page);
  },
  productPage: async ({ authenticatedPage }, use): Promise<void> => {
    await use(new ProductPage(authenticatedPage));
  },
  cartPage: async ({ authenticatedPage }, use): Promise<void> => {
    await use(new CartPage(authenticatedPage));
  },
  checkoutPage: async ({ authenticatedPage }, use) => {
    await use(new CheckoutPage(authenticatedPage));
  },
});
