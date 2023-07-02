const { devices } = require('@playwright/test');

const config = {
  retries: 1,
  workers: 5,
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects : [
    {
      name : 'Firefox',
      use: {
        browserName : 'firefox',
        headless: false,
        screenshot: 'off',
        video: 'on-first-retry',
        trace: 'on',
        // viewport:{width:720, height:720}
      },
    },
    {
      name:'chrome',
      use: {
        viewport: { width: 1600, height: 1200 },
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErros:true,
        Permissions:['geolocation'],
        trace: 'on',
        // ...devices['iPhone 11']
      }//,
    }
  ]
};
module.exports = config;