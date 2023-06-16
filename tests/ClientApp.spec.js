const { test, expect } = require('@playwright/test');

test('Browser Context Playwright test', async ({ page }) => {
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("leandro.pereiracr@gmail.com");
    await page.locator("#userPassword").fill("x85.2eRYwab6BY");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    //Zara Coat 4
    const count = await products.count();
    for (let i = 0; i <= count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("button[type='button']").last().click();
    await page.locator("[placeholder='Select Country']").type('Brazi', { delay: 100 });
    const dropwnOptions = page.locator(".ta-results");
    await dropwnOptions.waitFor();
    const optionsCount = await dropwnOptions.locator("button").count();
    for (let i = 0; i <= optionsCount; i++) {
        const text = await dropwnOptions.locator("button").nth(i).textContent();
        if (text === " Brazil") {
            await dropwnOptions.locator("button").nth(i).click();
            break;
        }
    }
    await page.pause();
});
