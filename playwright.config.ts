import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // Path to your test files
  timeout: 30000, // 30 seconds timeout per test
  retries: 1, // Retry once if a test fails
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://localhost:3000", // Update with your app's base URL
  },
});
