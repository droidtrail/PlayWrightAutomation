const { test, expect } = require('@playwright/test');
let webContext;
const userEmail = "leandro.pereiracr@gmail.com";
const userPassword = "x85.2eRYwab6BY";

test.beforeAll(async({browser}) => {
    //Armazenar as informações do local storage no arquivo state.json.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(userEmail);
    await page.locator("#userPassword").fill(userPassword);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
});
test('Browser Context Playwright test', async () => {
    const email = "";
    const productName = 'zara coat 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
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
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    await expect(page.locator(".em-spacer-1 .ng-star-inserted")).toHaveText(orderId);
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i <= await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("[scope='row']").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator(".btn-primary").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator("div  .col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
});
test('@API Teste case 2', async () => {
    const email = "";
    const productName = 'zara coat 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body").allTextContents();
    console.log("Titles >>>>>> " + titles);
});

