import {test , expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; 
import { USERS } from "../fixtures/test-data";

test.describe('Happy flow for successfull checkout', () => {
    
    test('should login, add to cart, checkout and verify order completion', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('locked out user sees error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.locked.username, USERS.locked.password);
        await expect(page.getByTestId('error-button')).toBeVisible();
    });
})