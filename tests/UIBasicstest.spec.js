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
test('UI Controls', async ({ browser, page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const popUpOk = page.locator("#okayBtn");
    const radioButtonUser = page.locator(".radiotextsty");
    const checkboxTerms = page.locator("#terms");

    await dropdown.selectOption("Consultant");
    await radioButtonUser.last().click();
    await popUpOk.click();
    await expect(radioButtonUser.last()).toBeChecked();
    await checkboxTerms.click();
    await expect(checkboxTerms.isChecked()).toBeTruthy();
    await page.pause();
});