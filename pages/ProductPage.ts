import { Page, Locator } from "@playwright/test";
export class ProductPage {
  private readonly page: Page;
  private readonly inventoryList: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.getByTestId("inventory-item");
    this.cartLink = page.getByTestId("shopping-cart-link");
  }

  async addProductToCart(productName: string): Promise<void> {
    const inventoryItem = this.inventoryList.filter({ hasText: productName });
    await inventoryItem.getByRole("button", { name: "Add to cart" }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
