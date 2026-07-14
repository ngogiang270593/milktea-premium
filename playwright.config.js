import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://milktea-premium.vercel.app',

    headless: false,

    // Full màn hình theo kích thước monitor
    viewport: null,

    launchOptions: {
      slowMo: 300,
      args: [
        '--start-maximized'
      ]
    }
  }
});