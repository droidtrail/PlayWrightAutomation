const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log('Resultado: ' + await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //css
    await userName.type("rahulshetty");
    await password.type("learning");
    await signIn.click();

    //await until this locator shown up page
    await page.locator("[style*='block']").textContent();
    console.log('Resultado: ' + await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    //race condition
    await Promise.all(
        [
            page.waitForTimeout(7000),
            signIn.click(),
        ])
    // console.log(await cardTitles.nth(0).textContent());
         
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});
test('Page First Playwright test', async ({ browser, page }) => {
    await page.goto("https://www.google.com/");
    console.log('Resultado: ' + await page.title());
    await expect(page).toHaveTitle("Google");
});