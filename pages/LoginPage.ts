import { Page, Locator } from "@playwright/test";
export class LoginPage {
  private readonly page: Page;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByTestId("username");
    this.password = page.getByTestId("password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
