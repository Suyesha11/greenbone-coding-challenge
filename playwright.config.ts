import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  //forbidOnly: 0,

  retries: 0,

  workers: 1,

  reporter: "html",

  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "on-first-retry",

    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
