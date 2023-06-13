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
    // browserName:'webkit',
    // browserName:'chromium',
    browserName:'firefox',
    headless: false
  }
};

module.exports = config;

