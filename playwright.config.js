const { devices } = require('@playwright/test');

const config = {
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
        trace: 'on'
      },
    },
    {
      name:'chrome',
      use: {
        viewport: { width: 1600, height: 1200 },
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on'
      },
    }
  ]
};
module.exports = config;