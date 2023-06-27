const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');


test('Browser Context Playwright test', async ({ page }) => {
    // Declarando variáveis
    const username = "leandro.pereiracr@gmail.com";
    const password = "x85.2eRYwab6BY";
    const productName = 'zara coat 3';
    // Instanciando as classes
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();

    await loginPage.goTo();
    await loginPage.validLogin(username,password);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    

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
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
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
