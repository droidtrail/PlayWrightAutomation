const { test,expect } = require('@playwright/test');

test("Popup validations",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect (page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
})
test.only("How to automate Java/JavaScript Alert popups with Playwright",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog',dialog =>dialog.accept());
    await page.pause();
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.pause();
})
