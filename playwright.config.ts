import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    workers: 2,
    retries: process.env.CI ? 1 : 0,
    reporter: 'list',
    use: {baseURL: 'http://127.0.0.1:4318', trace: 'retain-on-failure'},
    projects: [
        {name: 'desktop', use: {...devices['Desktop Chrome']}},
        {name: 'mobile', use: {...devices['iPhone 13'], defaultBrowserType: 'chromium'}},
    ],
    webServer: {command: 'npm run preview:test', url: 'http://127.0.0.1:4318', reuseExistingServer: false},
});
