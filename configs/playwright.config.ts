import { devices, PlaywrightTestConfig } from '@playwright/test';

const playwright: PlaywrightTestConfig = {
    testDir: '../tests',
    workers: 1,
    retries: 0,
    timeout: 30 * 1000,
    maxFailures: 2,
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
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
    ]
};

export default playwright;