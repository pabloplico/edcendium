import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'unit',
      testMatch: /amplify\.spec\.ts/,
    },
    // Commenting out e2e tests as they require browser installation
    // {
    //   name: 'e2e',
    //   testMatch: /home\.spec\.ts/,
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],
  webServer: process.env.CI ? {
    command: 'npm run build && npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  } : undefined,
});