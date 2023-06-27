const { test, expect } = require('@playwright/test');

test("Popup validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
})
test("How to automate Java/JavaScript Alert popups with Playwright", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog => dialog.accept());
    await page.pause();
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.pause();
})

test("How to handle & Automate frames with Playwright", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator("#courses-iframe"); // this will give new page object
    await page.locator("#courses-iframe").scrollIntoViewIfNeeded();
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    await expect(textCheck.split(" ")[1]).toEqual('13,522');
    console.log('Resultado >>>>>>> ' + textCheck.split(" ")[1]);
})

test.only("Screenshot & Visual comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot_1.png'});//screenshot de um único elemento
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});//screenshot da página inteira
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
})


