# Future Plans

This document outlines planned improvements and extensions to the automation suite.

---

## 1. Expand Test Coverage

### Additional User Types
The application provides several user types beyond `standard_user` and `locked_out_user`:
- `problem_user` - surfaces UI rendering issues
- `performance_glitch_user` - simulates slow network conditions
- `error_user` - triggers error states
- `visual_user` - used for visual regression testing

Future test cases would cover these users to validate edge case behaviours
and ensure the application handles degraded states gracefully.

### Remaining Priority Test Cases
The following test cases were identified and prioritised but not automated 
in this challenge. They would be the next candidates for automation:

- **TC02** — Locked out user is denied access and sees the exact error 
  message "Epic sadface: Sorry, this user has been locked out."
- **TC04** — Unauthenticated user attempting to directly access 
  `/inventory.html` is redirected back to the login page with the exact 
  error message "Epic sadface: You can only access '/inventory.html' 
  when you are logged in."

### Negative Checkout Scenarios
- Checkout form validation with missing individual fields (first name only, last name only)
- Attempting checkout with an empty cart
- Navigating directly to `/checkout-step-two.html` without completing step one

### Session Management
- Verify session persists correctly on page refresh
- Verify cart state is maintained after browser back navigation
- Verify user is redirected to login after session expiry

---

## 2. API-Level Test Setup

Currently all tests drive the full UI flow including login. A future improvement
would use the Playwright `request` context to authenticate via API and set
session storage directly bypassing the login UI for tests where login is
a precondition rather than the subject under test.

```typescript
// Example: API login to skip UI login steps
const response = await request.post('/api/login', {
  data: { username: 'standard_user', password: 'secret_sauce' }
});
await context.addCookies(response.cookies());
```

This would significantly reduce test execution time as the suite grows.

---

## 3. Visual Regression Testing

Integrate visual regression testing using Playwright's built-in screenshot
comparison or a tool like Percy to catch unintended UI changes:

```typescript
await expect(page).toHaveScreenshot('inventory-page.png');
```

This is particularly relevant for `visual_user` who surfaces rendering issues
invisible to functional assertions.

---

## 4. Test Reporting - Allure

Replace the default HTML reporter with Allure for richer test reporting:
- Test history and trends
- Step-level detail with screenshots
- Integration with CI dashboards

```bash
npm install --save-dev allure-playwright
npx allure generate allure-results --clean
npx allure open
```

---

## 5. Performance Testing

Use `performance_glitch_user` to write tests that assert page load times
stay within acceptable thresholds:

```typescript
// Assert inventory page loads within 3 seconds
await expect(page).toHaveURL(/inventory\.html/, { timeout: 3000 });
```

---

## 6. Accessibility Testing

Integrate `@axe-core/playwright` to run automated accessibility checks
on each page - ensuring the application is usable by all users:

```typescript
import { checkA11y } from 'axe-playwright';
await checkA11y(page);
```

---

## 7. CI/CD Enhancements

- **Scheduled runs** - run the full suite nightly against production
- **Slack notifications** - alert the team on test failures
- **Parallel sharding** - split tests across multiple CI runners for faster feedback
- **Environment variables** - support multiple environments (staging, production)
  via `.env` files rather than hardcoded `baseURL`