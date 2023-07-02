const { test, expect, request } = require('@playwright/test');

test('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // page.route('**/*.css',route=>route.abort());
    page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request',request=>console.log('Request >>>>> ' +request.url()));
    page.on('response',response=>console.log('Response >>>>> ' +response.url()));
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
    const documentLink = page.locator("[href*='documents-request']");

    await dropdown.selectOption("Consultant");
    await radioButtonUser.last().click();
    await popUpOk.click();
    await expect(radioButtonUser.last()).toBeChecked();
    await checkboxTerms.click();
    expect(await checkboxTerms.isChecked()).toBeTruthy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    // await page.pause();
});
test('Child window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log('Resultado: '+ domain);
    await userName.type(domain);
    // await page.pause();
    console.log(await userName.textContent());
});
