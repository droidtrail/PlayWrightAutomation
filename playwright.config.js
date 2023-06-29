// @ts-check
const { defineConfig, devices, firefox } = require('@playwright/test');

const config = {
  testDir:'./tests',
  /*Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect:{
    timeout: 5000
  },
  reporter:'html',
  
  /* Shared settings for all the projects below.*/
  use:{
    viewport: { width: 1600, height: 1200 },
    browserName:'chromium',
    headless: false,
    screenshot:'on',
    // trace:'retain-on-failure',
    trace:'on',
  }
};


