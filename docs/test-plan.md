# Test Plan – SauceDemo Web Application (saucedemo.com)

## 1. Objective

This document defines the functional test coverage and prioritization strategy for the SauceDemo
web application. The goal is to validate critical user journeys including authentication, product
browsing, cart management and checkout flow, with emphasis on:

- Business-critical workflows
- Secure access control
- Data integrity across the purchase journey
- Automation suitability using stable selectors

---

## 2. Application Under Test

- **URL:** https://www.saucedemo.com
- **Type:** Web-based e-commerce demo application

**Key Modules:**

- Authentication
- Product Inventory
- Cart Management
- Checkout Flow

---

## 3. Scope

### In Scope

- User login (valid, invalid, locked users)
- Session-based access control
- Inventory page validation
- Product sorting
- Cart operations (add/remove items)
- Checkout flow (information, overview, completion)

### Out of Scope

- Performance testing
- API-level validation
- Cross-browser/device compatibility testing
- Security penetration testing

---

## 4. Test Strategy

A **risk-based testing approach** is used to prioritize test coverage based on:

- Revenue impact (checkout flow)
- Security impact (authentication & authorisation)
- Data integrity (cart and pricing accuracy)

Automation design follows:

- Deterministic and independent test execution
- Stable selectors (`data-test` attributes)
- Page Object Model (POM) for maintainability
- CI/CD compatibility

---

## 5. Test Cases

| ID   | Description                                                                                                                                                                                                                                                          | Priority      |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| TC01 | Standard user can successfully login with valid credentials and is redirected to the inventory page (`/inventory.html`)                                                                                                                                              | P1 - Critical |
| TC02 | Locked out user is denied access and sees the exact error message "Epic sadface: Sorry, this user has been locked out." on the login page with no navigation occurring                                                                                               | P1 - Critical |
| TC03 | User with invalid credentials sees the exact error message "Epic sadface: Username and password do not match any user in this service" and remains on the login page                                                                                                 | P1 - Critical |
| TC04 | Unauthenticated user attempting to directly access `/inventory.html` is redirected back to the login page and sees the exact error message "Epic sadface: You can only access '/inventory.html' when you are logged in."                                             | P1 - Critical |
| TC05 | After successful login, all products are displayed on the inventory page and one or more products can be added to the cart with the cart badge updating correctly                                                                                                    | P2 - High     |
| TC06 | Products on the inventory page are correctly sorted for all four sort options: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low)                                                                                                                | P3 - Medium   |
| TC07 | User can navigate to the cart page and all added products are displayed with correct names, descriptions and prices                                                                                                                                                  | P2 - High     |
| TC08 | User can remove a product from the cart page and the cart badge updates or disappears accordingly                                                                                                                                                                    | P2 - High     |
| TC09 | Checkout overview page displays correct product names, prices and calculated tax before the user confirms the order, and checkout form validation displays specific error messages when first name, last name or postal code are missing and does not proceed        | P2 - High     |
| TC10 | User can complete the full checkout flow with valid information and the order confirmation page displays "Thank you for your order!" and the dispatch confirmation message "Your order has been dispatched, and will arrive just as fast as the pony can get there!" | P1 - Critical |

---

## 6. Prioritization & Reasoning

> **Methodology:** Test cases are prioritised based on business impact, security risk and position
> in the core user journey. P1 cases represent complete blockers to application functionality or
> security. P2 cases impact user experience and purchase completion. P3 cases are enhancements
> with no direct revenue impact.

| Rank | ID   | Priority      | Reasoning                                                                                                                                                                                                                                                      |
| ---- | ---- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | TC01 | P1 - Critical | Login is the entry point to the entire application. If authentication fails for valid users, no other functionality is accessible and the business loses revenue entirely.                                                                                     |
| 2    | TC03 | P1 - Critical | Invalid credential rejection protects against unauthorised access. The exact error message "Epic sadface: Username and password do not match any user in this service" must be shown. Preventing unauthorised access is a critical authentication requirement. |
| 3 | TC02 | P1 - Critical | Locked out users must be blocked at login with the exact error message "Epic sadface: Sorry, this user has been locked out." For a cybersecurity company, ensuring access control works correctly is fundamental to product trust. 
| 4 | TC04 | P1 - Critical | Direct URL access bypassing login is a security vulnerability. The app must redirect to login and show "Epic sadface: You can only access '/inventory.html' when you are logged in." critical for any application handling user data or purchases. |
| 5    | TC10 | P1 - Critical | The full checkout flow is the core business transaction. If a user cannot complete a purchase and see the confirmation, the business generates no revenue. This is the highest value user journey end to end.                                                  |
| 6    | TC05 | P2 - High     | Adding products to cart is a prerequisite for checkout. Without this working correctly, users cannot complete any purchase regardless of how well the checkout flow functions.                                                                                 |
| 7    | TC07 | P2 - High     | Cart accuracy directly affects purchase confidence. If product names, descriptions or prices display incorrectly, users may abandon or raise disputes impacting revenue and trust.                                                                           |
| 8    | TC09 | P2 - High     | Checkout overview accuracy ensures users see correct pricing and tax before confirming. Form validation also prevents incomplete orders where missing fields would result in orders without delivery information, causing operational failures downstream.     |
| 9    | TC08 | P2 - High     | Removing items from the cart is a standard user expectation. If users cannot correct their cart before checkout, it leads to incorrect orders and poor user experience.                                                                                        |
| 10   | TC06 | P3 - Medium   | Sorting helps users find products faster but is not critical to completing a purchase. The core checkout journey remains fully functional even if sorting options Name (A to Z), Name (Z to A), Price (low to high) and Price (high to low) are broken.        |

---

## 7. Detailed Test Case – TC10

### Test Case ID: TC10

### Title: User can complete the full checkout flow with valid information and reach the order confirmation page

### Module/Feature: E2E Checkout Flow

### Priority: P1 – Critical

### Type: Functional / End-to-End

### Automation Status: Automated using Playwright (TypeScript)

---

### Preconditions

- Application is accessible at https://www.saucedemo.com
- User `standard_user` exists and is not locked out
- Browser session is clean with no prior cookies or active session
- Test is run on Chromium browser

---

### Test Steps & Expected Results

| Step | Action                                                         | Expected Result                                                                                                                                                                                          |
| ---- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Navigate to `https://www.saucedemo.com`                        | Login page is displayed with username field, password field and Login button visible                                                                                                                     |
| 2    | Enter `standard_user` in the username field                    | Username field displays `standard_user`                                                                                                                                                                  |
| 3    | Enter `secret_sauce` in the password field                     | Password field displays masked characters                                                                                                                                                                |
| 4    | Click the Login button                                         | User is redirected to `/inventory.html` and at least 1 product is visible with name, description and price                                                                                               |
| 5    | Add "Sauce Labs Backpack" to cart using the Add to Cart button | Cart badge updates to `1`                                                                                                                                                                                |
| 6    | Click the cart icon in the header                              | User is redirected to `/cart.html` and the added product is displayed with correct name, description and price                                                                                           |
| 7    | Click the Checkout button                                      | User is redirected to `/checkout-step-one.html`                                                                                                                                                          |
| 8    | Enter `Alex` in the First Name field                           | First Name field accepts and displays the entered value                                                                                                                                                  |
| 9    | Enter `Costa` in the Last Name field                           | Last Name field accepts and displays the entered value                                                                                                                                                   |
| 10   | Enter `10869` in the Zip/Postal Code field                     | Zip/Postal Code field accepts and displays the entered value                                                                                                                                             |
| 11   | Click the Continue button                                      | User is redirected to `/checkout-step-two.html` and the order summary displays product details, Payment Information, Shipping Information and Price Total including Tax                                  |
| 12   | Click the Finish button                                        | User is redirected to `/checkout-complete.html` and the messages "Thank you for your order!" and "Your order has been dispatched, and will arrive just as fast as the pony can get there!" are displayed |

---

### Test Data

| Field       | Value               |
| ----------- | ------------------- |
| Username    | standard_user       |
| Password    | secret_sauce        |
| First Name  | Alex                |
| Last Name   | Costa               |
| Postal Code | 10869               |
| Product     | Sauce Labs Backpack |

---

### Expected Final Result

User is on `/checkout-complete.html`, the cart badge is no longer visible, and the following
confirmation messages are displayed:

- "Thank you for your order!"
- "Your order has been dispatched, and will arrive just as fast as the pony can get there!"

---

### Postconditions

- Order is successfully placed
- Cart is emptied and cart badge is no longer visible in the header
- User remains logged in and is on the checkout complete page

---

### Notes & Assumptions

- Test is run on Chromium browser
- No prior session or cookies should be present before test execution
- Credentials and all test data are sourced from `test-data.ts` and not hardcoded
- Product price and tax values are not hardcoded in assertions relative checks are used instead

---

## 8. Automation Strategy

### Framework

- Playwright with TypeScript

### Locator Strategy

- Primary: `data-test` attributes (stable and recommended)
- Secondary: role-based selectors (`getByRole`) for buttons and links aligns with accessibility best practices

### Design Principles

- Page Object Model (POM) for maintainability and reusability
- Centralised test data in `fixtures/test-data.ts` - no hardcoded values in spec files
- Independent and parallelisable test execution
- Assertions focused on business outcomes
- CI/CD compatible via GitHub Actions
