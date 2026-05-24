import { Page, Locator } from "@playwright/test";
export class CartPage {
  private readonly page: Page;
  private readonly inventoryName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryName = page.getByTestId("inventory-item-name");
  }

  getProductInCart(): Locator {
    return this.inventoryName;
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}
