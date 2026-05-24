import { Page, Locator } from "@playwright/test";
export class CheckoutPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async proceedToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async completeCheckout(): Promise<void> {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }
}
