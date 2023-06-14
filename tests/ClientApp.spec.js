const {test,expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("leandro.pereiracr@gmail.com");
    await page.locator("#userPassword").fill("x85.2eRYwab6BY");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body a").allTextContents();
    console.log(titles);
});
