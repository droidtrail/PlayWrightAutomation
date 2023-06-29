const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');


test('Browser Context Playwright test', async ({ page }) => {
    // Declarando variáveis
    const username = "leandro.pereiracr@gmail.com";
    const password = "x85.2eRYwab6BY";
    const productName = 'zara coat 3';
    const countryCode = 'Brazi';
    const countryName = 'Brazil';
    // Instanciando as classes
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    // Steps
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
    await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);
    await ordersReviewPage.verifyEmailId(username);
    const orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log('orderId >>>>>> ' + orderId);
    await expect(page.locator(".em-spacer-1 .ng-star-inserted")).toHaveText(orderId);
    await dashboardPage.navigateToOrders()
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
