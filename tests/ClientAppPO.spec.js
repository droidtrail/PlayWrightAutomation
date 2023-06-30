const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageObjects/POManager');
//Json >> String >> Js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
for (const data of dataSet) {
    test(`Client App login for ${data.productName}`, async ({ page }) => {
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
        await loginPage.validLogin(data.username, data.password);
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();
        await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);
        await ordersReviewPage.verifyEmailId(data.username);
        const orderId = await ordersReviewPage.submitAndGetOrderId();
        console.log('orderId >>>>>> ' + orderId);
        await expect(page.locator(".em-spacer-1 .ng-star-inserted")).toHaveText(orderId);
        await dashboardPage.navigateToOrders()
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    })
}
customtest.only("Client App login data as fixture", async ({ page, testDataForOrder }) => {
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
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});
