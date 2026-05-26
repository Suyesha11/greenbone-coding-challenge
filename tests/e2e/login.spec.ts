import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { USERS } from "../../fixtures/test-data";

let loginPage: LoginPage;

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("TC01 - Standard user can login and is redirected to inventory page", async ({
    page,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("TC03 - User with invalid credentials sees error message and remains on login page", async ({
    page,
  }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await expect(page.getByTestId("error")).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL("/");
  });
});
