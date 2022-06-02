import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry'
  }
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] }
  //   },
  //   // {
  //   //   name: 'firefox',
  //   //   use: { ...devices['Desktop Firefox'] }
  //   // },
  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] }
  //   }
  // ]
};
export default config;