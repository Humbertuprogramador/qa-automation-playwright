import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 20000,

  expect: {
    timeout: 5000
  },

  fullyParallel: true,

  retries: 1,

  workers: 1,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 30000,
    actionTimeout: 10000
  }

});