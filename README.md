# Greenbone Coding Challenge - Test Automation

Automated test suite for the [Sauce Demo](https://www.saucedemo.com) web application,
built with Playwright and TypeScript as part of the Greenbone Test Automation Engineer
coding challenge.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Browser Configuration](#browser-configuration)
- [Test Coverage](#test-coverage)
- [Contributing](#contributing)
- [Best Practices](#best-practices)

---

## Project Structure

```
greenbone-coding-challenge/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI/CD pipeline configuration
├── docs/
│   └── test-plan.md              # Test cases, prioritization and detailed TCMS
├── fixtures/
│   ├── authenticated.ts          # Playwright fixture for authenticated page and page objects
│   └── test-data.ts              # Centralised test data (users, products, checkout info)
├── pages/
│   ├── CartPage.ts               # Cart page interactions
│   ├── CheckoutPage.ts           # Checkout flow interactions
│   ├── LoginPage.ts              # Login page interactions
│   └── ProductPage.ts            # Inventory/product page interactions
├── tests/
│   └── e2e/
│       ├── checkoutflow.spec.ts  # TC10 - Full checkout flow test
│       └── login.spec.ts         # TC01, TC04 - Authentication tests
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts          # Playwright configuration
├── README.md
└── tsconfig.json                 # TypeScript configuration
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

Verify your versions:

```bash
node --version
npm --version
```

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/Suyesha11/greenbone-coding-challenge.git
cd greenbone-coding-challenge
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install
```

---

## Running the Tests

**Run all tests across all browsers**

```bash
npx playwright test
```

**Run a specific spec file**

```bash
npx playwright test tests/e2e/login.spec.ts
npx playwright test tests/e2e/checkoutflow.spec.ts
```

**Run on a specific browser**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Run in headed mode (watch the browser)**

```bash
npx playwright test --headed
```

**Run in debug mode**

```bash
npx playwright test --debug
```

**View the HTML test report**

```bash
npx playwright show-report
```

---

## Browser Configuration

Tests are configured to run on three browsers:

| Browser  | Engine | Covers          |
| -------- | ------ | --------------- |
| Chromium | Blink  | Chrome and Edge |
| Firefox  | Gecko  | Firefox         |
| WebKit   | WebKit | Safari and iOS  |

The primary browser for local development is **Chromium**. All three browsers
are run in CI via GitHub Actions on every push to `main`.

To run on Chromium only locally:

```bash
npx playwright test --project=chromium
```

---

## Test Coverage

The following test cases are automated. Full test case details, prioritization
and reasoning are documented in [docs/test-plan.md](docs/test-plan.md).

| Test ID | Description                                                              | Priority      | Spec File            |
| ------- | ------------------------------------------------------------------------ | ------------- | -------------------- |
| TC01    | Standard user can login and is redirected to inventory page              | P1 - Critical | login.spec.ts        |
| TC04    | Unauthenticated user accessing inventory directly is redirected to login | P1 - Critical | login.spec.ts        |
| TC10    | User can complete full checkout flow and sees order confirmation         | P1 - Critical | checkoutflow.spec.ts |

---

## Contributing

### Getting Started

1. Create a branch from `main` using the following naming convention:

```bash
git checkout -b feat/your-feature-name
git checkout -b fix/your-fix-name
git checkout -b test/your-test-name
```

2. Make your changes following the best practices below
3. Run the tests locally and ensure all pass before opening a PR:

```bash
npx playwright test
```

4. Open a pull request against `main` with a clear description of your changes

---

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description in present tense
```

| Type       | When to use                               |
| ---------- | ----------------------------------------- |
| `feat`     | New test or feature                       |
| `fix`      | Bug fix                                   |
| `test`     | Adding or updating tests                  |
| `refactor` | Code restructure without behaviour change |
| `chore`    | Config, dependencies, tooling             |
| `docs`     | Documentation changes                     |

**Examples:**

```bash
git commit -m "test(auth): add TC01 successful login spec"
git commit -m "feat(pages): add CheckoutPage page object"
git commit -m "chore(fixtures): add authenticated fixture"
git commit -m "docs: update README with browser configuration"
```

---

## Best Practices

### Page Object Model (POM)

All page interactions are encapsulated in Page Objects under `/pages`.
Never interact with the DOM directly in spec files.

```typescript
// ❌ Avoid — DOM interaction in spec file
await page.locator("#login-button").click();

// ✅ Preferred — use Page Object methods
await loginPage.login(USERS.standard.username, USERS.standard.password);
```

### Selectors

Use `data-test` attributes as the primary selector strategy. They are stable,
not tied to styling or structure, and are the recommended approach for the
Sauce Demo application. Use `getByRole` for interactive elements like buttons
and links where semantic meaning matters.

```typescript
// ✅ Stable data-test selector
page.getByTestId("checkout-button");

// ✅ Semantic role selector for buttons and links
page.getByRole("button", { name: "Add to cart" });

// ❌ Avoid — brittle CSS selectors
page.locator(".btn_primary.btn_small");
```

### Test Data

All test data is centralised in `fixtures/test-data.ts`. Never hardcode
usernames, passwords, product names or form data in spec files.

```typescript
// ❌ Avoid — hardcoded values in spec
await loginPage.login("standard_user", "secret_sauce");

// ✅ Preferred — imported from test data
await loginPage.login(USERS.standard.username, USERS.standard.password);
```

### Fixtures

Use Playwright fixtures for shared setup. The `authenticated` fixture in
`fixtures/authenticated.ts` handles login and page object initialisation,
keeping spec files clean and focused on test logic.

### Test Independence

Each test must be fully independent and able to run in isolation or in
any order. Never share state between tests.

### Assertions

Assert on business outcomes, not implementation details. Each assertion
should map directly to an acceptance criterion.

```typescript
// ✅ Business outcome assertion
await expect(page.getByTestId("complete-header")).toHaveText(
  "Thank you for your order!",
);

// ❌ Implementation detail assertion
await expect(page.locator(".complete-header")).toBeVisible();
```

### One Responsibility Per Test

Each test should verify one specific behaviour or user journey. Avoid
combining unrelated assertions in a single test.

### Code Formatting
This project uses Prettier for consistent code formatting.
Format all files before committing:
```bash
npx prettier --write .
```

