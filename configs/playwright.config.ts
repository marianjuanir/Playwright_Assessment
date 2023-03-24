import { devices, PlaywrightTestConfig } from '@playwright/test';

const playwright: PlaywrightTestConfig = {
    testDir: '../tests',
    workers: 1,
    retries: 0,
    timeout: 30 * 1000,
    maxFailures: 2,
    use: {
        baseURL: 'https://www.taskmaverick.com',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'on'
    },
    reporter: [['list'], ['html', {open: 'always'}]],
    projects: [
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'Desktop Firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'Desktop Safari',
            use: { ...devices['Desktop Safari'] },
        },

        //mobile
        {
            name: 'Mobile XS Chrome',
            use: {
                ...devices['Galaxy S9+'],
                browserName: 'chromium'
            }
        },
        {
            name: 'Mobile XS Safari',
            use: {
                ...devices['iPhone X'],
                browserName: 'webkit'
            },
        },
    ]
};

export default playwright;