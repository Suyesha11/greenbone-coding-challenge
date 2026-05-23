import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS } from "../fixtures/test-data";

test.describe("Authentication", () => {
    test('TC01 - Standard user can login and is redirected to inventory page', async ({page,}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    });

    test('TC04 - Unauthenticated user accessing inventory directly is redirected to login', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('error')).toContainText(
        "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
    });
});
