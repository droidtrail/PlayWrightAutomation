const {test} = require('@playwright/test')

test('Browser Context Playwright test', async ({browser})=>{

    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

})

test('Page First Playwright test', async ({browser,page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

})